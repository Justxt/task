import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../value-objects/take-status.vo';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterTasksDto } from '../dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {
    // Inicializar datos "quemados" (hardcoded)
    this.initSampleData();
  }

  async initSampleData() {
    const count = await this.tasksRepository.count();
    if (count === 0) {
      const sampleTasks = [
        {
          employeeName: 'Juan Pérez',
          projectName: 'Sistema CRM',
          description: 'Implementar módulo de autenticación',
          startDate: new Date('2025-04-10'),
          estimatedDays: 3,
          status: TaskStatus.COMPLETED,
          endDate: new Date('2025-04-12'),
        },
        {
          employeeName: 'María García',
          projectName: 'Portal Web',
          description: 'Diseñar landing page',
          startDate: new Date('2025-04-13'),
          estimatedDays: 2,
          status: TaskStatus.IN_PROGRESS,
          endDate: null,
        },
        {
          employeeName: 'Carlos Rodríguez',
          projectName: 'App Móvil',
          description: 'Implementar notificaciones push',
          startDate: new Date('2025-04-08'),
          estimatedDays: 4,
          status: TaskStatus.IN_PROGRESS,
          endDate: null,
        },
        {
          employeeName: 'Ana Martínez',
          projectName: 'Sistema CRM',
          description: 'Corregir bugs en dashboard',
          startDate: new Date('2025-04-15'),
          estimatedDays: 1,
          status: TaskStatus.PENDING,
          endDate: null,
        },
        {
          employeeName: 'Pedro López',
          projectName: 'Portal Web',
          description: 'Optimizar SEO',
          startDate: new Date('2025-04-05'),
          estimatedDays: 3,
          status: TaskStatus.COMPLETED,
          endDate: new Date('2025-04-10'),
        },
      ];

      await this.tasksRepository.save(sampleTasks);
    }
  }

  create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async findAll(filterDto?: FilterTasksDto) {
    const query = this.tasksRepository.createQueryBuilder('task');

    if (filterDto) {
      if (filterDto.startDate) {
        query.andWhere('task.startDate >= :startDate', {
          startDate: filterDto.startDate,
        });
      }

      if (filterDto.endDate) {
        query.andWhere('task.startDate <= :endDate', {
          endDate: filterDto.endDate,
        });
      }
    }

    const tasks = await query.getMany();

    // Calcular días de retraso para cada tarea
    return tasks.map((task) => {
      const today = new Date();
      const expectedEndDate = new Date(task.startDate);
      expectedEndDate.setDate(expectedEndDate.getDate() + task.estimatedDays);

      let delayedDays = 0;

      if (
        task.status !== TaskStatus.COMPLETED &&
        task.status !== TaskStatus.CANCELLED
      ) {
        // Para tareas no completadas, calcular días de retraso si ya pasó la fecha esperada
        if (today > expectedEndDate) {
          delayedDays = Math.floor(
            (today.getTime() - expectedEndDate.getTime()) /
              (1000 * 60 * 60 * 24),
          );
        }
      } else if (task.endDate) {
        // Para tareas completadas, calcular si se completó con retraso
        if (new Date(task.endDate) > expectedEndDate) {
          delayedDays = Math.floor(
            (new Date(task.endDate).getTime() - expectedEndDate.getTime()) /
              (1000 * 60 * 60 * 24),
          );
        }
      }

      return {
        ...task,
        delayedDays,
      };
    });
  }

  async findDelayedTasks() {
    const allTasks = await this.findAll();
    return allTasks.filter((task) => task.delayedDays > 0);
  }

  findOne(id: number) {
    return this.tasksRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.tasksRepository.remove(task);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Task],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        // Enable SSL for production environments (Render)
        ssl:
          configService.get<string>('NODE_ENV') === 'development'
            ? { rejectUnauthorized: false } // Common setting for Render/Heroku
            : false, // Disable SSL for local development if not needed
      }),
      inject: [ConfigService],
    }),
    TasksModule,
  ],
})
export class AppModule {}

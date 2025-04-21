# Gestor de Tareas Simple
- Task! Esta es una app web simple para seguir tareas.

-- El **backend** Guarda, busca, actualiza y borra las tareas usando NestJS y una base de datos SQLite (`tasks.db`) para local y PostgreSQL (postrgresql de Render.com) para en la nube. Cuando lo inicias, crea unas tareas de ejemplo. Ofrece una API para que el frontend (o cualquier otra cosa) hable con él.
-- El **frontend** es lo que ves y usas en el navegador. Hecho con React, te muestra la lista de tareas, te deja crear nuevas, editarlas, borrarlas y filtrarlas. Se conecta al backend para hacer todo esto.

# Repositorio de Github
├── task/        # Todo lo del backend (NestJS)
https://github.com/Justxt/task

└── task-front/  # Todo lo del frontend (React)
https://github.com/Justxt/taskFront

# Video explicativo
https://youtu.be/WHrlNQAsDKs

# Deploy
### Backend (`task/`)
https://task-bzcx.onrender.com/tasks

### Frontend (`task-front/`)
https://task-front-delta.vercel.app/

### ¿Qué hace el Backend?

*   Guardar, buscar, editar y borrar tareas.
*   Usa una base de datos SQLite (`tasks.db`) para guardar todo.
*   Una base de datos PostgreSQL para guardar todo.
*   Crea tareas de ejemplo al iniciar por primera vez.
*   Calcula si una tarea está retrasada.

### Rutas de la API (Backend)

| Método | Ruta         | ¿Qué hace?                      |
| :----- | :----------- | :------------------------------ |
| GET    | /tasks       | Trae todas las tareas           |
| GET    | /tasks/:id   | Busca una tarea por su ID       |
| POST   | /tasks       | Crea una tarea nueva            |
| PATCH  | /tasks/:id   | Actualiza una tarea existente   |
| DELETE | /tasks/:id   | Elimina una tarea               |
| GET    | /tasks/filter | Filtra tareas (por fecha/retraso) |

### ¿Qué tiene el Frontend?

*   Una tabla para ver todas las tareas.
*   Filtros para buscar tareas por fecha o si están atrasadas.
*   Un formulario para crear tareas nuevas.
*   Un formulario para editar tareas existentes.
*   Botones para marcar tareas como completadas o borrarlas.

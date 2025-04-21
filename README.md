# Gestor de Tareas Simple

Task! Esta es una app web simple para seguir tareas.

## Está organizado así:

```
.
├── task/        # Todo lo del backend (NestJS)
└── task-front/  # Todo lo del frontend (React)
```

## Backend (NestJS) - Frontend (React)

El **backend** es como el cerebro de la app. Guarda, busca, actualiza y borra las tareas usando NestJS y una base de datos SQLite (`tasks.db`). Cuando lo inicias, crea unas tareas de ejemplo. Ofrece una API para que el frontend (o cualquier otra cosa) hable con él.

El **frontend** es lo que ves y usas en el navegador. Hecho con React, te muestra la lista de tareas, te deja crear nuevas, editarlas, borrarlas y filtrarlas. Se conecta al backend para hacer todo esto.

### ¿Qué hace el Backend?

*   Guardar, buscar, editar y borrar tareas.
*   Usa una base de datos SQLite (`tasks.db`) para guardar todo.
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

## Cómo instalar y ejecutar

### Backend (`task/`)

1.  Ve a la carpeta del backend:
    ```bash
    cd task
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run start:dev
    ```
    (El backend estará corriendo en `http://localhost:3000`)

### Frontend (`task-front/`)

1.  Abre **otra terminal** y ve a la carpeta del frontend:
    ```bash
    cd ../task-front
    # O si estás en la raíz del proyecto:
    # cd task-front
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia la aplicación de desarrollo:
    ```bash
    npm run dev
    ```
    (Abre la URL que te muestre la terminal, usualmente `http://localhost:5173`)

¡Y listo! Ya puedes usar la app para gestionar tus tareas.
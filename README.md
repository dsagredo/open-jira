# Open Jira

Aplicación de gestión de tareas construida con Next.js, Material-UI y Supabase.

## Características

- Gestión completa de tareas (crear, editar, eliminar, completar)
- Estados de tareas: pendiente, en progreso, terminada
- Interfaz con temas claro y oscuro
- Persistencia de datos con Supabase
- Diseño responsivo con Material-UI
- Vista detallada de cada tarea
- Formato de fechas localizado

## Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Material-UI (MUI)** - Componentes de interfaz
- **Supabase** - Base de datos PostgreSQL
- **Emotion** - CSS-in-JS
- **date-fns** - Manejo de fechas
- **notistack** - Notificaciones

## Configuración Inicial

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

Crea un archivo `.env` basándote en `.env.template`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. La base de datos ya tiene las migraciones aplicadas en:
   - `supabase/migrations/20251101212222_create_tasks_table.sql`
   - `supabase/migrations/20251206163122_add_completed_column.sql`

## Ejecutar el Proyecto

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Compilar para Producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables (Header, Card)
├── layouts/          # Layouts de la aplicación
├── lib/              # Configuración de Supabase
├── models/           # Tipos TypeScript
├── pages/            # Páginas de Next.js
├── store/            # Context API (SupabaseContext)
├── styles/           # Estilos CSS
├── themes/           # Temas claro y oscuro
├── ui/               # Componentes de UI (ListTask, NewTask)
└── utils/            # Utilidades (formatDate)
```

## Base de Datos

La aplicación utiliza Supabase con una tabla `tasks` que contiene:

- `id` - UUID único
- `description` - Descripción de la tarea
- `status` - Estado (pending, in-progress, finished)
- `completed` - Indicador booleano
- `created_at` - Fecha de creación

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

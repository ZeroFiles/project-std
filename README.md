# project-std

A React application created with Vite.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

## Configuración de Firebase

Este proyecto utiliza Firebase para la base de datos. Para configurar:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Activa Firestore en el proyecto
3. Ve a Configuración del proyecto > Configuración general > Tus apps
4. Crea una nueva app web y copia las credenciales
5. Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`
6. Añade tus credenciales de Firebase al archivo `.env`:

```
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
```

> Nota: Nunca compartas tus credenciales de Firebase en control de versiones. El archivo `.env` está incluido en `.gitignore` por defecto.

## Ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## Rutas disponibles

- `/login` - Página de inicio de sesión
- `/todos` - Aplicación de lista de tareas (ejemplo de Firestore)
- `/dashboard` - Panel principal (ruta protegida)
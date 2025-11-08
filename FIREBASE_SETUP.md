# Configuración de Firebase Authentication en Lynara

Este documento describe cómo configurar Firebase Authentication para el sistema de autenticación de Lynara.

## Paso 1: Crear un proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Ingresa el nombre: `Lynara AI Platform` (o el que prefieras)
4. Completa los pasos de configuración
5. En "¿Cuál es tu objetivo?", selecciona "Web" para crear una aplicación web

## Paso 2: Obtener las credenciales de Firebase

1. En el proyecto de Firebase, ve a "Proyecto > Configuración"
2. Desplázate hasta "Tus aplicaciones" y haz clic en el icono web `<>`
3. Copia las credenciales que se muestran:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## Paso 3: Configurar variables de entorno

En v0, ve a la sección **Vars** en la barra lateral izquierda y añade las siguientes variables de entorno públicas (con prefijo `NEXT_PUBLIC_`):

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id_aqui
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id_aqui
\`\`\`

## Paso 4: Habilitar autenticación por correo y contraseña

1. En Firebase Console, ve a "Authentication" → "Sign-in method"
2. Haz clic en "Email/Password"
3. Habilita "Email/password"
4. Haz clic en "Guardar"

## Paso 5: Verificar la instalación

Una vez configurado:

1. Accede a `http://localhost:3000/register` para crear una nueva cuenta
2. Ingresa tu correo y contraseña
3. Deberías ser redirigido automáticamente a `/dashboard`
4. En el dashboard, verifica que tu correo aparezca en la información del usuario
5. Prueba el botón "Cerrar sesión" para verificar que la desconexión funciona

## Flujos de autenticación

### Registro
- POST `/register` → Crear usuario con Firebase
- Redirige a `/dashboard` tras éxito
- Muestra errores en caso de fallo

### Login
- POST `/login` → Autenticarse con Firebase
- Redirige a `/dashboard` tras éxito
- Muestra errores en caso de fallo

### Dashboard protegido
- Verifica autenticación al cargar `/dashboard`
- Redirige a `/login` si no hay usuario autenticado
- Muestra la información del usuario (email, nombre)

### Logout
- Botón en header y sidebar
- Cierra la sesión en Firebase
- Redirige a la página de inicio

## Características de seguridad

- Persistencia automática de sesión usando Firebase
- Context global para gestionar estado de autenticación
- Redirecciones automáticas según estado del usuario
- Validación de formularios en tiempo real
- Manejo de errores amigable con el usuario

## Solución de problemas

### Error: "La configuración de Firebase no está disponible"
- Verifica que todas las variables de entorno estén correctamente configuradas en v0
- Asegúrate de que los nombres de las variables sean exactamente como se especificó

### Error: "El usuario no puede ser creado"
- Verifica que el correo sea válido
- La contraseña debe tener al menos 6 caracteres
- El correo no debe estar ya registrado

### Error: "Credenciales inválidas"
- Asegúrate de que el correo y contraseña son correctos
- Verifica que la autenticación por correo/contraseña está habilitada en Firebase Console

## Próximas funcionalidades (Futuro)

- Recuperación de contraseña
- Autenticación con Google/GitHub
- Verificación de correo
- Autenticación de dos factores

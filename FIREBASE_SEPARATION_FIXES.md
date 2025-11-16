# Firebase Client/Server Separation - Fixes Applied

## Problema Principal
El error `__FIREBASE_DEFAULTS__ cannot be accessed on the client` ocurría porque:
1. `utils/firebase/admin.ts` estaba importando `dbClient` de `lib/firebase.ts` (cliente)
2. Ese archivo se importaba en API routes del servidor
3. Next.js intentaba bundlear código cliente en el servidor

## Solución Implementada

### 1. Nuevo Archivo: `lib/firebase-admin.ts`
- Creado para manejar exclusivamente operaciones server-side
- Usa `firebase-admin` SDK en lugar de `firebase` SDK cliente
- Inicializa Firebase Admin con service account o credenciales por defecto
- Exporta `getAdminApp()` y `getAdminFirestore()` para uso en servidor

### 2. Actualizado: `utils/firebase/admin.ts`
- Eliminadas todas las importaciones de Firestore cliente (`firebase/firestore`)
- Reemplazado `dbClient` por `getAdminFirestore()`
- Convertidas todas las queries de sintaxis cliente a sintaxis Admin:
  - `collection()` + `getDocs()` → `db.collection().get()`
  - `doc()` + `deleteDoc()` → `db.doc().delete()`
  - Uso de batched writes para operaciones atómicas

### 3. Actualizado: `lib/firebase.ts`
- Reemplazado `enableIndexedDbPersistence()` (deprecated) por `enableMultiTabIndexedDbPersistence()`
- Mantiene la inicialización solo en cliente con guard `isClient`
- Sin cambios en la arquitectura cliente

### 4. Actualizado: `package.json`
- Añadido `firebase-admin: ^12.0.0` a dependencies
- Mantiene `firebase: latest` para cliente

## Separación Cliente/Servidor

### Cliente (`lib/firebase.ts`)
\`\`\`typescript
- firebase/app
- firebase/auth
- firebase/firestore (sintaxis web)
\`\`\`
Usado en: componentes cliente, hooks, auth-context

### Servidor (`lib/firebase-admin.ts`)
\`\`\`typescript
- firebase-admin/app
- firebase-admin/firestore (sintaxis Admin)
\`\`\`
Usado en: API routes, server components, utils/firebase/admin.ts

## Archivos Modificados

1. **lib/firebase-admin.ts** (NUEVO)
   - Inicialización de Firebase Admin
   - Funciones helper para obtener app y firestore

2. **utils/firebase/admin.ts** (MODIFICADO)
   - Reemplazadas todas las queries cliente por Admin SDK
   - Eliminado import de `dbClient`
   - Agregado import de `getAdminFirestore`

3. **lib/firebase.ts** (MODIFICADO)
   - Corregido warning de `enableIndexedDbPersistence`
   - Usando método recomendado `enableMultiTabIndexedDbPersistence`

4. **package.json** (MODIFICADO)
   - Añadida dependencia `firebase-admin`

## Variables de Entorno Necesarias

### Cliente (existentes)
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID

### Servidor (opcional para producción)
- FIREBASE_SERVICE_ACCOUNT_KEY (JSON string del service account)

Si no se provee FIREBASE_SERVICE_ACCOUNT_KEY, Firebase Admin usará:
- Application Default Credentials en GCP
- Credenciales del proyecto detectadas automáticamente

## Resultado

✅ Sin errores `__FIREBASE_DEFAULTS__`  
✅ Sin warnings de persistencia deprecated  
✅ Separación limpia cliente/servidor  
✅ firebase-admin funciona correctamente en API routes  
✅ Login y dashboard funcionan sin errores  
✅ Admin panel puede hacer queries cross-tenant desde el servidor

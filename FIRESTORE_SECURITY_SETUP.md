# Guía de Configuración de Firestore Security Rules

## 1. Desplegar Security Rules

### Opción A: Firebase Console (Recomendado para primera vez)

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Seleccionar proyecto Lynara AI
3. Ir a **Firestore Database** > **Rules**
4. Copiar el contenido de `firestore.rules`
5. Hacer clic en **Publish**

### Opción B: Firebase CLI

\`\`\`bash
# Instalar Firebase CLI si no está instalado
npm install -g firebase-tools

# Login
firebase login

# Inicializar proyecto (solo primera vez)
firebase init firestore

# Desplegar rules
firebase deploy --only firestore:rules
\`\`\`

## 2. Crear Indexes

### Opción A: Firebase Console

1. Ir a **Firestore Database** > **Indexes**
2. Hacer clic en **Create Index**
3. Configurar cada index del archivo `firestore.indexes.json`

### Opción B: Firebase CLI

\`\`\`bash
# Desplegar indexes automáticamente
firebase deploy --only firestore:indexes
\`\`\`

## 3. Verificar Security Rules

### Test con Firebase Emulator

\`\`\`bash
# Instalar emulator
firebase init emulators

# Iniciar emulator
firebase emulators:start --only firestore

# Correr tests
npm run test:firestore
\`\`\`

### Test Manual en Console

1. Ir a **Firestore Database** > **Rules Playground**
2. Simular operaciones:
   - **Read**: `get /EMPRESAS/{companyId}/usuarios/{userId}`
   - **Write**: `set /EMPRESAS/{companyId}/usuarios/{userId}`
3. Verificar permisos correctos

## 4. Security Rules Explicadas

### Jerarquía de Permisos

\`\`\`
EMPRESAS/{companyId}
├── read: Usuario autenticado y verificado del tenant
├── update: Solo owner de la empresa
├── create: Usuario autenticado (durante registro)
└── delete: Solo owner

    ├── usuarios/{userId}
    │   ├── read: Usuarios del tenant
    │   ├── update: Propio usuario o admin
    │   ├── create: Durante registro o admin
    │   └── delete: Admin o owner
    │
    ├── datos_operativos/{docId}
    │   └── read/write: Usuarios del tenant
    │
    └── logs_*/{logId}
        ├── read: Usuarios del tenant o admin
        └── write: FALSE (solo server-side)
\`\`\`

### Helper Functions

- `isSignedIn()`: Usuario tiene token de autenticación
- `isEmailVerified()`: Email del usuario está verificado
- `belongsToCompany(companyId)`: Usuario pertenece al tenant
- `isAdmin(companyId)`: Usuario tiene rol admin en el tenant
- `isOwner(companyId)`: Usuario es el owner de la empresa

## 5. Logs Server-Side

Los logs tienen `write: false` para prevenir manipulación client-side.

Para escribir logs, usar Firebase Cloud Functions:

\`\`\`javascript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const logUserAction = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be signed in');
  }
  
  const { companyId, userId, action, metadata } = data;
  
  await admin.firestore()
    .collection('EMPRESAS').doc(companyId)
    .collection('logs_usuario').add({
      userId,
      action,
      metadata,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  
  return { success: true };
});
\`\`\`

## 6. Troubleshooting

### Error: "Missing or insufficient permissions"

**Causa**: Usuario no cumple con las security rules.

**Solución**:
1. Verificar que `user.emailVerified === true`
2. Verificar que existe documento en `EMPRESAS/{companyId}/usuarios/{userId}`
3. Verificar que `companyId` en localStorage es correcto

### Error: "Index required"

**Causa**: Query requiere un index compuesto.

**Solución**:
1. Copiar URL del error en console
2. Hacer clic en el link para crear index automáticamente
3. Esperar 2-5 minutos para que se construya

### Error: "Operation not allowed"

**Causa**: Operación explícitamente bloqueada en rules.

**Solución**:
1. Revisar función helper relevante (`isAdmin`, `isOwner`, etc.)
2. Verificar rol del usuario en Firestore
3. Verificar que email está verificado

## 7. Checklist de Deployment

- [ ] Rules desplegadas con `firebase deploy --only firestore:rules`
- [ ] Indexes creados con `firebase deploy --only firestore:indexes`
- [ ] Tests manuales en Rules Playground pasados
- [ ] Email verification obligatoria activada en app
- [ ] Logs migrados a Cloud Functions (opcional pero recomendado)
- [ ] Monitoring activado para detectar permission errors

---

**IMPORTANTE**: Después de desplegar las rules, testar exhaustivamente en staging antes de production.

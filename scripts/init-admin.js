const admin = require('firebase-admin');
const serviceAccount = require('../firebase/serviceAccountKey.json');

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function createSuperAdmin(email) {
  try {
    // Crear usuario admin si no existe
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (error) {
      userRecord = await admin.auth().createUser({
        email,
        password: 'ChangeMe123!', // Cambiar en primer inicio de sesión
      });
    }

    // Asignar claims de admin
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: true,
      superAdmin: true
    });

    // Crear documento de admin
    await db.collection('admins').doc(userRecord.uid).set({
      email,
      role: 'super_admin',
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      permissions: {
        users: {
          create: true,
          read: true,
          update: true,
          delete: true,
          manage: true
        },
        organizations: {
          create: true,
          read: true,
          update: true,
          delete: true,
          manage: true
        },
        ai: {
          configure: true,
          monitor: true,
          manage: true,
          assign: true
        },
        billing: {
          view: true,
          manage: true,
          configure: true
        },
        system: {
          configure: true,
          monitor: true,
          manage: true
        }
      }
    });

    console.log(`Super admin created successfully: ${email}`);
  } catch (error) {
    console.error('Error creating super admin:', error);
  }
}

// Uso: node init-admin.js <email>
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address');
  process.exit(1);
}

createSuperAdmin(email)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export const storageService = {
  async uploadImage(file: File): Promise<string> {
    try {
      // Crear una referencia única para el archivo
      const fileName = `${uuidv4()}_${file.name}`;
      const storageRef = ref(storage, `images/${fileName}`);

      // Subir el archivo
      const snapshot = await uploadBytes(storageRef, file);

      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw new Error('Error al subir la imagen');
    }
  }
};

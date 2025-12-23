// IndexedDB utility for storing gallery images
const DB_NAME = 'GalleryDB';
const STORE_NAME = 'images';
const DB_VERSION = 1;

export interface StoredImage {
  id: string;
  url: string;
  title: string;
}

// Initialize the database
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

// Save images to IndexedDB
export const saveImages = async (images: StoredImage[]): Promise<void> => {
  const db = await initDB();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  // Clear existing data
  await new Promise<void>((resolve, reject) => {
    const clearRequest = store.clear();
    clearRequest.onsuccess = () => resolve();
    clearRequest.onerror = () => reject(clearRequest.error);
  });

  // Add all images
  for (const image of images) {
    await new Promise<void>((resolve, reject) => {
      const addRequest = store.add(image);
      addRequest.onsuccess = () => resolve();
      addRequest.onerror = () => reject(addRequest.error);
    });
  }

  db.close();
};

// Load images from IndexedDB
export const loadImages = async (): Promise<StoredImage[]> => {
  const db = await initDB();
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Get total storage size
export const getStorageSize = async (): Promise<number> => {
  const images = await loadImages();
  const data = JSON.stringify(images);
  return new Blob([data]).size;
};

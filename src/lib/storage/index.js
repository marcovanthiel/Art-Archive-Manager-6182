class StorageService {
  constructor() {
    this.dbName = 'artArchiveDB';
    this.dbVersion = 1;
    this.db = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized && this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error('Failed to open database:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.initialized = true;
        console.log('Database opened successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        console.log('Creating/upgrading files store');
        
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  async storeFile(file) {
    if (!this.initialized) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const transaction = this.db.transaction(['files'], 'readwrite');
          const store = transaction.objectStore('files');

          const fileData = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result,
            timestamp: new Date().toISOString()
          };

          const request = store.add(fileData);

          request.onsuccess = () => {
            resolve({
              id: request.result,
              name: file.name,
              url: URL.createObjectURL(file)
            });
          };

          request.onerror = () => {
            console.error('Error storing file:', request.error);
            reject(request.error);
          };
        } catch (error) {
          console.error('Transaction error:', error);
          reject(error);
        }
      };

      reader.onerror = () => {
        console.error('Error reading file:', reader.error);
        reject(reader.error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  async getFile(id) {
    if (!this.initialized) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');
      const request = store.get(id);

      request.onsuccess = () => {
        const file = request.result;
        if (file) {
          resolve(new Blob([file.data], { type: file.type }));
        } else {
          reject(new Error('File not found'));
        }
      };

      request.onerror = () => {
        console.error('Error retrieving file:', request.error);
        reject(request.error);
      };
    });
  }

  async deleteFile(id) {
    if (!this.initialized) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error('Error deleting file:', request.error);
        reject(request.error);
      };
    });
  }
}

export const storage = new StorageService();
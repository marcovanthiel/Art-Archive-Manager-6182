class IndexedDBService {
  constructor() {
    this.dbName = 'artArchiveDB';
    this.version = 1;
    this.db = null;
    this.isConnecting = false;
  }

  async initializeStores = async () => {
    try {
      // Add some sample artists
      const artists = [
        { name: 'Vincent van Gogh', location: 'Netherlands' },
        { name: 'Pablo Picasso', location: 'Spain' },
        { name: 'Claude Monet', location: 'France' }
      ];
      
      // Add some sample locations
      const locations = [
        { name: 'Main Gallery', address: '123 Art Street', type: 'gallery' },
        { name: 'Secure Storage', address: '456 Safe Road', type: 'storage' },
        { name: 'Modern Museum', address: '789 Museum Lane', type: 'museum' }
      ];

      // Check if stores are empty before adding sample data
      const existingArtists = await this.getAll('artists');
      const existingLocations = await this.getAll('locations');

      if (existingArtists.length === 0) {
        for (const artist of artists) {
          await this.add('artists', artist);
        }
      }

      if (existingLocations.length === 0) {
        for (const location of locations) {
          await this.add('locations', location);
        }
      }
    } catch (error) {
      console.error('Error initializing stores:', error);
    }
  }

  async connect() {
    if (this.db) return this.db;
    
    if (this.isConnecting) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.connect();
    }

    this.isConnecting = true;

    try {
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = () => {
          console.error('Database error:', request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;

          // Create stores if they don't exist
          ['artists', 'locations', 'artworks', 'files'].forEach(storeName => {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
          });
        };
      });

      this.db = db;
      
      // Initialize stores with sample data
      await this.initializeStores();
      
      return db;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  async getAll(storeName) {
    await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get(storeName, id) {
    await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async add(storeName, data) {
    await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async update(storeName, id, data) {
    await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put({ ...data, id });

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, id) {
    await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clear(storeName) {
    await this.connect();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new IndexedDBService();
import { useState, useCallback } from 'react';
import { db } from '../storage/IndexedDBService';

export function useDataStore(storeName) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await db.getAll(storeName);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [storeName]);

  const addItem = useCallback(async (data) => {
    try {
      const id = await db.add(storeName, data);
      const newItem = await db.get(storeName, id);
      setItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [storeName]);

  const updateItem = useCallback(async (id, data) => {
    try {
      await db.update(storeName, id, data);
      const updatedItem = await db.get(storeName, id);
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [storeName]);

  const deleteItem = useCallback(async (id) => {
    try {
      await db.delete(storeName, id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [storeName]);

  return {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem
  };
}
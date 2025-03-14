import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useDataStore } from '../hooks/useDataStore';
import { db } from '../storage/IndexedDBService';

describe('useDataStore', () => {
  beforeEach(async () => {
    await db.connect();
    await db.clear('artworks');
  });

  it('should fetch items', async () => {
    const { result } = renderHook(() => useDataStore('artworks'));
    
    await act(async () => {
      await result.current.fetchItems();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('should add items', async () => {
    const { result } = renderHook(() => useDataStore('artworks'));
    const testItem = { title: 'Test Artwork' };

    await act(async () => {
      await result.current.addItem(testItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].title).toBe('Test Artwork');
  });

  it('should update items', async () => {
    const { result } = renderHook(() => useDataStore('artworks'));
    let itemId;

    await act(async () => {
      const item = await result.current.addItem({ title: 'Original Title' });
      itemId = item.id;
    });

    await act(async () => {
      await result.current.updateItem(itemId, { title: 'Updated Title' });
    });

    expect(result.current.items[0].title).toBe('Updated Title');
  });

  it('should delete items', async () => {
    const { result } = renderHook(() => useDataStore('artworks'));
    let itemId;

    await act(async () => {
      const item = await result.current.addItem({ title: 'Test Artwork' });
      itemId = item.id;
    });

    await act(async () => {
      await result.current.deleteItem(itemId);
    });

    expect(result.current.items).toHaveLength(0);
  });
});
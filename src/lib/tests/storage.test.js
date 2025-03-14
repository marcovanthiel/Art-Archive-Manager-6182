import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../storage';

describe('Storage Service', () => {
  beforeEach(async () => {
    await storage.init();
  });

  it('should store and retrieve files', async () => {
    const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    
    const storedFile = await storage.storeFile(testFile);
    expect(storedFile.id).toBeTruthy();
    expect(storedFile.name).toBe('test.txt');
    
    const retrievedFile = await storage.getFile(storedFile.id);
    expect(retrievedFile).toBeInstanceOf(Blob);
    expect(retrievedFile.type).toBe('text/plain');
  });

  it('should delete files', async () => {
    const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const storedFile = await storage.storeFile(testFile);
    
    await storage.deleteFile(storedFile.id);
    
    await expect(storage.getFile(storedFile.id)).rejects.toThrow('File not found');
  });
});
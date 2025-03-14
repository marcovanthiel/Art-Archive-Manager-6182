import { useState, useCallback } from 'react';
import { storage } from '../storage';

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const upload = useCallback(async (files) => {
    try {
      setIsUploading(true);
      setError(null);
      
      const results = [];
      const total = files.length;
      
      for (let i = 0; i < total; i++) {
        const file = files[i];
        const result = await storage.storeFile(file);
        results.push(result);
        setProgress(((i + 1) / total) * 100);
      }
      
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }, []);

  return {
    upload,
    isUploading,
    progress,
    error
  };
}
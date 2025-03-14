import { useRef } from 'react';
import { RiUploadLine, RiCloseLine } from 'react-icons/ri';
import { useFileUpload } from '../../lib/hooks/useFileUpload';
import LoadingSpinner from './LoadingSpinner';

export default function FileUpload({
  accept,
  multiple = false,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB
  onUpload,
  onError
}) {
  const fileInput = useRef(null);
  const { upload, isUploading, progress, error } = useFileUpload();

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    
    // Validate file count
    if (files.length > maxFiles) {
      onError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file size
    const oversizedFiles = files.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      onError?.(`Some files exceed the maximum size of ${maxSize / 1024 / 1024}MB`);
      return;
    }

    try {
      const results = await upload(files);
      onUpload?.(results);
    } catch (err) {
      onError?.(err.message);
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInput}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        disabled={isUploading}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors"
      >
        {isUploading ? (
          <div className="text-center">
            <LoadingSpinner size="sm" />
            <p className="mt-2 text-sm text-gray-500">
              Uploading... {Math.round(progress)}%
            </p>
          </div>
        ) : (
          <div className="text-center">
            <RiUploadLine className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Click to upload or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {multiple ? `Up to ${maxFiles} files` : 'Single file'} (max {maxSize / 1024 / 1024}MB each)
            </p>
          </div>
        )}
      </button>

      {error && (
        <div className="mt-2 text-sm text-red-500 flex items-center">
          <RiCloseLine className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}
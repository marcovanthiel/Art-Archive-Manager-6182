import { RiDownload2Line, RiUploadLine } from 'react-icons/ri';

export default function BackupRestore() {
  const handleBackup = () => {
    // Implement backup logic
  };

  const handleRestore = (e) => {
    // Implement restore logic
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Backup & Restore</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Create Backup</h3>
          <p className="text-sm text-gray-500 mb-4">
            Download a complete backup of your art collection database
          </p>
          <button
            onClick={handleBackup}
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center justify-center"
          >
            <RiDownload2Line className="mr-2" />
            Download Backup
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Restore Backup</h3>
          <p className="text-sm text-gray-500 mb-4">
            Restore your database from a previous backup file
          </p>
          <label className="w-full bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark flex items-center justify-center cursor-pointer">
            <RiUploadLine className="mr-2" />
            Upload Backup File
            <input
              type="file"
              accept=".sql,.json"
              className="hidden"
              onChange={handleRestore}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
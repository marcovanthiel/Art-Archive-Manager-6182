import { useState } from 'react';

export default function ReportFilter({ onApply }) {
  const [selectedFields, setSelectedFields] = useState({
    title: true,
    artist: true,
    location: true,
    value: true,
    date: true
  });

  const fields = [
    { id: 'title', label: 'Title' },
    { id: 'artist', label: 'Artist' },
    { id: 'location', label: 'Location' },
    { id: 'value', label: 'Value' },
    { id: 'date', label: 'Date' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'type', label: 'Type' },
    { id: 'status', label: 'Status' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-gray-900 mb-3">Report Fields</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {fields.map(field => (
          <label key={field.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedFields[field.id]}
              onChange={(e) => {
                setSelectedFields({
                  ...selectedFields,
                  [field.id]: e.target.checked
                });
              }}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onApply(selectedFields)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
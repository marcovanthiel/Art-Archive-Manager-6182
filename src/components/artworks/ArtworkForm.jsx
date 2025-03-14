// Update the state and handlers in ArtworkForm.jsx
const [showArtistDialog, setShowArtistDialog] = useState(false);
const [showLocationDialog, setShowLocationDialog] = useState(false);
const [artists, setArtists] = useState([]);
const [locations, setLocations] = useState([]);

// Add this useEffect to load data
useEffect(() => {
  const loadData = async () => {
    try {
      const artistsData = await db.getAll('artists');
      const locationsData = await db.getAll('locations');
      setArtists(artistsData);
      setLocations(locationsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };
  loadData();
}, []);

// Add these handlers
const handleArtistSave = async () => {
  const artistsData = await db.getAll('artists');
  setArtists(artistsData);
};

const handleLocationSave = async () => {
  const locationsData = await db.getAll('locations');
  setLocations(locationsData);
};

// In the JSX, update the dialog buttons and add the dialogs
<button
  type="button"
  onClick={() => setShowArtistDialog(true)}
  className="mt-7 px-3 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
>
  <RiAddLine />
</button>

<button
  type="button"
  onClick={() => setShowLocationDialog(true)}
  className="mt-7 px-3 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark"
>
  <RiAddLine />
</button>

{showArtistDialog && (
  <ArtistDialog
    onClose={() => setShowArtistDialog(false)}
    onSave={handleArtistSave}
  />
)}

{showLocationDialog && (
  <LocationDialog
    onClose={() => setShowLocationDialog(false)}
    onSave={handleLocationSave}
  />
)}
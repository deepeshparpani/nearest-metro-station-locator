import { useState } from 'react';

export default function SearchBox({ onLocationSelected }) {
  const [input, setInput] = useState('');

  const handleSearch = async () => {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(input)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
    const data = await res.json();
    if (data.results[0]) {
      const location = data.results[0].geometry.location;
      onLocationSelected({ lat: location.lat, lng: location.lng });
    } else {
      alert('Location not found');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter place (e.g. Hitech City)"
        className="border p-2 rounded w-full"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 rounded">Search</button>
    </div>
  );
}

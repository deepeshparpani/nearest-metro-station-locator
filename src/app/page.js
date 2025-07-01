'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchBox from './components/SearchBox';
import findNearestStation from './utils/findNearest';

const Map = dynamic(() => import('./components/Map'), { ssr: false });

export default function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearest, setNearest] = useState(null);

  const handleSearch = async (coords) => {
    setUserLocation(coords);
    const res = await fetch('/data/metro-stations.json');
    const stations = await res.json();
    const nearestStation = findNearestStation(coords, stations);
    setNearest(nearestStation);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🚇 Metro Station Locator</h1>
      <SearchBox onLocationSelected={handleSearch} />
      <Map userLocation={userLocation} nearest={nearest} />
    </div>
  );
}

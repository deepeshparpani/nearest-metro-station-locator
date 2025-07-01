import { GoogleMap, Marker, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const containerStyle = {
  height: '500px',
  width: '100%'
};

const Map = ({ userLocation, nearest }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

 const [drivingDirections, setDrivingDirections] = useState(null);
  const [walkingDirections, setWalkingDirections] = useState(null);

  useEffect(() => {
    if (userLocation && nearest) {
      const directionsService = new window.google.maps.DirectionsService();

      // Driving
      directionsService.route(
        {
          origin: userLocation,
          destination: { lat: nearest.lat, lng: nearest.lng },
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDrivingDirections(result);
          } else {
            console.error(`Error fetching driving directions: ${result}`);
          }
        }
      );

      // Walking
      directionsService.route(
        {
          origin: userLocation,
          destination: { lat: nearest.lat, lng: nearest.lng },
          travelMode: window.google.maps.TravelMode.WALKING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setWalkingDirections(result);
          } else {
            console.error(`Error fetching walking directions: ${result}`);
          }
        }
      );
    }
  }, [userLocation, nearest]);

  if (!isLoaded) return <div>Loading map...</div>;

  const getDistanceInfo = (directions) => {
    if (!directions) return 'N/A';
    const leg = directions.routes[0].legs[0];
    return `${leg.distance.text} (${leg.duration.text})`;
  };

  return (
    <div>
      <GoogleMap
        zoom={14}
        center={userLocation || { lat: 17.4375, lng: 78.4483 }}
        mapContainerStyle={containerStyle}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true
        }}
      >
        {userLocation && <Marker position={userLocation} label="You" />}
        {nearest && <Marker position={{ lat: nearest.lat, lng: nearest.lng }} label={nearest.name} />}
        {drivingDirections && <DirectionsRenderer directions={drivingDirections} options={{ suppressMarkers: true }} />}
      </GoogleMap>
      <div className="mt-4 text-sm">
        <p><strong>Nearest Metro Station:</strong> {nearest?.name}</p>
        <p><strong>Driving:</strong> {getDistanceInfo(drivingDirections)}</p>
        <p><strong>Walking:</strong> {getDistanceInfo(walkingDirections)}</p>
      </div>
    </div>
  );
};

export default Map;

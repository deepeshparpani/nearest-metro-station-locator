import { distance } from '@turf/turf';

export default function findNearestStation(userCoords, stations) {
  let nearest = null;
  let minDist = Infinity;

  stations.forEach((station) => {
    const dist = distance(
      [userCoords.lng, userCoords.lat],
      [station.lng, station.lat],
      { units: 'kilometers' }
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = station;
    } 
  });

  return nearest;
}

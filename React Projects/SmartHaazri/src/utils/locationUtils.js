export const getDistance = (coords1, coords2) => {
    const R = 6371e3;
    const lat1 = (coords1.latitude * Math.PI) / 180;
    const lat2 = (coords2.latitude * Math.PI) / 180;
    const deltaLat = lat2 - lat1;
    const deltaLon = ((coords2.longitude - coords1.longitude) * Math.PI) / 180;
    
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
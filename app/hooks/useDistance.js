const degToRad = deg => {
  return deg * (Math.PI / 180);
};

const useDistance = () => {
  const getDistance = (position1, position2) => {
    try {
      const rayonTerre = 6371000; // Rayon de la Terre en mètres

      // Conversion des degrés en radians
      const lat1Rad = degToRad(position1.latitude);
      const lon1Rad = degToRad(position1.longitude);
      const lat2Rad = degToRad(position2.latitude);
      const lon2Rad = degToRad(position2.longitude);

      // Différence de latitude et de longitude
      const diffLat = lat2Rad - lat1Rad;
      const diffLon = lon2Rad - lon1Rad;

      // Calcul de la distance en utilisant la formule de la distance haversine
      const a =
        Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
        Math.cos(lat1Rad) *
          Math.cos(lat2Rad) *
          Math.sin(diffLon / 2) *
          Math.sin(diffLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const finaldistance = rayonTerre * c;
      return finaldistance;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return getDistance;
};

export default useDistance;

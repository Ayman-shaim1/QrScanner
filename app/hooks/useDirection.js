import axios from "axios";
import settings from "../config/settings";

const useDirection = () => {
  const getDirection = async (position1, position2) => {
    try {
      const apiUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${settings.openRouteApiKey}&start=${position1.longitude},${position1.latitude}&end=${position2.longitude},${position2.latitude}`;
      const { data } = await axios.get(apiUrl);
      return data.features[0].geometry.coordinates;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return getDirection;
};

export default useDirection;

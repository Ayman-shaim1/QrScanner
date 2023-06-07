import axios from "axios";
import Alert from "./Alert";
import settings from "../config/settings";

const degToRad = deg => {
  return deg * (Math.PI / 180);
};

class Map {
  constructor() {}

  static getDistance = (position1, position2) => {
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
      Alert.open({
        type: "danger",
        title: "Distance Error",
        message: error,
      });
    }
    return -1;
  };
  static getDirection = async (position1, position2, type = "driving-car") => {
    try {
      const apiUrl = `https://api.openrouteservice.org/v2/directions/${type}?api_key=${settings.openRouteApiKey}&start=${position1.longitude},${position1.latitude}&end=${position2.longitude},${position2.latitude}`;
      const { data } = await axios.get(apiUrl);
      const coordinates = data.features[0].geometry.coordinates;
      const ncoordinates = [];
      for (let coords of coordinates) {
        ncoordinates.push({
          latitude: coords[1],
          longitude: coords[0],
        });
      }
      return ncoordinates;
    } catch (error) {
      Alert.open({
        type: "danger",
        title: "Direction Error",
        message: error,
      });
    }
  };

  static getAddress = async (latitude, longitude) => {
    const apiUrl = `https://api.openrouteservice.org/geocode/reverse?api_key=${settings.openRouteApiKey}&point.lon=${longitude}&point.lat=${latitude}`;
    try {
      const { data } = await axios.get(apiUrl);
      if (data.features.length > 0) {
        const address = data.features[0].properties.label;
        return address;
      }
      return null;
    } catch (error) {
      Alert.open({
        type: "danger",
        title: "Address Error",
        message: error,
      });
    }
  };

  static getNrStCoords = async (position, categoryName) => {
    try {
      const url = "https://api.openrouteservice.org/pois";
      const bodyData = {
        request: "pois",
        geometry: {
          geojson: {
            type: "Point",
            coordinates: [position.longitude, position.latitude],
          },
          buffer: 2000,
        },
      };

      const { data } = await axios.post(url, bodyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: settings.openRouteApiKey,
        },
      });
      const nearestStations = data.features.filter(feature => {
        const category_name = Object.values(feature.properties.category_ids)[0]
          .category_name;
        return category_name === categoryName;
      });

      nearestStations.sort((a, b) => {
        const distanceA = a.properties.distance;
        const distanceB = b.properties.distance;
        return distanceA - distanceB;
      });

      if (nearestStations.length > 0) {
        const nearestStation = nearestStations[0];
        const nearestStationCoordinates = nearestStation.geometry.coordinates;

        return {
          latitude: nearestStationCoordinates[1],
          longitude: nearestStationCoordinates[0],
        };
      }
      return null;
    } catch (error) {
      Alert.open({
        type: "danger",
        title: "Address Error",
        message: error,
      });
    }
  };
}

export default Map;

import Constants from "expo-constants";

const settings = {
  dev: {
    openRouteApiKey: "5b3ce3597851110001cf62487457825666a7441fbf7b9ac578303d3b",
  },
  staging: {
    openRouteApiKey: "5b3ce3597851110001cf62487457825666a7441fbf7b9ac578303d3b",
  },
  prod: {
    openRouteApiKey: "5b3ce3597851110001cf62487457825666a7441fbf7b9ac578303d3b",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();

import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Card from "./Card";
import { TouchableOpacity } from "react-native-gesture-handler";
import Text from "./Text";
import colors from "../config/colors";
import MiniMap from "./MiniMap";
const trans = {
  taxi: require("../assets/images/taxi.png"),
  tram: require("../assets/images/tram.png"),
  bus: require("../assets/images/bus.png"),
};
export default function LastTrip({ trip, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("TripDetails", { trip })}>
      <Card style={styles.container}>
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <Text as={"header5"}>
            Trip on{" "}
            {trip &&
              trip.createdAt &&
              trip.createdAt.toDate().toLocaleDateString()}{" "}
            using {trip.code}{" "}
          </Text>
          <Text as={"header6"} color={"darkGray"}>
            Start from {trip && trip.startAddress} to {trip && trip.endAddress}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View style={styles.imageContainer}>
            <Image source={trans[trip.code]} style={styles.image} />
          </View>
          <MiniMap coords={trip.directions} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginBottom: 14 },
  qr: { width: 80, height: 80 },
  imageContainer: {
    backgroundColor: colors.light,
    position: "relative",
    width: 90,
    height: 90,
  },
  image: {
    // position: "absolute",
    height: 60,
    width: 100,
    zIndex: 100,
    transform: [{ translateX: 12 }, { translateY: 14 }],
  },
});

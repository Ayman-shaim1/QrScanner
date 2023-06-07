import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Card from "./Card";
import MiniMap from "./MiniMap";
import Text from "./Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function TripItem({ trip, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("TripDetails", { trip })}>
      <Card style={styles.container}>
        <MiniMap coords={trip.directions} />
        <View>
          <Text>
            Trip on{" "}
            {trip &&
              trip.createdAt &&
              trip.createdAt.toDate().toLocaleDateString()}{" "}
            using {trip.code}
          </Text>

          <Text color={"gray"}>
            Start from {trip && trip.startAddress} to {trip.endAddress}
          </Text>
          <MaterialCommunityIcons
            name='arrow-right'
            size={30}
            color={colors.primary}
            style={{ alignSelf: "flex-end", marginTop: 20, marginLeft: 5 }}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

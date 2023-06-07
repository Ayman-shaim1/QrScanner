import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { Divider, Text } from "./index";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TransportType({ transport, onPress, loading }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading ? true : false}>
      <View style={[styles.container, { opacity: loading ? 0.8 : 1 }]}>
        <View style={styles.imageContainer}>
          <Image source={transport.image} style={styles.image} />
        </View>
        <View style={styles.info}>
          <Text as='header6' style={styles.name}>
            {transport.name}
          </Text>
          <Text as='header6' style={styles.price}>
            {transport.price && `${Math.trunc(transport.price)} DH`}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <MaterialCommunityIcons
            name='arrow-right'
            size={20}
            color={colors.primary}
          />
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <Divider />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 12,
  },
  dividerContainer: {
    marginBottom: "5%",
    paddingHorizontal: "15%",
  },
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
  info: {
    marginLeft: 40,
  },
  price: {
    color: colors.gray,
  },
  arrowContainer: {
    marginLeft: "14%",
  },
});

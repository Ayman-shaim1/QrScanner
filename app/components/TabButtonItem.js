import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import colors from "../config/colors";

import { Ionicons } from "@expo/vector-icons";
export default function TabButtonItem({ navigation, icon, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.tabButton,
        {
          backgroundColor: navigation.isFocused()
            ? colors.darkGray
            : "transparent",
        },
      ]}
      onPress={onPress}>
      <Ionicons
        name={icon}
        size={24}
        color={navigation.isFocused() ? colors.white : colors.gray}
      />
      {navigation.isFocused() && (
        <>
          <View style={styles.trinagle}></View>
          <View style={styles.stick}></View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    width: 60,
    height: 60,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  stick: {
    width: 10,
    height: 20,
    backgroundColor: colors.darkGray,
    position: "absolute",
    top: "90%",
    left: "42%",
    zIndex: 10,
  },
  trinagle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderLeftWidth: 15 / 2,
    borderRightWidth: 15 / 2,
    borderTopColor: colors.darkGray,
    position: "absolute",
    top: "97%",
    zIndex: 5,
  },
});

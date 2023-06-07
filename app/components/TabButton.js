import { StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function TabButton({ navigation, icon, onPress }) {
  return (
    <TouchableOpacity
      style={navigation.isFocused() ? styles.activeTabButton : styles.tabButton}
      onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={navigation.isFocused() ? colors.white : colors.gray}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    backgroundColor: colors.darkGray,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  activeTabButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
});

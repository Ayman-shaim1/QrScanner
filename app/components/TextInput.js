import { StyleSheet, View, TextInput as RNTextInput, Text } from "react-native";
import React from "react";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TextInput({ icon, label, style, ...otherProps }) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <RNTextInput
        placeholderTextColor='#adb5bd'
        {...otherProps}
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    color: "#55595c",
    alignItems: "center",
    marginVertical: 18,
    borderColor: "lightgray",
    borderWidth: 1,
    position: "relative",
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  icon: {
    marginLeft: 25,
  },
  textInput: {
    width: "100%",
    height: "100%",
    paddingVertical: 25,
    paddingHorizontal: 30,
    fontSize: 15,
    fontWeight: "bold",
  },
  label: {
    position: "absolute",
    backgroundColor: colors.white,
    padding: 5,
    top: "-20%",
    left: "5%",
  },
});

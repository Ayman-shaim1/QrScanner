import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Button({
  onPress,
  text,
  variant = "primary",
  iconStart,
  iconEnd,
  style,
  disabled,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: colors[variant],

          borderWidth: variant !== "white" ? 0 : 1,
          ...style,
        },
        disabled ? styles.disabledButton : null,
      ]}>
      {iconStart && <Image source={iconStart} style={styles.icon} />}
      <Text
        style={[
          styles.text,
          {
            color:
              variant === "white" || variant === "third"
                ? colors.secondary
                : colors.white,
          },
        ]}>
        {text}
      </Text>
      {iconEnd && (
        <MaterialCommunityIcons name={iconEnd} size={20} color={colors.white} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 33,
    borderColor: colors.third,
    margin: 2,
  },
  disabledButton: {
    backgroundColor: colors.gray,
  },
  text: {
    textAlign: "center",
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

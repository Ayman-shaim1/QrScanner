import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function Divider({ withOr, margin }) {
  return (
    <View style={[styles.divider, { marginVertical: margin }]}>
      {withOr && <Text style={styles.orText}>Or</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
    position: "relative",
    alignItems: "center",
  },
  orText: {
    position: "absolute",
    bottom: -8,
    backgroundColor: colors.white,
    width: 50,
    textAlign: "center",
    fontSize: 17,
    color: colors.dark,
    fontWeight: "bold",
  },
});

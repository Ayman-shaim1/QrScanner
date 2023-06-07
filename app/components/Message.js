import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function Message({ text }) {
  return (
    <View style={styles.message}>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    backgroundColor: "#f7dddc",
    borderColor: "#f4cbca",
    borderWidth: 2,
    borderRadius: 4,
    padding: 20,
  },
  messageText: {
    color: "#82322f",
  },
});

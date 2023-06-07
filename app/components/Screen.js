import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import globalStyles from "../config/styles";
import Alert from "./Alert";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Screen({ children, style, withPadding = false }) {
  return (
    <GestureHandlerRootView
      style={[
        styles.screen,
        style,
        {
          paddingTop: withPadding ? Constants.statusBarHeight : 0,
          paddingHorizontal: withPadding ? globalStyles.paddingHorizontal : 0,
        },
      ]}>
      <Alert />
      <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
      <StatusBar />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: "100%",
  },
});

export default Screen;

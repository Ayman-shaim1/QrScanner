import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../config/colors";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Alert as SRVAlert } from "../services";

const icons = {
  warning: <AntDesign name='exclamation' size={28} color={colors.primary} />,
  success: <FontAwesome5 name='check' size={28} color={colors.primary} />,
  danger: <FontAwesome5 name='times' size={28} color={colors.primary} />,
};

export default function Alert() {
  const alert = useSelector(state => state.alert);
  const { title, message, type, show } = alert;
  console.log();
  if (show) {
    return (
      <>
        <View style={styles.alertOverlay}></View>
        <View style={styles.alert}>
          <TouchableOpacity
            style={styles.alertBtnClose}
            onPress={() => SRVAlert.close()}>
            <MaterialCommunityIcons
              name='close'
              color={colors.danger}
              size={15}
            />
          </TouchableOpacity>
          <View style={styles.alertIconContainer}>
            <View style={styles.alertIconCircle}>
              <View style={styles.alertIcon}>{type && icons[type]}</View>
            </View>
          </View>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{String(message).toString()}</Text>
        </View>
      </>
    );
  }

  return <></>;
}

const styles = StyleSheet.create({
  alertOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 9998,
  },
  alert: {
    width: 280,
    height: 280,
    top: "30%",
    borderRadius: 30,
    // paddingVertical: 12,
    paddingHorizontal: 10,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colors.white,
    zIndex: 9999,
    paddingTop: 10,
  },
  alertBtnClose: {
    alignSelf: "flex-end",
    borderColor: colors.light,
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  alertIconContainer: {
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  alertIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  alertIcon: {},
  alertTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  alertMessage: {
    fontSize: 14,
    marginvertical: 12,
    color: colors.darkGray,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RNDatePicker from "react-native-datepicker";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DateInput({
  icon,
  label,
  style,
  selectedDate = new Date().toLocaleDateString(),
  onDateChange,
  ...otherProps
}) {
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
      <RNDatePicker
        {...otherProps}
        style={styles.dateInput}
        date={selectedDate}
        mode='date'
        placeholder='select date ...'
        format='YYYY-MM-DD'
        minDate={new Date()}
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        showIcon={false}
        customStyles={{
          placeholderText: {
            fontWeight: "bold",
            fontSize: 15,
            alignSelf: "flex-start",
          },
          dateText: {
            fontWeight: "bold",
            fontSize: 15,
            alignSelf: "flex-start",
          },
          dateInput: {
            borderWidth: 0,
          },
        }}
        onDateChange={onDateChange}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flexDirection: "row",
    color: "#55595c",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
    marginVertical: 20,
    borderColor: "lightgray",
    borderWidth: 1,
    position: "relative",
    backgroundColor: colors.white,
  },
  icon: {
    marginRight: 10,
  },
  dateInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  label: {
    position: "absolute",
    backgroundColor: colors.white,
    padding: 5,
    top: "-30%",
    left: "5%",
  },
});

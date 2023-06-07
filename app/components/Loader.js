import { ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function Loader() {
  return <ActivityIndicator color={colors.primary} size='large' />;
}

const styles = StyleSheet.create({});

// .loader {
//     border: 16px solid #f3f3f3; /* Light grey */
//     border-top: 16px solid #3498db; /* Blue */
//     border-radius: 50%;
//     width: 120px;
//     height: 120px;
//     animation: spin 2s linear infinite;
//   }

//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }

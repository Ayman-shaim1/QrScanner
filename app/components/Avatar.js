import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const SIZES = {
  sm: { width: 30, height: 30 },
  md: { width: 60, height: 60 },
  lg: { width: 100, height: 100 },
  xl: { width: 150, height: 150 },
};

export default function Avatar({ image, uri, size = "md" }) {
  if (uri)
    return (
      <Image
        source={{ uri: uri }}
        style={[styles.avatar, { ...SIZES[size] }]}
      />
    );
  if (image) return <Image source={image} style={[styles.avatar, {}]} />;
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 25,
  },
});

import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "../components";
import colors from "../config/colors";

export default function ScanQRCodeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate("SuccessMessage", { id: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <>
          <View
            style={{
              position: "absolute",
              top: "10%",
              zIndex: 1000,
              alignSelf: "center",
              backgroundColor: colors.secondary,
              padding: 14,
              borderRadius: 10,
            }}>
            <Text style={{ color: colors.white }}>Scan code QR</Text>
          </View>

          <View
            style={{
              position: "absolute",
              top: "20%",
              zIndex: 1000,
              alignSelf: "center",
              borderColor: colors.white,
              width: "85%",
              height: "50%",
              borderRadius: 20,
              borderWidth: 5,
            }}></View>

          <BarCodeScanner
            onBarCodeScanned={scanned ? null : handleBarCodeScanned}
            style={{ flex: 1, height: "100%" }}
          />
        </>
      )}

      {scanned && (
        <Button
          text={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
          style={{
            position: "absolute",
            bottom: "50%",
            width: "90%",
            alignSelf: "center",
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

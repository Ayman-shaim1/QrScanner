import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-community/picker";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "../components";
import { useLocation } from "../hooks";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { Alert, Map } from "../services";

export default function ChooseDirection({
  navigation,
  route,
  setPositions,
  closeModal,
  changeSeat,
}) {
  const [seat, setSeat] = useState(1);
  const [startAddress, setStartAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { location, error } = useLocation();

  const resetAddress = () => {
    if (location) {
      Map.getAddress(location.latitude, location.longitude).then(address => {
        setStartAddress(address);
      });
    }
  };

  useEffect(() => {
    if (location) {
      Map.getAddress(location.latitude, location.longitude).then(address => {
        setStartAddress(address);
      });
    }
    if (route.params && route.params.destination) {
      Map.getAddress(
        route.params.destination.latitude,
        route.params.destination.longitude
      ).then(address => {
        setDestinationAddress(address);
      });
    }

    if (startAddress && destinationAddress) {
      setDisabled(false);
    }

    if (error) {
      Alert.open({
        type: "danger",
        title: "location error",
        message: error,
      });
    }
  }, [location, route.params, startAddress, destinationAddress, error]);

  return (
    <View style={{ paddingTop: 40 }}>
      <View style={styles.center}>
        <Text as='header4'>New Destination </Text>
        <Text style={styles.subText}>Lorem ipsum dolor sit amet</Text>
        <Text style={styles.subText}>
          consectetur adipisicing elit. Ipsa, laboriosam?
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text as='header6'>Adresse</Text>
      </View>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder='Your adresse'
          style={{
            marginBottom: -20,
            paddingRight: 30,
          }}
          value={`${startAddress}`}
        />
        <TouchableOpacity style={styles.inputIcBtn} onPress={resetAddress}>
          <MaterialIcons name='my-location' color={colors.white} size={15} />
        </TouchableOpacity>
      </View>

      <TextInput
        value={
          route.params && route.params.destination && destinationAddress
            ? destinationAddress
            : ""
        }
        placeholder='Enter your destination'
        style={{ marginTop: 0 }}
        disabled
        onFocus={() => {
          navigation.navigate("SearchPosition");
          closeModal();
        }}
      />

      <View style={styles.inputContainer}>
        <Text as='header6'>Need seat</Text>
        <Picker
          selectedValue={seat}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            setSeat(itemValue);
            changeSeat(itemValue);
          }}>
          <Picker.Item label='1 places' value={1} />
          <Picker.Item label='2 places' value={2} />
          <Picker.Item label='3 places' value={3} />
          <Picker.Item label='4 places' value={4} />
          <Picker.Item label='5 places' value={5} />
        </Picker>
      </View>

      <Button
        variant='secondary'
        text='confirm'
        style={styles.btnConfirm}
        disabled={disabled}
        onPress={() => setPositions(location, route.params.destination)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  subText: { fontWeight: "bold", color: colors.gray },
  center: { alignItems: "center", justifyContent: "center" },
  inputContainer: {
    marginVertical: 11,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    width: 150,
  },
  btnConfirm: {
    marginTop: 20,
    // padding: 23,
  },
  inputIcBtn: {
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    bottom: "30%",
    left: "86%",
  },
});

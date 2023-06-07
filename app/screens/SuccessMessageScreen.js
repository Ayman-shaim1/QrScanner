import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Screen, Text } from "../components";
import { useEffect } from "react";
import { Trip } from "../models";
import { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
const trip = new Trip();
{
  /* <FontAwesome name='times-circle' size={150} color={colors.danger} /> */
}
export default function SuccessMessageScreen({ navigation, route }) {
  const { id } = route.params;
  const [tripData, setTripData] = useState(null);
  const [qrScanned, setQrScanner] = useState(false);
  const [callAction, setCallAction] = useState(false);
  const [alreadyPayed, setAlreadyPayed] = useState(false);
  const [payedConfrim, setPayedConfirm] = useState(false);

  const confirmPaimentHandler = async tripId => {
    const isPayed = await trip.updateConfirmPayment(tripId);
    if (isPayed) {
      setPayedConfirm(true);
    } else {
      setAlreadyPayed(true);
    }
  };

  useEffect(() => {
    if (!callAction) {
      trip.getTripById(id, data => {
        console.log(data);
        setTripData(data);
      });
      setCallAction(true);
    }
    if (!qrScanned) {
      confirmPaimentHandler(String(id));
      setQrScanner(true);
    }
  }, [trip, callAction, qrScanned]);
  return (
    <Screen>
      {!tripData ? (
        <View>
          <View style={{ alignItems: "center" }}>
            <FontAwesome name='times-circle' size={150} color={colors.danger} />
            {/* 
            <Ionicons
              name='ios-checkmark-circle-outline'
              size={150}
              color={colors.success}
            /> */}
          </View>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <Text as={"header4"} style={{ textAlign: "center" }}>
              Trip not found
            </Text>
          </View>
          <View style={{ alignItems: "center", marginBottom: 150 }}>
            <Text as={"header3"} style={{ textAlign: "center" }}>
              this qr code that you have scanned is not found !
            </Text>
          </View>
        </View>
      ) : alreadyPayed ? (
        <View>
          <View style={{ alignItems: "center" }}>
            <FontAwesome name='times-circle' size={150} color={colors.danger} />
            {/* 
              <Ionicons
                name='ios-checkmark-circle-outline'
                size={150}
                color={colors.success}
              /> */}
          </View>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <Text as={"header4"} style={{ textAlign: "center" }}>
              The confirmation of the paiment of this trip is alreay done
            </Text>
          </View>
          <View style={{ alignItems: "center", marginBottom: 150 }}>
            <Text as={"header3"} style={{ textAlign: "center" }}>
              this qr code is already be scanned and the trip paiment
              confirmation is already done
            </Text>
          </View>
        </View>
      ) : (
        payedConfrim && (
          <View>
            <View style={{ alignItems: "center" }}>
              {/* <FontAwesome
                name='times-circle'
                size={150}
                color={colors.danger}
              /> */}

              <Ionicons
                name='ios-checkmark-circle-outline'
                size={150}
                color={colors.success}
              />
            </View>
            <View style={{ alignItems: "center", marginBottom: 30 }}>
              <Text as={"header4"} style={{ textAlign: "center" }}>
                Paiment confirm successfully
              </Text>
            </View>
            <View style={{ alignItems: "center", marginBottom: 150 }}>
              <Text as={"header3"} style={{ textAlign: "center" }}>
                the confirmation of this paiment has been successfully done
              </Text>
            </View>
          </View>
        )
      )}

      <Button
        text={"go back"}
        variant='secondary'
        style={{ position: "absolute", bottom: "10%", width: "100%" }}
        onPress={() => navigation.goBack()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

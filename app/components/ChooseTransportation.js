import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "./index";
import TransportType from "./TransportType";
import { Alert, Map } from "../services";
import colors from "../config/colors";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

export default function ChooseTransportation({
  setTransportation,
  startPosition,
  endPosition,
  seat = 1,
}) {
  const [loading, setLoading] = useState(true);

  const [transportationsWay, setTransportationWay] = useState([
    {
      id: 1,
      image: require("../assets/images/taxi.png"),
      name: "Trip using Taxi",
      code: "taxi",
      pricePerMetre: 0.0064,
      score: 0,
    },
    {
      id: 2,
      image: require("../assets/images/tram.png"),
      name: "Trip using Tram",
      code: "tram",
      price: 7.0,
      score: 0,
    },
    {
      id: 3,
      image: require("../assets/images/bus.png"),
      name: "Trip using Bus",
      code: "bus",
      price: 5.0,
      score: 0,
    },
  ]);

  const calculeBestWaytoMaketrip = async () => {
    try {
      let scores = [
        {
          cat: "bus",
          score: 0,
        },
        {
          cat: "tram",
          score: 0,
        },
        {
          cat: "taxi",
          score: 0,
        },
      ];
      // retrieve distance between start & end pos :
      const distBetStEnd = Map.getDistance(startPosition, endPosition);

      if (distBetStEnd <= 3000) {
        scores.find(item => item.cat === "taxi").score =
          scores.find(item => item.cat === "taxi").score + 1;
      }

      // retrieve the closest bus stations for start & end position :
      const clBusStartPos = await Map.getNrStCoords(
        startPosition,
        "bus_station"
      );
      const clBusEndPos = await Map.getNrStCoords(endPosition, "bus_station");
      // get distances  :
      const distanceBusStartClos = Map.getDistance(
        startPosition,
        clBusStartPos
      );
      const distanceBusEndClose = Map.getDistance(endPosition, clBusEndPos);

      // inc score :
      if (distanceBusStartClos <= 1200 && distanceBusEndClose <= 1200) {
        scores.find(item => item.cat === "bus").score =
          scores.find(item => item.cat === "bus").score + 1;
      }
      // retrieve the closest tram stops for start & end position :
      const clTramStartPos = await Map.getNrStCoords(
        startPosition,
        "tram_stop"
      );
      const clTramEndPos = await Map.getNrStCoords(endPosition, "tram_stop");
      // get distances  :
      const distanceTramStartClos = Map.getDistance(
        startPosition,
        clTramStartPos
      );
      const distanceTramEndClose = Map.getDistance(endPosition, clTramEndPos);

      //inc score :
      if (distanceTramStartClos <= 1200 && distanceTramEndClose <= 1200) {
        scores.find(item => item.cat === "tram").score =
          scores.find(item => item.cat === "tram").score + 1;
      }

      // inc score per price :
      const taxiPrice =
        distBetStEnd *
        transportationsWay.find(tr => tr.code === "taxi").pricePerMetre;

      let newTransportaionWay = transportationsWay.map(tr => {
        if (tr.code === "taxi") {
          tr.price = taxiPrice;
        } else {
          tr.price = tr.price * seat;
        }
        return tr;
      });

      setTransportationWay(newTransportaionWay);

      scores = scores.filter(item => item.score > 0);

      if (scores.some(item => item.cat === "taxi")) {
        let existe = false;
        scores
          .filter(item => item.cat !== "taxi")
          .forEach(scoreItem => {
            const itemPrice = transportationsWay.find(
              tr => tr.code === scoreItem.cat
            ).price;

            if (taxiPrice > itemPrice) {
              existe = true;
              return;
            }
          });
        if (!existe) {
          scores.find(item => item.cat === "taxi").score =
            scores.find(item => item.cat === "taxi").score + 1;
        }
      } else {
        let minPriceTrip = transportationsWay[0]; // Assume the first trip has the minimum price

        for (let i = 0; i <= transportationsWay.length - 1; i++) {
          if (transportationsWay[i].price < minPriceTrip.price) {
            minPriceTrip = transportationsWay[i]; // Update the minimum price trip
          }
        }
        if (scores.find(item => item.cat === minPriceTrip.code))
          scores.find(item => item.cat === minPriceTrip.code).score =
            scores.find(item => item.cat === minPriceTrip.code).score + 1;
      }

      newTransportaionWay = transportationsWay.map(tr => {
        if (scores.findIndex(scr => scr.cat === tr.code) !== -1) {
          tr.score = scores.find(scr => scr.cat === tr.code).score;
        }

        if (tr.code === "bus") {
          tr.startStation = clBusStartPos;
          tr.endStation = clBusEndPos;
        }

        if (tr.code === "tram") {
          tr.startStation = clTramStartPos;
          tr.endStation = clTramEndPos;
        }

        return tr;
      });
      newTransportaionWay.sort((a, b) => b.score - a.score);

      setTransportationWay(newTransportaionWay);
      setLoading(false);
    } catch (error) {
      Alert.open({
        title: "Error direction",
        message: error,
        type: "danger",
      });
    }
  };

  const chooseTransportationHandler = async cat => {
    try {
      if (cat !== "taxi") {
        const tr = transportationsWay.find(trw => trw.code === cat);
        if (tr) {
          const startAddress = await Map.getAddress(
            startPosition.latitude,
            startPosition.longitude
          );
          const endAddress = await Map.getAddress(
            endPosition.latitude,
            endPosition.longitude
          );

          const direction1 = await Map.getDirection(
            startPosition,
            tr.startStation,
            "foot-walking"
          );

          const direction2 = await Map.getDirection(
            tr.startStation,
            tr.endStation
          );
          const direction3 = await Map.getDirection(
            tr.endStation,
            endPosition,
            "foot-walking"
          );

          let transportation = {
            transportationsWay: tr,
            code: tr.code,
            price: tr.price,
            startPosition: startPosition,
            endPosition: endPosition,
            startAddress: startAddress,
            endAddress: endAddress,
            nbrSeat: seat,
            directions: [
              {
                direction: direction1,
                color: colors.darkGray,
              },
              {
                direction: direction2,
                color: colors.primary,
              },
              {
                direction: direction3,
                color: colors.darkGray,
              },
            ],
          };
          setTransportation(transportation);
        }
      } else {
        const tr = transportationsWay.find(trw => trw.code === cat);
        if (tr) {
          const direction = await Map.getDirection(startPosition, endPosition);
          const startAddress = await Map.getAddress(
            startPosition.latitude,
            startPosition.longitude
          );
          const endAddress = await Map.getAddress(
            endPosition.latitude,
            endPosition.longitude
          );
          let transportation = {
            transportationsWay: tr,
            price: tr.price,
            startAddress: startAddress,
            endAddress: endAddress,
            startPosition: startPosition,
            endPosition: endPosition,
            nbrSeat: seat,
            code: tr.code,
            directions: [
              {
                direction: direction,
                color: colors.primary,
              },
            ],
          };
          setTransportation(transportation);
        }
      }
    } catch (error) {
      Alert.open({
        title: "Error direction",
        message: error,
        type: "danger",
      });
    }
  };

  useEffect(() => {
    if (startPosition && endPosition) calculeBestWaytoMaketrip();
  }, [startPosition, endPosition]);

  return (
    <View>
      <View style={styles.center}>
        <Text as='header5'>Select your </Text>
        <Text as='header5' style={{ marginBottom: 10, marginTop: -3 }}>
          means of Transport
        </Text>
      </View>
      {loading ? (
        <>
          <ContentLoader
            style={{ marginTop: 0 }}
            speed={2}
            width={400}
            height={90}
            viewBox='0 0 400 90'
            backgroundColor='#d3d3d3'
            foregroundColor='#e0dede'>
            <Rect x='-313' y='-326' rx='2' ry='2' width='388' height='388' />
            <Rect x='103' y='13' rx='0' ry='0' width='212' height='10' />
            <Rect x='104' y='31' rx='0' ry='0' width='98' height='7' />
            <Rect x='91' y='65' rx='0' ry='0' width='0' height='1' />
          </ContentLoader>
          <ContentLoader
            style={{ marginTop: 0 }}
            speed={2}
            width={400}
            height={90}
            viewBox='0 0 400 90'
            backgroundColor='#d3d3d3'
            foregroundColor='#e0dede'>
            <Rect x='-313' y='-326' rx='2' ry='2' width='388' height='388' />
            <Rect x='103' y='13' rx='0' ry='0' width='212' height='10' />
            <Rect x='104' y='31' rx='0' ry='0' width='98' height='7' />
            <Rect x='91' y='65' rx='0' ry='0' width='0' height='1' />
          </ContentLoader>
          <ContentLoader
            style={{ marginTop: 0 }}
            speed={2}
            width={400}
            height={90}
            viewBox='0 0 400 90'
            backgroundColor='#d3d3d3'
            foregroundColor='#e0dede'>
            <Rect x='-313' y='-326' rx='2' ry='2' width='388' height='388' />
            <Rect x='103' y='13' rx='0' ry='0' width='212' height='10' />
            <Rect x='104' y='31' rx='0' ry='0' width='98' height='7' />
            <Rect x='91' y='65' rx='0' ry='0' width='0' height='1' />
          </ContentLoader>
        </>
      ) : (
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={styles.transportTypesContainer}>
          {transportationsWay.map(transport => (
            <TransportType
              transport={transport}
              key={transport.id}
              loading={loading}
              onPress={() => chooseTransportationHandler(transport.code)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: { backgroundColor: "red", height: 50, zIndex: 100 },
  center: { alignItems: "center", justifyContent: "center" },
  justify: {
    textAlign: "justify",
  },
  transportTypesContainer: {
    maxHeight: 420,
    paddingTop: 30,
  },
});

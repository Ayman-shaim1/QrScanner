import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "./index";

import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import colors from "../config/colors";

export default function ChoosePaiementMethod({ setPaimentMethod }) {
  return (
    <View>
      <View style={styles.center}>
        <Text as='header5'>Select your </Text>
        <Text as='header5' style={{ marginBottom: 10, marginTop: -3 }}>
          means of payment
        </Text>
        <Text style={styles.subText}>Lorem ipsum dolor sit amet</Text>
        <Text style={styles.subText}>
          consectetur adipisicing elit. Ipsa, laboriosam?
        </Text>
      </View>
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={styles.paymentMethodsContainer}>
        <TouchableOpacity
          onPress={() => setPaimentMethod("Pay in cash")}
          style={styles.paimentMethod}>
          <View style={styles.method}>
            <FontAwesome5 name='money-bill' color={colors.dark} size={20} />
            <Text style={styles.methodText}>Pay in cash</Text>
          </View>
          <MaterialCommunityIcons
            name='arrow-right'
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paimentMethod}
          onPress={() => setPaimentMethod("Bank card")}>
          <View style={styles.method}>
            <Ionicons name='card' color={colors.dark} size={20} />
            <Text style={styles.methodText}>Bank card</Text>
          </View>
          <MaterialCommunityIcons
            name='arrow-right'
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPaimentMethod("Bank transfer")}
          style={styles.paimentMethod}>
          <View style={styles.method}>
            <FontAwesome name='bank' color={colors.dark} size={20} />
            <Text style={styles.methodText}>Bank transfer</Text>
          </View>
          <MaterialCommunityIcons
            name='arrow-right'
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: { backgroundColor: "red", height: 50, zIndex: 100 },
  center: { alignItems: "center", justifyContent: "center" },
  justify: {
    textAlign: "justify",
  },
  paymentMethodsContainer: {
    maxHeight: 420,
    paddingTop: 25,
  },
  paimentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 20,
    justifyContent: "space-between",
    marginVertical: 12,
  },
  method: {
    flexDirection: "row",
    alignItems: "center",
  },
  methodText: {
    marginLeft: 10,
  },
});

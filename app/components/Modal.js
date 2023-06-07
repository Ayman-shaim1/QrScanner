import React, { useState, useRef, useEffect } from "react";
import {
  Modal as RNModal,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Modal({ show, onClose, children }) {
  const [dragY, setDragY] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setDragY(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy >= 300) {
          onClose();
        } else {
          setDragY(0);
        }
      },
    })
  ).current;
  useEffect(() => {
    if (show) {
      setDragY(0);
    }
  }, [show]);
  return (
    <RNModal
      visible={show}
      animationType='slide'
      transparent
      style={{ zIndex: 10 }}>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.draggableModal,
            { transform: [{ translateY: Math.max(dragY, 0) }] },
          ]}
          {...panResponder.panHandlers}>
          <View style={styles.modalContentWrapper}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons
                name='close'
                size={15}
                color={colors.danger}
              />
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.scrollContentContainer}
              onScroll={event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                const contentHeight = event.nativeEvent.contentSize.height;
                const containerHeight =
                  event.nativeEvent.layoutMeasurement.height;

                if (offsetY + containerHeight >= contentHeight) {
                  setDragY(containerHeight);
                }
              }}>
              {/* Your modal content goes here */}
              {children}
            </ScrollView>

            {/* <View style={styles.modalLine}></View> */}
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  draggableModal: {
    height: "90%",
    width: "100%",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    zIndex: 1,
  },
  modalContentWrapper: {
    backgroundColor: colors.white,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalLine: {
    backgroundColor: colors.secondary,
    width: "40%",
    height: 4,
    borderRadius: 40,
    alignSelf: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light,
  },
  closeButtonText: {
    color: "blue",
    fontSize: 18,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingDialog = (props: { open: boolean }) => {
  console.log("open dialog", props.open);
  return (
    <Modal transparent animationType="fade" visible={props.open}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default LoadingDialog;

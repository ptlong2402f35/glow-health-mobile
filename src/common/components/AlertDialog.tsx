import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    Button,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const AlertDialog = (props: {
    open: boolean;
    title?: string | null;
    content?: string | null;
    afterClose?: any;
    onClose?: any;
}) => {
    return (
        <Modal animationType="fade" transparent visible={props.open}>
            <View style={styles.container}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>
                            {props.title || "Thông báo"}
                        </Text>
                        <Text style={styles.modalText}>
                            {props.content || ""}
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={() => {
                                    props.onClose?.();
                                    props.afterClose?.();
                                }}
                            >
                                <Text style={styles.buttonText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    closeBtn: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        borderRadius: 8,
        paddingHorizontal: 24,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default AlertDialog;

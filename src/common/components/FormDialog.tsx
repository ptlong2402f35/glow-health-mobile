import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    Button,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const FormDialog = (props: {
    open: boolean;
    title?: string | null;
    children?: JSX.Element | null;
    onClose?: any;
    onConfirm?: any;
}) => {
    return (
        <Modal animationType="fade" transparent visible={props.open}>
            <View style={styles.container}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>
                            {props.title || "Cập nhật thông tin"}
                        </Text>
                        {props.children || <View></View>}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={() => props.onClose?.()}
                            >
                                <Text style={styles.buttonText}>Đóng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={() => props.onConfirm?.()}
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
        position: "absolute",
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 999
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
        gap: 12,
    },
    closeBtn: {
        backgroundColor: "#ccc",
        paddingVertical: 15,
        borderRadius: 8,
        paddingHorizontal: 24,
    },
    confirmBtn: {
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

export default FormDialog;

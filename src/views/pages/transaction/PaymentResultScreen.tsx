import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import useBottomTab from "../../../hook/useBottomTab";

export default function PaymentResultScreen(props: { route: any }) {
    let status = props.route.params.status;
    return (
        <View style={{ flex: 1 }}>
            {status ? <PaymentSuccess /> : <PaymentFailure />}
        </View>
    );
}

export const PaymentSuccess = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { changeTab } = useBottomTab();

    return (
        <View style={sstyles.container}>
            <Text style={sstyles.icon}>✅</Text>
            <Text style={sstyles.title}>Thanh toán thành công!</Text>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    navigation.navigate("Home");
                    changeTab?.("Home");
                }}
            >
                <Text style={sstyles.message2}>Quay về trang chủ</Text>
            </TouchableOpacity>
        </View>
    );
};

export const PaymentFailure = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>❌</Text>
            <Text style={styles.title}>Thanh toán thất bại!</Text>
            <Text style={styles.message}>Đã xảy ra lỗi. Vui lòng thử lại.</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Wallet")}
            >
                <Text style={sstyles.message2}>Thử lại</Text>
            </TouchableOpacity>
        </View>
    );
};

const sstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8f5e9",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    icon: {
        fontSize: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2e7d32",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: "center",
    },
    message2: {
        // color: "#fff"
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffebee",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    icon: {
        fontSize: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#c62828",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: "center",
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
});

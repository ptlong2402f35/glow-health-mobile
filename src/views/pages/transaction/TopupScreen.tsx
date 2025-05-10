import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import useRecharge from "./hook/useRecharge";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BackButton from "../../../common/components/BackButton";

export default function TopUpScreen() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const [amount, setAmount] = useState(0);

    const { topup } = useRecharge();

    const onRecharge = async () => {
        if (!amount) {
            alert("Vui lòng nhập số tiền cần nạp");
            return;
        }
        let link = await topup(amount);
        console.log("link ===", link);
        navigation.navigate("RechargeView", {
            url: link,
            amount: amount,
            isPayment: true,
        } as never);
    };

    return (
        <View style={styles.container}>
            <BackButton color="#fff" />
            <View style={styles.header}>
                <Text style={[styles.title, { color: "#fff" }]}>Nạp tiền</Text>
            </View>
            <View style={styles.contentWrap}>
                <Text style={styles.titleLabel}>Nhập số tiền cần nạp</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số tiền cần nạp"
                    value={amount ? amount.toString() : ""}
                    onChangeText={(text: string) =>
                        setAmount(parseFloat(text) || 0)
                    }
                />
                <TouchableOpacity style={styles.button} onPress={onRecharge}>
                    <Text style={styles.buttonText}>Chấp nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "green",
        padding: 24,
    },
    title: {
        fontSize: 22,
        // marginBottom: 20,
        // color: "#fff",
    },
    contentWrap: {
        paddingVertical: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    titleLabel: {
        fontSize: 18,
        marginBottom: 20,
        // color: "#fff",
    },
    input: {
        width: "60%",
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 30,
        textAlign: "center",
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#388e3c",
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 10,
        // width: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
});

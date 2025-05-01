import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { paymentMethodStyle } from "./styles/styles";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Foundation,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import useUserLoader from "../../../hook/useUserLoader";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const paymentMethods = [
    {
        id: 1,
        name: "Thanh toán tiền mặt",
        icon: () => <Ionicons name="cash-outline" size={24} color="black" />,
    },
    {
        id: 2,
        name: "Số dư Glow",
        balance: true,
        icon: () => <AntDesign name="wallet" size={24} color="black" />,
    },
];

export default function PaymentMethodScreen(props: { route?: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    let data = props.route.params.data;
    let { userLoader } = useUserLoader();
    const [selectedMethod, setSelectedMethod] = useState(1);

    const onSelectMethod = (data: number) => {
        setSelectedMethod(data);
    };

    const onConfirmSelectMethod = () => {
        navigation.navigate("OrderCreate", {
            data: {
                ...data,
                paymentMethodId: selectedMethod,
            },
        } as never);
    };

    useEffect(() => {
        console.log("data route", data);
        if (data.paymentMethodId) {
            setSelectedMethod(data.paymentMethodId);
        }
    }, [data.paymentMethodId]);

    return (
        <View style={paymentMethodStyle.container}>
            <View style={paymentMethodStyle.headerContainer}>
                <Text style={paymentMethodStyle.title}>
                    Phương thức thanh toán
                </Text>
            </View>

            <FlatList
                data={paymentMethods}
                renderItem={(item) => (
                    <PaymentItem
                        item={item.item}
                        setSelectedMethod={onSelectMethod}
                        selectedMethod={selectedMethod}
                        userLoader={userLoader}
                    />
                )}
                keyExtractor={(item) => item.id + ""}
                contentContainerStyle={paymentMethodStyle.list}
            />

            <TouchableOpacity
                style={paymentMethodStyle.button}
                onPress={onConfirmSelectMethod}
            >
                <Text style={paymentMethodStyle.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    );
}

export function PaymentItem(props: {
    item: any;
    setSelectedMethod: (value: number) => void;
    selectedMethod: number;
    userLoader: any;
}) {
    console.log("item ===", props.item);
    return (
        <TouchableOpacity
            style={paymentMethodStyle.methodItem}
            onPress={() => props.setSelectedMethod(props.item.id)}
        >
            <View style={paymentMethodStyle.leftSection}>
                <View style={paymentMethodStyle.iconPlaceholder}>
                    {props.item.icon ? props.item.icon() : <View></View>}
                </View>
                <View>
                    <Text style={paymentMethodStyle.methodName}>
                        {props.item.name}
                    </Text>
                    {props.item.balance && (
                        <Text style={paymentMethodStyle.balance}>
                            {props.userLoader?.totalMoney || 0}đ
                        </Text>
                    )}
                </View>
            </View>
            <View
                style={[
                    paymentMethodStyle.radioCircle,
                    props.selectedMethod === props.item.id &&
                        paymentMethodStyle.selectedRadio,
                ]}
            />
        </TouchableOpacity>
    );
}

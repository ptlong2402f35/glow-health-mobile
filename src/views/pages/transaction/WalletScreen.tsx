import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { walletStyles } from "./styles/styles";
import Transaction from "../../../models/Transaction";
import useTransactionHandler from "./hook/useTransactionHandler";
import useUserLoader from "../../../hook/useUserLoader";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import moment from "moment";
import BackButton from "../../../common/components/BackButton";
import useRecharge from "./hook/useRecharge";
export default function WalletScreen() {
    const { transactions, getMyTransaction, loadMore } =
        useTransactionHandler();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const { userLoader } = useUserLoader();

    const loadNextPage = () => {
        loadMore();
    };

    const onRecharge = async () => {
        navigation.navigate("Topup");
    };

    const supportClick = () => {
        navigation.navigate("Support");
    };

    useEffect(() => {
        getMyTransaction({ page: 1 });
    }, []);

    return (
        <View style={walletStyles.container}>
            <BackButton />
            <View style={walletStyles.backgroundWrapper}>
                <Text style={walletStyles.header}>Số dư Glow</Text>
                <Text style={walletStyles.balance}>
                    {userLoader?.totalMoney || 0} đ
                </Text>
                <View style={walletStyles.actions}>
                    <TouchableOpacity
                        style={walletStyles.button}
                        onPress={onRecharge}
                    >
                        <Text style={walletStyles.buttonText}>Nạp tiền</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={walletStyles.button}
                        onPress={supportClick}
                    >
                        <Text style={walletStyles.buttonText}>Rút tiền</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={walletStyles.transactionWrap}>
                {!transactions.length ? (
                    <View style={walletStyles.notranswrap}>
                        <Text>Bạn không có giao dịch nào</Text>
                    </View>
                ) : (
                    <FlatList
                        data={transactions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id + ""}
                        style={{ marginTop: 20 }}
                        onEndReached={() => loadNextPage()}
                    />
                )}
            </View>
        </View>
    );
}

export const renderItem = (props: { item: Transaction }) => (
    <View style={walletStyles.item}>
        <View style={walletStyles.iconContainer}>
            <Ionicons
                name={
                    props.item.add === true
                        ? "add-circle-outline"
                        : "remove-circle-outline"
                }
                size={24}
                color={props.item.add === true ? "#4CAF50" : "#888"}
            />
        </View>
        <View style={walletStyles.info}>
            <Text style={walletStyles.desc}>{props.item.content}</Text>
            <Text style={walletStyles.time}>
                {moment(props.item.createdAt).format("MM/DD/YYYY h:mm:ss") ||
                    ""}
            </Text>
        </View>
        <View style={walletStyles.right}>
            <Text
                style={[
                    walletStyles.amount,
                    props.item.add === true
                        ? walletStyles.green
                        : walletStyles.red,
                ]}
            >
                {props.item.money} đ
            </Text>
            <Text style={walletStyles.status}>Thành công</Text>
        </View>
    </View>
);

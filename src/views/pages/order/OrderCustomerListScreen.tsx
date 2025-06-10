import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { customerOrderListStyles } from "./style/style";
import Order, { OrderStatus } from "../../../models/Order";
import useCustomerOrderList from "./hook/useCustomerOrderList";
import { OrderGetStatusLabelHelper } from "../../service/OrderHelper";
const defaultAvatar = require("../../../../assets/defaultAvatar.png");
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Foundation,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import BackButton from "../../../common/components/BackButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useRefresh from "../../../hook/useRefresh";

export default function OrderCustomerListScreen(props: {route: any}) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    let reload = props.route.params?.reload || null;
    const { orders, loadMore, getOrderList, initLoad } = useCustomerOrderList();
    const { refresh, onRefresh } = useRefresh();

    const onRefreshScreen = () => {
        const cb = async () => {
            initLoad(true);
        };
        onRefresh(cb);
    };
    const onClickDetailOrder = (item: Order) => {
        if(item.status === OrderStatus.Pending || item.status === OrderStatus.Denied) {
            navigation.navigate("MyOrderPendingDetail", {id: item.id} as never);
            return;
        }
        navigation.navigate("MyOrderDetail", {id: item.id} as never);
    };

    useEffect(() => {
        console.log("naivgation reload");
        if(reload) {
            initLoad(true);
            return;
        }
        initLoad(true);
    }, [reload]);
    return (
        <View>
            <BackButton color="#fff" top={12} />
            <View style={customerOrderListStyles.headerWrapper}>
                <Text style={customerOrderListStyles.headerText}>
                    Lịch sử hoạt động
                </Text>
            </View>
            {orders?.length != 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(item, index) => item.id + "" + index}
                    renderItem={({ item }) => <OrderItem item={item} onPress={onClickDetailOrder}/>}
                    contentContainerStyle={{ padding: 16 }}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.05}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh || false}
                            onRefresh={onRefreshScreen}
                        />
                    }
                />
            ) : (
                <View style={customerOrderListStyles.emptyWrapper}>
                    <Text style={customerOrderListStyles.emptyText}>
                        Không có đơn hàng nào
                    </Text>
                </View>
            )}
        </View>
    );
}

export function OrderItem(props: { item: Order , onPress?:(item: Order) => void}) {
    let status = OrderGetStatusLabelHelper(props?.item?.status || 0);
    let color = "";
    switch (props?.item?.status) {
        case OrderStatus.Pending: {
            color = "#28a745";
            break;
        }
        case OrderStatus.Approved: {
            color = "#28a745";
            break;
        }
        case OrderStatus.Finished: {
            color = "orange";
            break;
        }
        case OrderStatus.Canceled: {
            color = "red";
            break;
        }
        case OrderStatus.StaffCanceled: {
            color = "red";
            break;
        }
    }
    return (
        <TouchableOpacity style={customerOrderListStyles.card} onPress={() => props.onPress?.(props.item)}>
            <View style={customerOrderListStyles.header}>
                <Image
                    source={
                        props?.item.staff?.user?.urlImage
                            ? { uri: props?.item.staff?.user?.urlImage }
                            : defaultAvatar
                    }
                    style={customerOrderListStyles.avatar}
                />
                <View style={{ flex: 1 }}>
                    <Text style={customerOrderListStyles.title}>
                        {props?.item.staff?.name || ""}
                    </Text>
                    <Text
                        style={[
                            customerOrderListStyles.status,
                            {
                                color,
                            },
                        ]}
                    >
                        {status}
                    </Text>
                </View>
                <Text style={customerOrderListStyles.price}>
                    {props?.item.totalPay}đ
                </Text>
            </View>
            <View style={customerOrderListStyles.infoRow}>
                <Entypo name="location-pin" size={24} color="black" />
                <Text style={customerOrderListStyles.infoText}>
                    {props?.item.address}
                </Text>
            </View>
            <View style={customerOrderListStyles.infoRow}>
                <Ionicons
                    name="document-text-outline"
                    size={24}
                    color="black"
                />
                <View style={{width: "90%"}}>
                    {props?.item?.prices?.length ? (
                        props?.item.prices?.map((price) => (
                            <View
                                key={price.id}
                                style={[customerOrderListStyles.infoText, customerOrderListStyles.infoRowPrice]}
                            >
                                <Text style={customerOrderListStyles.infoText}>
                                    {price?.staffService?.name || ""}
                                </Text>
                                <Text style={customerOrderListStyles.infoText}>
                                    {price?.unit || ""}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <View></View>
                    )}
                </View>
            </View>
            <View style={customerOrderListStyles.infoRow}>
                <Foundation name="clock" size={24} color="black" />
                <Text style={customerOrderListStyles.infoText}>
                    Giờ làm việc:
                    {moment(props?.item?.timerTime).format(
                        "MM/DD/YYYY h:mm:ss"
                    )}
                </Text>
            </View>
            <View style={customerOrderListStyles.infoRow}>
                <FontAwesome name="money" size={24} color="black" />
                <Text style={customerOrderListStyles.infoText}>
                    {props?.item.paymentMethodId === 1
                        ? "Thanh toán bằng tiền mặt"
                        : "Thanh toán bằng ví Glow"}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

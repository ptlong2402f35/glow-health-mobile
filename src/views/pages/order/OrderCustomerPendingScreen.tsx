import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { orderCustomerDetailStyle } from "./style/style";
import useCustomerOrderList from "./hook/useCustomerOrderList";
import useCustomerOrderDetail from "./hook/useCustomerOrderDetail";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Order from "../../../models/Order";
import OrderForwarder from "../../../models/OrderForwarder";
const defaultAvatar = require("../../../../assets/defaultAvatar.png");

export default function OrderCustomerPendingScreen(props: { route: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    let id = props.route.params?.id || 0;

    const {
        order,
        forwardOrder,
        getForwardOrder,
        cancelOrderByCustomer,
    } = useCustomerOrderDetail();

    const onCancelOrder = () => {
        cancelOrderByCustomer(id, () => {
            navigation.navigate("MyOrderList");
        });
    };

    const onRedirectToDetail = (staffId?: number, forwardOrderId?: number) => {
        navigation.navigate("StaffDetail", {
            id: staffId,
            forwardSelect: true,
            baseOrderId: id,
            forwardId: forwardOrderId
        } as never);
    };

    useEffect(() => {
        if (!id) return;
        getForwardOrder(id);
    }, [id]);

    return (
        <View style={orderCustomerDetailStyle.container}>
            <TouchableOpacity
                style={orderCustomerDetailStyle.cancelBtn}
                onPress={onCancelOrder}
            >
                <Text style={orderCustomerDetailStyle.cancelBtnText}>Hủy</Text>
            </TouchableOpacity>
            <View style={orderCustomerDetailStyle.map}></View>
            {/* <MapView
        style={orderCustomerDetailStyle.map}
        initialRegion={{
          latitude: 21.010499,
          longitude: 105.800509,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{ latitude: 21.010499, longitude: 105.800509 }}
          title="Kỹ thuật viên"
        >
          <Image
            source={defaultAvatar} 
            style={{ width: 32, height: 32 }}
          />
        </Marker>
      </MapView> */}

            <View style={orderCustomerDetailStyle.bottomSheet}>
                <Text style={orderCustomerDetailStyle.alert}>
                    Hãy chọn kỹ thuật viên sẵn sàng
                </Text>

                <FlatList
                    style={orderCustomerDetailStyle.forwardListContainer}
                    contentContainerStyle={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                    data={forwardOrder}
                    renderItem={({ item }) => (
                        <ForwardOrderItem
                            item={item}
                            redirectStaffDetail={onRedirectToDetail}
                        />
                    )}
                    keyExtractor={(item) => item.id + ""}
                />

                <Text style={orderCustomerDetailStyle.message}>
                    Đang tìm kiếm, vui lòng chờ 2–5 phút
                </Text>
            </View>
        </View>
    );
}

export function ForwardOrderItem(props: {
    item: OrderForwarder;
    redirectStaffDetail?: (staffId?: number, forwardOrderId?: number) => void;
}) {
    return (
        <TouchableOpacity
            style={orderCustomerDetailStyle.forwardStaffContainer}
            onPress={() =>
                props.redirectStaffDetail?.(
                    props.item?.staffId || 0,
                    props.item.id || 0
                )
            }
        >
            <Image
                source={defaultAvatar}
                style={orderCustomerDetailStyle.illustration}
                resizeMode="contain"
            />
            <View>
                <Text>{props.item?.staff?.name || ""}</Text>
                <Text>{props.item?.staff?.rateAvg || ""}</Text>
            </View>
        </TouchableOpacity>
    );
}

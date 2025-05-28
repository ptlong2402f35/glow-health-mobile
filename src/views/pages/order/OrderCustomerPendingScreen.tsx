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
import BackButton from "../../../common/components/BackButton";
const defaultAvatar = require("../../../../assets/defaultAvatar.png");
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Foundation,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import useUserLoader from "../../../hook/useUserLoader";
import { emitter, EmitterEvent } from "../../../hook/emitter/mitt";
export default function OrderCustomerPendingScreen(props: { route: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    let id = props.route.params?.id || 0;
    let { location } = useUserLoader();

    const { order, forwardOrder, getForwardOrder, cancelOrderByCustomer } =
        useCustomerOrderDetail();

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
            forwardId: forwardOrderId,
        } as never);
    };

    useEffect(() => {
        if (!id) return;
        getForwardOrder(id, location?.lat, location?.long);
        emitter.on(EmitterEvent.ReloadForwardOrder, () => getForwardOrder(id, location?.lat, location?.long));
        return () => {
            emitter.off(EmitterEvent.ReloadForwardOrder, () => getForwardOrder(id, location?.lat, location?.long));
        };
    }, [id]);

    return (
        <View style={orderCustomerDetailStyle.container}>
            <BackButton />
            <TouchableOpacity
                style={orderCustomerDetailStyle.cancelBtn}
                onPress={onCancelOrder}
            >
                <Text style={orderCustomerDetailStyle.cancelBtnText}>Hủy</Text>
            </TouchableOpacity>
            <MapView
                style={orderCustomerDetailStyle.map}
                initialRegion={{
                    latitude: 37.4217937,
                    longitude: -122.083922,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {forwardOrder
                    ?.filter((item) => item.staff?.lat || item?.staff?.long)
                    ?.map((item, index) => (
                        <Marker
                            key={index + "marker"}
                            coordinate={{
                                latitude: item.staff?.lat || 0,
                                longitude: item.staff?.long || 0,
                            }}
                            title={item?.staff?.name || ""}
                            // description="Trường ĐH Bách Khoa TP.HCM"
                        >
                            <Image
                                source={
                                    item.staff?.user?.urlImage
                                        ? { uri: item.staff?.user?.urlImage }
                                        : defaultAvatar
                                }
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    borderWidth: 2,
                                    borderColor: "#fff",
                                }}
                            />
                        </Marker>
                    ))}
            </MapView>

            <View style={orderCustomerDetailStyle.bottomSheet}>
                <Text style={orderCustomerDetailStyle.alert}>
                    {forwardOrder?.length
                        ? "Hãy chọn kỹ thuật viên sẵn sàng"
                        : "Đang tìm kiếm KTV gần bạn"}
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
                source={
                    props.item?.staff?.user?.urlImage ||
                    props.item?.staff?.images?.[0]
                        ? {
                              uri:
                                  props.item?.staff?.user?.urlImage ||
                                  props.item?.staff?.images?.[0],
                          }
                        : defaultAvatar
                }
                style={orderCustomerDetailStyle.illustration}
                resizeMode="contain"
            />
            <View style={orderCustomerDetailStyle.itemContainer}>
                <Text>{props.item?.staff?.name || ""}</Text>
                <View style={orderCustomerDetailStyle.itemContainerFlex}>
                    <View style={orderCustomerDetailStyle.itemContainerFlex}>
                        <Text>
                            <AntDesign name="staro" size={16} color="black" />
                            {props.item?.staff?.rateAvg || "5"}
                        </Text>
                    </View>
                    <View style={orderCustomerDetailStyle.itemContainerFlex}>
                        {props.item?.staff?.distance ||
                        props.item?.staff?.province?.name ? (
                            <View>
                                <Entypo
                                    name="location-pin"
                                    size={16}
                                    color="black"
                                />
                                <Text>
                                    {(props.item?.staff?.distance
                                        ? `${props.item?.staff?.distance}m`
                                        : `${props.item?.staff?.province?.name}`) ||
                                        ""}
                                </Text>
                            </View>
                        ) : (
                            <View></View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

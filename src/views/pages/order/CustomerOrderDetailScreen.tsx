import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { customerOrderDetailStyle } from "./style/style";
import useStaffOrderDetail from "./hook/useStaffOrderDetail";
import Order, { OrderStatus } from "../../../models/Order";
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");
import AntDesign from "@expo/vector-icons/AntDesign";
import {
    Ionicons,
    MaterialIcons,
    Entypo,
    FontAwesome,
} from "@expo/vector-icons"; // icon libraries
import { NavigationProp, useNavigation } from "@react-navigation/native";
import moment from "moment";
import BackButton from "../../../common/components/BackButton";
import { emitter, EmitterEvent } from "../../../hook/emitter/mitt";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomerOrderDetailScreen(props: { route: any }) {
    let id = props.route.params.id || 0;
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { customerOrder, getCustomerOrderDetail } = useStaffOrderDetail();

    let status = "Chờ xác nhận";
    switch (customerOrder?.status) {
        case OrderStatus.Pending: {
            status = "Chờ xác nhận";
            break;
        }
        case OrderStatus.Approved: {
            status = "Đã chấp nhận";
            break;
        }
        case OrderStatus.Canceled: {
            status = "Đã hủy";
            break;
        }
        case OrderStatus.Denied: {
            status = "Chờ xác nhận";
            break;
        }
        case OrderStatus.Finished: {
            status = "Đã hoàn thành";
            break;
        }
        case OrderStatus.StaffCanceled: {
            status = "Đã hủy";
            break;
        }
        default: {
            status = "Unknown";
        }
    }

    const onReviewPress = () => {
        navigation.navigate("Review", {
            urlImage: customerOrder?.staff?.user?.urlImage,
            staffName: customerOrder?.staff?.name || "",
            serviceNames:
                customerOrder?.prices?.map((item) => item.staffService?.name) ||
                [],
            orderId: id,
        } as never);
    };

    const onReOrderPress = () => {
        navigation.navigate("StaffDetail", {
            id: customerOrder?.staff?.id,
        } as never);
    };

    useEffect(() => {
        if (
            customerOrder?.status === OrderStatus.Pending ||
            customerOrder?.status === OrderStatus.Denied
        )
            navigation.navigate("MyOrderPendingDetail", {
                id: customerOrder.id,
            } as never);
    }, [customerOrder?.status]);

    useEffect(() => {
        getCustomerOrderDetail({ id });
        emitter.on(EmitterEvent.ReloadMyOrderDetail, () =>
            getCustomerOrderDetail({ id })
        );
        return () => {
            emitter.off(EmitterEvent.ReloadMyOrderDetail, () =>
                getCustomerOrderDetail({ id })
            );
        };
    }, [id]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                style={[
                    customerOrderDetailStyle.container,
                    { paddingBottom: 120 },
                ]}
                contentContainerStyle={{ paddingBottom: 46 }}
                showsVerticalScrollIndicator={false}
            >
                <BackButton />
                <Text style={customerOrderDetailStyle.header}>
                    Chi tiết đơn
                </Text>

                <Image
                    source={
                        customerOrder?.staff?.user?.urlImage
                            ? { uri: customerOrder?.staff?.user?.urlImage }
                            : DefaultAvatar
                    }
                    style={customerOrderDetailStyle.image}
                    resizeMode="contain"
                />

                <View style={customerOrderDetailStyle.statusContainer}>
                    <Text
                        style={[
                            customerOrderDetailStyle.statusText,
                            {
                                color:
                                    customerOrder?.status ===
                                    OrderStatus.Finished
                                        ? "green"
                                        : "red",
                            },
                        ]}
                    >
                        {status}
                    </Text>
                    <Text style={customerOrderDetailStyle.priceText}>
                        {customerOrder?.totalPay || ""}đ
                    </Text>
                </View>

                <View
                    style={[
                        customerOrderDetailStyle.infoBox,
                        { width: "100%" },
                    ]}
                >
                    <View style={customerOrderDetailStyle.userRow}>
                        <Image
                            source={
                                customerOrder?.staff?.user?.urlImage
                                    ? {
                                          uri: customerOrder?.staff?.user
                                              ?.urlImage,
                                      }
                                    : DefaultAvatar
                            }
                            style={customerOrderDetailStyle.avatar}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={customerOrderDetailStyle.title}>
                                {customerOrder?.staff?.name || "KTV"}
                            </Text>
                            <Text style={customerOrderDetailStyle.rating}>
                                {customerOrder?.staff?.rateAvg ? (
                                    <Text>
                                        {customerOrder.staff?.rateAvg}
                                        <AntDesign
                                            name="star"
                                            size={20}
                                            color="yellow"
                                        />
                                    </Text>
                                ) : (
                                    ""
                                )}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            customerOrderDetailStyle.detail,
                            {
                                display: "flex",
                                flexDirection: "row",
                                gap: 6,
                                width: "100%",
                            },
                        ]}
                    >
                        <Ionicons
                            name="document-text-outline"
                            size={20}
                            color="black"
                        />
                        <View style={{}}>
                            {customerOrder?.prices?.map((item) => (
                                <View
                                    key={item.id}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "90%",
                                    }}
                                >
                                    <Text>
                                        {item?.staffService?.name || ""}
                                    </Text>
                                    <Text>{item?.unit || ""}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View
                        style={[
                            {
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text style={customerOrderDetailStyle.detail}>
                            <AntDesign
                                name="clockcircleo"
                                size={20}
                                color="black"
                            />
                            Giờ làm việc:
                            {moment(customerOrder?.timerTime).format(
                                "MM/DD/YYYY h:mm:ss"
                            ) || ""}
                        </Text>
                    </View>
                    <View
                        style={[
                            {
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text style={customerOrderDetailStyle.detail}>
                            <FontAwesome name="money" size={20} color="black" />
                            {customerOrder?.paymentMethodId === 1
                                ? "Thanh toán bằng tiền mặt"
                                : "Thanh toán bằng ví Glow"}
                        </Text>
                    </View>
                    <View
                        style={[
                            {
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text style={customerOrderDetailStyle.detail}>
                            <AntDesign
                                name="shoppingcart"
                                size={20}
                                color="black"
                            />
                            Mã đơn hàng: {customerOrder?.code || ""}
                        </Text>
                    </View>
                </View>
                {customerOrder?.status === OrderStatus.Finished && (
                    <View
                    // style={{
                    //     position: "absolute",
                    //     bottom: 34,
                    //     left: 24,
                    //     right: 24,
                    // }}
                    >
                        <TouchableOpacity
                            style={customerOrderDetailStyle.primaryButton}
                            onPress={onReviewPress}
                        >
                            <Text style={customerOrderDetailStyle.buttonText}>
                                Đánh giá
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={customerOrderDetailStyle.secondaryButton}
                            onPress={onReOrderPress}
                        >
                            <Text
                                style={customerOrderDetailStyle.secondaryText}
                            >
                                Đặt lại
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

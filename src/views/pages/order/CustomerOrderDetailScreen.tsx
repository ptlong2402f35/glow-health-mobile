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
            serviceNames: customerOrder?.prices?.map(item => item.staffService?.name) || [],
        } as never);
    };

    const onReOrderPress = () => {
        navigation.navigate("StaffDetail", {
            id: customerOrder?.staff?.id,
        } as never);
    };

    useEffect(() => {
        if(customerOrder?.status === OrderStatus.Pending) navigation.navigate("MyOrderPendingDetail", {id: customerOrder.id} as never);
    }, [customerOrder?.status])

    useEffect(() => {
        getCustomerOrderDetail({ id });
    }, [id]);

    return (
        <ScrollView contentContainerStyle={customerOrderDetailStyle.container}>
            <BackButton />
            <Text style={customerOrderDetailStyle.header}>Chi tiết đơn</Text>

            <Image
                source={DefaultAvatar} // Thay bằng ảnh phù hợp của bạn
                style={customerOrderDetailStyle.image}
                resizeMode="contain"
            />

            <View style={customerOrderDetailStyle.statusContainer}>
                <Text
                    style={[
                        customerOrderDetailStyle.statusText,
                        {
                            color:
                                customerOrder?.status === OrderStatus.Finished
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

            <View style={customerOrderDetailStyle.infoBox}>
                <View style={customerOrderDetailStyle.userRow}>
                    <Image
                        source={
                            customerOrder?.staff?.user?.urlImage
                                ? { uri: customerOrder?.staff?.user?.urlImage }
                                : DefaultAvatar
                        } // Thay bằng avatar thực tế
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
                                        size={24}
                                        color="yellow"
                                    />
                                </Text>
                            ) : (
                                ""
                            )}
                        </Text>
                    </View>
                </View>

                <Text style={customerOrderDetailStyle.detail}>
                    <Ionicons
                        name="document-text-outline"
                        size={24}
                        color="black"
                    />
                    {customerOrder?.prices?.map((item) => (
                        <View key={item.id}>
                            <Text>{item?.staffService?.name || ""}</Text>
                            <Text>{item?.unit || ""}</Text>
                        </View>
                    ))}
                    <Text style={customerOrderDetailStyle.detail}>
                        <AntDesign
                            name="clockcircleo"
                            size={24}
                            color="black"
                        />
                        Giờ làm việc:
                        {moment(customerOrder?.timerTime).format(
                            "MM/DD/YYYY h:mm:ss"
                        ) || ""}
                    </Text>
                </Text>
                <Text style={customerOrderDetailStyle.detail}>
                    <FontAwesome name="money" size={24} color="black" />
                    {customerOrder?.paymentMethodId === 1
                        ? "Thanh toán bằng tiền mặt"
                        : "Thanh toán bằng ví Glow"}
                </Text>
                <Text style={customerOrderDetailStyle.detail}>
                    <AntDesign name="shoppingcart" size={24} color="black" />
                    Mã đơn hàng: {customerOrder?.code || ""}
                </Text>
            </View>

            {customerOrder?.status === OrderStatus.Finished && (
                <View>
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
                        <Text style={customerOrderDetailStyle.secondaryText}>
                            Đặt lại
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

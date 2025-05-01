import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Linking,
    Image,
} from "react-native";
import {
    Ionicons,
    MaterialIcons,
    Entypo,
    FontAwesome,
} from "@expo/vector-icons"; // icon libraries
import { orderDetailStyles } from "./style/style";
import useStaffOrderDetail from "./hook/useStaffOrderDetail";

export default function OrderDetailScreen(props: { route: any }) {
    const id = props.route.params.id || 0;
    const { order, getOrderDetail } = useStaffOrderDetail();

    useEffect(() => {
        if (!id) return;
        getOrderDetail({ id });
    }, [id]);
    return (
        <ScrollView style={orderDetailStyles.container}>
            <View style={orderDetailStyles.header}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={orderDetailStyles.headerTitle}>Chi tiết</Text>
            </View>

            <View style={orderDetailStyles.userInfo}>
                <View style={orderDetailStyles.avatar} />
                <View>
                    <Text style={orderDetailStyles.userName}>
                        Khách nam, Việt Nam
                    </Text>
                    <Text style={orderDetailStyles.expired}>Đã hết hạn</Text>
                </View>
            </View>

            <View style={orderDetailStyles.priceBox}>
                <Text style={orderDetailStyles.priceTitle}>
                    Số tiền thu khách
                </Text>
                <Text style={orderDetailStyles.priceValue}>
                    {order?.totalPay}đ
                </Text>
                <Text style={orderDetailStyles.subText}>Bạn sẽ nhận được</Text>
                <Text style={orderDetailStyles.receive}>
                    {order?.totalReceive}đ
                </Text>
                <Text style={orderDetailStyles.subText}>Gửi về Glow</Text>
                <Text style={orderDetailStyles.priceValue}>
                    {(order?.totalPay || 0) - (order?.totalReceive || 0) > 0
                        ? (order?.totalPay || 0) - (order?.totalReceive || 0)
                        : 0}
                    đ
                </Text>
            </View>

            {/* Service Info */}
            <View style={orderDetailStyles.infoRow}>
                <Entypo name="text-document" size={20} />
                {order?.prices?.map((item) => (
                    <View>
                        <Text style={orderDetailStyles.infoText}>{item.staffService?.name || ""}</Text>
                        <Text style={orderDetailStyles.points}>{item.unit}</Text>
                    </View>
                ))}
            </View>

            <View style={orderDetailStyles.infoRow}>
                <Ionicons name="time-outline" size={20} color="red" />
                <Text style={[orderDetailStyles.infoText, { color: "red" }]}>
                    
                    Giờ làm việc: {order?.timerTime?.toLocaleDateString() || ""}
                </Text>
            </View>

            <View style={orderDetailStyles.infoRow}>
                <Ionicons name="location-outline" size={20} />
                <Text style={orderDetailStyles.infoText}>
                    
                    Địa chỉ: {order?.address || ""}
                </Text>
            </View>

            <View style={orderDetailStyles.infoRow}>
                <FontAwesome name="money" size={20} />
                <Text style={orderDetailStyles.infoText}>
                    
                    {order?.paymentMethodId === 1 ? `Thanh toán bằng tiền mặt` : `Thanh toán bằng ví Glow`}
                </Text>
            </View>
        </ScrollView>
    );
}

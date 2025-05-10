import React, { useEffect, useState } from "react";
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
import moment from "moment";
import { OrderForwardStatus, OrderStatus } from "../../../models/Order";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ReasonCancelPopup from "./component/PopUpReasonCancel";

export default function OrderDetailScreen(props: { route: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const id = props.route.params.id || 0;
    const {
        order,
        getOrderDetail,
        readyOrder,
        rejectOrder,
        cancelApproveOrder,
        finishOrder,
    } = useStaffOrderDetail();
    let [popupShow, setPopupShow] = useState(false);
    let statusText = "";
    if (!order?.isForwardOrder) {
        if (order?.status === OrderStatus.Pending) statusText = "Đơn mới";
        if ([OrderStatus.Approved].includes(order?.status || 0))
            statusText = "Đang tiến hành";
        if (
            [
                OrderStatus.Denied,
                OrderStatus.Canceled,
                OrderStatus.StaffCanceled,
            ].includes(order?.status || 0)
        )
            statusText = "Đã hết hạn";
        if ([OrderStatus.Finished].includes(order?.status || 0))
            statusText = "Đã hoàn thành";
    } else {
        if (
            order?.forwardAccept &&
            order?.forwardOrderStatus === OrderForwardStatus.Begin
        )
            statusText = "Chờ khách chọn";
        if (
            !order?.forwardAccept &&
            order?.forwardOrderStatus === OrderForwardStatus.Begin
        )
            statusText = "Đơn mới";
        if (
            [
                OrderForwardStatus.End,
                OrderForwardStatus.Reject,
                OrderForwardStatus.Switched,
            ].includes(order?.forwardOrderStatus || 0)
        )
            statusText = "Đã hết hạn";
    }
    const onConfirmCancel = (reason?: string) => {
        cancelApproveOrder({ id, reasonCancel: reason });
    };

    const onConfirmFinish = () => {
        finishOrder({ id });
    };

    useEffect(() => {
        if (!id) return;
        getOrderDetail({ id });
    }, [id]);
    return (
        <View style={orderDetailStyles.container}>
            <ScrollView>
                <View style={orderDetailStyles.header}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="black"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                    <Text style={orderDetailStyles.headerTitle}>Chi tiết</Text>
                </View>

                <View style={orderDetailStyles.userInfo}>
                    <View style={orderDetailStyles.avatar} />
                    <View>
                        <Text style={orderDetailStyles.userName}>
                            {`Khách nam, Việt Nam`}
                        </Text>
                        <Text style={orderDetailStyles.expired}>
                            {statusText || ""}
                        </Text>
                    </View>
                </View>

                <View style={orderDetailStyles.priceBox}>
                    <View style={orderDetailStyles.priceFlexBox}>
                        <Text style={orderDetailStyles.priceTitle}>
                            Số tiền thu khách
                        </Text>
                        <Text style={orderDetailStyles.priceValue}>
                            {order?.totalPay}đ
                        </Text>
                    </View>
                    <View style={orderDetailStyles.priceFlexBox}>
                        <Text style={orderDetailStyles.subText}>
                            Bạn sẽ nhận được
                        </Text>
                        <Text style={orderDetailStyles.receive}>
                            {order?.totalReceive}đ
                        </Text>
                    </View>
                    <View style={orderDetailStyles.priceFlexBox}>
                        <Text style={orderDetailStyles.subText}>
                            Gửi về Glow
                        </Text>
                        <Text style={orderDetailStyles.priceValue}>
                            {(order?.totalPay || 0) -
                                (order?.totalReceive || 0) >
                            0
                                ? (order?.totalPay || 0) -
                                  (order?.totalReceive || 0)
                                : 0}
                            đ
                        </Text>
                    </View>
                </View>

                {/* Service Info */}
                <View style={orderDetailStyles.infoRow}>
                    <Entypo name="text-document" size={20} />
                    {order?.prices?.map((item) => (
                        <View key={item.id}>
                            <Text style={orderDetailStyles.infoText}>
                                {item.staffService?.name || ""}
                            </Text>
                            <Text style={orderDetailStyles.points}>
                                {item.unit}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={orderDetailStyles.infoRow}>
                    <Ionicons name="time-outline" size={20} color="red" />
                    <Text
                        style={[orderDetailStyles.infoText, { color: "red" }]}
                    >
                        Giờ làm việc:{" "}
                        {moment(order?.timerTime).format(
                            "MM/DD/YYYY h:mm:ss"
                        ) || ""}
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
                        {order?.paymentMethodId === 1
                            ? `Thanh toán bằng tiền mặt`
                            : `Thanh toán bằng ví Glow`}
                    </Text>
                </View>
            </ScrollView>
            {(order?.status === OrderStatus.Pending  && (order?.isForwardOrder ? (order?.forwardAccept ? false : true ) : true)) ? (
                <View style={orderDetailStyles.btnWrapper}>
                    <TouchableOpacity
                        style={orderDetailStyles.readyCancelBtn}
                        onPress={() => rejectOrder({ id: order.id || 0 })}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Từ chối
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={orderDetailStyles.readyBtn}
                        onPress={() => readyOrder({ id: order.id || 0 })}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Ứng tuyển
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View></View>
            )}
            {(order?.status === OrderStatus.Approved && !order?.isForwardOrder) ? (
                <View style={orderDetailStyles.btnWrapper}>
                    <TouchableOpacity
                        style={orderDetailStyles.readyCancelBtn}
                        onPress={() => {
                            setPopupShow(true);
                        }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Hủy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={orderDetailStyles.readyBtn}
                        onPress={() => finishOrder({ id: order.id || 0 })}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Hoàn thành
                        </Text>
                    </TouchableOpacity>
                    <ReasonCancelPopup
                        onConfirm={onConfirmCancel}
                        visible={popupShow}
                        onClose={() => {
                            setPopupShow(false);
                        }}
                    />
                </View>
            ) : (
                <View></View>
            )}
        </View>
    );
}

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Linking,
    Image,
    RefreshControl,
} from "react-native";
import {
    Ionicons,
    MaterialIcons,
    Entypo,
    FontAwesome,
    AntDesign,
} from "@expo/vector-icons"; // icon libraries
import { orderDetailStyles } from "./style/style";
import useStaffOrderDetail from "./hook/useStaffOrderDetail";
import moment from "moment";
import { OrderForwardStatus, OrderStatus } from "../../../models/Order";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ReasonCancelPopup from "./component/PopUpReasonCancel";
import useRefresh from "../../../hook/useRefresh";
import { emitter, EmitterEvent } from "../../../hook/emitter/mitt";
import StaffStoreListReady from "../staff/components/StaffStoreListReady";
import useUserLoader from "../../../hook/useUserLoader";

export default function OrderDetailScreen(props: { route: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { userLoader } = useUserLoader();
    const [openStoreDialog, setOpenStoreDialog] = useState(false);

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
    const { refresh, onRefresh } = useRefresh();

    const onStoreOwnerReadySelect = (staffIds?: number[]) => {
        if (userLoader?.staffRole != 2) return;
        readyOrder({
            id: order?.id || 0,
            staffIds: staffIds,
        });
        setOpenStoreDialog(false);
    };

    const onReady = () => {
        if (userLoader?.staffRole === 2) {
            setOpenStoreDialog(true);
            return;
        }
        readyOrder({ id: order?.id || 0 })
    };

    const onRefreshScreen = () => {
        const cb = async () => {
            if (!id) return;
            getOrderDetail({ id });
        };
        onRefresh(cb);
    };
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
        if (order?.isOwnerReady) statusText = "Chờ khách chọn";
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
        finishOrder({ id: order?.id || 0 });
    };

    useEffect(() => {
        if (!id) return;
        getOrderDetail({ id });
    }, [id]);

    useEffect(() => {
        emitter.on(EmitterEvent.ReloadStaffOrderDetail, () =>
            getOrderDetail({ id })
        );
        return () => {
            emitter.off(EmitterEvent.ReloadStaffOrderDetail, () =>
                getOrderDetail({ id })
            );
        };
    }, []);
    return (
        <View style={orderDetailStyles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh || false}
                        onRefresh={onRefreshScreen}
                    />
                }
            >
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
                    {order?.customerUser?.urlImage ? (
                        <Image
                            source={{ uri: order?.customerUser?.urlImage }}
                            style={orderDetailStyles.avatar}
                        />
                    ) : (
                        <View style={orderDetailStyles.avatar}></View>
                    )}
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

                <View style={orderDetailStyles.infoRow}>
                    <Entypo name="text-document" size={20} />
                    <View style={{ flex: 1 }}>
                        {(order?.prices || order?.serviceBooking)?.map(
                            (item: any) => (
                                <View
                                    key={item.id}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        flex: 1,
                                    }}
                                >
                                    <Text style={orderDetailStyles.infoText}>
                                        {item.staffService?.name || ""}
                                    </Text>
                                    <Text style={orderDetailStyles.points}>
                                        {item.unit}
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
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

                {order?.customerUser?.phone ? (
                    <View style={orderDetailStyles.infoRow}>
                        <AntDesign name="phone" size={20} color="red" />
                        <Text
                            style={[
                                orderDetailStyles.infoText,
                                { color: "red" },
                            ]}
                        >
                            Sđt: {order?.customerUser?.phone || ""}
                        </Text>
                    </View>
                ) : (
                    <View></View>
                )}

                <View style={orderDetailStyles.infoRow}>
                    <Ionicons name="location-outline" size={20} color={"red"} />
                    <Text
                        style={[orderDetailStyles.infoText, { color: "red" }]}
                    >
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
            {order?.status === OrderStatus.Pending &&
            !order?.isOwnerReady &&
            (order?.isForwardOrder
                ? order?.forwardAccept
                    ? false
                    : true
                : true) ? (
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
                        onPress={() => onReady()}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Ứng tuyển
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View></View>
            )}
            {order?.status === OrderStatus.Approved &&
            !order?.isForwardOrder ? (
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
                        onPress={() => onConfirmFinish()}
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
            <StaffStoreListReady
                open={openStoreDialog}
                onConfirm={onStoreOwnerReadySelect}
                onClose={() => setOpenStoreDialog(false)}
            />
        </View>
    );
}

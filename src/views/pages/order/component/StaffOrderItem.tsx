import { Text, TouchableOpacity, View } from "react-native";
import { orderDetailStyles, styles } from "../style/style";
import Order, {
    OrderForwardStatus,
    OrderStatus,
} from "../../../../models/Order";
import Staff from "../../../../models/Staff";
import moment from "moment";

export default function StaffOrderItem(props: {
    order: Order;
    staff?: Staff | null;
    onRedirectToDetail?: (id: number, props: any) => void;
    onReadyOrder?: (id: number) => void;
    onRejectOrder?: (id: number) => void;
}) {
    let statusText = "";
    if (!props.order.isForwardOrder) {
        if (props.order.status === OrderStatus.Pending) statusText = "Đơn mới";
        if ([OrderStatus.Approved].includes(props.order?.status || 0))
            statusText = "Đang tiến hành";
        if (
            [
                OrderStatus.Denied,
                OrderStatus.Canceled,
                OrderStatus.StaffCanceled,
            ].includes(props.order?.status || 0)
        )
            statusText = "Đã hết hạn";
        if ([OrderStatus.Finished].includes(props.order?.status || 0))
            statusText = "Đã hoàn thành";
        if (
            props.order.isOwnerReady &&
            props.order.status === OrderStatus.Pending
        )
            statusText = "Chờ khách chọn";
    } else {
        if (
            props.order.forwardAccept &&
            props.order.forwardOrderStatus === OrderForwardStatus.Begin
        )
            statusText = "Chờ khách chọn";
        if (
            !props.order.forwardAccept &&
            props.order.forwardOrderStatus === OrderForwardStatus.Begin
        )
            statusText = "Đơn mới";
        if (
            [
                OrderForwardStatus.End,
                OrderForwardStatus.Reject,
                OrderForwardStatus.Switched,
            ].includes(props.order.forwardOrderStatus || 0)
        )
            statusText = "Đã hết hạn";
    }
    let customerName = "";
    if (props.order.status != OrderStatus.Approved) customerName = "Khách hàng";
    if (props.order.status === OrderStatus.Approved)
        customerName = props.order.customerUser?.userName || "Khách hàng";
    let priceName =
        props.order.prices?.find((item) => item.staffService?.name) ||
        props.order.serviceBooking?.find(
            (item: any) => item.staffService?.name
        );
    return (
        <TouchableOpacity
            style={styles.jobCard}
            onPress={() => props.onRedirectToDetail?.(props.order?.id || 0, {})}
        >
            <Text style={styles.title}>
                {priceName?.staffService?.name || ""}
            </Text>
            <Text style={[styles.status, styles.completed]}>
                {[OrderStatus.Pending].includes(props.order.status || 0)
                    ? !props.order.isForwardOrder
                        ? "Khách đặt bạn - "
                        : "Đơn ứng tuyển - "
                    : ""}
                {statusText}
            </Text>
            <Text style={styles.info}>
                🕒 Giờ làm việc:{" "}
                {moment(props.order.timerTime).format("MM/DD/YYYY h:mm:ss")}
            </Text>
            <Text style={styles.info}>👤 {customerName}</Text>
            <Text style={styles.info}>📍 {props.order.address}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>{props.order.totalPay}đ</Text>
            </View>
            {props.order?.status === OrderStatus.Pending &&
            !props.order?.isOwnerReady &&
            (props.order?.isForwardOrder
                ? props.order?.forwardAccept
                    ? false
                    : true
                : true) ? (
                <View style={styles.btnWrapper}>
                    <TouchableOpacity
                        style={styles.readyCancelBtn}
                        onPress={() =>
                            props.onRejectOrder?.(props.order.id || 0)
                        }
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Từ chối
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.readyBtn}
                        onPress={() =>
                            props.onReadyOrder?.(props.order.id || 0)
                        }
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Ứng tuyển
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View></View>
            )}
        </TouchableOpacity>
    );
}

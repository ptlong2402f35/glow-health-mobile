import { Text, View } from "react-native";
import { styles } from "../style/style";
import Order, { OrderStatus } from "../../../../models/Order";

export default function StaffOrderItem(props: {
    order: Order;
}) {
    let statusText = "";
    if(props.order.status === OrderStatus.Pending) statusText = "Đang chờ";
    if([OrderStatus.Approved].includes(props.order?.status || 0 )) statusText = "Đang tiến hành";
    if([OrderStatus.Denied, OrderStatus.Canceled, OrderStatus.StaffCanceled].includes(props.order?.status || 0 )) statusText = "Đã hết hạn";
    if([OrderStatus.Finished].includes(props.order?.status || 0 )) statusText = "Đã hoàn thành";
    let customerName = "";
    if(props.order.status != OrderStatus.Approved) customerName = "Khách hàng";
    if(props.order.status === OrderStatus.Approved) customerName = props.order.customerUser?.userName || "";
    return (
        <View style={styles.jobCard}>
            <Text style={styles.title}>Massage vé</Text>
            <Text
                style={[
                    styles.status,
                    styles.completed,
                ]}
            >
                {statusText}
            </Text>
            <Text style={styles.info}>🕒 Giờ làm việc: {props.order.timerTime?.toLocaleString()}</Text>
            <Text style={styles.info}>👤 {customerName}</Text>
            <Text style={styles.info}>📍 {props.order.address}</Text>
            <View style={styles.footer}>
                {/* <Text>{props.order.duration}</Text> */}
                <Text style={styles.price}>{props.order.total}</Text>
            </View>
        </View>
    );
}

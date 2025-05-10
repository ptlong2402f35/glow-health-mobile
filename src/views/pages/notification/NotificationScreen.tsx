import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { notificationStyles } from "./styles/style";
import Notification, { NotificationActionType } from "../../../models/Notification";
import useNotificationHandle from "./hook/useNotificationHandle";
import moment from "moment";
import BackButton from "../../../common/components/BackButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
export default function NotificationScreen() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { notifications, readMyNotification, loadMore, getMyNotifications } =
        useNotificationHandle();

    const onClickNoti = (id?: number, actiontType?: number, noti?: Notification) => {
        // handle click notification
        switch(actiontType) {
            case NotificationActionType.Wallet: {
                navigation.navigate("Wallet");
                break;
            }
            case NotificationActionType.OrderDetail: {
                navigation.navigate("StaffOrderDetail", {id: noti?.referenceId} as never);
                break;
            }
            case NotificationActionType.OrderList: {
                navigation.navigate("StaffOrderList");
                break;
            }
            case NotificationActionType.StaffProfile: {
                navigation.navigate("StaffInfoUpdate");
                break;
            }
            case NotificationActionType.StaffServiceInfo: {
                navigation.navigate("Home");

                break;
            }
            case NotificationActionType.Home: {
                navigation.navigate("Home");

                break;
            }
            case NotificationActionType.OrderCustomerDetail: {
                navigation.navigate("MyOrderDetail", {id: noti?.referenceId} as never);

                break;
            }
            case NotificationActionType.OrderCustomerList: {
                navigation.navigate("MyOrderList");

                break;
            }
            default: {

            }
        }

        readMyNotification({ notiIds: [id || 0] });
    };

    useEffect(() => {
        getMyNotifications({ page: 1, init: true });
    }, []);
    return (
        <View style={notificationStyles.container}>
            <BackButton color="#fff"/>
            <View style={notificationStyles.header}>
                <Text style={notificationStyles.headerTitle}>Thông báo</Text>
            </View>
            {notifications?.length > 0 ? (
                <FlatList
                    data={notifications}
                    renderItem={({ item }) => (
                        <NotiItem item={item} onClickDetail={onClickNoti} />
                    )}
                    keyExtractor={(item) => item.id + ""}
                    contentContainerStyle={notificationStyles.list}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                />
            ) : (
                <View style={notificationStyles.emptyScreen}>
                    <Text>Bạn không có thông báo nào</Text>
                </View>
            )}
        </View>
    );
}

export function NotiItem(props: {
    item: Notification;
    onClickDetail: (id?: number, actiontType?: number, noti?: Notification) => void;
}) {
    const onclickItem = () => {
        props.onClickDetail(props?.item?.id || 0, props?.item?.actionType || 0, props.item);
    };
    return (
        <TouchableOpacity style={notificationStyles.card} onPress={onclickItem}>
            <Text style={notificationStyles.title}>{props.item.title}</Text>
            <Text style={notificationStyles.message}>{props.item.content}</Text>
            <Text style={notificationStyles.time}>
                {moment(props.item.createdAt).format("MM/DD/YYYY h:mm:ss")}
            </Text>
        </TouchableOpacity>
    );
}

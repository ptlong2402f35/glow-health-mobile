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
import Notification from "../../../models/Notification";
import useNotificationHandle from "./hook/useNotificationHandle";
import moment from "moment";
export default function NotificationScreen() {
    const { notifications, readMyNotification, loadMore, getMyNotifications } =
        useNotificationHandle();

    const onClickNoti = (id?: number) => {
        // handle click notification

        readMyNotification({ notiIds: [id || 0] });
    };

    useEffect(() => {
        getMyNotifications({ page: 1 });
    }, []);
    return (
        <View style={notificationStyles.container}>
            <View style={notificationStyles.header}>
                <Text style={notificationStyles.headerTitle}>Thông báo</Text>
            </View>
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
        </View>
    );
}

export function NotiItem(props: {
    item: Notification;
    onClickDetail: (id?: number) => void;
}) {
    const onclickItem = () => {
        props.onClickDetail(props?.item?.id || 0);
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

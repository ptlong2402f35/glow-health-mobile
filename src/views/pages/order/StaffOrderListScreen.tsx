import React, { useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { styles } from "./style/style";
import useAttachUserLoader from "../../../common/useAttachUserLoader";
import useUserLoader from "../../../hook/useUserLoader";
import { navigate } from "../../../NavigationService";
import useStaffOrderList from "./hook/useStaffOrderList";
import useAlertDialog from "../../../hook/useAlert";
import StaffOrderItem from "./component/StaffOrderItem";
import Order from "../../../models/Order";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { emitter, EmitterEvent } from "../../../hook/emitter/mitt";
import BackButton from "../../../common/components/BackButton";

export default function StaffOrderListScreen() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const {
        isLogin,
        userLoader,
        orders,
        getOrderList,
        readyOrder,
        rejectOrder,
        reload,
        user,
    } = useStaffOrderList();

    if (!isLogin || userLoader?.role !== 3) {
        navigate("Home");
    }

    const loadNextPage = () => {
        getOrderList();
    };

    const onRedirectToDetail = (id?: number, props?: any) => {
        navigation.navigate("StaffOrderDetail", { id, ...props } as never);
    };

    const onReady = (id: number) => {
        readyOrder({
            id: id,
            onSuccess: () => {
                console.log("reload btw");
                reload();
            },
        });
    };

    const onReject = (id: number) => {
        rejectOrder({
            id: id,
            onSuccess: () => {
                reload();
            },
        });
    };

    useEffect(() => {
        reload();

        emitter.on(EmitterEvent.ReloadStaffOrderList, reload);
        return () => {
            emitter.off(EmitterEvent.ReloadStaffOrderList, reload);
        };
    }, []);

    return (
        <View style={styles.container}>
            <BackButton top={32}/>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Danh sách đơn hàng</Text>
            </View>

            <View style={styles.filterBar}>
                <Text style={styles.filterButton}>Hà Nội</Text>
                <Text style={styles.filterButton}>Chọn Quận/Huyện</Text>
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item, index) => index + ""}
                renderItem={({ item }) => (
                    <StaffOrderItem
                        order={item}
                        staff={user?.staff}
                        onRedirectToDetail={onRedirectToDetail}
                        onReadyOrder={onReady}
                        onRejectOrder={onReject}
                    />
                )}
                style={styles.jobList}
                onEndReached={() => loadNextPage()}
            />
        </View>
    );
}

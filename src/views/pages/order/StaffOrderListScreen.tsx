import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    RefreshControl,
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
import StaffStoreListReady from "../staff/components/StaffStoreListReady";
import useRefresh from "../../../hook/useRefresh";

export default function StaffOrderListScreen() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [openStoreDialog, setOpenStoreDialog] = useState(false);
    const [selectOrderId, setSelectOrderId] = useState(0);
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

    const { refresh, onRefresh } = useRefresh();

    const onRefreshScreen = () => {
        const cb = async () => {
            reload();
        };
        onRefresh(cb);
    };

    if (!isLogin || userLoader?.role !== 3) {
        navigate("Home");
    }

    const loadNextPage = () => {
        getOrderList();
    };

    const onRedirectToDetail = (id?: number, props?: any) => {
        navigation.navigate("StaffOrderDetail", { id, ...props } as never);
    };

    const onStoreOwnerReadySelect = (staffIds?: number[]) => {
        if (userLoader?.staffRole != 2) return;
        readyOrder({
            id: selectOrderId,
            staffIds: staffIds,
            onSuccess: () => {
                console.log("reload btw");
                reload();
            },
        });
        setOpenStoreDialog(false);
    };

    const onReady = (id: number) => {
        if (userLoader?.staffRole === 2) {
            setOpenStoreDialog(true);
            setSelectOrderId(id);
            return;
        }
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
        <View style={[styles.container, { paddingTop: 32 }]}>
            <BackButton top={32} />
            <View style={[styles.headerContainer, { marginBottom: 14 }]}>
                <Text
                    style={[
                        styles.header,
                        { fontSize: 24, fontWeight: "bold" },
                    ]}
                >
                    Danh sách đơn hàng
                </Text>
            </View>

            <FlatList
                data={orders}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh || false}
                        onRefresh={onRefreshScreen}
                    />
                }
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
            <StaffStoreListReady
                open={openStoreDialog}
                onConfirm={onStoreOwnerReadySelect}
                onClose={() => setOpenStoreDialog(false)}
            />
        </View>
    );
}

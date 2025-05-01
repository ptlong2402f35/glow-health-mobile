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

export default function StaffOrderListScreen() {
    const { openAlertDialog, closeAlertDialog } = useAlertDialog();
    const { isLogin, userLoader, orders, getOrderList, readyOrder, reload } =
        useStaffOrderList();

    if (!isLogin || userLoader?.role !== 3) {
        navigate("Home");
    }

    const loadNextPage = () => {
        getOrderList();
    }

    useEffect(() => {
        getOrderList();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lượt ứng tuyển 995 / 1000</Text>

            <View style={styles.filterBar}>
                <Text style={styles.filterButton}>Hà Nội</Text>
                <Text style={styles.filterButton}>Chọn Quận/Huyện</Text>
            </View>

            <FlatList
                data={orders}
                keyExtractor={(item, index) => index + ""}
                renderItem={({item}) => <StaffOrderItem order={item} />}
                style={styles.jobList}
                onEndReached={() => loadNextPage()}
            />
        </View>
    );
}

import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { styles } from "./styles/styles";
import StaffItem from "./components/StaffItem";
import useHandleStaffList from "./hook/useHandleStaffList";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function StaffListScreen(props: { route?: any }) {
    let id = props.route.params.id;
    let { staffs, getStaffList, pinnedstaffs, getPinnedStaffList } =
        useHandleStaffList();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const onClickStaffDetail = (staffId: number) => {
        navigation.navigate("StaffDetail", { id: staffId } as never);
    };

    useEffect(() => {
        getStaffList({});
        getPinnedStaffList({ id });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm kỹ thuật viên"
                />
            </View>

            <View style={styles.ratingContainer}>
                <View style={styles.ratingBox}>
                    <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                    <Text>10đ</Text>
                </View>
                <View style={styles.ratingBox}>
                    <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                    <Text>Tuyệt</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>🔥 Đặt theo dịch vụ</Text>
            {pinnedstaffs.length ? (
                pinnedstaffs.map((staff, index) => (
                    <StaffItem
                        key={staff.id?.toString() + `x${index}x`}
                        name={staff?.name}
                        image={null}
                        distance={staff.distance}
                        onClickStaffDetail={() =>
                            onClickStaffDetail(staff.id || 0)
                        }
                    />
                ))
            ) : (
                <View></View>
            )}

            <Text style={styles.sectionTitle}>💅 Kỹ thuật viên ưa thích</Text>
            <View style={styles.staffListContainer}>
                {staffs.map((staff) => {
                    return (
                        <StaffItem
                            key={staff.id}
                            name={staff?.name}
                            image={staff?.user?.urlImage || null}
                            distance={staff.distance}
                            province={staff.province}
                            onClickStaffDetail={() =>
                                onClickStaffDetail(staff.id || 0)
                            }
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
}

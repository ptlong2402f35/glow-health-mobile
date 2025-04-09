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

export default function StaffListScreen() {
    let { staffs, getStaffList } = useHandleStaffList();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const onClickStaffDetail = (staffId: number) => {
        navigation.navigate("StaffDetail", {id: staffId} as never);
    };

    useEffect(()=> {
        getStaffList({});
    },[])
    return (
        <ScrollView style={styles.container}>
            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm kỹ thuật viên"
                />
            </View>

            {/* Đánh giá */}
            <View style={styles.ratingContainer}>
                <View style={styles.ratingBox}>
                    <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                    <Text>10đ</Text>
                </View>
                <View style={styles.ratingBox}>
                    <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                    <Text>Ngon</Text>
                </View>
            </View>

            {/* Dịch vụ */}
            <Text style={styles.sectionTitle}>🔥 Đặt theo dịch vụ</Text>
            <View style={styles.serviceItem}>
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsMvK3Hv6oIIi8OOaniY0YipjQvU1w4uk8A&s",
                    }}
                    style={styles.serviceImage}
                />
                <Text style={styles.serviceText}>Makeup tận nơi</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Đặt</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.serviceItem}>
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsMvK3Hv6oIIi8OOaniY0YipjQvU1w4uk8A&s",
                    }}
                    style={styles.serviceImage}
                />
                <Text style={styles.serviceText}>Nail tận nơi</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Đặt</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.serviceItem}>
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhsMvK3Hv6oIIi8OOaniY0YipjQvU1w4uk8A&s",
                    }}
                    style={styles.serviceImage}
                />
                <Text style={styles.serviceText}>Tẩy lông tận nơi</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Đặt</Text>
                </TouchableOpacity>
            </View>

            {/* Kỹ thuật viên */}
            <Text style={styles.sectionTitle}>💅 Kỹ thuật viên ưa thích</Text>
            <View style={styles.staffListContainer}>
                {staffs.map((staff) => {
                    return (
                        <StaffItem
                            key={staff.id}
                            name={staff?.name}
                            image={null}
                            distance={100}
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

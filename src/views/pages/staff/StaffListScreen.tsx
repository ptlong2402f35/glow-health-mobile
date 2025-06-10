import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
} from "react-native";
import { styles } from "./styles/styles";
import StaffItem from "./components/StaffItem";
import useHandleStaffList from "./hook/useHandleStaffList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Review from "../../../models/Review";
import { reviewOrderStyle } from "../order/style/style";

export default function StaffListScreen(props: { route?: any }) {
    let id = props.route.params.id;
    let [search, setSearch] = useState("");
    let {
        staffs,
        getStaffList,
        pinnedstaffs,
        getPinnedStaffList,
        reviews,
        getAllReview,
        loadMoreReview,
        loadMoreStaffs,
    } = useHandleStaffList();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const onClickStaffDetail = (staffId: number) => {
        navigation.navigate("StaffDetail", { id: staffId } as never);
    };

    const onSearchStaffs = () => {
        if (!search || !search.length) getStaffList({ init: true });
        console.log("xxxx search", search);
        if (search.length >= 3) {
            getStaffList({ name: search, init: true });
        }
    };

    useEffect(() => {
        getStaffList({init: true});
        getPinnedStaffList({ id });
        getAllReview(1, true);
        setSearch("");
    }, []);

    const renderHeader = () => (
        <View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm kỹ thuật viên"
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={onSearchStaffs}
                    returnKeyType="done"
                />
            </View>

            {reviews && reviews.length > 0 && (
                <StaffReviewListBox
                    reviews={reviews}
                    onLoadMore={loadMoreReview}
                />
            )}

            <Text style={styles.sectionTitle}>🔥 Đặt theo dịch vụ</Text>
            {pinnedstaffs.length > 0 &&
                pinnedstaffs.map((staff, index) => (
                    <StaffItem
                        key={staff.id?.toString() + `x${index}x`}
                        name={staff?.name}
                        image={null}
                        distance={staff.distance}
                        onClickStaffDetail={() =>
                            navigation.navigate("StaffDetail", {
                                id: staff.id || 0,
                            } as never)
                        }
                    />
                ))}

            <Text style={styles.sectionTitle}>💅 Kỹ thuật viên ưa thích</Text>
        </View>
    );

    return (
        // <ScrollView
        //     style={styles.container}
        // >
        //     <View style={styles.searchContainer}>
        //         <TextInput
        //             style={styles.searchInput}
        //             placeholder="Tìm kiếm kỹ thuật viên"
        //             value={search}
        //             onChangeText={setSearch}
        //             onSubmitEditing={() => onSearchStaffs()}
        //             returnKeyType="done"
        //         />
        //     </View>

        //     {reviews && reviews.length ? (
        //         <StaffReviewListBox
        //             reviews={reviews}
        //             onLoadMore={loadMoreReview}
        //         />
        //     ) : (
        //         <View></View>
        //     )}

        //     <Text style={styles.sectionTitle}>🔥 Đặt theo dịch vụ</Text>
        //     {pinnedstaffs.length ? (
        //         pinnedstaffs.map((staff, index) => (
        //             <StaffItem
        //                 key={staff.id?.toString() + `x${index}x`}
        //                 name={staff?.name}
        //                 image={null}
        //                 distance={staff.distance}
        //                 onClickStaffDetail={() =>
        //                     onClickStaffDetail(staff.id || 0)
        //                 }
        //             />
        //         ))
        //     ) : (
        //         <View></View>
        //     )}

        //     <Text style={styles.sectionTitle}>💅 Kỹ thuật viên ưa thích</Text>
        //     <View style={styles.staffListContainer}>
        //         {staffs.map((staff) => {
        //             return (
        //                 <StaffItem
        //                     key={staff.id}
        //                     name={staff?.name}
        //                     image={staff?.user?.urlImage || null}
        //                     distance={staff.distance}
        //                     province={staff.province}
        //                     onClickStaffDetail={() =>
        //                         onClickStaffDetail(staff.id || 0)
        //                     }
        //                 />
        //             );
        //         })}
        //     </View>
        // </ScrollView>
        <FlatList
            style={styles.container}
            data={staffs}
            keyExtractor={(item) => item?.id + ""}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
                <StaffItem
                    key={item.id}
                    name={item?.name}
                    image={item?.user?.urlImage || null}
                    distance={item.distance}
                    province={item.province}
                    onClickStaffDetail={() =>
                        navigation.navigate("StaffDetail", {
                            id: item.id || 0,
                        } as never)
                    }
                />
            )}
            onEndReached={loadMoreStaffs}
            onEndReachedThreshold={0.05}
            contentContainerStyle={styles.staffListContainer}
        />
    );
}

export function StaffReviewListBox(props: {
    reviews: Review[];
    onLoadMore: () => void;
}) {
    return (
        <View style={{ marginBottom: 12, marginTop: 12 }}>
            <Text
                style={{ marginBottom: 12, fontSize: 18, fontWeight: "bold" }}
            >
                Đánh giá
            </Text>
            <FlatList
                data={props.reviews}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#f8f8f8",
                            borderRadius: 12,
                            padding: 12,
                        }}
                    >
                        <View
                            style={[
                                reviewOrderStyle.starContainer,
                                { marginBottom: 8, minWidth: 120, height: 20 },
                            ]}
                        >
                            {[...Array(5)].map((_, index) => (
                                <Text
                                    key={index}
                                    style={[
                                        index < (item?.rate || 5)
                                            ? reviewOrderStyle.starActive
                                            : reviewOrderStyle.starInactive,
                                        {
                                            fontSize: 18,
                                            marginHorizontal: 0,
                                        },
                                    ]}
                                    // onPress={() => setRating(index + 1)}
                                >
                                    ★
                                </Text>
                            ))}
                        </View>
                        <View style={{ display: "flex", alignItems: "center" }}>
                            <Text
                                style={{ alignContent: "center" }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {item.note}
                            </Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id + ""}
                onEndReached={() => props.onLoadMore()}
            />
        </View>
    );
}

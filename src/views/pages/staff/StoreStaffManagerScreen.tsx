import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Switch,
    Image,
    StyleSheet,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import Staff from "../../../models/Staff";
import useHandleStaffStore from "./hook/useHandleStaffStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BackButton from "../../../common/components/BackButton";
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");

export default function StoreStaffManagerScreen() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { staffList, reload, loadMore, deactiveStaff } =
        useHandleStaffStore();

    const onSelectInfo = (staffId?: number) => {
        navigation.navigate("StoreStaffInfo", { staffId } as never);
    };

    const onDeactiveStaff = (id?: number, active?: boolean) => {
        deactiveStaff({
            id,
            active,
        });
    };

    const onSelectStaffService = (staffId?: number) => {
        navigation.navigate("StoreStaffService", { staffId } as never);
    };

    const onRegister = () => {
        navigation.navigate("StoreStaffInfo", { isRegister: true } as never);
    };

    useEffect(() => {
        reload();
    }, []);
    return (
        <View style={styles.container}>
            <BackButton />
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // padding: 12,
                    marginBottom: 16,
                    // backgroundColor: "green",
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        alignItems: "center",
                    }}
                >
                    Quản lý cơ sở
                </Text>
            </View>
            <FlatList
                data={staffList}
                renderItem={({ item }) => (
                    <StaffStoreItem
                        staff={item}
                        onSelectInfo={onSelectInfo}
                        onSelectStaffService={onSelectStaffService}
                        onChangeActive={onDeactiveStaff}
                    />
                )}
                keyExtractor={(item) => item.id + ""}
                onEndReached={() => loadMore()}
            />
            <TouchableOpacity style={styles.addButton} onPress={onRegister}>
                <Text style={styles.addButtonText}>Thêm Kỹ thuật viên</Text>
            </TouchableOpacity>
        </View>
    );
}

export function StaffStoreItem(props: {
    staff?: Staff;
    onSelectInfo?: (staffId?: number) => void;
    onSelectStaffService?: (staffId?: number) => void;
    onChangeActive?: (id?: number, active?: boolean) => void;
}) {
    const [enable, setEnable] = useState(false);

    const onToogle = () => {
        props.onChangeActive?.(props.staff?.id || 0, !enable);
        setEnable(!enable);
    };

    useEffect(() => {
        if (props.staff?.active) setEnable(true);
        if (!props.staff?.active) setEnable(false);
    }, [props.staff?.active]);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image
                    source={
                        props?.staff?.user?.urlImage
                            ? { uri: props.staff.user.urlImage }
                            : DefaultAvatar
                    }
                    style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.branchName}>
                        {props.staff?.name || ""}
                    </Text>
                </View>
                <Switch value={enable} onValueChange={onToogle} />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.onSelectInfo?.(props.staff?.id || 0)}
                >
                    <Feather name="info" size={24} color="black" />
                    <Text style={styles.buttonText}>Quản lý thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        props.onSelectStaffService?.(props.staff?.id || 0)
                    }
                >
                    <Ionicons name="document-text" size={24} color="black" />
                    <Text style={styles.buttonText}>Quản lý dịch vụ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    branchName: {
        fontWeight: "bold",
        fontSize: 14,
        marginLeft: 8,
        flex: 1,
        flexWrap: "wrap",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#ccc",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#e6f1e8",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        flex: 0.48,
    },
    buttonText: {
        marginLeft: 6,
        color: "#2f4f2f",
        fontWeight: "500",
    },
    errorText: {
        color: "red",
        marginTop: 8,
        fontWeight: "600",
    },
    addButton: {
        backgroundColor: "#3b5f3b",
        padding: 14,
        borderRadius: 24,
        alignItems: "center",
        marginTop: 8,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

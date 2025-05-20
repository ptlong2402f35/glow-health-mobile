import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import HomeScreen from "../../views/pages/home/HomeScreen";
import LoginScreen from "../../views/pages/login/LoginScreen";
import SignUpScreen from "../../views/pages/login/SignupScreen";
import { NavigationProp, useNavigation, useNavigationState } from "@react-navigation/native";
import useBottomTab from "../../hook/useBottomTab";
import useUserLoader from "../../hook/useUserLoader";
import { StaffRole } from "../../models/Staff";
import { UserRole } from "../../models/User";

export default function BottomTab() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const currentRouteName = useNavigationState((state) => {
            const route = state.routes[state.index];
            return route.name;
        });
    const { tabName, changeTab } = useBottomTab();
    const { isLogin, userLoader } = useUserLoader();
    let role = userLoader?.role;
    let isStaff = role === UserRole.Staff;

    const onChangeTab = (name: string) => {
        console.log("navigation", name);
        changeTab?.(name);
        navigation.navigate(name as any);
    };

    useEffect(() => {
        if(tabName != currentRouteName) {
            changeTab?.(currentRouteName);
        }
    }, [tabName]);

    return (
        <View
            style={{
                flex: 1,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            {isLogin && isStaff ? (
                <StaffBottomTab tabName={tabName} onChangeTab={onChangeTab} />
            ) : (
                <GuestTab tabName={tabName} onChangeTab={onChangeTab} />
            )}
        </View>
    );
}

function TabButton(props: {
    title: string;
    onPress: () => void;
    active: boolean;
}) {
    return (
        <TouchableOpacity style={styles.tabButton} onPress={props.onPress}>
            <Text
                style={{
                    color: props.active ? "#2e7d32" : "#888",
                    fontWeight: props.active ? "bold" : "normal",
                }}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

function StaffBottomTab(props: {
    tabName?: string;
    onChangeTab?: (name: string) => void;
}) {
    return (
        <View style={styles.tabBar}>
            <TabButton
                title="Trang chủ"
                active={props.tabName === "Home"}
                onPress={() => props.onChangeTab?.("Home")}
            />
            <TabButton
                title="Nhận việc"
                active={props.tabName === "StaffOrderList"}
                onPress={() => props.onChangeTab?.("StaffOrderList")}
            />
            <TabButton
                title="Tài khoản"
                active={props.tabName === "UserAccount"}
                onPress={() => props.onChangeTab?.("UserAccount")}
            />
        </View>
    );
}

function GuestTab(props: {
    tabName?: string;
    onChangeTab?: (name: string) => void;
}) {
    return (
        <View style={styles.tabBar}>
            <TabButton
                title="Trang chủ"
                active={props.tabName === "Home"}
                onPress={() => props.onChangeTab?.("Home")}
            />
            <TabButton
                title="Tài khoản"
                active={props.tabName === "UserAccount"}
                onPress={() => props.onChangeTab?.("UserAccount")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    tabButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

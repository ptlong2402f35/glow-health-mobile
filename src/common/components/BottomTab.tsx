import React, { useState } from "react";
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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useBottomTab from "../../hook/useBottomTab";

export default function BottomTab() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { tabName, changeTab } = useBottomTab();

    const onChangeTab = (name: string) => {
        changeTab?.(name);
        navigation.navigate(name as any);
    };

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
            <View style={styles.tabBar}>
                <TabButton
                    title="Home"
                    active={tabName === "Home"}
                    onPress={() => onChangeTab("Home")}
                />
                <TabButton
                    title="Profile"
                    active={tabName === "Login"}
                    onPress={() => onChangeTab("Login")}
                />
                <TabButton
                    title="Settings"
                    active={tabName === "Signup"}
                    onPress={() => onChangeTab("Signup")}
                />
            </View>
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
                    color: props.active ? "#2f95dc" : "#888",
                    fontWeight: props.active ? "bold" : "normal",
                }}
            >
                {props.title}
            </Text>
        </TouchableOpacity>
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

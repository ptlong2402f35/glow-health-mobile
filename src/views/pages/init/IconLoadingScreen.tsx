import React, { useEffect } from "react";
import {
    View,
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import useInitApp from "./hook/useInitApp";
import { NavigationProp, useNavigation } from "@react-navigation/native";
const image = require("../../../../assets/glow.jpg");

const IconLoadingScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { handleInitApp } = useInitApp();
    const init = async () => {
        let isLogin = await handleInitApp();
        if (isLogin) {
            navigation.navigate("Home");
        } else {
            navigation.navigate("Home");
        }
    };

    useEffect(()=> {
        init();
    }, []);

    return (
        <ImageBackground
            source={image}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Tùy chọn: che mờ ảnh nền
    },
});

export default IconLoadingScreen;

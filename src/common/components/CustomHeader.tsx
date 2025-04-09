import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Bạn có thể dùng icon khác tùy ý
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useUserLoader from "../../hook/useUserLoader";
const DefaultAvatar = require("../../../assets/defaultAvatar.png");

const CustomHeader = (props: { avatarUrl?: string; name?: string }) => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { userLoader, isLogin } = useUserLoader();
    let userRole = userLoader?.role;

    const notiClick = () => {
        navigation.navigate("Notification");
    };

    const customerSubTab = () => {
        if(!isLogin) navigation.navigate("Login");
        if(userRole === 2) {
            //navigation register
        }
        if(userRole === 3) {
            //navi detail
        }
    };
    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftSection}>
                <Image
                    source={
                        (props.avatarUrl || userLoader?.urlImage) && isLogin
                            ? {
                                  uri: props.avatarUrl || userLoader?.urlImage,
                              }
                            : DefaultAvatar
                    }
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.name}>
                        {isLogin
                            ? props.name ||
                              userLoader?.name ||
                              userLoader?.phone
                            : "Xin chào quý khách"}
                    </Text>
                    <Text style={styles.name} onPress={customerSubTab}>
                            {isLogin ? (userRole === 2 ? "Đăng kí KTV Glow" : "Đối tác Glow") : "Đăng nhập để trải nghiệm"}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={notiClick}>
                <Ionicons
                    name="notifications-outline"
                    size={26}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        zIndex: 9999
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "500",
    },
});

export default CustomHeader;

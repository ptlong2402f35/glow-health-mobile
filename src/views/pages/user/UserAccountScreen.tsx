import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    Switch,
    TouchableOpacity,
} from "react-native";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import { userAccountStyles } from "./style/style";
import useUserLoader from "../../../hook/useUserLoader";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useAttachUserLoader from "../../../common/useAttachUserLoader";
import { UserRole } from "../../../models/User";
import BottomTab from "../../../common/components/BottomTab";
import BackButton from "../../../common/components/BackButton";
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");

export default function AccountScreen() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { isLogin, userLoader } = useUserLoader();
    const { logout } = useUserLoader();

    const redirectLogin = () => {
        navigation.navigate("Login");
    };

    const handleLogout = () => {
        logout?.();
        navigation.navigate("Login");
    };

    return (
        <View style={{ minHeight: "100%", paddingBottom: 82}}>
            {!isLogin ? (
                <View style={userAccountStyles.loginBtnWrap}>
                    <TouchableOpacity style={userAccountStyles.loginWrap}>
                        <Text
                            style={userAccountStyles.loginText}
                            onPress={() => redirectLogin()}
                        >
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    style={userAccountStyles.container}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={userAccountStyles.profileContainer}>
                        <Image
                            source={
                                userLoader?.urlImage
                                    ? { uri: userLoader.urlImage }
                                    : DefaultAvatar
                            }
                            style={userAccountStyles.avatar}
                        />
                        <View style={userAccountStyles.userInfo}>
                            <Text style={userAccountStyles.name}>
                                {userLoader?.name || ""}
                            </Text>
                            <Text style={userAccountStyles.phone}>
                                {userLoader?.phone || ""}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={userAccountStyles.card}
                        onPress={() => {
                            navigation.navigate("StaffInfoUpdate", {
                                isRegister:
                                    userLoader?.role === UserRole.Staff
                                        ? false
                                        : true,
                            } as never);
                        }}
                    >
                        <FontAwesome
                            name="handshake-o"
                            size={24}
                            color="black"
                        />
                        <Text style={userAccountStyles.cardText}>
                            {userLoader?.role === UserRole.Staff
                                ? "Đối tác Glow - Thông tin chi tiết"
                                : "Đăng kí đối tác Glow Health"}
                        </Text>
                    </TouchableOpacity>

                    {
                        userLoader?.role === UserRole.Staff ? (
                            <TouchableOpacity
                                style={userAccountStyles.card}
                                onPress={() => {
                                    navigation.navigate("StaffServiceUpdate");
                                }}
                            >
                                <FontAwesome
                                    name="handshake-o"
                                    size={24}
                                    color="black"
                                />
                                <Text style={userAccountStyles.cardText}>
                                    Dịch vụ của tôi
                                </Text>
                            </TouchableOpacity>
                        ) : <></>
                    }

                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: "#ccc",
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={userAccountStyles.listItem}
                        onPress={() => {
                            navigation.navigate("MyOrderList");
                        }}
                    >
                        <Text style={userAccountStyles.listText}>
                            <FontAwesome
                                name="history"
                                size={24}
                                color="black"
                            />
                            Lịch sử hoạt động
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={userAccountStyles.listItem}
                        onPress={() => {
                            navigation.navigate("Support");
                        }}
                    >
                        <Text style={userAccountStyles.listText}>
                            <Ionicons name="headset" size={22} />
                            Hỗ trợ
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={userAccountStyles.listItem}
                        onPress={() => {
                            navigation.navigate("Wallet");
                        }}
                    >
                        <Text style={userAccountStyles.listText}>
                            <Ionicons name="wallet" size={22} />
                            Số dư Glow
                        </Text>
                        <Text style={userAccountStyles.balance}>
                            {userLoader?.totalMoney || "0"} đ
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={userAccountStyles.listItem}
                        onPress={() => {
                            navigation.navigate("CustomerAddressList");
                        }}
                    >
                        <Text style={userAccountStyles.listText}>
                            <FontAwesome
                                name="map-marker"
                                size={24}
                                color="black"
                            />
                            Địa chỉ của tôi
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={userAccountStyles.listItem}
                        onPress={() => {
                            navigation.navigate("MyCustomerDetail");
                        }}
                    >
                        <Text style={userAccountStyles.listText}>
                            <AntDesign name="user" size={24} color="black" />
                            Thông tin cá nhân
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={userAccountStyles.listItem}
                        onPress={() => {
                            navigation.navigate("UpdatePassword");
                        }}
                    >
                        <Text style={userAccountStyles.listText}>
                            <AntDesign name="lock" size={24} color="black" />
                            Đổi mật khẩu
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={userAccountStyles.listItem}
                        onPress={() => handleLogout()}
                    >
                        <Text style={userAccountStyles.listText}>
                            <MaterialIcons
                                name="logout"
                                size={24}
                                color="black"
                            />
                            Đăng xuất
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
            <BottomTab />
        </View>
    );
}

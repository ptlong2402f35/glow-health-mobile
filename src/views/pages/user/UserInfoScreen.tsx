import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { userInfoStyles } from "./style/style";
import useUserLoader from "../../../hook/useUserLoader";
import BackButton from "../../../common/components/BackButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");

export default function UserInfoScreen() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const { user } = useUserLoader();

    return (
        <ScrollView style={userInfoStyles.container}>
            <BackButton />
            <View style={userInfoStyles.header}>
                <Text style={userInfoStyles.title}>Thông tin tài khoản</Text>
                <Image
                    source={
                        user?.urlImage ? { uri: user?.urlImage } : DefaultAvatar
                    }
                    style={userInfoStyles.avatar}
                />
            </View>

            <View style={userInfoStyles.infoContainer}>
                <InfoRow
                    label="Họ và tên"
                    value={user?.staff?.name || user?.userName || ""}
                />
                <InfoRow label="Số điện thoại" value={user?.phone || ""} />
                <InfoRow
                    label="Giới tính"
                    value={user?.gender === 1 ? "Nam" : "Nữ"}
                />
                <InfoRow
                    label="Đối tác Glow"
                    value="Xem thông tin hồ sơ"
                    isLink
                />
            </View>

            <View style={userInfoStyles.buttonContainer}>
                <TouchableOpacity style={userInfoStyles.deleteButton}>
                    <Text style={userInfoStyles.buttonText}>Xoá tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={userInfoStyles.editButton} onPress={() => navigation.navigate("UserInfoUpdate")}>
                    <Text style={userInfoStyles.buttonText}>Sửa thông tin</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export function InfoRow(props: {
    label?: string;
    value?: string;
    isLink?: boolean;
}) {
    return (
        <View style={userInfoStyles.row}>
            <Text style={userInfoStyles.label}>{props?.label}</Text>
            <Text
                style={[
                    userInfoStyles.value,
                    props?.isLink && { color: "purple" },
                ]}
            >
                {props?.value || ""}
            </Text>
        </View>
    );
}

import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { userInfoUpdateStyles } from "./style/style";
import useUserLoader from "../../../hook/useUserLoader";
import BackButton from "../../../common/components/BackButton";
import UseUserInfoHandler from "./hook/useUserInfoHandler";
import useImagePicker from "../../../hook/useImagePicker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");

export default function UserInfoUpdateScreen() {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { user, reloadMe } = useUserLoader();
    const [name, setName] = useState("");
    const [gender, setGender] = useState(1);
    const [image, setImage] = useState<any>(null);
    const [imageObj, setImageObj] = useState<any>(null);

    const { imagePicker, uploadImage } = useImagePicker();
    const { onUpdateProfile } = UseUserInfoHandler();

    const onConfirm = async () => {
        console.log("????", image);
        let urlImage = "";
        if (image && image != user?.urlImage) {
            urlImage = await uploadImage(imageObj);
        }
        await onUpdateProfile({
            name,
            gender,
            image: urlImage,
            afterClose: async () => {
                console.log("????");
                await reloadMe?.();
                navigation.navigate("MyCustomerDetail");
            },
        });
    };

    const onSelectImage = async () => {
        let resp = await imagePicker();
        console.log("resp ===", resp);
        setImage(resp?.uri);
        setImageObj(resp);
    };

    useEffect(() => {
        setName(user?.userName || "");
        setGender(user?.gender || 1);
        setImage(user?.urlImage || "");
    }, [user?.id]);

    return (
        <View style={userInfoUpdateStyles.container}>
            <BackButton />
            <Text style={userInfoUpdateStyles.header}>Sửa thông tin</Text>

            <View style={userInfoUpdateStyles.avatarContainer}>
                <Image
                    source={image ? { uri: image } : DefaultAvatar}
                    style={userInfoUpdateStyles.avatar}
                />
                <TouchableOpacity onPress={onSelectImage}>
                    <Text style={userInfoUpdateStyles.editText}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>

            <View style={userInfoUpdateStyles.form}>
                <Text style={userInfoUpdateStyles.label}>Họ và tên</Text>
                <TextInput
                    style={userInfoUpdateStyles.input}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={userInfoUpdateStyles.label}>Số điện thoại</Text>
                <TextInput
                    style={[
                        userInfoUpdateStyles.input,
                        userInfoUpdateStyles.disabledInput,
                    ]}
                    value={user?.phone || ""}
                    editable={false}
                />

                <Text style={userInfoUpdateStyles.label}>
                    Giới tính <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={userInfoUpdateStyles.radioGroup}>
                    <RadioButton
                        label="Nam"
                        selected={gender === 1}
                        onPress={() => setGender(1)}
                    />
                    <RadioButton
                        label="Nữ"
                        selected={gender === 2}
                        onPress={() => setGender(2)}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={userInfoUpdateStyles.saveButton}
                onPress={onConfirm}
            >
                <Text style={userInfoUpdateStyles.saveButtonText}>
                    Lưu thông tin
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export function RadioButton(props: {
    label?: string;
    selected?: boolean;
    onPress?: () => void;
}) {
    return (
        <TouchableOpacity
            style={userInfoUpdateStyles.radioButton}
            onPress={props?.onPress}
        >
            <View
                style={[
                    userInfoUpdateStyles.radioOuter,
                    props?.selected && userInfoUpdateStyles.radioSelectedOuter,
                ]}
            >
                {props?.selected && (
                    <View style={userInfoUpdateStyles.radioInner} />
                )}
            </View>
            <Text style={userInfoUpdateStyles.radioLabel}>{props?.label}</Text>
        </TouchableOpacity>
    );
}

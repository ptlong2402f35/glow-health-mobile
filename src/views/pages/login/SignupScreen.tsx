import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Alert,
} from "react-native";
import { signupStyles } from "./styles/loginStyle";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useHandleLogin from "./hook/useHandleLogin";
import useAlertDialog from "../../../hook/useAlert";
import BottomTab from "../../../common/components/BottomTab";
// import BottomTab from "../../../common/components/BottomTab";

const SignUpScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { openAlertDialog, closeAlertDialog } = useAlertDialog();
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");

    const { onHandleSignup } = useHandleLogin();

    const handleSignUp = () => {
        if (!phone || !confirmPassword || !password) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        onHandleSignup({
            phone,
            password,
            confirmPassword,
            onSuccess: () => {},
            onFail: (message) => {
                openAlertDialog?.("Thông báo", `Đăng ký thất bại: ${message}`);
            },
        });
    };

    return (
        <View style={signupStyles.container}>
            <Text style={signupStyles.title}>Đăng ký tài khoản</Text>

            <TextInput
                style={signupStyles.input}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />

            <TextInput
                style={signupStyles.input}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TextInput
                style={signupStyles.input}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />

            {/* Nút Đăng ký */}
            <TouchableOpacity
                style={signupStyles.button}
                onPress={handleSignUp}
            >
                <Text style={signupStyles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>

            {/* Nút chuyển đến trang đăng nhập */}
            <View style={signupStyles.loginContainer}>
                <Text>Bạn đã có tài khoản? </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                >
                    <Text style={signupStyles.loginText}>Đăng nhập ngay</Text>
                </TouchableOpacity>
            </View>

            <BottomTab/>
        </View>
    );
};

export default SignUpScreen;

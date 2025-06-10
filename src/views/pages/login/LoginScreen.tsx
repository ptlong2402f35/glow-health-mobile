import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles/loginStyle";
import { useContext, useState } from "react";
import useLoadingDialog from "../../../hook/useLoading";
import useHandleLogin from "./hook/useHandleLogin";
import useAlertDialog from "../../../hook/useAlert";
import BottomTab from "../../../common/components/BottomTab";
// import BottomTab from "../../../common/components/BottomTab";

export default function LoginScreen(props: any) {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog, closeAlertDialog } = useAlertDialog();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const { onHandleLogin } = useHandleLogin();

    const login = () => {
        onHandleLogin({
            phone,
            password,
            onSuccess: () => {
                navigation.navigate("Home");
            },
            onFail: (message) => {
                openAlertDialog?.(
                    "Thông báo",
                    `Đăng nhập thất bại: ${message}`
                );
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng Nhập</Text>

            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={() => login()}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("Signup");
                }}
            >
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>

            <Text
                style={styles.skipBtnText}
                onPress={() => {
                    navigation.navigate("Home");
                }}
            >
                Bỏ qua
            </Text>

        </View>
    );
}

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import UseUserInfoHandler from "./hook/useUserInfoHandler";
import useAlertDialog from "../../../hook/useAlert";
import BackButton from "../../../common/components/BackButton";
export default function ChangePasswordScreen() {
    const { onUpdatePassword } = UseUserInfoHandler();
    const { openAlertDialog } = useAlertDialog();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [secureCurrent, setSecureCurrent] = useState(true);
    const [secureNew, setSecureNew] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);

    const isButtonDisabled =
        !currentPassword || !newPassword || !confirmPassword;

    const confirmUpdatePassword = () => {
        if (newPassword != confirmPassword) {
            openAlertDialog?.(
                "Thông báo",
                "Mật khẩu nhập lại không trùng khớp"
            );
            return;
        }
        onUpdatePassword({
            oldPass: currentPassword,
            newPass: newPassword,
        });
    };

    return (
        <View style={styles.container}>
            <BackButton/>
            <Text style={styles.title}>Đổi mật khẩu</Text>

            <Text style={styles.label}>Mật khẩu hiện tại</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureCurrent}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
                <TouchableOpacity
                    onPress={() => setSecureCurrent(!secureCurrent)}
                >
                    {!secureCurrent ? (
                        <Entypo name="eye-with-line" size={24} color="black" />
                    ) : (
                        <Entypo name="eye" size={24} color="black" />
                    )}
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Mật khẩu mới</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureNew}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setSecureNew(!secureNew)}>
                    {!secureNew ? (
                        <Entypo name="eye-with-line" size={24} color="black" />
                    ) : (
                        <Entypo name="eye" size={24} color="black" />
                    )}
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Xác nhận lại mật khẩu</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    secureTextEntry={secureConfirm}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                    onPress={() => setSecureConfirm(!secureConfirm)}
                >
                    {!secureConfirm ? (
                        <Entypo name="eye-with-line" size={24} color="black" />
                    ) : (
                        <Entypo name="eye" size={24} color="black" />
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[
                    styles.button,
                    isButtonDisabled && styles.buttonDisabled,
                ]}
                disabled={isButtonDisabled}
                onPress={confirmUpdatePassword}
            >
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#fff",
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 32,
        alignSelf: "center",
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        marginTop: 16,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 999,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#f9f9f9",
    },
    input: {
        flex: 1,
        height: 48,
    },
    button: {
        marginTop: 40,
        backgroundColor: "green",
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Image,
} from "react-native";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { supportStyles } from "./style/style";
import BackButton from "../../../common/components/BackButton";

export default function SupportScreen() {
    return (
        <View style={supportStyles.container}>
            <BackButton/>
            <Text style={supportStyles.title}>Thông tin liên hệ</Text>

            <View style={supportStyles.wrapper}>
                <TouchableOpacity
                    style={[supportStyles.card, { backgroundColor: "#d0e4ff" }]}
                >
                    <Image
                        source={require("../../../../assets/zalo-icon.png")}
                        style={supportStyles.iconImage}
                    />
                    <Text style={supportStyles.cardText}>
                        Zalo: BK Việt Nam - Glow App
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[supportStyles.card, { backgroundColor: "#b2f7b0" }]}
                    onPress={() =>
                        Linking.openURL("mailto:support@glowvietnam.com")
                    }
                >
                    <MaterialIcons
                        name="email"
                        size={24}
                        color="red"
                        style={supportStyles.icon}
                    />
                    <Text style={supportStyles.cardText}>
                        Email: support@glowvietnam.com
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[supportStyles.card, { backgroundColor: "#ffd5cc" }]}
                    onPress={() => Linking.openURL("tel:0888129100")}
                >
                    <Ionicons
                        name="call"
                        size={24}
                        color="red"
                        style={supportStyles.icon}
                    />
                    <Text style={supportStyles.cardText}>
                        Hotline: 0888129100
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

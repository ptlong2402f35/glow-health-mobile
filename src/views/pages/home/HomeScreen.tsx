import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/style";
import CustomHeader from "../../../common/components/CustomHeader";
import BottomTab from "../../../common/components/BottomTab";
import useUserLoader from "../../../hook/useUserLoader";
import { navigate } from "../../../NavigationService";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const data = [
    {
        id: 1,
        title: "Massage, làm đẹp tại nhà",
        params: {
            groupService: "Massage",
            groupServiceId: 1,
            bannerId: "massage-at-home"
        },
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvaJdUHl-RzWQPtVKdPa4wNiLkV7SM--1Ig&s",
    },
    {
        id: 2,
        title: "Làm đẹp tại nhà",
        params: {
            groupService: "training",
            groupServiceId: 1,
            bannerId: "training-at-home"
        },
        image: "https://glow-prod-images.s3.ap-southeast-1.amazonaws.com/spa-images/eafe4bbf-c6ad-496b-bd22-5587e74da7c8.png",
    },
    {
        id: 3,
        title: "Hỗ trợ tập luyện",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43oVazPnwziT2RBe0A2_vEHI5UCFYhuwjug&s",
    },
    {
        id: 4,
        title: "Massage, làm đẹp tại nhà",
        params: {
            groupService: "Massage",
            groupServiceId: 1,
        },
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvaJdUHl-RzWQPtVKdPa4wNiLkV7SM--1Ig&s",
    },
    {
        id: 5,
        title: "Làm đẹp tại nhà",
        image: "https://glow-prod-images.s3.ap-southeast-1.amazonaws.com/spa-images/eafe4bbf-c6ad-496b-bd22-5587e74da7c8.png",
    },
    {
        id: 6,
        title: "Hỗ trợ tập luyện",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43oVazPnwziT2RBe0A2_vEHI5UCFYhuwjug&s",
    },
];

const HomeScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    return (
        <View style={styles.container}>
            <CustomHeader />
            <ScrollView style={styles.wrapper}>
                {data.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() => {
                            navigation.navigate("StaffList", {id: item?.params?.bannerId || ""} as never);
                        }}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardOverlay}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Ionicons
                                name="arrow-forward"
                                size={20}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <BottomTab />
        </View>
    );
};

export default HomeScreen;

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { reviewOrderStyle } from "./style/style";
import BackButton from "../../../common/components/BackButton";
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");

export default function ReviewOrderScreen(props: { route: any }) {
    const urlImage = props.route.params?.urlImage || "";
    const staffName = props.route.params?.staffName || "";
    const serviceNames = props.route.params?.urlImage || [];
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");

    const onConfirmReview = () => {};

    return (
        <ScrollView contentContainerStyle={reviewOrderStyle.container}>
            <BackButton/>
            <Text style={reviewOrderStyle.header}>Đánh giá</Text>

            <Image
                source={urlImage ? { uri: urlImage } : DefaultAvatar}
                style={reviewOrderStyle.avatar}
            />

            <Text style={reviewOrderStyle.partner}>Đối tác Glow</Text>
            <Text style={reviewOrderStyle.title}>{staffName || ""}</Text>

            <Text style={reviewOrderStyle.question}>
                Bạn có hài lòng về chất lượng dịch vụ?
            </Text>

            {/* Star rating */}
            <View style={reviewOrderStyle.starContainer}>
                {[...Array(5)].map((_, index) => (
                    <Text
                        key={index}
                        style={
                            index < rating
                                ? reviewOrderStyle.starActive
                                : reviewOrderStyle.starInactive
                        }
                        onPress={() => setRating(index + 1)}
                    >
                        ★
                    </Text>
                ))}
            </View>

            <Text style={reviewOrderStyle.label}>Dịch vụ</Text>
            {serviceNames.map((service: any) => (
                <Text style={reviewOrderStyle.service}>{service}</Text>
            ))}

            <Text style={reviewOrderStyle.label}>Đánh giá</Text>
            <TextInput
                style={reviewOrderStyle.input}
                placeholder="Nhập đánh giá"
                multiline
                value={review}
                onChangeText={setReview}
            />

            <TouchableOpacity style={reviewOrderStyle.button} onPress={onConfirmReview}>
                <Text style={reviewOrderStyle.buttonText}>Hoàn thành</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

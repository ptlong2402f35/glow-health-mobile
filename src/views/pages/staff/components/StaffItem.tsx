import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/styles";
const DefaultAvatar = require("../../../../../assets/defaultAvatar.png");

export default function StaffItem(props: {
    image?: string | null,
    name?: string | null,
    distance?: number | null,
    onClickStaffDetail?: () => void,
    staffId?: number | null,
}) {
    return (
        <View style={styles.serviceItem} key={props.staffId}>
            <Image
                source={props.image ? {uri: props.image} : DefaultAvatar}
                style={styles.serviceImage}
            />
            <View style={{ flex: 1 }}>
                <Text>{props?.name || ""}</Text>
                {props.distance && <Text style={{ color: "gray" }}></Text>}
            </View>
            <TouchableOpacity style={styles.button} onPress={props.onClickStaffDetail}>
                <Text style={styles.buttonText}>Đặt</Text>
            </TouchableOpacity>
        </View>
    );
}

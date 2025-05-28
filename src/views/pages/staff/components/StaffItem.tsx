import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/styles";
const DefaultAvatar = require("../../../../../assets/defaultAvatar.png");
import { Entypo } from "@expo/vector-icons";

export default function StaffItem(props: {
    image?: string | null,
    name?: string | null,
    distance?: number | null,
    province?: any | null;
    onClickStaffDetail?: () => void,
    staffId?: number | null,
}) {
    console.log("distance ===",props.distance);
    return (
        <View style={styles.serviceItem} key={props.staffId}>
            <Image
                source={props.image ? {uri: props.image} : DefaultAvatar}
                style={styles.serviceImage}
            />
            <View style={{ flex: 1 }}>
                <Text style={{color: "black"}}>{props?.name || ""}</Text>
                {(props.distance || props.distance == 0) ? <Text style={{ color: "gray" }}><Entypo name="location-pin" size={16} color="black" />{props.distance > 0 ? props.distance : 100}m</Text> : <View></View>}
                {!props.distance && props.distance != 0 && props?.province?.name ? <Text style={{ color: "gray" }}><Entypo name="location-pin" size={16} color="black" />{props?.province?.name}</Text> : <View></View>}
            </View>
            <TouchableOpacity style={styles.button} onPress={props.onClickStaffDetail}>
                <Text style={styles.buttonText}>Đặt</Text>
            </TouchableOpacity>
        </View>
    );
}

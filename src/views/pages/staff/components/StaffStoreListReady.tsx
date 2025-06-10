import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "../styles/styles";
const DefaultAvatar = require("../../../../../assets/defaultAvatar.png");
import { Entypo } from "@expo/vector-icons";
import FormDialog from "../../../../common/components/FormDialog";
import useHandleStoreStaffService from "../hook/useHandleStoreStaffService";
import useHandleStaffMemberReady from "../hook/useStoreStaffReady";
import { useEffect } from "react";
import Staff from "../../../../models/Staff";

export default function StaffStoreListReady(props: {
    open?: boolean | null;
    onConfirm?: (staffIds?: number[]) => void;
    onClose?: () => void;
}) {
    const {
        staffs,
        getStaffReady,
        staffIds,
        setStaffIds,
        reload,
        toggleSelection,
    } = useHandleStaffMemberReady();

    const onConfirmSelect = () => {
        props.onConfirm?.(staffIds);
    };

    useEffect(() => {
        console.log("is open ", props.open);
        if (props.open) reload();
    }, [props.open]);

    useEffect(() => {
        console.log("selected staff ids ====", staffIds);
    }, [staffIds.length]);

    console.log("storeStaffmember ready ===", staffs);

    return (
        <FormDialog
            open={props.open || false}
            title={"Chọn KTV ứng tuyển"}
            onConfirm={onConfirmSelect}
            onClose={props.onClose}
        >
            <View style={{minHeight: 240, width:"100%" }}>
                <FlatList
                    data={staffs}
                    style={{ minWidth: 60 }}
                    renderItem={({ item }) => (
                        <StaffReadyItem
                            staff={item}
                            staffIds={staffIds}
                            toggleSelection={toggleSelection}
                        ></StaffReadyItem>
                    )}
                    keyExtractor={(item) => item.id + ""}
                />
            </View>
        </FormDialog>
    );
}

export function StaffReadyItem(props: {
    staff?: Staff;
    staffIds?: number[];
    toggleSelection?: (id?: number) => void;
}) {
    let isSelected = props.staffIds?.includes(props.staff?.id || 0);
    return (
        <View
            style={[
                styles.serviceItem,
                { margin: 0, padding: 0, minWidth: 50,},
            ]}
            key={props.staff?.id}
        >
            <Image
                source={
                    props.staff?.user?.urlImage
                        ? { uri: props.staff?.user?.urlImage }
                        : DefaultAvatar
                }
                style={styles.serviceImage}
            />
            <View style={{ flex: 1 }}>
                <Text style={{ color: "black" }}>
                    {props?.staff?.name || ""}
                </Text>
            </View>
            <Pressable
                onPress={() => props.toggleSelection?.(props?.staff?.id || 0)}
                style={xstyles.item}
            >
                <View style={[xstyles.checkbox, isSelected && xstyles.checked]}>
                    {isSelected && <Text style={xstyles.checkmark}>✓</Text>}
                </View>
            </Pressable>
        </View>
    );
}

const xstyles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
    item: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        borderRadius: 4,
    },
    checked: {
        backgroundColor: "#007AFF",
    },
    checkmark: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    label: { fontSize: 16 },
});

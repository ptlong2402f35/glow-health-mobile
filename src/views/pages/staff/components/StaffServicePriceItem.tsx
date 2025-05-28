import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { staffInfoUpdateStyle, staffServiceStyles } from "../styles/styles";
import StaffService from "../../../../models/StaffService";
import Feather from "@expo/vector-icons/Feather";
import Collapsible from "react-native-collapsible";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import FormDialog from "../../../../common/components/FormDialog";
import SelectBox from "../../../../common/components/SelectBox";

export default function StaffServicePriceItem(props: {
    staffService?: any;
    onUpdatePrice?: (id: number, input: number) => void;
    setIsOpenCreateDialog?: any;
    removeStaffService?: any;
    prices?: any[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const handlePriceChange = (input: string, id: number) => {
        console.log("input", props?.onUpdatePrice);
        props?.onUpdatePrice?.(id, parseFloat(input || "0"));
    };
    if (props.staffService?.price?.length) {
    }
    let staffServicePrices: any = [];
    staffServicePrices = props.prices?.filter((price) =>
        props.staffService.price.find(
            (item: any) =>
                item.staffServiceId === price.staffServiceId &&
                item.unit === price.unit &&
                item.serviceGroupId === price.serviceGroupId
        )
    );

    const onRemoveStaffService = () => {
        props.removeStaffService({
            id: staffServicePrices?.[0]?.staffServiceId,
        });
        // setIsOpen(false);
    }

    console.log(" prices ===", staffServicePrices);

    useEffect(() => {
        if (props.staffService?.price?.length) setIsOpen(true);
    }, [props.staffService?.price?.length]);
    return (
        <TouchableOpacity
            style={staffServiceStyles.serviceBox}
            onPress={() => setIsOpen(!isOpen)}
        >
            <View style={staffServiceStyles.serviceHeader}>
                <Text style={staffServiceStyles.serviceName}>
                    {props.staffService?.name}
                </Text>
                {props.staffService?.price?.length ? (
                    <Feather
                        name="minus-circle"
                        size={24}
                        color="black"
                        onPress={() =>
                            onRemoveStaffService()
                        }
                    />
                ) : (
                    <MaterialIcons
                        onPress={() =>
                            props.setIsOpenCreateDialog(props.staffService)
                        }
                        name="add-circle-outline"
                        size={24}
                        color="black"
                    />
                )}
            </View>

            <Collapsible collapsed={!isOpen} style={{flex: 1, width: "100%"}}>
                {staffServicePrices?.map((price: any) => (
                    <View
                        key={price.id}
                        style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent:"space-between" }}
                    >
                        <TextInput
                            value={price.price?.toString() || ""}
                            onChangeText={(text) =>
                                handlePriceChange(text, price.id || 0)
                            }
                            keyboardType="numeric"
                            style={[staffServiceStyles.input, {width: 160}]}
                        />
                        <TextInput
                            value={price.unit?.toString() || ""}
                            editable={false}
                            keyboardType="numeric"
                            style={[staffServiceStyles.input, {width: 100}]}
                        />
                    </View>
                ))}
            </Collapsible>
        </TouchableOpacity>
    );
}

export function StaffServiceCreateDialog(props: {
    open: boolean;
    onClose: () => void;
    onConfirm: (props: {
        name: string;
        description: string;
        serviceId?: number;
        serviceGroupId?: number;
    }) => void;
    getServiceSelect?: any;
    selectSService?: any;
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const onConfirmAction = async () => {
        props.onConfirm({
            name,
            description,
            serviceId: props.selectSService?.id,
            serviceGroupId: props.selectSService?.serviceGroup?.id,
        });
    };

    useEffect(() => {
        setName("");
        setDescription("");
    }, [props.open]);

    return (
        <FormDialog
            open={props.open}
            onClose={props.onClose}
            onConfirm={onConfirmAction}
        >
            <View style={{ width: "90%" }}>
                <View style={staffServiceStyles.dialogContainer}>
                    <Text>Nhập tên dịch vụ:</Text>
                    <TextInput
                        style={[
                            staffServiceStyles.dialogInput,
                            { width: "100%" },
                        ]}
                        placeholder="Tên dịch vụ"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    ></TextInput>
                </View>
                <View style={staffServiceStyles.dialogContainer}>
                    <Text>Nhập mô tả:</Text>
                    <TextInput
                        style={[
                            staffServiceStyles.dialogInput,
                            { width: "100%" },
                        ]}
                        placeholder="Mô tả"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    ></TextInput>
                </View>
                {props.selectSService ? (
                    <View>
                        <View style={staffServiceStyles.dialogContainer}>
                            <Text>Dịch vụ:</Text>
                            <TextInput
                                style={[
                                    staffServiceStyles.dialogInput,
                                    { width: "100%", backgroundColor: "#ccc" },
                                ]}
                                placeholder={props.selectSService?.name || ""}
                                value={props.selectSService?.name || ""}
                                editable={false}
                            ></TextInput>
                        </View>
                        <View style={staffServiceStyles.dialogContainer}>
                            <Text>Nhóm dịch vụ:</Text>
                            <TextInput
                                style={[
                                    staffServiceStyles.dialogInput,
                                    { width: "100%", backgroundColor: "#ccc" },
                                ]}
                                placeholder={
                                    props.selectSService?.serviceGroup?.name ||
                                    ""
                                }
                                value={props.selectSService?.serviceGroup?.name ||
                                    ""}
                                editable={false}
                            ></TextInput>
                        </View>
                    </View>
                ) : (
                    <View></View>
                )}
            </View>
        </FormDialog>
    );
}

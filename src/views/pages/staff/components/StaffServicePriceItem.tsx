import { View, Text, TextInput } from "react-native";
import { staffInfoUpdateStyle, staffServiceStyles } from "../styles/styles";
import StaffService from "../../../../models/StaffService";
import Feather from "@expo/vector-icons/Feather";
import Collapsible from "react-native-collapsible";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import FormDialog from "../../../../common/components/FormDialog";
import SelectBox from "../../../../common/components/SelectBox";

export default function StaffServicePriceItem(props: {
    staffService?: StaffService;
    onUpdatePrice?: (id: number, input: number) => void;
    setIsOpenCreateDialog?: any;
    removeStaffService?: any;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const handlePriceChange = (input: string, id: number) => {
        props?.onUpdatePrice?.(id, parseFloat(input || "0"));
    };

    useEffect(() => {
        if (props.staffService?.prices?.length) setIsOpen(true);
    }, [props.staffService?.prices?.length]);
    return (
        <View style={staffServiceStyles.serviceBox}>
            <View style={staffServiceStyles.serviceHeader}>
                <Text style={staffServiceStyles.serviceName}>
                    {props.staffService?.name}
                </Text>
                {props.staffService?.prices?.length ? (
                    <Feather name="minus-circle" size={24} color="black" onPress={() => props.removeStaffService({id: props.staffService?.id})}/>
                ) : (
                    <MaterialIcons onPress={() => props.setIsOpenCreateDialog(true)}
                        name="add-circle-outline"
                        size={24}
                        color="black"
                    />
                )}
            </View>

            {isOpen && (
                <Collapsible collapsed={isOpen}>
                    {props.staffService?.prices?.map((price) => (
                        <View>
                            <TextInput
                                key={price.id}
                                value={price.price?.toString() || ""}
                                onChangeText={(text) =>
                                    handlePriceChange(text, price.id || 0)
                                }
                                keyboardType="numeric"
                                style={staffServiceStyles.input}
                            />
                        </View>
                    ))}
                </Collapsible>
            )}
        </View>
    );
}

export function StaffServiceCreateDialog(props: {
    open: boolean;
    onClose: () => void;
    onConfirm: (props: {
        name: string;
        description: string;
        serviceId: number;
    }) => void;
    getServiceSelect?: any;
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [serviceId, setServiceId] = useState(0);

    const onConfirmAction = async () => {
        props.onConfirm(
            {
                name,
                description,
                serviceId
            }
        )
    }

    useEffect(() => {
        setName("");
        setDescription("");
        setServiceId(0);
    },[props.open])

    return (
        <FormDialog
            open={props.open}
            onClose={props.onClose}
            onConfirm={onConfirmAction}
        >
            <View>
                <View style={staffServiceStyles.dialogContainer}>
                    <Text>Nhập tên dịch vụ:</Text>
                    <TextInput style={staffServiceStyles.dialogInput}
                        placeholder="Tên dịch vụ"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    ></TextInput>
                </View>
                <View style={staffServiceStyles.dialogContainer}>
                    <Text>Nhập mô tả:</Text>
                    <TextInput style={staffServiceStyles.dialogInput}
                        placeholder="Mô tả"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    ></TextInput>
                </View>
                <View style={staffServiceStyles.dialogContainer}>
                    <SelectBox
                        value={serviceId}
                        onValueChange={(value: any) => setServiceId(value)}
                        getData={props.getServiceSelect}
                    ></SelectBox>
                </View>
            </View>
        </FormDialog>
    );
}

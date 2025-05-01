import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Switch,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AddressUpdatestyles } from "./styles/styles";
import useCustomerAddressHandler from "./hook/useCustomerAddressHandler";
import BackButton from "../../../common/components/BackButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function CustomerAddressCreateScreen(props?: { route?: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const id = props?.route?.params?.id || 0;
    const fromCreateOrder = props?.route?.params?.fromCreateOrder || null;
    const orderData = props?.route?.params?.orderData || null;
    console.log("id ===", id);
    const eName = props?.route?.params?.name || "";
    const ePhone = props?.route?.params?.phone || "";
    const eAddress = props?.route?.params?.address || "";
    const eNote = props?.route?.params?.note || "";
    const eDefault = props?.route?.params?.default || false;
    const isCreate = props?.route?.params?.isCreate || false;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [isDefault, setIsDefault] = useState(false);

    const {
        updateCustomerAddress,
        removeCustomerAddress,
        createCustomerAddress,
    } = useCustomerAddressHandler();

    const backToOrderCreateScreen = (id?: number, address?: string) => {
        navigation.navigate("OrderCreate", { data: {...orderData, addressId: id, address: address} } as never);
    };

    const handleConfirmClick = () => {
        if (isCreate) {
            createCustomerAddress({
                customerName: name,
                phone,
                address,
                note,
                isSetDefault: isDefault,
                ...(fromCreateOrder && orderData
                    ? {
                          afterCreate: (props: {id?:number, address:string}) => {
                              backToOrderCreateScreen(props?.id, props?.address);
                          },
                      }
                    : {}),
            });
            return;
        }
        updateCustomerAddress({
            id,
            customerName: name,
            phone,
            address,
            note,
            isSetDefault: isDefault,
        });
        return;
    };

    const handleRemove = () => {
        if (id) {
            removeCustomerAddress(id);
        }
    };

    useEffect(() => {
        if (eName || ePhone || eAddress || eNote || eDefault) {
            setName(eName);
            setPhone(ePhone);
            setAddress(eAddress);
            setNote(eNote);
            setIsDefault(eDefault);
        }
    }, [id]);

    return (
        <ScrollView contentContainerStyle={AddressUpdatestyles.container}>
            <BackButton />
            <Text style={AddressUpdatestyles.title}>Thêm địa chỉ mới</Text>

            <Text style={AddressUpdatestyles.label}>Tên khách hàng *</Text>
            <TextInput
                style={AddressUpdatestyles.input}
                placeholder="Nhập tên khách hàng"
                value={name}
                onChangeText={setName}
            />

            <Text style={AddressUpdatestyles.label}>Số điện thoại *</Text>
            <TextInput
                style={AddressUpdatestyles.input}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            <Text style={AddressUpdatestyles.label}>Địa chỉ *</Text>
            <TextInput
                style={AddressUpdatestyles.input}
                placeholder="Nhập địa chỉ"
                value={address}
                onChangeText={setAddress}
            />

            <Text style={AddressUpdatestyles.label}>Ghi chú</Text>
            <TextInput
                style={[AddressUpdatestyles.input, { height: 80 }]}
                placeholder="Ghi chú thêm"
                multiline
                value={note}
                onChangeText={setNote}
            />

            <View style={AddressUpdatestyles.switchContainer}>
                <Text style={AddressUpdatestyles.switchLabel}>
                    Đặt làm địa chỉ mặc định
                </Text>
                <Switch value={isDefault} onValueChange={setIsDefault} />
            </View>

            <TouchableOpacity
                style={AddressUpdatestyles.button}
                onPress={handleConfirmClick}
            >
                <Text style={AddressUpdatestyles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
            {id > 0 && (
                <TouchableOpacity
                    style={[AddressUpdatestyles.button, { marginTop: 16 }]}
                    onPress={handleRemove}
                >
                    <Text style={AddressUpdatestyles.buttonText}>Xoá</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

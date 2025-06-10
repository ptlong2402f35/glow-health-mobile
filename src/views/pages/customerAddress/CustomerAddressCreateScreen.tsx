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
import { Picker } from "@react-native-picker/picker";
import { staffInfoUpdateStyle } from "../staff/styles/styles";
import useHandleStaffInfo from "../staff/hook/useHandleStaffInfo";
import useUserLoader from "../../../hook/useUserLoader";
import useAlertDialog from "../../../hook/useAlert";

export default function CustomerAddressCreateScreen(props?: { route?: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { openAlertDialog } = useAlertDialog();
    const id = props?.route?.params?.id || 0;
    const fromCreateOrder = props?.route?.params?.fromCreateOrder || null;
    const orderData = props?.route?.params?.orderData || null;
    const eName = props?.route?.params?.name || "";
    const ePhone = props?.route?.params?.phone || "";
    const eAddress = props?.route?.params?.address || "";
    const eNote = props?.route?.params?.note || "";
    const eProvince = props?.route?.params?.eProvince || 1;
    const eDistrict = props?.route?.params?.eDistrict || 0;
    const eDefault = props?.route?.params?.default || false;
    const isCreate = props?.route?.params?.isCreate || false;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [city, setCity] = useState(0);
    const [district, setDistrict] = useState(0);

    const { location } = useUserLoader();

    const { provinceList, districtList, initProvinceList, initDistrictList } =
        useHandleStaffInfo();

    const {
        updateCustomerAddress,
        removeCustomerAddress,
        createCustomerAddress,
    } = useCustomerAddressHandler();

    const backToOrderCreateScreen = (id?: number, address?: string) => {
        navigation.navigate("OrderCreate", {
            data: { ...orderData, addressId: id, address: address },
        } as never);
    };

    const handleConfirmClick = () => {
        if (isCreate) {
            createCustomerAddress({
                customerName: name,
                phone,
                address,
                note,
                isSetDefault: isDefault,
                provinceId: city,
                districtId: district,
                ...(location?.lat ? { lat: location?.lat } : {}),
                ...(location?.long ? { long: location?.long } : {}),
                ...(fromCreateOrder && orderData
                    ? {
                          afterCreate: (props: {
                              id?: number;
                              address: string;
                          }) => {
                              backToOrderCreateScreen(
                                  props?.id,
                                  props?.address
                              );
                          },
                      }
                    : {
                          afterCreate: (props: {
                              id?: number;
                              address: string;
                          }) => {
                              openAlertDialog?.(
                                  "Thông báo",
                                  "Cập nhật thành công"
                              );
                              navigation.navigate("CustomerAddressList", {
                                  reload: true,
                              } as never);
                          },
                      }),
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
            provinceId: city,
            districtId: district,
            ...(location?.lat ? { lat: location?.lat } : {}),
            ...(location?.long ? { long: location?.long } : {}),
            afterSuccess: () => {
                openAlertDialog?.("Thông báo", "Cập nhật thành công");
                navigation.navigate("CustomerAddressList", {
                    reload: true,
                } as never);
            },
        });
        return;
    };
    console.log("district ===", district);
    const handleRemove = () => {
        if (id) {
            removeCustomerAddress({
                id,
                afterSuccess: () => {
                    openAlertDialog?.("Thông báo", "Xoá thành công");
                    navigation.navigate("CustomerAddressList", {
                        reload: true,
                    } as never);
                },
            });
        }
    };

    useEffect(() => {
        if (city === 0) return;
        initDistrictList("", city);
    }, [city]);

    useEffect(() => {
        if (
            eName ||
            ePhone ||
            eAddress ||
            eNote ||
            eDefault ||
            eProvince ||
            eDistrict
        ) {
            setName(eName);
            setPhone(ePhone);
            setAddress(eAddress);
            setNote(eNote);
            setIsDefault(eDefault);
            setCity(eProvince || 1);
            setDistrict(eDistrict || 0);
        } else {
            setCity(1);
        }
        initProvinceList();
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
            <Text style={staffInfoUpdateStyle.label}>Thành phố làm việc</Text>
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#ccc",
                }}
            >
                <Picker
                    selectedValue={city}
                    onValueChange={setCity}
                    style={staffInfoUpdateStyle.picker}
                >
                    {provinceList.map((province, index) => (
                        <Picker.Item
                            key={index + "pr"}
                            label={province.label}
                            value={province.value}
                        />
                    ))}
                </Picker>
            </View>

            <Text style={staffInfoUpdateStyle.label}>Quận làm việc</Text>
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#ccc",
                }}
            >
                <Picker
                    selectedValue={district}
                    onValueChange={setDistrict}
                    style={staffInfoUpdateStyle.picker}
                >
                    {districtList.map((district, index) => (
                        <Picker.Item
                            key={index + "dis"}
                            label={district.label}
                            value={district.value}
                        />
                    ))}
                </Picker>
            </View>

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

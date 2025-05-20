import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { CustomerAddressListStyles } from "./styles/styles";
import useCustomerAddressHandler from "./hook/useCustomerAddressHandler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CustomerAddress from "../../../models/CustomerAddress";
import BackButton from "../../../common/components/BackButton";

export default function CustomerAddressListScreen(props: { route?: any }) {
    const { addresses, getCustomerAddresses, reload } =
        useCustomerAddressHandler();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    let fromCreateOrder = props.route?.params?.fromCreateOrder || null;
    let orderData = props.route?.params?.orderData || null;
    const onUpdateAddress = (
        item?: CustomerAddress | null,
        isCreate?: boolean
    ) => {
        navigation.navigate("CustomerAddressUpdate", {
            id: item?.id,
            name: item?.customerName,
            phone: item?.phone,
            address: item?.address,
            note: item?.note,
            default: item?.default,
            isCreate: isCreate,
            fromCreateOrder: fromCreateOrder,
            orderData: fromCreateOrder ? orderData : null,
        } as never);
    };

    const onAddressClick = (item: CustomerAddress) => {
        if (!fromCreateOrder) return;
        navigation.navigate("OrderCreate", {
            data: { ...orderData, addressId: item.id, address: item.address },
        } as never);
    };

    const loadNextPage = () => {};

    useEffect(() => {
        getCustomerAddresses();
    }, []);
    return (
        <View style={CustomerAddressListStyles.container}>
            <BackButton color="#fff" top={10} />
            <View style={CustomerAddressListStyles.headerWrap}>
                <Text style={CustomerAddressListStyles.header}>
                    Địa chỉ của tôi
                </Text>
            </View>
            <View style={CustomerAddressListStyles.addressList}>
                {addresses?.length === 0 ? (
                    <View style={CustomerAddressListStyles.addressEmptyWrap}>
                        <Text
                            style={CustomerAddressListStyles.addressEmptyText}
                        >
                            Bạn chưa tạo địa chỉ nào
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={addresses}
                        renderItem={({ item }) => (
                            <CustomerAddressItem
                                item={item}
                                onUpdateAddress={onUpdateAddress}
                                onAddressClick={onAddressClick}
                            />
                        )}
                        keyExtractor={(item) => item.id + ""}
                        onEndReached={() => loadNextPage()}
                    />
                )}
                <TouchableOpacity
                    style={CustomerAddressListStyles.addButton}
                    onPress={() => onUpdateAddress(null, true)}
                >
                    <Text style={CustomerAddressListStyles.addText}>
                        Thêm địa chỉ
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export const CustomerAddressItem = (props: {
    item: CustomerAddress;
    onUpdateAddress: (item: CustomerAddress) => void;
    onAddressClick?: (item: CustomerAddress) => void;
}) => {
    return (
        <TouchableOpacity
            style={CustomerAddressListStyles.addressBox}
            onPress={() => props.onAddressClick?.(props.item)}
        >
            <View style={CustomerAddressListStyles.row}>
                <Text style={CustomerAddressListStyles.name}>
                    {props.item?.customerName || ""}
                </Text>
                <TouchableOpacity
                    onPress={() => props.onUpdateAddress(props.item)}
                >
                    <Text style={CustomerAddressListStyles.editText}>Sửa</Text>
                </TouchableOpacity>
            </View>
            <Text style={CustomerAddressListStyles.phone}>
                {props.item?.phone}
            </Text>
            <Text style={CustomerAddressListStyles.address}>
                {props.item?.address}
            </Text>
            {props.item?.default && (
                <View style={CustomerAddressListStyles.defaultLabel}>
                    <Text style={CustomerAddressListStyles.defaultText}>
                        Địa chỉ mặc định
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

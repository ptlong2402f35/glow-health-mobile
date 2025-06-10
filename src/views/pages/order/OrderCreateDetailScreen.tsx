import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import { orderCreateScreenStyle } from "./style/style";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    FontAwesome6,
    Foundation,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");
import moment from "moment";
import useOrderCreate from "./hook/useOrderCreate";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimeSelect from "../../../common/components/DateTimeSelect";
import useCreateOrder from "./hook/useCreateOrder";
import Order from "../../../models/Order";
import BackButton from "../../../common/components/BackButton";

export default function OrderCreateDetailScreen(props: { route?: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const {
        address,
        addressId,
        estimateFee,
        createOrder,
        getDefaultAddress,
        setAddress,
        setAddressId,
        estimateOrderFee,
    } = useCreateOrder();
    let data = props.route.params.data || {};
    console.log("data route ===", props.route.params.data);
    const [timerTime, setTimerTime] = useState(new Date());
    const [updateTime, setUpdateTime] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [code, setCode] = useState("");
    console.log("show date ===", showDatePicker);
    console.log("show time ===", showTimePicker);
    const onSelectPaymentMethods = () => {
        navigation.navigate("PaymentMethodSelect", {
            data: {
                ...data,
                paymentMethodId: paymentMethod,
            },
        } as never);
    };

    let paymentLabel = "Trả bằng tiền mặt";
    switch (paymentMethod) {
        case 1: {
            paymentLabel = `Trả bằng tiền mặt`;
            break;
        }
        case 2: {
            paymentLabel = `Số dư Glow Healthy`;
            break;
        }
        default: {
        }
    }

    const onSelectAddress = () => {
        navigation.navigate("CustomerAddressList", {
            orderData: {
                ...data,
                paymentMethodId: paymentMethod,
            },
            fromCreateOrder: true,
        } as never);
    };

    const onHandleCreateOrder = () => {
        console.log("create order data ===", {
            staffId: data.staff.id,
            addressId: addressId,
            voucherCode: "",
            staffServicePriceIds: (data.prices || [])
                ?.map((item: any) => item.id)
                .filter((val: any) => val),
            paymentMethodId: paymentMethod,
            note: "",
            timerTime: timerTime,
            fromForwardOrderId: null,
            code,
        });
        createOrder({
            staffId: data.staff.id,
            addressId: addressId,
            voucherCode: code,
            staffServicePriceIds: (data.prices || [])
                ?.map((item: any) => item.id)
                .filter((val: any) => val),
            paymentMethodId: paymentMethod,
            note: "",
            timerTime: timerTime,
            fromForwardOrderId: undefined,
            afterCreate: (order?: Order) => {
                navigation.navigate("MyOrderPendingDetail", {
                    id: order?.id,
                } as never);
            },
        });
    };

    useEffect(() => {
        if (data.addressId) {
            setAddress(data.address);
            setAddressId(data.addressId);
        } else {
            getDefaultAddress();
        }
    }, [data.addressId]);

    useEffect(() => {
        setUpdateTime(false);
        if (data.paymentMethodId) {
            setPaymentMethod(data.paymentMethodId);
        }
        if (data.timerTime) {
            setTimerTime(data.timerTime);
            setUpdateTime(true);
        }
    }, [data.paymentMethodId || data.timerTime]);
    const onApplyCode = () => {
        if (code && code.length < 3) return;
        estimateOrderFee({
            staffServicePriceIds: (data.prices || [])
                ?.map((item: any) => item.id)
                .filter((val: any) => val)
                .join(";"),
            voucherCode: code,
        });
    };

    useEffect(() => {
        estimateOrderFee({
            staffServicePriceIds: (data.prices || [])
                ?.map((item: any) => item.id)
                .filter((val: any) => val)
                .join(";"),
        });
    }, [data]);
    return (
        <View style={orderCreateScreenStyle.container}>
            <BackButton />
            <View>
                <View style={orderCreateScreenStyle.headerContainer}>
                    <Text style={orderCreateScreenStyle.title}>
                        Thông tin đặt lịch
                    </Text>
                </View>

                <View style={orderCreateScreenStyle.addressContainer}>
                    <Text style={orderCreateScreenStyle.label}>
                        Địa chỉ của bạn
                    </Text>
                    <Text
                        style={orderCreateScreenStyle.address}
                        onPress={onSelectAddress}
                    >
                        {address || "Vui lòng nhập địa chỉ của bạn"}
                    </Text>
                </View>

                <View style={orderCreateScreenStyle.serviceContainer}>
                    <Image
                        source={
                            data.staff?.user?.urlImage
                                ? { uri: data.staff?.user?.urlImage }
                                : DefaultAvatar
                        }
                        style={orderCreateScreenStyle.serviceImage}
                    />
                    <View style={orderCreateScreenStyle.serviceInfo}>
                        <Text style={orderCreateScreenStyle.serviceTitle}>
                            {data.staff?.name || ""}
                        </Text>
                        <Text style={orderCreateScreenStyle.rating}>
                            {data.staff?.rateAvg}
                            <AntDesign name="staro" size={16} color="black" />
                        </Text>
                    </View>
                </View>

                <View style={[orderCreateScreenStyle.feeContainer]}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12,
                        }}
                    >
                        <Entypo name="text-document" size={18} color="black" />
                        <View>
                            {(data.prices || []).map(
                                (item: any, index: any) => (
                                    <View
                                        key={index}
                                        style={[
                                            orderCreateScreenStyle.serviceWrap,
                                            {
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                // alignItems: "center",
                                                // flex: 1,
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={
                                                orderCreateScreenStyle.feeText
                                            }
                                        >
                                            {item.name}:
                                        </Text>
                                        <Text
                                            style={
                                                orderCreateScreenStyle.feeText
                                            }
                                        >
                                            {item.price}đ
                                        </Text>
                                    </View>
                                )
                            )}
                        </View>
                    </View>
                    <View style={orderCreateScreenStyle.feeContainer}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 12,
                            }}
                        >
                            <MaterialIcons
                                name="access-time"
                                size={18}
                                color="black"
                            />
                            <Text style={orderCreateScreenStyle.feeText}>
                                {updateTime
                                    ? "Ngay bây giờ"
                                    : moment(timerTime).format(
                                          "MM/DD/YYYY h:mm:ss"
                                      ) || ""}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text
                                style={[
                                    orderCreateScreenStyle.feeText,
                                    { color: "green" },
                                ]}
                            >
                                Hẹn lịch
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <FontAwesome6
                                name="ticket"
                                size={18}
                                color="black"
                            />
                            <TextInput
                                value={code}
                                onChangeText={setCode}
                                placeholder="Nhập voucher..."
                                style={{
                                    fontSize: 16,
                                    paddingVertical: 8,
                                    paddingHorizontal: 0,
                                    borderWidth: 0,
                                    color: "#000",
                                }}
                                placeholderTextColor="#999"
                                onSubmitEditing={onApplyCode}
                                returnKeyType="done"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View style={orderCreateScreenStyle.balanceWrap}>
                <View style={orderCreateScreenStyle.balanceContainer}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={orderCreateScreenStyle.balanceLabel}>
                            {paymentLabel}
                        </Text>
                        <Text style={orderCreateScreenStyle.balanceAmount}>
                            {estimateFee || data.totalMoney || 0}đ
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={onSelectPaymentMethods}>
                            <AntDesign name="edit" size={24} color="green" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={orderCreateScreenStyle.button}
                    onPress={onHandleCreateOrder}
                >
                    <Text style={orderCreateScreenStyle.buttonText}>
                        Đặt ngay
                    </Text>
                </TouchableOpacity>
            </View>
            <DateTimeSelect
                showDate={showDatePicker}
                showTime={showTimePicker}
                closeDate={() => setShowDatePicker(false)}
                closeTime={() => setShowTimePicker(false)}
                openTime={() => setShowTimePicker(true)}
                openDate={() => setShowDatePicker(true)}
                setDate={(value) => setTimerTime(value)}
            />
        </View>
    );
}

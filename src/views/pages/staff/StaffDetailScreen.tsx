import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { detailStaffStyles } from "./styles/styles";
import useHandleStaffDetail from "./hook/useHandleStaffDetail";
import StaffServiceItem from "./components/StaffServiceItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { orderDetailStyles } from "../order/style/style";
import BackButton from "../../../common/components/BackButton";
import useCustomerOrderDetail from "../order/hook/useCustomerOrderDetail";
import useUserLoader from "../../../hook/useUserLoader";
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Foundation,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";

export default function StaffDetailScreen(props: { route?: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { id } = props.route?.params;
    const { forwardId, forwardSelect, baseOrderId } = props.route?.params;
    let { userLoader } = useUserLoader();
    const { switchForwardOrder } = useCustomerOrderDetail();
    const {
        staff,
        getStaffDetail,
        priceIds,
        setPriceIds,
        totalMoney,
        setTotalMoney,
    } = useHandleStaffDetail();
    const [isValidOrder, setIsValidOrder] = useState(false);

    const onClickOrder = (id: number, add: boolean) => {
        if (add) {
            setPriceIds([...priceIds, id]);
        } else {
            setPriceIds([...priceIds].filter((item) => item != id));
        }
    };

    const updateTotalMoney = (curPriceIds?: number[]) => {
        console.log("pricesIds", curPriceIds);
        let total = (staff?.staffServices || [])?.reduce((acc, cur) => {
            let find = cur.prices?.find((item) =>
                curPriceIds?.includes?.(item?.id || 0)
            );
            if (find) return acc + (find?.price || 0);
            return acc;
        }, 0);
        setTotalMoney(total);
    };

    const onContinueOrderCreate = () => {
        let prices = [];
        for (let sservice of staff?.staffServices || []) {
            for (let price of sservice.prices || []) {
                if (priceIds?.includes(price.id || 0)) {
                    prices.push({
                        id: price.id,
                        name: sservice.name,
                        price: price.price,
                    });
                }
            }
        }
        console.log("route push", {
            staff: staff,
            prices,
            totalMoney: totalMoney,
        });
        navigation.navigate("OrderCreate", {
            data: {
                staff: staff,
                prices,
                totalMoney: totalMoney,
            },
            id: staff?.id,
        } as never);
    };

    const onConfirmSelectForwardStaff = () => {
        switchForwardOrder(baseOrderId, forwardId || 0, (newId?: number) => {
            navigation.navigate("MyOrderDetail", { id: newId || 0 } as never);
        });
    };

    useEffect(() => {
        getStaffDetail({ id });
        setPriceIds([]);
    }, [id]);

    useEffect(() => {
        console.log("useEffect", priceIds);
        updateTotalMoney(priceIds);
    }, [priceIds.length]);

    useEffect(() => {
        if (priceIds.length > 0) setIsValidOrder(true);
        else {
            setIsValidOrder(false);
        }
    }, [priceIds.length]);
    return (
        <View style={detailStaffStyles.wrapContainer}>
            <BackButton />
            <ScrollView style={detailStaffStyles.container}>
                <Image
                    source={
                        staff?.user?.urlImage
                            ? { uri: staff?.user?.urlImage }
                            : DefaultAvatar
                    }
                    style={detailStaffStyles.imageWrap}
                    resizeMode="cover"
                />

                <View style={detailStaffStyles.staffWrap}>
                    <Text style={detailStaffStyles.staffName}>
                        {staff?.name || ""}
                    </Text>
                    <View style={detailStaffStyles.staffSubInfoContainer}>
                        <View style={detailStaffStyles.staffSubInfoText}>
                            <Entypo
                                name="location-pin"
                                size={16}
                                color="black"
                            />
                            <Text>{staff?.province?.name || ""}</Text>
                        </View>
                        <View style={detailStaffStyles.staffSubInfoText}>
                            <AntDesign name="staro" size={16} color="black" />
                            <Text>
                                {staff?.rateAvg || "0"} (
                                {staff?.countReview || "0"} đánh giá)
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: "#ccc",
                        }}
                    ></View>
                    <Text style={detailStaffStyles.staffDes}>
                        {staff?.description || ""}
                    </Text>
                </View>

                <View>
                    {!forwardSelect &&
                        staff?.serviceGroupTree?.map((sservice: any) => (
                            <GroupServiceItem
                                key={sservice?.id + "gsi"}
                                groupTree={sservice}
                                onClickOrder={onClickOrder}
                                updateTotalMoney={updateTotalMoney}
                                priceIds={priceIds}
                                setPriceIds={setPriceIds}
                            />
                        ))}
                </View>
            </ScrollView>
            {forwardSelect ? (
                <View style={orderDetailStyles.btnWrapper}>
                    <TouchableOpacity
                        style={[
                            orderDetailStyles.readyBtn,
                            orderDetailStyles.fullWidth,
                        ]}
                        onPress={onConfirmSelectForwardStaff}
                    >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                            Chọn
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View></View>
            )}
            {isValidOrder && (
                <View style={detailStaffStyles.orderTabBottom}>
                    <View>
                        <Text>{totalMoney} đ</Text>
                        <Text>
                            {priceIds.length ? priceIds.length : ""} Dịch vụ
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={detailStaffStyles.orderBottomBtn}
                            onPress={onContinueOrderCreate}
                        >
                            <Text style={{ color: "white" }}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

export function GroupServiceItem(props: {
    groupTree: any;
    onClickOrder?: any;
    updateTotalMoney?: any;
    priceIds?: any;
    setPriceIds?: any;
}) {
    return (
        <View>
            <View>
                <Text style={detailStaffStyles.sectionTitle}>{props.groupTree?.name || ""}</Text>
            </View>
            {props.groupTree?.staffServices?.map((sservice: any) => (
                <StaffServiceItem
                    key={sservice?.id + "ss"}
                    staffService={sservice}
                    onClickOrder={props.onClickOrder}
                    updateTotalMoney={props.updateTotalMoney}
                    priceIds={props.priceIds}
                    setPriceIds={props.setPriceIds}
                />
            ))}
        </View>
    );
}

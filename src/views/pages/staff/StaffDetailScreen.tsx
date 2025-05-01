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
const DefaultAvatar = require("../../../../assets/defaultAvatar.png");

export default function StaffDetailScreen(props: { route?: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { id } = props.route?.params;
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
        console.log("Add ===", add);
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
        for(let sservice of staff?.staffServices || []) {
            for (let price of sservice.prices || []) {
                if(priceIds?.includes(price.id || 0)) {
                    prices.push({
                        id: price.id,
                        name: sservice.name,
                        price: price.price,
                    })
                }
            }
        }
        console.log("route push", {
            staff: staff,
            prices,
            totalMoney: totalMoney
        })
        navigation.navigate("OrderCreate", {
            data: {
                staff: staff,
                prices,
                totalMoney: totalMoney
            },
            id: staff?.id
        } as never)
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
            <ScrollView style={detailStaffStyles.container}>
                {/* Banner */}
                <Image
                    source={DefaultAvatar}
                    style={detailStaffStyles.imageWrap}
                    resizeMode="cover"
                />

                {/* Dịch vụ Massage chính */}
                <View style={detailStaffStyles.staffWrap}>
                    <Text style={detailStaffStyles.staffName}>
                        {staff?.name || ""}
                    </Text>
                    <Text style={detailStaffStyles.staffDes}>
                        {staff?.description || ""}
                    </Text>
                </View>

                {/* Danh mục Spa & Massage */}
                <Text style={detailStaffStyles.sectionTitle}>
                    Spa & Massage
                </Text>

                <View>
                    {staff?.staffServices?.map((sservice, i) => (
                        <StaffServiceItem
                            key={i}
                            staffService={sservice}
                            onClickOrder={onClickOrder}
                            updateTotalMoney={updateTotalMoney}
                            priceIds={priceIds}
                            setPriceIds={setPriceIds}
                        />
                    ))}
                </View>
            </ScrollView>
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

import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { detailStaffStyles, styles } from "../styles/styles";
import StaffService from "../../../../models/StaffService";
import StaffServicePrice from "../../../../models/StaffServicePrice";
import { useEffect, useState } from "react";
const DefaultAvatar = require("../../../../../assets/defaultAvatar.png");
import AntDesign from "@expo/vector-icons/AntDesign";

export default function StaffServiceItem(props: {
    staffService: StaffService;
    onClickOrder?: (priceId: number, add: boolean) => void;
    updateTotalMoney?: (data: number[]) => void;
    priceIds?: number[];
    setPriceIds?: (data: number[]) => void;
}) {
    let allIds = props.staffService?.prices?.map((item) => item?.id) || [];
    const [priceId, setPriceId] = useState(
        props.staffService.prices?.[0]?.id || 0
    );
    const [price, setPrice] = useState<number>(
        props.staffService.prices?.[0]?.price || 0
    );
    const [unit, setUnit] = useState<string>(
        props.staffService.prices?.[0]?.unit || "60 phút"
    );
    const [isOrder, setIsOrder] = useState(false);
    const onChosePrice = (id: number, price: number, unit: string) => {
        setPriceId(id);
        setPrice(price);
        setUnit(unit);
        console.log("isOrder ===", isOrder);
        if (isOrder) {
            let newIds =
                props.priceIds?.filter((item) => !allIds?.includes(item)) || [];
            console.log("newIds ===", newIds);
            console.log("newIds ===", allIds);
            console.log("newIds ===", [...newIds, id]);
            props?.setPriceIds?.([...newIds, id]);
            props?.updateTotalMoney?.([...newIds, id]);
        }
    };

    const onChoseOrder = () => {
        setIsOrder(!isOrder);
        props?.onClickOrder?.(priceId, !isOrder);
    };

    return (
        <View
            style={[
                detailStaffStyles.serviceItem,
                ...(isOrder ? [detailStaffStyles.choseWrap] : []),
            ]}
        >
            <View style={{ flex: 1 }}>
                <Text style={detailStaffStyles.serviceName}>
                    {props.staffService.name || ""}
                </Text>
                <Text style={detailStaffStyles.servicePrice}>{price}đ {unit ? `(${unit})` : ""}</Text>
                <View style={detailStaffStyles.pricesBtnWrap}>
                    {props.staffService?.prices?.map((price, i) => (
                        <StaffPriceButton
                            key={price?.id || i}
                            price={price}
                            onChosePrice={onChosePrice}
                            chosePriceId={priceId}
                        />
                    ))}
                </View>
            </View>
            <TouchableOpacity
                style={detailStaffStyles.orderBtn}
                onPress={() => onChoseOrder()}
            >
                {!isOrder ? (
                    <Text style={detailStaffStyles.orderText}>Đặt</Text>
                ) : (
                    <AntDesign name="check" size={24} color="white" />
                )}
            </TouchableOpacity>
        </View>
    );
}

export function StaffPriceButton(props: {
    price: StaffServicePrice;
    onChosePrice?: (id: any, price: any, unit: any) => void;
    chosePriceId?: number;
}) {
    return (
        <View>
            <TouchableOpacity
                style={
                    props.price?.id === props.chosePriceId
                        ? [detailStaffStyles.button, detailStaffStyles.choseBtn]
                        : detailStaffStyles.button
                }
                onPress={() =>
                    props.onChosePrice?.(props.price?.id, props.price?.price, props.price?.unit)
                }
            >
                <Text style={props.price?.id === props.chosePriceId
                        ? [detailStaffStyles.buttonText, {color: "#fff"}]
                        : detailStaffStyles.buttonText}>
                    {props.price?.price || ""}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

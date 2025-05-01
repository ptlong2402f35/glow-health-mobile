import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    TextInput,
    Text,
    TouchableOpacity,
} from "react-native";
import { staffServiceStyles } from "./styles/styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import useHandleStaffService from "./hook/useHandleStaffService";
import StaffService from "../../../models/StaffService";
import Collapsible from "react-native-collapsible";
import StaffServicePriceItem, {
    StaffServiceCreateDialog,
} from "./components/StaffServicePriceItem";

export default function StaffServiceUpdateScreen() {
    const {
        staffService,
        getStaffService,
        prices,
        updatePrices,
        getServiceSelect,
        createStaffService,
        updateStaffServiceBatch,
        removeStaffService
    } = useHandleStaffService({});
    const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);

    const onConfirmCreateSService = (props: {
        name: string;
        description: string;
        serviceId: number;
    }) => {
        createStaffService({
            ...props,
        });
    };

    const onConfirmUpdate = () => {
        let built = [];
        for(let item of staffService) {
            let newPrices: any = {
                id: item.id,
                prices: []
            };
            for(let price of prices) {
                if(price.staffServiceId === item.id) {
                    newPrices.prices = [
                        ...newPrices.prices,
                        {
                            staffServiceId: item.id,
                            price: price.price,
                            unit: price.unit,
                            serviceGroupId: item.serviceGroupId
                        }
                    ];
                }
            }
            built.push(newPrices);
        }

        console.log("built");
        updateStaffServiceBatch({data: built});

    }

    useEffect(() => {
        getStaffService();
    }, []);

    return (
        <ScrollView style={staffServiceStyles.container}>
            <Text style={staffServiceStyles.note}>
                Lưu ý: Chỉ thêm các dịch vụ bạn cung cấp
            </Text>
            <Text style={staffServiceStyles.sectionTitle}>Spa & Massage</Text>

            {staffService.map((service, index) => (
                <StaffServicePriceItem
                    key={service.id}
                    staffService={service}
                    onUpdatePrice={updatePrices}
                    setIsOpenCreateDialog={setIsOpenCreateDialog}
                    removeStaffService={removeStaffService}
                />
            ))}

            <TouchableOpacity
                onPress={() => onConfirmUpdate()}
                style={staffServiceStyles.saveButton}
            >
                <Text>Lưu</Text>
            </TouchableOpacity>
            <StaffServiceCreateDialog
                open={isOpenCreateDialog}
                onClose={() => setIsOpenCreateDialog(false)}
                getServiceSelect={getServiceSelect}
                onConfirm={onConfirmCreateSService}
            />
        </ScrollView>
    );
}

import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import { staffServiceStyles } from "./styles/styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import useHandleStaffService from "./hook/useHandleStaffService";
import StaffService from "../../../models/StaffService";
import Collapsible from "react-native-collapsible";
import StaffServicePriceItem, {
    StaffServiceCreateDialog,
} from "./components/StaffServicePriceItem";
import BackButton from "../../../common/components/BackButton";
import ServiceGroup from "../../../models/ServiceGroup";

export default function StaffServiceUpdateScreen() {
    const {
        staffService,
        getStaffService,
        prices,
        updatePrices,
        getServiceSelect,
        createStaffService,
        updateStaffServiceBatch,
        removeStaffService,
    } = useHandleStaffService({});
    const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
    const [selectSService, setSelectSService] = useState<any>({});

    const onConfirmCreateSService = async (props: {
        name: string;
        description: string;
        serviceId?: number;
        serviceGroupId?: number;
    }) => {
        await createStaffService({
            ...props,
        });
        setIsOpenCreateDialog(false);
    };

    const onConfirmUpdate = () => {
        let built = prices
            .map((item) => ({
                staffServiceId: item.staffServiceId,
                price: item.price,
                unit: item.unit,
                serviecGroupId: item.serviceGroupId,
            }))
            .filter((val) => val.price && val.unit);

        console.log("built", built);
        updateStaffServiceBatch({ data: built });
    };

    const openCreateDialog = (staffService?: any) => {
        setIsOpenCreateDialog(true);
        setSelectSService(staffService);
    };

    useEffect(() => {
        getStaffService();
    }, []);

    return (
        <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
            <ScrollView
                style={staffServiceStyles.container}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <BackButton top={6} left={6} />
                <View style={staffServiceStyles.titleContainer}>
                    <Text style={staffServiceStyles.headerText}>
                        Thông tin dịch vụ
                    </Text>
                </View>
                <Text style={staffServiceStyles.note}>
                    Lưu ý: Chỉ thêm các dịch vụ bạn cung cấp
                </Text>

                {staffService.map((service, index) => (
                    <StaffServiceGroupItem
                        key={service.id}
                        serviceGroup={service}
                        updatePrices={updatePrices}
                        setIsOpenCreateDialog={openCreateDialog}
                        removeStaffService={removeStaffService}
                        prices={prices}
                    />
                ))}

                <TouchableOpacity
                    onPress={() => onConfirmUpdate()}
                    style={staffServiceStyles.saveButton}
                >
                    <Text style={{color:"#fff", fontSize:18, fontWeight:"bold"}}>Lưu</Text>
                </TouchableOpacity>
                <StaffServiceCreateDialog
                    open={isOpenCreateDialog}
                    onClose={() => setIsOpenCreateDialog(false)}
                    onConfirm={onConfirmCreateSService}
                    selectSService={selectSService}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export function StaffServiceGroupItem(props: {
    serviceGroup: ServiceGroup;
    updatePrices: any;
    setIsOpenCreateDialog: any;
    removeStaffService: any;
    prices?: any[];
}) {
    return (
        <View>
            <Text style={staffServiceStyles.sectionTitle}>
                {props.serviceGroup.name}
            </Text>
            {props?.serviceGroup?.services?.map((service, index) => (
                <StaffServicePriceItem
                    key={service.id + `${index}`}
                    staffService={service}
                    onUpdatePrice={props.updatePrices}
                    setIsOpenCreateDialog={props.setIsOpenCreateDialog}
                    removeStaffService={props.removeStaffService}
                    prices={props.prices}
                />
            ))}
        </View>
    );
}

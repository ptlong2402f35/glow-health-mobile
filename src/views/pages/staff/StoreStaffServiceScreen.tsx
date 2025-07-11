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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useHandleStoreStaffService from "./hook/useHandleStoreStaffService";
import useBottomTab from "../../../hook/useBottomTab";

export default function StoreStaffServiceScreen(props: { route: any }) {
    const staffId = props?.route?.params?.staffId || 0;
        const {changeTab} = useBottomTab();   
    const {
        staffServices,
        getStaffMemberStaffService,
        prices,
        updatePrices,
        createStaffMemberStaffService,
        updateStaffMemberStaffService,
        deleteStaffMemberStaffService,
    } = useHandleStoreStaffService({ staffId });
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);
    const [selectSService, setSelectSService] = useState<any>({});

    const onConfirmCreateSService = async (props: {
        name: string;
        description: string;
        serviceId?: number;
        serviceGroupId?: number;
    }) => {
        await createStaffMemberStaffService({
            ...props,
            staffId,
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
        updateStaffMemberStaffService({ data: built, id: staffId, onSuccess: () => navigation.navigate("StoreStaffManager") });
    };

    const openCreateDialog = (staffService?: any) => {
        setIsOpenCreateDialog(true);
        setSelectSService(staffService);
    };

    useEffect(() => {
        getStaffMemberStaffService(staffId);
    }, []);

    return (
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

            {staffServices.map((service, index) => (
                <StaffServiceGroupItem
                    key={service.id}
                    serviceGroup={service}
                    updatePrices={updatePrices}
                    setIsOpenCreateDialog={openCreateDialog}
                    removeStaffService={deleteStaffMemberStaffService}
                    prices={prices}
                />
            ))}

            <TouchableOpacity
                onPress={() => onConfirmUpdate()}
                style={[
                    staffServiceStyles.saveButton,
                    { marginTop: 2, marginBottom: 2 },
                ]}
            >
                <Text
                    style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                >
                    Lưu
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Home")
                    changeTab?.("Home")
                }}
                style={{
                    padding: 12,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}
                >
                    Bỏ qua
                </Text>
            </TouchableOpacity>
            <StaffServiceCreateDialog
                open={isOpenCreateDialog}
                onClose={() => setIsOpenCreateDialog(false)}
                onConfirm={onConfirmCreateSService}
                selectSService={selectSService}
            />
        </ScrollView>
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

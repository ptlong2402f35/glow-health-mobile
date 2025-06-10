import * as React from "react";
import {
    NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./views/pages/login/LoginScreen";
import SignUpScreen from "./views/pages/login/SignupScreen";
import {
    CustomerAddressList,
    CustomerAddressUpdate,
    Home,
    IconLoading,
    Login,
    MyCustomerDetail,
    MyOrderDetail,
    MyOrderList,
    MyOrderPendingDetail,
    Notification,
    OrderCreate,
    PaymentMethodSelect,
    PaymentStatusView,
    RechargeView,
    Review,
    Signup,
    StaffDetail,
    StaffInfoUpdate,
    StaffList,
    StaffOrderDetail,
    StaffOrderList,
    StaffServiceUpdate,
    StoreStaffInfo,
    StoreStaffManager,
    StoreStaffService,
    Support,
    Topup,
    UpdatePassword,
    UserAccount,
    UserInfoUpdate,
    Wallet,
} from "./statics/config";
import HomeScreen from "./views/pages/home/HomeScreen";
import IconLoadingScreen from "./views/pages/init/IconLoadingScreen";
import { navigationRef } from "./NavigationService";
import StaffListScreen from "./views/pages/staff/StaffListScreen";
import StaffDetailScreen from "./views/pages/staff/StaffDetailScreen";
import StaffOrderListScreen from "./views/pages/order/StaffOrderListScreen";
import AccountScreen from "./views/pages/user/UserAccountScreen";
import StaffServiceUpdateScreen from "./views/pages/staff/StaffServiceUpdateScreen";
import StaffInfoUpdateScreen from "./views/pages/staff/StaffInfoUpdateScreen";
import CustomerAddressListScreen from "./views/pages/customerAddress/CustomerAddressListScreen";
import CustomerAddressCreateScreen from "./views/pages/customerAddress/CustomerAddressCreateScreen";
import WalletScreen from "./views/pages/transaction/WalletScreen";
import SupportScreen from "./views/pages/user/SupportScreen";
import UserInfoScreen from "./views/pages/user/UserInfoScreen";
import ChangePasswordScreen from "./views/pages/user/ChangePasswordScreen";
import CustomerOrderDetailScreen from "./views/pages/order/CustomerOrderDetailScreen";
import OrderCustomerListScreen from "./views/pages/order/OrderCustomerListScreen";
import OrderCustomerPendingScreen from "./views/pages/order/OrderCustomerPendingScreen";
import ReviewOrderScreen from "./views/pages/order/ReviewOrderScreen";
import OrderCreateDetailScreen from "./views/pages/order/OrderCreateDetailScreen";
import PaymentMethodScreen from "./views/pages/transaction/PaymentMethodScreen";
import OrderDetailScreen from "./views/pages/order/StaffOrderDetailScreen";
import NotificationScreen from "./views/pages/notification/NotificationScreen";
import PaymentResultScreen from "./views/pages/transaction/PaymentResultScreen";
import RechargeScreen from "./views/pages/transaction/RechargeScreen";
import TopUpScreen from "./views/pages/transaction/TopupScreen";
import UserInfoUpdateScreen from "./views/pages/user/UserInfoUpdateScreen";
import { emitter, EmitterEvent } from "./hook/emitter/mitt";
import StoreStaffManagerScreen from "./views/pages/staff/StoreStaffManagerScreen";
import StoreStaffInfoUpdateScreen from "./views/pages/staff/StoreStaffInfoUpdateScreen";
import StoreStaffServiceScreen from "./views/pages/staff/StoreStaffServiceScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
    React.useEffect(() => {
        console.log("xxxxxx EMIT ON redirect event xxxxx")
        emitter.on(EmitterEvent.Redirect, (data: any) => {
            console.log("redirect pusher data ====", data);
            navigationRef.navigate(data.screen || "Home", data.params || {});
        });

        return () => {
            emitter.off(EmitterEvent.Redirect);
        };
    }, []);
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName="IconLoading"
                screenOptions={{
                    headerShown: false,
                    animation: "fade",
                    animationDuration: 1,
                }}
            >
                <Stack.Screen
                    name={IconLoading}
                    options={{}}
                    component={IconLoadingScreen}
                />
                <Stack.Screen
                    name={Login}
                    options={{}}
                    component={LoginScreen}
                />
                <Stack.Screen
                    name={Signup}
                    options={{}}
                    component={SignUpScreen}
                />
                <Stack.Screen name={Home} options={{}} component={HomeScreen} />
                <Stack.Screen
                    name={Notification}
                    options={{}}
                    component={NotificationScreen}
                />
                <Stack.Screen
                    name={StaffList}
                    options={{}}
                    component={StaffListScreen}
                />
                <Stack.Screen
                    name={StaffDetail}
                    options={{}}
                    component={StaffDetailScreen}
                />
                <Stack.Screen
                    name={StaffOrderList}
                    options={{}}
                    component={StaffOrderListScreen}
                />
                <Stack.Screen
                    name={StaffOrderDetail}
                    options={{}}
                    component={OrderDetailScreen}
                />
                <Stack.Screen
                    name={UserAccount}
                    options={{}}
                    component={AccountScreen}
                />
                <Stack.Screen
                    name={StaffInfoUpdate}
                    options={{}}
                    component={StaffInfoUpdateScreen}
                />
                <Stack.Screen
                    name={StaffServiceUpdate}
                    options={{}}
                    component={StaffServiceUpdateScreen}
                />
                <Stack.Screen
                    name={CustomerAddressList}
                    options={{}}
                    component={CustomerAddressListScreen}
                />
                <Stack.Screen
                    name={CustomerAddressUpdate}
                    options={{}}
                    component={CustomerAddressCreateScreen}
                />
                <Stack.Screen
                    name={Wallet}
                    options={{}}
                    component={WalletScreen}
                />
                <Stack.Screen
                    name={Support}
                    options={{}}
                    component={SupportScreen}
                />
                <Stack.Screen
                    name={MyCustomerDetail}
                    options={{}}
                    component={UserInfoScreen}
                />
                <Stack.Screen
                    name={UpdatePassword}
                    options={{}}
                    component={ChangePasswordScreen}
                />
                <Stack.Screen
                    name={MyOrderList}
                    options={{}}
                    component={OrderCustomerListScreen}
                />
                <Stack.Screen
                    name={MyOrderDetail}
                    options={{}}
                    component={CustomerOrderDetailScreen}
                />
                <Stack.Screen
                    name={MyOrderPendingDetail}
                    options={{}}
                    component={OrderCustomerPendingScreen}
                />
                <Stack.Screen
                    name={Review}
                    options={{}}
                    component={ReviewOrderScreen}
                />
                <Stack.Screen
                    name={OrderCreate}
                    options={{}}
                    component={OrderCreateDetailScreen}
                />
                <Stack.Screen
                    name={PaymentMethodSelect}
                    options={{}}
                    component={PaymentMethodScreen}
                />
                <Stack.Screen
                    name={RechargeView}
                    options={{}}
                    component={RechargeScreen}
                />
                <Stack.Screen
                    name={PaymentStatusView}
                    options={{}}
                    component={PaymentResultScreen}
                />
                <Stack.Screen
                    name={Topup}
                    options={{}}
                    component={TopUpScreen}
                />
                <Stack.Screen
                    name={UserInfoUpdate}
                    options={{}}
                    component={UserInfoUpdateScreen}
                />
                <Stack.Screen
                    name={StoreStaffManager}
                    options={{}}
                    component={StoreStaffManagerScreen}
                />
                <Stack.Screen
                    name={StoreStaffInfo}
                    options={{}}
                    component={StoreStaffInfoUpdateScreen}
                />
                <Stack.Screen
                    name={StoreStaffService}
                    options={{}}
                    component={StoreStaffServiceScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export function RouterChild() {

}
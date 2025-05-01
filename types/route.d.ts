type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    IconLoading: undefined;
    Notification: undefined;
    StaffList: undefined;
    StaffDetail: undefined;
    UserAccount: undefined;
    StaffOrderList: undefined;
    StaffInfoUpdate: undefined;
    StaffServiceUpdate: undefined;
    CustomerAddressUpdate: undefined;
    CustomerAddressList: undefined;
    Support: undefined;
    Wallet: undefined;
    MyCustomerDetail: undefined;
    UpdatePassword: undefined;
    MyOrderList: undefined;
    MyOrderDetail: undefined;
    MyOrderPendingDetail: undefined;
    Review: undefined;
    OrderCreate: undefined;
    PaymentMethodSelect: undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
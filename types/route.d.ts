type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    IconLoading: undefined;
    Notification: undefined;
    StaffList: undefined;
    StaffDetail: undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
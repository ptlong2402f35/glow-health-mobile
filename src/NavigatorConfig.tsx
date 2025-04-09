import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./views/pages/login/LoginScreen";
import SignUpScreen from "./views/pages/login/SignupScreen";
import {
    Home,
    IconLoading,
    Login,
    Notification,
    Signup,
    StaffDetail,
    StaffList,
} from "./statics/config";
import HomeScreen from "./views/pages/home/HomeScreen";
import IconLoadingScreen from "./views/pages/init/IconLoadingScreen";
import { navigationRef } from "./NavigationService";
import StaffListScreen from "./views/pages/staff/StaffListScreen";
import StaffDetailScreen from "./views/pages/staff/StaffDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
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
                    component={HomeScreen}
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

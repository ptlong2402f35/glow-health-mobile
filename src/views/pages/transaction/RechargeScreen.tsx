import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import useRecharge from "./hook/useRecharge";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useUserLoader from "../../../hook/useUserLoader";
const CLIENT_ID =
    "AVFWsU1brQS6-LkGxZEX94wZhhIDq2uidayJ5O9GN9fKjq6VtqEvx4YKoqrGfr4ZAYECCAOx2e7E0aDE";

export default function RechargeScreen(props: {
    isCreateOrder?: boolean;
    isPayment?: boolean;
    navigation?: any;
    route?: any;
}) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const {rechargeSuccess} = useRecharge();
    const {reloadMe} = useUserLoader();
    const isHandledRef = useRef(false);

    let link = props.route.params.url || "";
    const handleNavigationStateChange = (navState: any) => {
        const { url } = navState;
        console.log("url redirect ===", url);
        if (url.startsWith("https://www.google.com") && !isHandledRef.current) {
            // Parse tham số trả về
            const params = getQueryParams(url);
            const responseCode = params["vnp_ResponseCode"];
            console.log("params ====", params);
            if (responseCode === "00") {
                isHandledRef.current = true;
                rechargeSuccess(
                    {
                        data: params,
                        afterSuccess: async () => {
                            reloadMe?.();
                            navigation.navigate("PaymentStatusView", {status: true} as never);
                        },
                        onFail: () => {
                            navigation.navigate("PaymentStatusView", {status: false} as never);
                        }
                    }
                )
            } else {
                navigation.navigate("PaymentStatusView", {status: false} as never);
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {link ? (
                <WebView
                    source={{ uri: link || "" }}
                    onNavigationStateChange={handleNavigationStateChange}
                    startInLoadingState
                />
            ) : (
                <ActivityIndicator size="large" style={{ marginTop: 100 }} />
            )}
        </View>
    );
}

function getQueryParams(url: string): Record<string, string> {
    const params: Record<string, string> = {};
    const queryString = url.split("?")[1] || "";
    const pairs = queryString.split("&");

    for (const pair of pairs) {
        const [key, value] = pair.split("=");
        if (key)
            params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }

    return params;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

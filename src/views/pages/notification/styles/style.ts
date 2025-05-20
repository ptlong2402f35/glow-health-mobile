import { StyleSheet } from "react-native";

export const notificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    emptyScreen: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    header: {
        backgroundColor: "#4F7942",
        paddingVertical: 16,
        paddingHorizontal: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    list: {
        padding: 12,
    },
    card: {
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    message: {
        fontSize: 14,
        color: "#333",
    },
    time: {
        fontSize: 12,
        color: "#888",
        marginTop: 8,
    },
});

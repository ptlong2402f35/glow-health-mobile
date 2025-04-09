import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        marginTop: 40,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconSection: {
        flexDirection: "row",
        gap: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    role: {
        fontSize: 14,
        color: "green",
    },
    icon: {
        marginRight: 10,
    },
    wrapper: {
        paddingTop: 96,
        paddingBottom: 888,
    },
    card: {
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        overflow: "hidden",
    },
    cardImage: {
        width: "100%",
        height: 180,
    },
    cardOverlay: {
        position: "absolute",
        bottom: 0,
        padding: 12,
        backgroundColor: "rgba(0,0,0,0.4)",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: {
        color: "white",
        fontSize: 16,
    },
    bottomTab: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    tabItem: {
        alignItems: "center",
    },
    tabText: {
        fontSize: 12,
        color: "#777",
    },
    tabTextActive: {
        fontSize: 12,
        color: "green",
    },
});

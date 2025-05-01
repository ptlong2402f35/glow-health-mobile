import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
export const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        flex: 1,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    dateSelector: {
        flexDirection: "row",
        marginBottom: 10,
    },
    dateButton: {
        padding: 10,
        backgroundColor: "#eee",
        marginRight: 8,
        borderRadius: 8,
    },
    filterBar: {
        flexDirection: "row",
        marginBottom: 12,
        justifyContent: "space-between",
    },
    filterButton: {
        backgroundColor: "#d1e7dd",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    jobList: {
        flex: 1,
    },
    jobCard: {
        backgroundColor: "#f9f9f9",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
    status: {
        marginTop: 4,
        marginBottom: 6,
        fontWeight: "600",
    },
    completed: {
        color: "green",
    },
    expired: {
        color: "#999",
    },
    info: {
        fontSize: 13,
        marginBottom: 3,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    price: {
        fontWeight: "bold",
        fontSize: 16,
    },
});

export const orderDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 12,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#c2d5b8",
        marginRight: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: "500",
    },
    expired: {
        color: "#4F7942",
        fontWeight: "500",
    },
    priceBox: {
        backgroundColor: "#d7e9d2",
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
    },
    priceTitle: {
        fontWeight: "bold",
        fontSize: 16,
    },
    priceValue: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "right",
    },
    subText: {
        fontSize: 14,
        color: "#555",
        marginTop: 8,
    },
    receive: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "right",
        color: "#000",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    infoText: {
        fontSize: 15,
        marginLeft: 8,
        flexShrink: 1,
    },
    points: {
        fontSize: 14,
        fontWeight: "500",
        marginLeft: "auto",
    },
    supportBtn: {
        position: "absolute",
        bottom: 30,
        right: 20,
        flexDirection: "row",
        backgroundColor: "#4F7942",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 30,
        alignItems: "center",
        elevation: 4,
    },
    zaloIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    supportText: {
        color: "white",
        fontWeight: "600",
        fontSize: 15,
    },
});

export const customerOrderDetailStyle = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: 180,
        marginBottom: 20,
    },
    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    statusText: {
        fontSize: 16,
        color: "green",
        fontWeight: "600",
    },
    priceText: {
        fontSize: 16,
        color: "green",
        fontWeight: "600",
    },
    infoBox: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    rating: {
        fontSize: 14,
        color: "#888",
    },
    detail: {
        fontSize: 14,
        marginTop: 5,
    },
    primaryButton: {
        backgroundColor: "#4d6f52",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    secondaryButton: {
        backgroundColor: "#e0eddc",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    secondaryText: {
        color: "#4d6f52",
        fontWeight: "600",
        fontSize: 16,
    },
});

export const reviewOrderStyle = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: "center",
    },
    partner: {
        textAlign: "center",
        color: "#888",
        marginTop: 5,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
    },
    question: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 10,
    },
    starContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    starActive: {
        fontSize: 30,
        color: "#FFD700",
        marginHorizontal: 3,
    },
    starInactive: {
        fontSize: 30,
        color: "#ccc",
        marginHorizontal: 3,
    },
    label: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    service: {
        fontSize: 16,
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        height: 100,
        padding: 10,
        textAlignVertical: "top",
        marginBottom: 20,
    },
    imagePicker: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    plus: {
        fontSize: 30,
        color: "#999",
    },
    previewImage: {
        width: 78,
        height: 78,
        borderRadius: 10,
    },
    button: {
        backgroundColor: "#4d6f52",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});

export const orderCustomerDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: Dimensions.get("window").height * 0.5,
    },
    cancelBtn: {
        position: "absolute",
        top: 12,
        right: 16,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: "red",
        backgroundColor: "red"
    },
    cancelBtnText: {
        color: "#fff",
        fontWeight: "bold"
    },
    bottomSheet: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        alignItems: "center",
    },
    alert: {
        color: "red",
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "500",
    },
    forwardListContainer: {
        display: "flex",
        flexDirection:"row",
    },
    illustration: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: "#444",
        textAlign: "center",
        marginBottom: 30,
    },
    supportButton: {
        flexDirection: "row",
        backgroundColor: "#4d6f52",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 14,
        alignItems: "center",
    },
    supportText: {
        color: "#fff",
        marginLeft: 8,
        fontWeight: "600",
    },
});

export const customerOrderListStyles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
    status: {
        fontSize: 13,
    },
    price: {
        fontWeight: "bold",
        fontSize: 16,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#444",
    },
    headerWrapper: {
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginBottom: 12,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    emptyWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginTop: 12,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export const orderCreateScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    headerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    addressContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: "gray",
    },
    address: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: "500",
    },
    serviceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    serviceImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    rating: {
        marginTop: 5,
        fontSize: 14,
        color: "orange",
    },
    feeContainer: {
        marginBottom: 20,
    },
    feeText: {
        fontSize: 16,
        marginBottom: 5,
    },
    timeNow: {
        fontSize: 16,
        marginTop: 10,
    },
    scheduleLink: {
        color: "#7D3C98",
        textDecorationLine: "underline",
    },
    balanceWrap: {
        padding: 8,
        backgroundColor: "#fff",
    },
    balanceContainer: {
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
    },
    balanceLabel: {
        fontSize: 14,
        color: "gray",
    },
    balanceAmount: {
        fontSize: 18,
        color: "green",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    serviceWrap: {
        display: "flex",
        justifyContent: "space-between",
    }
});

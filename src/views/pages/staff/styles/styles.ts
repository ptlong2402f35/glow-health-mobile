import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
    },
    searchContainer: {
        marginBottom: 10,
    },
    searchInput: {
        backgroundColor: "#eee",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 12,
    },
    ratingBox: {
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        width: "48%",
    },
    stars: {
        fontSize: 18,
        marginBottom: 4,
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 10,
    },
    staffListContainer: {},
    serviceItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },
    serviceImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: 12,
    },
    serviceText: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#4b5",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
    },
});

export const detailStaffStyles = StyleSheet.create({
    wrapContainer: {
        backgroundColor: "#d9d6d5",
        paddingBottom: 72,
    },
    container: {
        backgroundColor: "#d9d6d5",
        paddingHorizontal: 12,
    },
    imageWrap: {
        width: screenWidth - 24,
        height: 200,
        borderRadius: 12,
        marginTop: 10,
        alignSelf: "center",
    },
    staffWrap: {
        backgroundColor: "#f6f6f6",
        borderRadius: 12,
        padding: 14,
        marginTop: 20,
    },
    staffName: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 6,
    },
    staffDes: {
        color: "gray",
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginVertical: 16,
    },
    serviceItem: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    serviceName: {
        fontSize: 15,
        fontWeight: "500",
    },
    servicePrice: {
        color: "#444",
        marginTop: 4,
    },
    servicePriceWrap: {},
    button: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginLeft: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d9d6d5",
    },
    orderBtn: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 10,
        backgroundColor: "#4b5",
    },
    orderText: {
        color: "#fff",
    },
    choseBtn: {
        backgroundColor: "#4b5",
        color: "#fff",
    },
    choseWrap: {
      borderWidth: 1,
      borderColor: "#4b5",
    },
    buttonText: {
        // color: '#fff',
        fontWeight: "600",
    },
    pricesBtnWrap: {
        marginTop: 4,
        flex: 1,
        display: "flex",
        flexDirection: "row",
    },
    orderTabBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingHorizontal: 12,
    },
    orderBottomBtn: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: "#4b5",
    },
});

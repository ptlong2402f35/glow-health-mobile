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
        flex: 1
    },
    container: {
        backgroundColor: "#d9d6d5",
        paddingHorizontal: 12,
    },
    imageWrap: {
        width: screenWidth - 24,
        height: 260,
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
    staffSubInfoContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 12
    },
    staffSubInfoText: {
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center"
    },
    staffDes: {
        marginTop: 12
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

export const staffInfoUpdateStyle = StyleSheet.create({
    container: { padding: 16, backgroundColor: "#fff", flex: 1 },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    toggleText: { fontSize: 16 },
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
    imageRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        flexWrap: "wrap",
    },
    avatar: { width: "100%", height: "100%" },
    placeholder: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        marginBottom: 10,
        // backgroundColor: "#ccc",
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
    },
    placeholderInit: {
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    deleteIcon: { position: "absolute", top: 0, right: 0, zIndex: 10 },
    note: { fontSize: 12, color: "#555" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        minHeight: 100,
    },
    label: { marginTop: 10, fontWeight: "bold" },
    picker: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        paddingLeft: 4,
        paddingRight: 4,
    },
    row: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
    radio: {
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 6,
        borderRadius: 4,
    },
    selected: { backgroundColor: "#cde" },
    saveBtn: {
        backgroundColor: "#5a7d5a",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 20,
    },
    saveText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export const staffServiceStyles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        paddingBottom: 128,
        flex: 1
    },
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
    note: {
        color: "red",
        marginBottom: 10,
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    serviceBox: {
        backgroundColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    serviceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    serviceName: {
        fontSize: 16,
        fontWeight: "500",
    },
    input: {
        marginTop: 8,
        paddingLeft: 12,
        backgroundColor: "white",
        borderRadius: 6
    },
    addServiceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 6,
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: "green",
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    ssPriceUpdateWrap: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    dialogContainer: {
        marginBottom: 6,
    },
    dialogInput: {
        width: "60%",
        height: 45,
        paddingLeft: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
});

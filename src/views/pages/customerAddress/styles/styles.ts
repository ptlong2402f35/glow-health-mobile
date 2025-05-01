import { StyleSheet, Dimensions  } from "react-native";
const { height } = Dimensions.get('window');

export const CustomerAddressListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 16,
        textAlign: "center",
    },
    addressList: {
        paddingHorizontal: 16,
        minHeight: height * 0.75,

    },
    addressEmptyWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: "100%"
    },
    addressEmptyText: {
        fontSize: 18
    },
    addressBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    editText: {
        color: "#7B61FF",
        fontWeight: "600",
    },
    phone: {
        fontSize: 14,
        marginBottom: 4,
    },
    address: {
        fontSize: 14,
        color: "#333",
    },
    defaultLabel: {
        marginTop: 8,
        alignSelf: "flex-start",
        backgroundColor: "#dbe6d0",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    defaultText: {
        fontSize: 12,
        color: "#4a6243",
    },
    addButton: {
        backgroundColor: "#3a613f",
        padding: 16,
        borderRadius: 30,
        margin: 16,
        alignItems: "center",
    },
    addText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export const AddressUpdatestyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 10,
        marginTop: 5,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    switchLabel: {
        fontSize: 16,
    },
    button: {
        backgroundColor: "#4d704d",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

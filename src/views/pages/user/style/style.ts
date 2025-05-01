import { StyleSheet } from "react-native";

export const userAccountStyles = StyleSheet.create({
    loginBtnWrap: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    loginWrap: {
        borderRadius: 6,
        backgroundColor: "green",
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
    },
    container: {
        display: "flex",
        backgroundColor: "#f6f6f6",
        padding: 16,
        flex: 1,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dcedc8",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        minHeight: 64,
    },
    avatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    phone: {
        color: "#777",
    },
    vipButton: {
        backgroundColor: "#f9a825",
        borderRadius: 20,
        paddingHorizontal: 12,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    switchLabel: {
        fontSize: 16,
    },
    card: {
        backgroundColor: "#f1f8e9",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
        marginVertical: 6,
    },
    cardGreen: {
        backgroundColor: "#e0f2f1",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 10,
        marginVertical: 6,
    },
    cardText: {
        marginLeft: 10,
        flex: 1,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
    },
    listText: {
        marginLeft: 12,
        fontSize: 15,
        flex: 1,
    },
    balance: {
        color: "#2e7d32",
        fontWeight: "bold",
    },
    lang: {
        fontWeight: "600",
    },
});

export const userInfoStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
        alignItems: "center",
        marginVertical: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    infoContainer: {
        marginVertical: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 16,
        color: "#666",
    },
    value: {
        fontSize: 16,
        color: "#000",
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: "#d8e8d3",
        padding: 12,
        borderRadius: 20,
        width: "90%",
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: "#d8e8d3",
        padding: 14,
        borderRadius: 20,
        width: "90%",
    },
    buttonText: {
        textAlign: "center",
        color: "#333",
        fontWeight: "600",
    },
});

export const userInfoUpdateStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        marginBottom: 20,
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editText: {
        color: "purple",
        marginTop: 8,
    },
    form: {
        marginBottom: 30,
    },
    label: {
        marginVertical: 6,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    disabledInput: {
        backgroundColor: "#f2f2f2",
        color: "#999",
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 25,
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#999",
        justifyContent: "center",
        alignItems: "center",
    },
    radioSelectedOuter: {
        borderColor: "#628c5f",
    },
    radioInner: {
        width: 10,
        height: 10,
        backgroundColor: "#628c5f",
        borderRadius: 5,
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: "#444",
    },
    saveButton: {
        backgroundColor: "#628c5f",
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export const supportStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 24,
        paddingTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 20,
    },
    wrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        padding: 14,
        marginBottom: 15,
        minWidth: "90%"
    },
    icon: {
        marginRight: 10,
    },
    iconImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    cardText: {
        fontSize: 16,
        flexShrink: 1,
    },
});

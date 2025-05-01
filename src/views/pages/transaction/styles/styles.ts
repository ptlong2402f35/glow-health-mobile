import { StyleSheet } from "react-native";

export const walletStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backgroundWrapper: {
        backgroundColor: "#dcedc8",
        paddingBottom: 20,
    },
    header: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
    },
    balance: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 8,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginBottom: 4,
    },
    button: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: 5,
    },
    buttonText: {
        fontWeight: "bold",
    },
    transactionWrap: {
      padding: 16
    },
    notranswrap: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    reconcile: {
        color: "#246B60",
        textAlign: "center",
        textDecorationLine: "underline",
        marginBottom: 10,
    },
    item: {
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
    },
    iconContainer: {
        justifyContent: "center",
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    desc: {
        fontSize: 14,
    },
    time: {
        fontSize: 12,
        color: "#777",
        marginTop: 4,
    },
    right: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    amount: {
        fontSize: 14,
        fontWeight: "bold",
    },
    green: {
        color: "#4CAF50",
    },
    red: {
        color: "#F44336",
    },
    status: {
        fontSize: 12,
        color: "#4CAF50",
    },
});

export const paymentMethodStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    headerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    list: {
      paddingBottom: 20,
    },
    methodItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#F8F8F8',
      borderRadius: 10,
      marginBottom: 15,
      justifyContent: 'space-between',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconPlaceholder: {
      width: 30,
      height: 30,
      backgroundColor: '#d0d0d0',
      borderRadius: 5,
      marginRight: 15,
    },
    methodName: {
      fontSize: 16,
      fontWeight: '500',
    },
    balance: {
      fontSize: 14,
      color: 'gray',
      marginTop: 3,
    },
    radioCircle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#4CAF50',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRadio: {
      backgroundColor: '#4CAF50',
    },
    button: {
      backgroundColor: '#4CAF50',
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 'auto',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
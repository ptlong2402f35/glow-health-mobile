import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ReasonCancelPopup(props: {
    onConfirm?: (reason?: string) => void;
    visible?: boolean;
    onClose?: ()=> void;
}
) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue("");
  },[props.visible]);

  return (
    <View style={styles.container}>
      <Modal
        transparent
        animationType="fade"
        visible={props.visible}
        onRequestClose={() => props.onClose?.()}
      >
        <View style={styles.modalBackground}>
          <View style={styles.popup}>
            <Text style={styles.title}>Lý do hủy đơn</Text>
            <TextInput
              style={styles.input}
              placeholder="Lý do hủy đơn"
              value={inputValue}
              onChangeText={setInputValue}
            />
                <Text style={styles.confirmWarnText}>Bạn chắc chắn muốn hủy đơn hàng này</Text>


            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => props.onClose?.()}
              >
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => {
                  props.onConfirm?.(inputValue);
                }}
              >
                <Text style={styles.confirmText}>Chấp nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // nền mờ
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#28a745',
  },
  cancelText: {
    color: '#000',
    fontWeight: '500',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '500',
  },
  confirmWarnText: {
    color: 'red',
    fontWeight: '500',
    fontSize: 18
  },
});

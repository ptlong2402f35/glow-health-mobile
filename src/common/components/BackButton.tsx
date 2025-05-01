
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Dùng icon đẹp

const BackButton = (props: {color?: string, top?: number, left?: number}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.backButton, {top: props?.top || 15, left: props?.left || 15}]}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={24} color={props?.color ? props?.color : "black"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 15, 
    left: 15,
    zIndex: 10000000,
    backgroundColor: 'transparent',
    padding: 8,
  },
});

export default BackButton;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExportEmployeesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Export Employees Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ExportEmployeesScreen;

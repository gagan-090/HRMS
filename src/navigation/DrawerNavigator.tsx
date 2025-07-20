import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DashboardScreen from '../screens/DashboardScreen'; // ✅ import directly

const Sidebar: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  return (
    <View style={styles.sidebarContainer}>
      <Text style={styles.sidebarTitle}>Sidebar</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.sidebarItem}>Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => <Sidebar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sidebarItem: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#333',
  },
});

export default DrawerNavigator;

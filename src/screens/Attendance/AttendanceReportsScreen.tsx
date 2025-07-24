import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { widthPixel, heightPixel, fontPixel } from '../../utils/responsive';

const AttendanceReportsScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textColor }]}>Attendance Reports</Text>
      <Text style={[styles.subtitle, { color: colors.subtitleColor }]}>Attendance reports will be displayed here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: widthPixel(20),
  },
  title: {
    fontSize: fontPixel(24),
    fontWeight: 'bold',
    marginBottom: heightPixel(10),
  },
  subtitle: {
    fontSize: fontPixel(16),
  },
});

export default AttendanceReportsScreen;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { 
  widthPixel, 
  heightPixel, 
  fontPixel, 
  spacing, 
  componentSizes,
  isSmallDevice 
} from '../../utils/responsive';

const AllAttendanceScreen: React.FC = () => {
  const { colors } = useTheme();

  const attendanceData = [
    { name: 'John Doe', status: 'Present', time: '09:00 AM', date: 'Today' },
    { name: 'Jane Smith', status: 'Late', time: '09:30 AM', date: 'Today' },
    { name: 'Mike Johnson', status: 'Absent', time: '-', date: 'Today' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={[styles.headerCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.title, { color: colors.textColor }]}>All Attendance</Text>
            <Text style={[styles.subtitle, { color: colors.subtitleColor }]}>
              Monitor and manage attendance records for all employees
            </Text>
          </View>

          <View style={[styles.statsCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Today's Summary</Text>
            <View style={styles.statsRow}>
              <View style={[styles.statItem, { backgroundColor: colors.successGreenBg }]}>
                <Text style={[styles.statNumber, { color: colors.successGreenText }]}>85</Text>
                <Text style={[styles.statLabel, { color: colors.successGreenText }]}>Present</Text>
              </View>
              <View style={[styles.statItem, { backgroundColor: colors.warningYellow }]}>
                <Text style={[styles.statNumber, { color: colors.textColor }]}>12</Text>
                <Text style={[styles.statLabel, { color: colors.textColor }]}>Late</Text>
              </View>
              <View style={[styles.statItem, { backgroundColor: colors.dangerRedBg }]}>
                <Text style={[styles.statNumber, { color: colors.dangerRedText }]}>8</Text>
                <Text style={[styles.statLabel, { color: colors.dangerRedText }]}>Absent</Text>
              </View>
            </View>
          </View>
          
          <View style={[styles.attendanceCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Recent Records</Text>
              <TouchableOpacity style={[styles.filterButton, { borderColor: colors.borderGray }]}>
                <Text style={[styles.filterText, { color: colors.subtitleColor }]}>Filter</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.attendanceList}>
              {attendanceData.map((record, index) => (
                <View key={index} style={[styles.attendanceItem, { backgroundColor: colors.background }]}>
                  <View style={styles.employeeInfo}>
                    <Text style={[styles.employeeName, { color: colors.textColor }]}>{record.name}</Text>
                    <Text style={[styles.attendanceDate, { color: colors.subtitleColor }]}>{record.date}</Text>
                  </View>
                  <View style={styles.attendanceDetails}>
                    <View style={[
                      styles.statusBadge, 
                      { backgroundColor: record.status === 'Present' ? colors.successGreenBg : 
                                        record.status === 'Late' ? colors.warningYellow : colors.dangerRedBg }
                    ]}>
                      <Text style={[
                        styles.statusText, 
                        { color: record.status === 'Present' ? colors.successGreenText : 
                                 record.status === 'Late' ? colors.textColor : colors.dangerRedText }
                      ]}>
                        {record.status}
                      </Text>
                    </View>
                    <Text style={[styles.attendanceTime, { color: colors.subtitleColor }]}>{record.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.blue }]}>
              <Text style={[styles.actionButtonText, { color: colors.white }]}>Mark Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.green }]}>
              <Text style={[styles.actionButtonText, { color: colors.white }]}>Generate Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  container: {
    flex: 1,
    padding: componentSizes.screenPadding,
  },
  headerCard: {
    borderRadius: widthPixel(12),
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(4),
    elevation: 3,
  },
  title: {
    fontSize: isSmallDevice() ? fontPixel(22) : fontPixel(28),
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontPixel(16),
    textAlign: 'center',
    lineHeight: fontPixel(22),
  },
  statsCard: {
    borderRadius: widthPixel(12),
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(4),
    elevation: 3,
  },
  attendanceCard: {
    borderRadius: widthPixel(12),
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(4),
    elevation: 3,
  },
  sectionTitle: {
    fontSize: fontPixel(20),
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: widthPixel(6),
    borderWidth: 1,
  },
  filterText: {
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statItem: {
    flex: 1,
    padding: spacing.md,
    borderRadius: widthPixel(8),
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontPixel(24),
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  attendanceList: {
    gap: spacing.md,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: widthPixel(8),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: fontPixel(16),
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  attendanceDate: {
    fontSize: fontPixel(12),
  },
  attendanceDetails: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: widthPixel(12),
    marginBottom: spacing.xs,
  },
  statusText: {
    fontSize: fontPixel(12),
    fontWeight: '600',
  },
  attendanceTime: {
    fontSize: fontPixel(12),
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    height: componentSizes.buttonHeight,
    borderRadius: widthPixel(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: fontPixel(16),
    fontWeight: '600',
  },
});

export default AllAttendanceScreen;

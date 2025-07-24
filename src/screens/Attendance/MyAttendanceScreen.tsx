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

const MyAttendanceScreen: React.FC = () => {
  const { colors } = useTheme();

  const myAttendanceData = [
    { date: 'Dec 15, 2024', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', hours: '9h 0m' },
    { date: 'Dec 14, 2024', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Late', hours: '8h 45m' },
    { date: 'Dec 13, 2024', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', hours: '9h 0m' },
    { date: 'Dec 12, 2024', checkIn: '-', checkOut: '-', status: 'Absent', hours: '0h 0m' },
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
            <Text style={[styles.title, { color: colors.textColor }]}>My Attendance</Text>
            <Text style={[styles.subtitle, { color: colors.subtitleColor }]}>
              Track your personal attendance records and working hours
            </Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>This Month Summary</Text>
            <View style={styles.summaryGrid}>
              <View style={[styles.summaryItem, { backgroundColor: colors.successGreenBg }]}>
                <Text style={[styles.summaryNumber, { color: colors.successGreenText }]}>18</Text>
                <Text style={[styles.summaryLabel, { color: colors.successGreenText }]}>Present Days</Text>
              </View>
              <View style={[styles.summaryItem, { backgroundColor: colors.warningYellow }]}>
                <Text style={[styles.summaryNumber, { color: colors.textColor }]}>2</Text>
                <Text style={[styles.summaryLabel, { color: colors.textColor }]}>Late Days</Text>
              </View>
              <View style={[styles.summaryItem, { backgroundColor: colors.dangerRedBg }]}>
                <Text style={[styles.summaryNumber, { color: colors.dangerRedText }]}>1</Text>
                <Text style={[styles.summaryLabel, { color: colors.dangerRedText }]}>Absent Days</Text>
              </View>
              <View style={[styles.summaryItem, { backgroundColor: colors.infoBlueBg }]}>
                <Text style={[styles.summaryNumber, { color: colors.blue }]}>162h</Text>
                <Text style={[styles.summaryLabel, { color: colors.blue }]}>Total Hours</Text>
              </View>
            </View>
          </View>

          <View style={[styles.todayCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Today's Status</Text>
            <View style={styles.todayStatus}>
              <View style={styles.statusRow}>
                <Text style={[styles.statusLabel, { color: colors.subtitleColor }]}>Check In:</Text>
                <Text style={[styles.statusValue, { color: colors.successGreenText }]}>09:00 AM</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={[styles.statusLabel, { color: colors.subtitleColor }]}>Check Out:</Text>
                <Text style={[styles.statusValue, { color: colors.subtitleColor }]}>Not yet</Text>
              </View>
              <View style={styles.statusRow}>
                <Text style={[styles.statusLabel, { color: colors.subtitleColor }]}>Working Hours:</Text>
                <Text style={[styles.statusValue, { color: colors.blue }]}>7h 30m</Text>
              </View>
            </View>
          </View>
          
          <View style={[styles.historyCard, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Recent History</Text>
              <TouchableOpacity style={[styles.viewAllButton, { borderColor: colors.borderGray }]}>
                <Text style={[styles.viewAllText, { color: colors.blue }]}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.historyList}>
              {myAttendanceData.map((record, index) => (
                <View key={index} style={[styles.historyItem, { backgroundColor: colors.background }]}>
                  <View style={styles.dateSection}>
                    <Text style={[styles.recordDate, { color: colors.textColor }]}>{record.date}</Text>
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
                  </View>
                  <View style={styles.timeSection}>
                    <View style={styles.timeRow}>
                      <Text style={[styles.timeLabel, { color: colors.subtitleColor }]}>In: {record.checkIn}</Text>
                      <Text style={[styles.timeLabel, { color: colors.subtitleColor }]}>Out: {record.checkOut}</Text>
                    </View>
                    <Text style={[styles.hoursText, { color: colors.blue }]}>{record.hours}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.green }]}>
              <Text style={[styles.actionButtonText, { color: colors.white }]}>Check In/Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.blue }]}>
              <Text style={[styles.actionButtonText, { color: colors.white }]}>Request Leave</Text>
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
  summaryCard: {
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
  todayCard: {
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
  historyCard: {
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
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  summaryItem: {
    flex: 1,
    minWidth: widthPixel(140),
    padding: spacing.md,
    borderRadius: widthPixel(8),
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: fontPixel(24),
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    fontSize: fontPixel(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  todayStatus: {
    gap: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: fontPixel(16),
    fontWeight: '500',
  },
  statusValue: {
    fontSize: fontPixel(16),
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  viewAllButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: widthPixel(6),
    borderWidth: 1,
  },
  viewAllText: {
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  historyList: {
    gap: spacing.md,
  },
  historyItem: {
    padding: spacing.md,
    borderRadius: widthPixel(8),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  recordDate: {
    fontSize: fontPixel(16),
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: widthPixel(12),
  },
  statusText: {
    fontSize: fontPixel(12),
    fontWeight: '600',
  },
  timeSection: {
    gap: spacing.xs,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: fontPixel(14),
  },
  hoursText: {
    fontSize: fontPixel(14),
    fontWeight: '600',
    textAlign: 'right',
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

export default MyAttendanceScreen;

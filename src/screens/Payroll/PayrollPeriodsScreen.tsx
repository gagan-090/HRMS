import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface PayrollPeriod {
  id: string;
  periodName: string;
  startDate: string;
  endDate: string;
  payDate: string;
  status: 'Draft' | 'Processing' | 'Completed' | 'Paid';
  employeeCount: number;
  totalAmount: number;
}

const samplePeriods: PayrollPeriod[] = [
  {
    id: '1',
    periodName: 'January 2024',
    startDate: '01 Jan 2024',
    endDate: '31 Jan 2024',
    payDate: '05 Feb 2024',
    status: 'Completed',
    employeeCount: 156,
    totalAmount: 4520000,
  },
  {
    id: '2',
    periodName: 'February 2024',
    startDate: '01 Feb 2024',
    endDate: '29 Feb 2024',
    payDate: '05 Mar 2024',
    status: 'Processing',
    employeeCount: 158,
    totalAmount: 4680000,
  },
  {
    id: '3',
    periodName: 'March 2024',
    startDate: '01 Mar 2024',
    endDate: '31 Mar 2024',
    payDate: '05 Apr 2024',
    status: 'Draft',
    employeeCount: 160,
    totalAmount: 4750000,
  },
];

const PayrollPeriodsScreen: React.FC = () => {
  const { colors } = useTheme();

  const CalendarIcon = () => <Text style={styles.headerIcon}>📅</Text>;
  const PlusIcon = () => <Text style={styles.buttonIcon}>+</Text>;
  const EyeIcon = () => <Text style={styles.actionIcon}>👁</Text>;
  const EditIcon = () => <Text style={styles.actionIcon}>✏</Text>;
  const ProcessIcon = () => <Text style={styles.actionIcon}>⚙️</Text>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return { bg: colors.successGreenBg, text: colors.successGreenText };
      case 'Processing':
        return { bg: colors.warningYellow, text: colors.warningYellowBorder };
      case 'Paid':
        return { bg: colors.infoBlueBg, text: colors.infoBlueText };
      default:
        return { bg: colors.lightGray, text: colors.grayText };
    }
  };

  const renderPeriodRow = ({ item }: { item: PayrollPeriod }) => {
    const statusColors = getStatusColor(item.status);
    
    return (
      <View style={[styles.tableRow, { borderBottomColor: colors.tableBorder }]}>
        <View style={styles.periodCell}>
          <Text style={[styles.periodName, { color: colors.textColor }]}>{item.periodName}</Text>
          <Text style={[styles.periodDates, { color: colors.grayText }]}>{item.startDate} - {item.endDate}</Text>
        </View>
        
        <View style={styles.payDateCell}>
          <Text style={[styles.payDate, { color: colors.textColor }]}>{item.payDate}</Text>
        </View>
        
        <View style={styles.statusCell}>
          <View style={[styles.statusPill, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status}</Text>
          </View>
        </View>
        
        <View style={styles.employeeCountCell}>
          <Text style={[styles.employeeCount, { color: colors.textColor }]}>{item.employeeCount}</Text>
          <Text style={[styles.employeeLabel, { color: colors.grayText }]}>employees</Text>
        </View>
        
        <View style={styles.amountCell}>
          <Text style={[styles.amount, { color: colors.accentGreen }]}>₹{(item.totalAmount / 100000).toFixed(1)}L</Text>
        </View>
        
        <View style={styles.actionsCell}>
          <TouchableOpacity style={styles.actionButton}>
            <EyeIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <EditIcon />
          </TouchableOpacity>
          {item.status === 'Draft' && (
            <TouchableOpacity style={styles.actionButton}>
              <ProcessIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primaryDarkBlue }]}>
          <View style={styles.headerLeft}>
            <CalendarIcon />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, { color: colors.white }]}>Payroll Periods</Text>
              <Text style={[styles.headerSubtitle, { color: colors.white }]}>Manage payroll processing periods and schedules</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>12</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Total Periods</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>3</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Active</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={[styles.mainCard, { backgroundColor: colors.cardBackground }]}>
          {/* Actions */}
          <View style={styles.actionBar}>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.accentGreen }]}>
              <PlusIcon />
              <Text style={[styles.addButtonText, { color: colors.white }]}>Create Period</Text>
            </TouchableOpacity>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            <View style={[styles.tableHeader, { backgroundColor: colors.lightGray, borderBottomColor: colors.borderGray }]}>
              <Text style={[styles.tableHeaderText, styles.periodHeader, { color: colors.tableHeader }]}>PERIOD</Text>
              <Text style={[styles.tableHeaderText, styles.payDateHeader, { color: colors.tableHeader }]}>PAY DATE</Text>
              <Text style={[styles.tableHeaderText, styles.statusHeader, { color: colors.tableHeader }]}>STATUS</Text>
              <Text style={[styles.tableHeaderText, styles.employeeHeader, { color: colors.tableHeader }]}>EMPLOYEES</Text>
              <Text style={[styles.tableHeaderText, styles.amountHeader, { color: colors.tableHeader }]}>AMOUNT</Text>
              <Text style={[styles.tableHeaderText, styles.actionsHeader, { color: colors.tableHeader }]}>ACTIONS</Text>
            </View>

            <FlatList
              data={samplePeriods}
              renderItem={renderPeriodRow}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#475569',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  headerStats: {
    flexDirection: 'row',
  },
  statItem: {
    alignItems: 'center',
    marginLeft: 32,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  buttonIcon: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  tableContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  periodHeader: { flex: 3 },
  payDateHeader: { flex: 2, textAlign: 'center' },
  statusHeader: { flex: 2, textAlign: 'center' },
  employeeHeader: { flex: 2, textAlign: 'center' },
  amountHeader: { flex: 2, textAlign: 'center' },
  actionsHeader: { flex: 2, textAlign: 'center' },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  periodCell: {
    flex: 3,
  },
  periodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  periodDates: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  payDateCell: {
    flex: 2,
    alignItems: 'center',
  },
  payDate: {
    fontSize: 13,
    color: '#374151',
  },
  statusCell: {
    flex: 2,
    alignItems: 'center',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  employeeCountCell: {
    flex: 2,
    alignItems: 'center',
  },
  employeeCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  employeeLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  amountCell: {
    flex: 2,
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  actionsCell: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    padding: 4,
    marginHorizontal: 2,
  },
  actionIcon: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default PayrollPeriodsScreen;
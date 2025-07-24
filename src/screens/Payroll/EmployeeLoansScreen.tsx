import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface EmployeeLoan {
  id: string;
  employeeId: string;
  employeeName: string;
  loanType: string;
  loanAmount: number;
  remainingAmount: number;
  monthlyDeduction: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Pending' | 'Rejected';
}

const sampleLoans: EmployeeLoan[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    loanType: 'Personal Loan',
    loanAmount: 500000,
    remainingAmount: 250000,
    monthlyDeduction: 25000,
    startDate: '01 Jan 2024',
    endDate: '31 Dec 2024',
    status: 'Active',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    loanType: 'Home Loan',
    loanAmount: 1000000,
    remainingAmount: 800000,
    monthlyDeduction: 40000,
    startDate: '15 Feb 2024',
    endDate: '15 Feb 2026',
    status: 'Active',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Mike Johnson',
    loanType: 'Emergency Loan',
    loanAmount: 100000,
    remainingAmount: 0,
    monthlyDeduction: 0,
    startDate: '01 Dec 2023',
    endDate: '30 Nov 2024',
    status: 'Completed',
  },
];

const EmployeeLoansScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');

  const LoanIcon = () => <Text style={styles.headerIcon}>💳</Text>;
  const SearchIcon = () => <Text style={styles.searchIcon}>🔍</Text>;
  const PlusIcon = () => <Text style={styles.buttonIcon}>+</Text>;
  const EyeIcon = () => <Text style={styles.actionIcon}>👁</Text>;
  const EditIcon = () => <Text style={styles.actionIcon}>✏</Text>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: colors.infoBlueBg, text: colors.infoBlueText };
      case 'Completed':
        return { bg: colors.successGreenBg, text: colors.successGreenText };
      case 'Pending':
        return { bg: colors.warningYellow, text: colors.warningYellowBorder };
      case 'Rejected':
        return { bg: colors.dangerRedBg, text: colors.dangerRedText };
      default:
        return { bg: colors.lightGray, text: colors.grayText };
    }
  };

  const renderLoanRow = ({ item }: { item: EmployeeLoan }) => {
    const statusColors = getStatusColor(item.status);
    const completionPercentage = ((item.loanAmount - item.remainingAmount) / item.loanAmount) * 100;
    
    return (
      <View style={[styles.tableRow, { borderBottomColor: colors.tableBorder }]}>
        <View style={styles.employeeCell}>
          <Text style={[styles.employeeId, { color: colors.red }]}>{item.employeeId}</Text>
          <Text style={[styles.employeeName, { color: colors.textColor }]}>{item.employeeName}</Text>
          <Text style={[styles.loanType, { color: colors.grayText }]}>{item.loanType}</Text>
        </View>
        
        <View style={styles.amountCell}>
          <Text style={[styles.loanAmount, { color: colors.textColor }]}>₹{(item.loanAmount / 100000).toFixed(1)}L</Text>
          <Text style={[styles.amountLabel, { color: colors.grayText }]}>Total</Text>
        </View>
        
        <View style={styles.amountCell}>
          <Text style={[styles.remainingAmount, { color: colors.red }]}>₹{(item.remainingAmount / 100000).toFixed(1)}L</Text>
          <Text style={[styles.amountLabel, { color: colors.grayText }]}>Remaining</Text>
        </View>
        
        <View style={styles.deductionCell}>
          <Text style={[styles.monthlyDeduction, { color: colors.accentGreen }]}>₹{item.monthlyDeduction.toLocaleString()}</Text>
          <Text style={[styles.amountLabel, { color: colors.grayText }]}>Monthly</Text>
        </View>
        
        <View style={styles.progressCell}>
          <View style={[styles.progressBar, { backgroundColor: colors.borderGray }]}>
            <View style={[styles.progressFill, { width: `${completionPercentage}%`, backgroundColor: colors.accentGreen }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.grayText }]}>{completionPercentage.toFixed(0)}%</Text>
        </View>
        
        <View style={styles.statusCell}>
          <View style={[styles.statusPill, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>{item.status}</Text>
          </View>
        </View>
        
        <View style={styles.actionsCell}>
          <TouchableOpacity style={styles.actionButton}>
            <EyeIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <EditIcon />
          </TouchableOpacity>
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
            <LoanIcon />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, { color: colors.white }]}>Employee Loans</Text>
              <Text style={[styles.headerSubtitle, { color: colors.white }]}>Manage employee loan applications and repayments</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>23</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Active Loans</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>₹12.5L</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Total Outstanding</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={[styles.mainCard, { backgroundColor: colors.cardBackground }]}>
          {/* Search and Actions */}
          <View style={styles.searchActionBar}>
            <View style={[styles.searchContainer, { backgroundColor: colors.lightGray }]}>
              <SearchIcon />
              <TextInput
                style={[styles.searchInput, { color: colors.textColor }]}
                placeholder="Search loans by employee name, ID, or loan type..."
                placeholderTextColor={colors.grayText}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.accentGreen }]}>
              <PlusIcon />
              <Text style={[styles.addButtonText, { color: colors.white }]}>Add Loan</Text>
            </TouchableOpacity>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            <View style={[styles.tableHeader, { backgroundColor: colors.lightGray, borderBottomColor: colors.borderGray }]}>
              <Text style={[styles.tableHeaderText, styles.employeeHeader, { color: colors.tableHeader }]}>EMPLOYEE</Text>
              <Text style={[styles.tableHeaderText, styles.amountHeader, { color: colors.tableHeader }]}>LOAN AMOUNT</Text>
              <Text style={[styles.tableHeaderText, styles.amountHeader, { color: colors.tableHeader }]}>REMAINING</Text>
              <Text style={[styles.tableHeaderText, styles.deductionHeader, { color: colors.tableHeader }]}>MONTHLY EMI</Text>
              <Text style={[styles.tableHeaderText, styles.progressHeader, { color: colors.tableHeader }]}>PROGRESS</Text>
              <Text style={[styles.tableHeaderText, styles.statusHeader, { color: colors.tableHeader }]}>STATUS</Text>
              <Text style={[styles.tableHeaderText, styles.actionsHeader, { color: colors.tableHeader }]}>ACTIONS</Text>
            </View>

            <FlatList
              data={sampleLoans}
              renderItem={renderLoanRow}
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
  searchActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 16,
    color: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
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
  employeeHeader: { flex: 3 },
  amountHeader: { flex: 2, textAlign: 'center' },
  deductionHeader: { flex: 2, textAlign: 'center' },
  progressHeader: { flex: 2, textAlign: 'center' },
  statusHeader: { flex: 1.5, textAlign: 'center' },
  actionsHeader: { flex: 1.5, textAlign: 'center' },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  employeeCell: {
    flex: 3,
  },
  employeeId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  employeeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginTop: 2,
  },
  loanType: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  amountCell: {
    flex: 2,
    alignItems: 'center',
  },
  loanAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  remainingAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
  amountLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  deductionCell: {
    flex: 2,
    alignItems: 'center',
  },
  monthlyDeduction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  progressCell: {
    flex: 2,
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#6B7280',
  },
  statusCell: {
    flex: 1.5,
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
  actionsCell: {
    flex: 1.5,
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

export default EmployeeLoansScreen;
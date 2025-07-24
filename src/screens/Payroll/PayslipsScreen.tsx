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

interface Payslip {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  month: string;
  year: string;
  grossSalary: number;
  deductions: number;
  taxDeducted: number;
  netSalary: number;
  status: 'Generated' | 'Pending' | 'Sent' | 'Processing';
  generatedDate: string;
  avatar: string;
}

const samplePayslips: Payslip[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'mrs Aadhya Devi Bansal',
    department: 'Human Resources',
    designation: 'HR Executive',
    month: 'June',
    year: '2024',
    grossSalary: 63825,
    deductions: 6349,
    taxDeducted: 8500,
    netSalary: 48976,
    status: 'Generated',
    generatedDate: '2024-06-25',
    avatar: 'AB',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'mr Aadhya Jain',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    month: 'June',
    year: '2024',
    grossSalary: 58000,
    deductions: 5800,
    taxDeducted: 7200,
    netSalary: 45000,
    status: 'Processing',
    generatedDate: '2024-06-25',
    avatar: 'AJ',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'ms Aadhya Srivastava',
    department: 'Marketing',
    designation: 'Content Creator',
    month: 'June',
    year: '2024',
    grossSalary: 52000,
    deductions: 4800,
    taxDeducted: 6200,
    netSalary: 41000,
    status: 'Generated',
    generatedDate: '2024-06-24',
    avatar: 'AS',
  },
  {
    id: '4',
    employeeId: 'EMP004',
    employeeName: 'mr Aarohi Bansal',
    department: 'Finance',
    designation: 'Financial Analyst',
    month: 'June',
    year: '2024',
    grossSalary: 67000,
    deductions: 6200,
    taxDeducted: 9100,
    netSalary: 51700,
    status: 'Sent',
    generatedDate: '2024-06-23',
    avatar: 'AB',
  },
  {
    id: '5',
    employeeId: 'EMP005',
    employeeName: 'ms Aarohi Singh Kumar',
    department: 'IT',
    designation: 'Software Engineer',
    month: 'June',
    year: '2024',
    grossSalary: 75000,
    deductions: 7200,
    taxDeducted: 11800,
    netSalary: 56000,
    status: 'Generated',
    generatedDate: '2024-06-22',
    avatar: 'AK',
  },
  {
    id: '6',
    employeeId: 'EMP006',
    employeeName: 'mr Deepak Patel',
    department: 'Sales',
    designation: 'Sales Executive',
    month: 'June',
    year: '2024',
    grossSalary: 48000,
    deductions: 4200,
    taxDeducted: 5800,
    netSalary: 38000,
    status: 'Pending',
    generatedDate: '2024-06-21',
    avatar: 'DP',
  },
  {
    id: '7',
    employeeId: 'EMP007',
    employeeName: 'ms Sneha Mishra',
    department: 'Customer Support',
    designation: 'Support Agent',
    month: 'June',
    year: '2024',
    grossSalary: 42000,
    deductions: 3800,
    taxDeducted: 4900,
    netSalary: 33300,
    status: 'Generated',
    generatedDate: '2024-06-20',
    avatar: 'SM',
  },
  {
    id: '8',
    employeeId: 'EMP008',
    employeeName: 'mr Vikas Sharma',
    department: 'Operations',
    designation: 'Operations Manager',
    month: 'June',
    year: '2024',
    grossSalary: 82000,
    deductions: 8500,
    taxDeducted: 14200,
    netSalary: 59300,
    status: 'Sent',
    generatedDate: '2024-06-19',
    avatar: 'VS',
  },
];

const PayslipsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('All Periods');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

  // Icon components
  const PayslipIcon = () => <Text style={styles.headerIcon}>📄</Text>;
  const SearchIcon = () => <Text style={styles.searchIcon}>🔍</Text>;
  const FilterIcon = () => <Text style={styles.filterIcon}>🔽</Text>;
  const ProcessIcon = () => <Text style={styles.buttonIcon}>⚙️</Text>;
  const ReportIcon = () => <Text style={styles.buttonIcon}>📊</Text>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated':
        return { backgroundColor: '#DBEAFE', color: '#1E40AF' };
      case 'Sent':
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
      case 'Processing':
        return { backgroundColor: '#FEF3C7', color: '#92400E' };
      case 'Pending':
        return { backgroundColor: '#FEE2E2', color: '#991B1B' };
      default:
        return { backgroundColor: colors.lightGray, color: colors.grayText };
    }
  };

  const renderTopStatCard = (value: string, label: string, index: number) => {
    const gradients = [
      '#6366F1', // Indigo
      '#8B5CF6', // Purple  
      '#3B82F6', // Blue
      '#06B6D4', // Cyan
    ];
    return (
      <View key={index} style={[styles.topStatCard, { backgroundColor: gradients[index] }]}>
        <Text style={styles.topStatValue}>{value}</Text>
        <Text style={styles.topStatLabel}>{label}</Text>
      </View>
    );
  };

  const renderPayslipCard = ({ item }: { item: Payslip }) => {
    const statusStyle = getStatusColor(item.status);
    
    return (
      <View style={[styles.payslipCard, { backgroundColor: colors.cardBackground }]}>
        {/* Employee Header */}
        <View style={styles.employeeHeader}>
          <View style={styles.employeeAvatar}>
            <Text style={styles.avatarText}>{item.avatar}</Text>
          </View>
          <View style={styles.employeeInfo}>
            <Text style={[styles.employeeName, { color: colors.textColor }]}>{item.employeeName}</Text>
            <View style={styles.employeeDetails}>
              <Text style={[styles.employeeId, { color: colors.grayText }]}>👤 {item.employeeId}</Text>
              <Text style={[styles.employeeDepartment, { color: colors.grayText }]}>🏢 {item.department}</Text>
            </View>
            <Text style={[styles.payrollPeriod, { color: colors.blue }]}>{item.month} 2024 Payroll</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.statusPill, { backgroundColor: statusStyle.backgroundColor }]}>
              <Text style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</Text>
            </View>
            <Text style={[styles.processedText, { color: colors.grayText }]}>PROCESSED</Text>
          </View>
        </View>

        {/* Salary Breakdown */}
        <View style={styles.salaryBreakdown}>
          <View style={styles.salaryItem}>
            <Text style={[styles.salaryLabel, { color: colors.grayText }]}>GROSS SALARY</Text>
            <Text style={[styles.salaryValue, { color: colors.textColor }]}>₹{item.grossSalary.toLocaleString()}</Text>
          </View>
          <View style={styles.salaryItem}>
            <Text style={[styles.salaryLabel, { color: colors.grayText }]}>DEDUCTIONS</Text>
            <Text style={[styles.salaryValue, { color: colors.textColor }]}>₹{item.deductions.toLocaleString()}</Text>
          </View>
          <View style={styles.salaryItem}>
            <Text style={[styles.salaryLabel, { color: colors.grayText }]}>TAX DEDUCTED</Text>
            <Text style={[styles.salaryValue, { color: colors.textColor }]}>₹{item.taxDeducted.toLocaleString()}</Text>
          </View>
          <View style={styles.salaryItem}>
            <View style={styles.netSalaryContainer}>
              <Text style={[styles.salaryLabel, { color: colors.grayText }]}>NET SALARY</Text>
              <Text style={[styles.netSalaryValue, { color: colors.accentGreen }]}>₹{item.netSalary.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header - Payslip Management Hub */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <PayslipIcon />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Payslip Management Hub</Text>
              <Text style={styles.headerSubtitle}>
                Comprehensive payslip management with real-time processing and insights
              </Text>
            </View>
          </View>
        </View>

        {/* Top Statistics Cards */}
        <View style={styles.topStatsContainer}>
          {renderTopStatCard('0', 'TOTAL PAYSLIPS', 0)}
          {renderTopStatCard('0', 'THIS MONTH', 1)}
          {renderTopStatCard('0', 'PENDING', 2)}
          {renderTopStatCard('₹0', 'TOTAL AMOUNT', 3)}
        </View>

        {/* Payslip Records Section */}
        <View style={[styles.recordsSection, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.recordsHeader}>
            <View style={styles.recordsTitle}>
              <Text style={styles.recordsIcon}>📄</Text>
              <View>
                <Text style={[styles.recordsTitleText, { color: colors.textColor }]}>Payslip Records</Text>
                <Text style={[styles.recordsSubtitle, { color: colors.grayText }]}>
                  View, manage, and download employee payslips
                </Text>
              </View>
            </View>
            <View style={styles.recordsActions}>
              <TouchableOpacity style={[styles.processButton, { backgroundColor: colors.accentGreen }]}>
                <ProcessIcon />
                <Text style={[styles.processButtonText, { color: colors.white }]}>Process Payroll</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.reportButton, { backgroundColor: colors.lightGray, borderColor: colors.borderGray }]}>
                <ReportIcon />
                <Text style={[styles.reportButtonText, { color: colors.textColor }]}>Generate Reports</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Advanced Filters */}
          <View style={styles.filtersSection}>
            <Text style={[styles.filtersTitle, { color: colors.textColor }]}>🔽 Advanced Filters</Text>
            
            <View style={styles.filtersRow}>
              <View style={[styles.searchContainer, { backgroundColor: colors.lightGray }]}>
                <SearchIcon />
                <TextInput
                  style={[styles.searchInput, { color: colors.textColor }]}
                  placeholder="Search employees..."
                  placeholderTextColor={colors.grayText}
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
              
              <TouchableOpacity style={[styles.filterDropdown, { backgroundColor: colors.lightGray }]}>
                <Text style={[styles.filterText, { color: colors.textColor }]}>{selectedPeriod}</Text>
                <FilterIcon />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.filterDropdown, { backgroundColor: colors.lightGray }]}>
                <Text style={[styles.filterText, { color: colors.textColor }]}>{selectedStatus}</Text>
                <FilterIcon />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.filterDropdown, { backgroundColor: colors.lightGray }]}>
                <Text style={[styles.filterText, { color: colors.textColor }]}>{selectedDepartment}</Text>
                <FilterIcon />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.searchButton, { backgroundColor: colors.blue }]}>
                <Text style={[styles.searchButtonText, { color: colors.white }]}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payslip Cards */}
          <FlatList
            data={samplePayslips}
            renderItem={renderPayslipCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.payslipsList}
          />
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

  // Header Styles
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 16,
    margin: 16,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },

  // Top Stats Cards
  topStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  topStatCard: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  topStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  topStatLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Records Section
  recordsSection: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  recordsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordsIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  recordsTitleText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  recordsSubtitle: {
    fontSize: 12,
  },
  recordsActions: {
    flexDirection: 'row',
    gap: 8,
  },
  processButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  processButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  reportButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  buttonIcon: {
    fontSize: 12,
  },

  // Filters Section
  filtersSection: {
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    minWidth: 200,
  },
  searchIcon: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  filterText: {
    fontSize: 14,
    marginRight: 6,
  },
  filterIcon: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Payslip Cards
  payslipsList: {
    gap: 16,
  },
  payslipCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  employeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  employeeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  employeeDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
  },
  employeeId: {
    fontSize: 12,
  },
  employeeDepartment: {
    fontSize: 12,
  },
  payrollPeriod: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  processedText: {
    fontSize: 10,
    fontWeight: '500',
  },

  // Salary Breakdown
  salaryBreakdown: {
    flexDirection: 'row',
    gap: 16,
  },
  salaryItem: {
    flex: 1,
  },
  salaryLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  salaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  netSalaryContainer: {
    alignItems: 'flex-end',
  },
  netSalaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default PayslipsScreen;
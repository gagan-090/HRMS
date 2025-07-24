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
import {
  widthPixel,
  heightPixel,
  fontPixel,
  spacing,
  componentSizes,
  responsiveWidth,
} from '../../utils/responsive';

interface EmployeeSalary {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  basicSalary: number;
  grossSalary: number;
  netSalary: number;
  status: 'Active' | 'Inactive';
}

const sampleSalaries: EmployeeSalary[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'John Doe',
    department: 'Engineering',
    designation: 'Software Engineer',
    basicSalary: 50000,
    grossSalary: 75000,
    netSalary: 65000,
    status: 'Active',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Jane Smith',
    department: 'HR',
    designation: 'HR Manager',
    basicSalary: 60000,
    grossSalary: 85000,
    netSalary: 72000,
    status: 'Active',
  },
];

const EmployeeSalariesScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');

  const UserIcon = () => <Text style={styles.headerIcon}>💰</Text>;
  const SearchIcon = () => <Text style={styles.searchIcon}>🔍</Text>;
  const PlusIcon = () => <Text style={styles.buttonIcon}>+</Text>;
  const EditIcon = () => <Text style={styles.actionIcon}>✏</Text>;
  const EyeIcon = () => <Text style={styles.actionIcon}>👁</Text>;

  const renderSalaryRow = ({ item }: { item: EmployeeSalary }) => (
    <View style={[styles.tableRow, { borderBottomColor: colors.tableBorder }]}>
      <View style={styles.employeeCell}>
        <Text style={[styles.employeeId, { color: colors.red }]}>{item.employeeId}</Text>
        <Text style={[styles.employeeName, { color: colors.textColor }]}>{item.name}</Text>
        <Text style={[styles.employeeDept, { color: colors.grayText }]}>{item.department}</Text>
      </View>
      
      <View style={styles.salaryCell}>
        <Text style={[styles.salaryAmount, { color: colors.textColor }]}>₹{item.basicSalary.toLocaleString()}</Text>
        <Text style={[styles.salaryLabel, { color: colors.grayText }]}>Basic</Text>
      </View>
      
      <View style={styles.salaryCell}>
        <Text style={[styles.salaryAmount, { color: colors.textColor }]}>₹{item.grossSalary.toLocaleString()}</Text>
        <Text style={[styles.salaryLabel, { color: colors.grayText }]}>Gross</Text>
      </View>
      
      <View style={styles.salaryCell}>
        <Text style={[styles.salaryAmount, { color: colors.textColor }]}>₹{item.netSalary.toLocaleString()}</Text>
        <Text style={[styles.salaryLabel, { color: colors.grayText }]}>Net</Text>
      </View>
      
      <View style={styles.statusCell}>
        <View style={[styles.statusPill, { backgroundColor: colors.successGreenBg }]}>
          <Text style={[styles.statusText, { color: colors.successGreenText }]}>{item.status}</Text>
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primaryDarkBlue }]}>
          <View style={styles.headerLeft}>
            <UserIcon />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, { color: colors.white }]}>Employee Salaries</Text>
              <Text style={[styles.headerSubtitle, { color: colors.white }]}>Manage employee salary structures and components</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>156</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Total Employees</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>₹45.2L</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Total Payroll</Text>
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
                placeholder="Search employees by name, ID, or department..."
                placeholderTextColor={colors.grayText}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.accentGreen }]}>
              <PlusIcon />
              <Text style={[styles.addButtonText, { color: colors.white }]}>Add Salary</Text>
            </TouchableOpacity>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            <View style={[styles.tableHeader, { backgroundColor: colors.lightGray, borderBottomColor: colors.borderGray }]}>
              <Text style={[styles.tableHeaderText, styles.employeeHeader, { color: colors.tableHeader }]}>EMPLOYEE</Text>
              <Text style={[styles.tableHeaderText, styles.salaryHeader, { color: colors.tableHeader }]}>BASIC SALARY</Text>
              <Text style={[styles.tableHeaderText, styles.salaryHeader, { color: colors.tableHeader }]}>GROSS SALARY</Text>
              <Text style={[styles.tableHeaderText, styles.salaryHeader, { color: colors.tableHeader }]}>NET SALARY</Text>
              <Text style={[styles.tableHeaderText, styles.statusHeader, { color: colors.tableHeader }]}>STATUS</Text>
              <Text style={[styles.tableHeaderText, styles.actionsHeader, { color: colors.tableHeader }]}>ACTIONS</Text>
            </View>

            <FlatList
              data={sampleSalaries}
              renderItem={renderSalaryRow}
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
  salaryHeader: { flex: 2, textAlign: 'center' },
  statusHeader: { flex: 1, textAlign: 'center' },
  actionsHeader: { flex: 1, textAlign: 'center' },
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
  employeeDept: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  salaryCell: {
    flex: 2,
    alignItems: 'center',
  },
  salaryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  salaryLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  statusCell: {
    flex: 1,
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
    color: '#065F46',
  },
  actionsCell: {
    flex: 1,
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

export default EmployeeSalariesScreen;
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

interface SalaryRevision {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  currentSalary: number;
  revisedSalary: number;
  increasePercentage: number;
  effectiveDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Implemented';
  approvedBy?: string;
}

const sampleRevisions: SalaryRevision[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    department: 'Engineering',
    currentSalary: 75000,
    revisedSalary: 85000,
    increasePercentage: 13.33,
    effectiveDate: '01 Apr 2024',
    reason: 'Annual Performance Review',
    status: 'Approved',
    approvedBy: 'HR Manager',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    department: 'Marketing',
    currentSalary: 65000,
    revisedSalary: 72000,
    increasePercentage: 10.77,
    effectiveDate: '15 Apr 2024',
    reason: 'Promotion to Senior Role',
    status: 'Pending',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Mike Johnson',
    department: 'Sales',
    currentSalary: 55000,
    revisedSalary: 58000,
    increasePercentage: 5.45,
    effectiveDate: '01 May 2024',
    reason: 'Market Adjustment',
    status: 'Implemented',
    approvedBy: 'CEO',
  },
];

const SalaryRevisionScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const RevisionIcon = () => <Text style={styles.headerIcon}>📈</Text>;
  const SearchIcon = () => <Text style={styles.searchIcon}>🔍</Text>;
  const PlusIcon = () => <Text style={styles.buttonIcon}>+</Text>;
  const EyeIcon = () => <Text style={styles.actionIcon}>👁</Text>;
  const EditIcon = () => <Text style={styles.actionIcon}>✏</Text>;
  const CheckIcon = () => <Text style={styles.actionIcon}>✅</Text>;
  const CloseIcon = () => <Text style={styles.actionIcon}>❌</Text>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return { bg: colors.successGreenBg, text: colors.successGreenText };
      case 'Implemented':
        return { bg: colors.infoBlueBg, text: colors.infoBlueText };
      case 'Pending':
        return { bg: colors.warningYellow, text: colors.warningYellowBorder };
      case 'Rejected':
        return { bg: colors.dangerRedBg, text: colors.dangerRedText };
      default:
        return { bg: colors.lightGray, text: colors.grayText };
    }
  };

  const renderRevisionRow = ({ item }: { item: SalaryRevision }) => {
    const statusColors = getStatusColor(item.status);
    
    return (
      <View style={[styles.tableRow, { borderBottomColor: colors.tableBorder }]}>
        <View style={styles.employeeCell}>
          <Text style={[styles.employeeId, { color: colors.red }]}>{item.employeeId}</Text>
          <Text style={[styles.employeeName, { color: colors.textColor }]}>{item.employeeName}</Text>
          <Text style={[styles.department, { color: colors.grayText }]}>{item.department}</Text>
        </View>
        
        <View style={styles.salaryCell}>
          <Text style={[styles.currentSalary, { color: colors.textColor }]}>₹{item.currentSalary.toLocaleString()}</Text>
          <Text style={[styles.salaryLabel, { color: colors.grayText }]}>Current</Text>
        </View>
        
        <View style={styles.salaryCell}>
          <Text style={[styles.revisedSalary, { color: colors.accentGreen }]}>₹{item.revisedSalary.toLocaleString()}</Text>
          <Text style={[styles.salaryLabel, { color: colors.grayText }]}>Revised</Text>
        </View>
        
        <View style={styles.increaseCell}>
          <Text style={[styles.increasePercentage, { color: colors.accentGreen }]}>+{item.increasePercentage.toFixed(1)}%</Text>
          <Text style={[styles.increaseAmount, { color: colors.grayText }]}>+₹{(item.revisedSalary - item.currentSalary).toLocaleString()}</Text>
        </View>
        
        <View style={styles.dateCell}>
          <Text style={[styles.effectiveDate, { color: colors.textColor }]}>{item.effectiveDate}</Text>
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
          {item.status === 'Pending' && (
            <>
              <TouchableOpacity style={styles.actionButton}>
                <CheckIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <CloseIcon />
              </TouchableOpacity>
            </>
          )}
          {item.status !== 'Implemented' && (
            <TouchableOpacity style={styles.actionButton}>
              <EditIcon />
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
            <RevisionIcon />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, { color: colors.white }]}>Salary Revision</Text>
              <Text style={[styles.headerSubtitle, { color: colors.white }]}>Manage salary increments and revisions</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>15</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Pending</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>₹2.5L</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Avg Increase</Text>
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
                placeholder="Search by employee name, ID, or department..."
                placeholderTextColor={colors.grayText}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.lightGray, borderColor: colors.borderGray }]}>
              <Text style={[styles.filterButtonText, { color: colors.textColor }]}>All Status</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.accentGreen }]}>
              <PlusIcon />
              <Text style={[styles.addButtonText, { color: colors.white }]}>New Revision</Text>
            </TouchableOpacity>
          </View>

          {/* Summary Cards */}
          <View style={styles.summaryCards}>
            <View style={[styles.summaryCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.summaryValue, { color: colors.textColor }]}>23</Text>
              <Text style={[styles.summaryLabel, { color: colors.grayText }]}>Total Revisions</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.summaryValue, { color: colors.textColor }]}>8</Text>
              <Text style={[styles.summaryLabel, { color: colors.grayText }]}>Approved</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.summaryValue, { color: colors.textColor }]}>5</Text>
              <Text style={[styles.summaryLabel, { color: colors.grayText }]}>Implemented</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.summaryValue, { color: colors.textColor }]}>₹12.8L</Text>
              <Text style={[styles.summaryLabel, { color: colors.grayText }]}>Total Impact</Text>
            </View>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            <View style={[styles.tableHeader, { backgroundColor: colors.lightGray, borderBottomColor: colors.borderGray }]}>
              <Text style={[styles.tableHeaderText, styles.employeeHeader, { color: colors.tableHeader }]}>EMPLOYEE</Text>
              <Text style={[styles.tableHeaderText, styles.salaryHeader, { color: colors.tableHeader }]}>CURRENT</Text>
              <Text style={[styles.tableHeaderText, styles.salaryHeader, { color: colors.tableHeader }]}>REVISED</Text>
              <Text style={[styles.tableHeaderText, styles.increaseHeader, { color: colors.tableHeader }]}>INCREASE</Text>
              <Text style={[styles.tableHeaderText, styles.dateHeader, { color: colors.tableHeader }]}>EFFECTIVE DATE</Text>
              <Text style={[styles.tableHeaderText, styles.statusHeader, { color: colors.tableHeader }]}>STATUS</Text>
              <Text style={[styles.tableHeaderText, styles.actionsHeader, { color: colors.tableHeader }]}>ACTIONS</Text>
            </View>

            <FlatList
              data={sampleRevisions}
              renderItem={renderRevisionRow}
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
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
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
  filterButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
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
  summaryCards: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
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
  increaseHeader: { flex: 2, textAlign: 'center' },
  dateHeader: { flex: 2, textAlign: 'center' },
  statusHeader: { flex: 1.5, textAlign: 'center' },
  actionsHeader: { flex: 2, textAlign: 'center' },
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
  department: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  salaryCell: {
    flex: 2,
    alignItems: 'center',
  },
  currentSalary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  revisedSalary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  salaryLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  increaseCell: {
    flex: 2,
    alignItems: 'center',
  },
  increasePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  increaseAmount: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  dateCell: {
    flex: 2,
    alignItems: 'center',
  },
  effectiveDate: {
    fontSize: 13,
    color: '#374151',
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

export default SalaryRevisionScreen;
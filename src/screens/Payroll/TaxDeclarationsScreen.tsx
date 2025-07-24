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

interface TaxDeclaration {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  financialYear: string;
  totalInvestment: number;
  section80C: number;
  section80D: number;
  houseRentAllowance: number;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedDate?: string;
  reviewedBy?: string;
}

const sampleDeclarations: TaxDeclaration[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    department: 'Engineering',
    financialYear: '2024-25',
    totalInvestment: 150000,
    section80C: 100000,
    section80D: 25000,
    houseRentAllowance: 120000,
    status: 'Approved',
    submittedDate: '15 Mar 2024',
    reviewedBy: 'HR Manager',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    department: 'Marketing',
    financialYear: '2024-25',
    totalInvestment: 125000,
    section80C: 80000,
    section80D: 20000,
    houseRentAllowance: 96000,
    status: 'Under Review',
    submittedDate: '20 Mar 2024',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Mike Johnson',
    department: 'Sales',
    financialYear: '2024-25',
    totalInvestment: 75000,
    section80C: 50000,
    section80D: 15000,
    houseRentAllowance: 72000,
    status: 'Draft',
  },
];

const TaxDeclarationsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const TaxIcon = () => <Text style={styles.headerIcon}>📋</Text>;
  const SearchIcon = () => <Text style={styles.searchIcon}>🔍</Text>;
  const PlusIcon = () => <Text style={styles.buttonIcon}>+</Text>;
  const EyeIcon = () => <Text style={styles.actionIcon}>👁</Text>;
  const EditIcon = () => <Text style={styles.actionIcon}>✏</Text>;
  const DownloadIcon = () => <Text style={styles.actionIcon}>⬇️</Text>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return { bg: colors.successGreenBg, text: colors.successGreenText };
      case 'Under Review':
        return { bg: colors.infoBlueBg, text: colors.infoBlueText };
      case 'Submitted':
        return { bg: colors.infoBlueBg, text: colors.infoBlueText };
      case 'Draft':
        return { bg: colors.lightGray, text: colors.grayText };
      case 'Rejected':
        return { bg: colors.dangerRedBg, text: colors.dangerRedText };
      default:
        return { bg: colors.lightGray, text: colors.grayText };
    }
  };

  const renderDeclarationRow = ({ item }: { item: TaxDeclaration }) => {
    const statusColors = getStatusColor(item.status);
    
    return (
      <View style={[styles.tableRow, { borderBottomColor: colors.tableBorder }]}>
        <View style={styles.employeeCell}>
          <Text style={[styles.employeeId, { color: colors.red }]}>{item.employeeId}</Text>
          <Text style={[styles.employeeName, { color: colors.textColor }]}>{item.employeeName}</Text>
          <Text style={[styles.department, { color: colors.grayText }]}>{item.department}</Text>
        </View>
        
        <View style={styles.yearCell}>
          <Text style={[styles.financialYear, { color: colors.textColor }]}>{item.financialYear}</Text>
        </View>
        
        <View style={styles.investmentCell}>
          <Text style={[styles.totalInvestment, { color: colors.textColor }]}>₹{(item.totalInvestment / 1000).toFixed(0)}K</Text>
          <Text style={[styles.investmentLabel, { color: colors.grayText }]}>Total</Text>
        </View>
        
        <View style={styles.sectionCell}>
          <Text style={[styles.section80C, { color: colors.accentGreen }]}>₹{(item.section80C / 1000).toFixed(0)}K</Text>
          <Text style={[styles.sectionLabel, { color: colors.grayText }]}>80C</Text>
        </View>
        
        <View style={styles.sectionCell}>
          <Text style={[styles.section80D, { color: colors.blue }]}>₹{(item.section80D / 1000).toFixed(0)}K</Text>
          <Text style={[styles.sectionLabel, { color: colors.grayText }]}>80D</Text>
        </View>
        
        <View style={styles.hraCell}>
          <Text style={[styles.houseRentAllowance, { color: colors.gradientPurpleStart }]}>₹{(item.houseRentAllowance / 1000).toFixed(0)}K</Text>
          <Text style={[styles.hraLabel, { color: colors.grayText }]}>HRA</Text>
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
          {(item.status === 'Draft' || item.status === 'Rejected') && (
            <TouchableOpacity style={styles.actionButton}>
              <EditIcon />
            </TouchableOpacity>
          )}
          {item.status === 'Approved' && (
            <TouchableOpacity style={styles.actionButton}>
              <DownloadIcon />
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
            <TaxIcon />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, { color: colors.white }]}>Tax Declarations</Text>
              <Text style={[styles.headerSubtitle, { color: colors.white }]}>Manage employee tax investment declarations</Text>
            </View>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>156</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Total Employees</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>89</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Submitted</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.white }]}>12</Text>
              <Text style={[styles.statLabel, { color: colors.white }]}>Pending</Text>
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
              <Text style={[styles.filterButtonText, { color: colors.textColor }]}>FY 2024-25</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.lightGray, borderColor: colors.borderGray }]}>
              <Text style={[styles.filterButtonText, { color: colors.textColor }]}>All Status</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.accentGreen }]}>
              <PlusIcon />
              <Text style={[styles.addButtonText, { color: colors.white }]}>New Declaration</Text>
            </TouchableOpacity>
          </View>

          {/* Summary Cards */}
          <View style={styles.summaryCards}>
            <View style={[styles.summaryCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.summaryValue, { color: colors.textColor }]}>₹1.2Cr</Text>
              <Text style={[styles.summaryLabel, { color: colors.grayText }]}>Total Investments</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.summaryValue, { color: colors.textColor }]}>₹85L</Text>
              <Text style={[styles.summaryLabel, { color: colors.grayText }]}>Section 80C</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.summaryValue, { color: colors.textColor }]}>₹18L</Text>
              <Text style={[styles.summaryLabel, { color: colors.grayText }]}>Section 80D</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: colors.lightGray }]}>
              <Text style={[styles.summaryValue, { color: colors.textColor }]}>₹45L</Text>
              <Text style={[styles.summaryLabel, { color: colors.grayText }]}>HRA Claims</Text>
            </View>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            <View style={[styles.tableHeader, { backgroundColor: colors.lightGray, borderBottomColor: colors.borderGray }]}>
              <Text style={[styles.tableHeaderText, styles.employeeHeader, { color: colors.tableHeader }]}>EMPLOYEE</Text>
              <Text style={[styles.tableHeaderText, styles.yearHeader, { color: colors.tableHeader }]}>FY</Text>
              <Text style={[styles.tableHeaderText, styles.investmentHeader, { color: colors.tableHeader }]}>INVESTMENT</Text>
              <Text style={[styles.tableHeaderText, styles.sectionHeader, { color: colors.tableHeader }]}>80C</Text>
              <Text style={[styles.tableHeaderText, styles.sectionHeader, { color: colors.tableHeader }]}>80D</Text>
              <Text style={[styles.tableHeaderText, styles.hraHeader, { color: colors.tableHeader }]}>HRA</Text>
              <Text style={[styles.tableHeaderText, styles.statusHeader, { color: colors.tableHeader }]}>STATUS</Text>
              <Text style={[styles.tableHeaderText, styles.actionsHeader, { color: colors.tableHeader }]}>ACTIONS</Text>
            </View>

            <FlatList
              data={sampleDeclarations}
              renderItem={renderDeclarationRow}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 11,
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
  yearHeader: { flex: 1, textAlign: 'center' },
  investmentHeader: { flex: 1.5, textAlign: 'center' },
  sectionHeader: { flex: 1, textAlign: 'center' },
  hraHeader: { flex: 1, textAlign: 'center' },
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
  department: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  yearCell: {
    flex: 1,
    alignItems: 'center',
  },
  financialYear: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  investmentCell: {
    flex: 1.5,
    alignItems: 'center',
  },
  totalInvestment: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  investmentLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  sectionCell: {
    flex: 1,
    alignItems: 'center',
  },
  section80C: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  section80D: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0891B2',
  },
  sectionLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
  hraCell: {
    flex: 1,
    alignItems: 'center',
  },
  houseRentAllowance: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7C3AED',
  },
  hraLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
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
    fontSize: 11,
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

export default TaxDeclarationsScreen;
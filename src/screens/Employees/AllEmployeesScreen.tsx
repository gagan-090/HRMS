import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
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

// Define the Employee data structure
interface Employee {
  id: string;
  initials: string;
  avatarColor: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: 'Active' | 'Inactive' | 'On Leave';
}

// Sample Employee Data
const sampleEmployees: Employee[] = [
  {
    id: '1',
    initials: 'AB',
    avatarColor: '#4285F4',
    name: 'mrs Aadhya Devi Bansal',
    email: 'aadhya.bansa155@company.com',
    employeeId: 'EMP0035',
    department: 'Human Resources',
    designation: 'HR Manager',
    joiningDate: 'Mar 29, 2023',
    status: 'Active',
  },
  {
    id: '2',
    initials: 'AJ',
    avatarColor: '#4285F4',
    name: 'mr Aadhya Jain',
    email: 'aadhya.jain49@company.com',
    employeeId: 'EMP0049',
    department: 'Marketing',
    designation: 'Marketing Specialist',
    joiningDate: 'Jun 03, 2023',
    status: 'Active',
  },
  {
    id: '3',
    initials: 'AS',
    avatarColor: '#4285F4',
    name: 'ms Aadhya Srivastava',
    email: 'aadhya.srivastava45@company.com',
    employeeId: 'EMP0045',
    department: 'Marketing',
    designation: 'Content Creator',
    joiningDate: 'Apr 17, 2024',
    status: 'Active',
  },
  {
    id: '4',
    initials: 'AB',
    avatarColor: '#4285F4',
    name: 'mr Aarohi Bansal',
    email: 'aarohi.bansa11@company.com',
    employeeId: 'EMP0011',
    department: 'Finance',
    designation: 'Financial Analyst',
    joiningDate: 'Nov 23, 2023',
    status: 'Active',
  },
  {
    id: '5',
    initials: 'AK',
    avatarColor: '#4285F4',
    name: 'ms Aarohi Singh Kumar',
    email: 'aarohi.kumar78@company.com',
    employeeId: 'EMP0022',
    department: 'IT',
    designation: 'Software Engineer',
    joiningDate: 'Feb 10, 2023',
    status: 'Active',
  },
];

const AllEmployeesScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [selectedView, setSelectedView] = useState<'table' | 'grid'>('table');

  // Simple icon components using Text instead of SVG for better compatibility
  const UserGroupIcon = () => (
    <Text style={styles.headerIcon}>👥</Text>
  );

  const SearchIcon = () => (
    <Text style={styles.searchIcon}>🔍</Text>
  );

  const PlusIcon = () => (
    <Text style={styles.buttonIcon}>+</Text>
  );

  const DownloadIcon = () => (
    <Text style={styles.buttonIcon}>⬇</Text>
  );

  const UploadIcon = () => (
    <Text style={styles.buttonIcon}>⬆</Text>
  );

  const ChevronDownIcon = () => (
    <Text style={styles.dropdownIcon}>▼</Text>
  );

  const TableIcon = () => (
    <Text style={styles.viewIcon}>☰</Text>
  );

  const GridIcon = () => (
    <Text style={styles.viewIcon}>⊞</Text>
  );

  const EyeIcon = () => (
    <Text style={styles.actionIcon}>👁</Text>
  );

  const EditIcon = () => (
    <Text style={styles.actionIcon}>✏</Text>
  );

  const renderStatistic = (value: number, label: string) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderEmployeeRow = ({ item }: { item: Employee }) => (
    <View style={styles.tableRow}>
      {/* Employee Column */}
      <View style={styles.employeeCell}>
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>
        <View style={styles.employeeInfo}>
          <Text style={styles.employeeName}>{item.name}</Text>
          <Text style={styles.employeeEmail}>{item.email}</Text>
        </View>
      </View>

      {/* Employee ID Column */}
      <View style={styles.employeeIdCell}>
        <Text style={styles.employeeIdText}>{item.employeeId}</Text>
      </View>

      {/* Department Column */}
      <View style={styles.departmentCell}>
        <TouchableOpacity>
          <Text style={styles.departmentText}>{item.department}</Text>
        </TouchableOpacity>
      </View>

      {/* Designation Column */}
      <View style={styles.designationCell}>
        <Text style={styles.designationText}>{item.designation}</Text>
      </View>

      {/* Joining Date Column */}
      <View style={styles.joiningDateCell}>
        <Text style={styles.joiningDateText}>{item.joiningDate}</Text>
      </View>

      {/* Status Column */}
      <View style={styles.statusCell}>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      {/* Actions Column */}
      <View style={styles.actionsCell}>
        <TouchableOpacity style={styles.viewButton}>
          <EyeIcon />
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <EditIcon />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Bar */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            <UserGroupIcon />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Employee Management</Text>
              <Text style={styles.headerSubtitle}>Manage your workforce efficiently</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            {renderStatistic(51, 'Total Employees')}
            {renderStatistic(51, 'Active')}
            {renderStatistic(0, 'This Month')}
          </View>
        </View>

        {/* Main Content Card */}
        <View style={styles.mainCard}>
          {/* Search and Action Bar */}
          <View style={styles.searchActionBar}>
            <View style={styles.searchContainer}>
              <SearchIcon />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name, employee ID, email, or phone..."
                placeholderTextColor="#9CA3AF"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            
            <TouchableOpacity style={styles.addButton}>
              <PlusIcon />
              <Text style={styles.addButtonText}>Add Employee</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.importButton}>
              <UploadIcon />
              <Text style={styles.importButtonText}>Import</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.exportButton}>
              <DownloadIcon />
              <Text style={styles.exportButtonText}>Export</Text>
            </TouchableOpacity>
          </View>

          {/* Filter and View Bar */}
          <View style={styles.filterViewBar}>
            <View style={styles.filtersContainer}>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>All Departments</Text>
                <ChevronDownIcon />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>All Designations</Text>
                <ChevronDownIcon />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>All Status</Text>
                <ChevronDownIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.viewToggle}>
              <TouchableOpacity 
                style={[styles.viewButton, selectedView === 'table' && styles.activeViewButton]}
                onPress={() => setSelectedView('table')}
              >
                <TableIcon />
                <Text style={[styles.viewButtonText, selectedView === 'table' && styles.activeViewButtonText]}>
                  Table
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.viewButton, selectedView === 'grid' && styles.activeViewButton]}
                onPress={() => setSelectedView('grid')}
              >
                <GridIcon />
                <Text style={[styles.viewButtonText, selectedView === 'grid' && styles.activeViewButtonText]}>
                  Grid
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Table */}
          {selectedView === 'table' && (
            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.employeeHeader]}>EMPLOYEE</Text>
                <Text style={[styles.tableHeaderText, styles.employeeIdHeader]}>EMPLOYEE ID</Text>
                <Text style={[styles.tableHeaderText, styles.departmentHeader]}>DEPARTMENT</Text>
                <Text style={[styles.tableHeaderText, styles.designationHeader]}>DESIGNATION</Text>
                <Text style={[styles.tableHeaderText, styles.joiningDateHeader]}>JOINING DATE</Text>
                <Text style={[styles.tableHeaderText, styles.statusHeader]}>STATUS</Text>
                <Text style={[styles.tableHeaderText, styles.actionsHeader]}>ACTIONS</Text>
              </View>

              {/* Table Rows */}
              <FlatList
                data={sampleEmployees}
                renderItem={renderEmployeeRow}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* Grid View Placeholder */}
          {selectedView === 'grid' && (
            <View style={styles.gridPlaceholder}>
              <Text style={styles.placeholderText}>Grid View Coming Soon!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  
  // Header Styles
  headerBar: {
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
  },
  headerIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 12,
  },
  headerTextContainer: {
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  headerRight: {
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

  // Main Card Styles
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

  // Search and Action Bar Styles
  searchActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
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
    minWidth: 300,
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
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  importButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exportButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  buttonIcon: {
    fontSize: 14,
    color: '#FFFFFF',
  },

  // Filter and View Bar Styles
  filterViewBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
    marginRight: 6,
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 2,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  activeViewButton: {
    backgroundColor: '#3B82F6',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  activeViewButtonText: {
    color: '#FFFFFF',
  },
  viewIcon: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Table Styles
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
  employeeIdHeader: { flex: 1.2, textAlign: 'center' },
  departmentHeader: { flex: 1.5 },
  designationHeader: { flex: 1.5 },
  joiningDateHeader: { flex: 1.2 },
  statusHeader: { flex: 1, textAlign: 'center' },
  actionsHeader: { flex: 1.5, textAlign: 'center' },

  // Table Row Styles
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  employeeEmail: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  employeeIdCell: {
    flex: 1.2,
    alignItems: 'center',
  },
  employeeIdText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
  departmentCell: {
    flex: 1.5,
  },
  departmentText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '500',
  },
  designationCell: {
    flex: 1.5,
  },
  designationText: {
    fontSize: 13,
    color: '#374151',
  },
  joiningDateCell: {
    flex: 1.2,
  },
  joiningDateText: {
    fontSize: 13,
    color: '#374151',
  },
  statusCell: {
    flex: 1,
    alignItems: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#065F46',
  },
  actionsCell: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#3B82F6',
    marginLeft: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  editButtonText: {
    fontSize: 12,
    color: '#10B981',
    marginLeft: 2,
  },
  actionIcon: {
    fontSize: 12,
  },

  // Grid Placeholder
  gridPlaceholder: {
    padding: 40,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default AllEmployeesScreen;
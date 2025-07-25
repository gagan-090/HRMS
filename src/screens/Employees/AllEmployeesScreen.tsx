import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Svg, { Path, Circle, Rect, Line, G } from 'react-native-svg';

// Import responsive utilities
import { widthPixel, heightPixel, fontPixel } from '../../utils/responsive';
// Import theme context
import { useTheme } from '../../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

// --- CustomSvgIcon Component ---
interface CustomSvgIconProps {
  name: string;
  size: number;
  color: string;
  style?: object;
}

const CustomSvgIcon: React.FC<CustomSvgIconProps> = ({ name, size, color, style }) => {
  let iconPath;

  switch (name) {
    case 'users':
      iconPath = (
        <G>
          <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
          <Path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'search':
      iconPath = (
        <G>
          <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" fill="none" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'plus':
      iconPath = (
        <G>
          <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'download':
      iconPath = (
        <G>
          <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Path d="M7 10l5 5 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'upload':
      iconPath = (
        <G>
          <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Path d="M17 8l-5-5-5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="12" y1="3" x2="12" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'table':
      iconPath = (
        <G>
          <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none" />
          <Line x1="9" y1="9" x2="21" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="9" y1="15" x2="21" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="9" x2="7" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="15" x2="7" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'grid':
      iconPath = (
        <G>
          <Rect x="3" y="3" width="7" height="7" rx="1" ry="1" stroke={color} strokeWidth="2" fill="none" />
          <Rect x="14" y="3" width="7" height="7" rx="1" ry="1" stroke={color} strokeWidth="2" fill="none" />
          <Rect x="14" y="14" width="7" height="7" rx="1" ry="1" stroke={color} strokeWidth="2" fill="none" />
          <Rect x="3" y="14" width="7" height="7" rx="1" ry="1" stroke={color} strokeWidth="2" fill="none" />
        </G>
      );
      break;
    case 'eye':
      iconPath = (
        <G>
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
        </G>
      );
      break;
    case 'edit':
      iconPath = (
        <G>
          <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'chevron-down':
      iconPath = <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />;
      break;
    default:
      iconPath = <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />;
      break;
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {iconPath}
    </Svg>
  );
};

// --- Avatar Component ---
interface AvatarProps {
  name: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 40 }) => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  const colorIndex = name.length % colors.length;
  const backgroundColor = colors[colorIndex];

  return (
    <View style={[styles.avatar, { width: size, height: size, backgroundColor }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>{initials}</Text>
    </View>
  );
};

// --- StatCard Component ---
interface StatCardProps {
  value: string;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

// --- FilterDropdown Component ---
interface FilterDropdownProps {
  label: string;
  value: string;
  onPress: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, value, onPress }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity style={[styles.filterDropdown, { borderColor: colors.borderGray }]} onPress={onPress}>
      <Text style={[styles.filterText, { color: colors.textColor }]}>{value}</Text>
      <CustomSvgIcon name="chevron-down" size={widthPixel(16)} color={colors.secondaryText} />
    </TouchableOpacity>
  );
};

// --- Employee Data Interface ---
interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
}

// Sample employee data matching the screenshot
const employeeData: Employee[] = [
  {
    id: '1',
    name: 'Mrs Aadhya Devi Bansal',
    email: 'aadhya.bansal35@company.com',
    employeeId: 'EMP0035',
    department: 'Human Resources',
    designation: 'HR Manager',
    joiningDate: 'Mar 29, 2023',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Mr Aadhya Jain',
    email: 'aadhya.jain49@company.com',
    employeeId: 'EMP0049',
    department: 'Marketing',
    designation: 'Marketing Executive',
    joiningDate: 'Jun 03, 2023',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Ms Aadhya Srivastava',
    email: 'aadhya.srivastava45@company.com',
    employeeId: 'EMP0045',
    department: 'Marketing',
    designation: 'Marketing Manager',
    joiningDate: 'Apr 17, 2024',
    status: 'Active',
  },
];

// --- Grid Card Component ---
const EmployeeGridCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.gridCard, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.gridCardHeader}>
        <Avatar name={employee.name} size={widthPixel(50)} />
        <View style={styles.gridCardInfo}>
          <Text style={[styles.gridCardName, { color: colors.textColor }]}>{employee.name}</Text>
          <Text style={[styles.gridCardId, { color: colors.secondaryText }]}>{employee.employeeId}</Text>
        </View>
      </View>
      
      <View style={styles.gridCardDetails}>
        <Text style={[styles.gridCardLabel, { color: colors.secondaryText }]}>Department</Text>
        <Text style={[styles.gridCardValue, { color: colors.textColor }]}>{employee.department}</Text>
        
        <Text style={[styles.gridCardLabel, { color: colors.secondaryText }]}>Designation</Text>
        <Text style={[styles.gridCardValue, { color: colors.textColor }]}>{employee.designation}</Text>
        
        <Text style={[styles.gridCardLabel, { color: colors.secondaryText }]}>Joining Date</Text>
        <Text style={[styles.gridCardValue, { color: colors.textColor }]}>{employee.joiningDate}</Text>
      </View>
      
      <View style={styles.gridCardFooter}>
        <View style={[styles.statusBadge, { backgroundColor: employee.status === 'Active' ? '#ECFDF5' : '#FEF2F2' }]}>
          <Text style={[styles.statusText, { color: employee.status === 'Active' ? '#10B981' : '#EF4444' }]}>
            {employee.status}
          </Text>
        </View>
        
        <View style={styles.gridCardActions}>
          <TouchableOpacity style={styles.gridActionButton}>
            <CustomSvgIcon name="eye" size={widthPixel(16)} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridActionButton}>
            <CustomSvgIcon name="edit" size={widthPixel(16)} color="#10B981" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- Main AllEmployeesScreen Component ---
const AllEmployeesScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const isSmallScreen = screenWidth < 768;

  // Filter employees based on search text
  const filteredEmployees = employeeData.filter(employee =>
    employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchText.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderEmployeeRow = ({ item, index }: { item: Employee; index: number }) => (
    <View style={[
      styles.tableRow,
      { backgroundColor: index % 2 === 0 ? colors.cardBackground : colors.background }
    ]}>
      {/* Employee Info */}
      <View style={styles.employeeCell}>
        <Avatar name={item.name} size={widthPixel(40)} />
        <View style={styles.employeeInfo}>
          <Text style={[styles.employeeName, { color: colors.textColor }]}>{item.name}</Text>
          <Text style={[styles.employeeId, { color: colors.secondaryText }]}>{item.employeeId}</Text>
        </View>
      </View>

      {/* Department */}
      <View style={styles.departmentCell}>
        <Text style={[styles.cellText, { color: colors.textColor }]}>{item.department}</Text>
      </View>

      {/* Designation */}
      <View style={styles.designationCell}>
        <Text style={[styles.cellText, { color: colors.textColor }]}>{item.designation}</Text>
      </View>

      {/* Joining Date */}
      <View style={styles.joiningCell}>
        <Text style={[styles.cellText, { color: colors.textColor }]}>{item.joiningDate}</Text>
      </View>

      {/* Status */}
      <View style={styles.statusCell}>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Active' ? '#ECFDF5' : '#FEF2F2' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Active' ? '#10B981' : '#EF4444' }]}>
            {item.status}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsCell}>
        <TouchableOpacity style={styles.actionButton}>
          <CustomSvgIcon name="eye" size={widthPixel(16)} color="#3B82F6" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <CustomSvgIcon name="edit" size={widthPixel(16)} color="#10B981" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGridItem = ({ item }: { item: Employee }) => (
    <EmployeeGridCard employee={item} />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Slim Gradient Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <CustomSvgIcon name="users" size={widthPixel(20)} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Employee Management</Text>
          </View>
          <Text style={styles.headerSubtitle}>Manage your workforce efficiently</Text>
          
          {/* Stats below title */}
          <View style={[styles.statsContainer, isSmallScreen && styles.statsContainerMobile]}>
            <StatCard value="51" label="Total Employees" color="#3B82F6" />
            <StatCard value="51" label="Active" color="#10B981" />
            <StatCard value="0" label="This Month" color="#6B7280" />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Search and Actions */}
        <View style={[styles.searchSection, isSmallScreen && styles.searchSectionMobile]}>
          <View style={[styles.searchContainer, isSmallScreen && styles.searchContainerMobile]}>
            <CustomSvgIcon name="search" size={widthPixel(18)} color={colors.secondaryText} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.textColor }]}
              placeholder="Search by name, employee ID, email, or phone..."
              placeholderTextColor={colors.secondaryText}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          
          <View style={[styles.actionButtons, isSmallScreen && styles.actionButtonsMobile]}>
            <TouchableOpacity style={styles.addButton}>
              <CustomSvgIcon name="plus" size={widthPixel(14)} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Employee</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { borderColor: colors.borderGray }]}>
              <CustomSvgIcon name="upload" size={widthPixel(14)} color={colors.textColor} />
              <Text style={[styles.actionButtonText, { color: colors.textColor }]}>Import</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { borderColor: colors.borderGray }]}>
              <CustomSvgIcon name="download" size={widthPixel(14)} color={colors.textColor} />
              <Text style={[styles.actionButtonText, { color: colors.textColor }]}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters and View Toggle */}
        <View style={[styles.filtersSection, isSmallScreen && styles.filtersSectionMobile]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            <View style={styles.filters}>
              <FilterDropdown
                label="Department"
                value={selectedDepartment}
                onPress={() => {}}
              />
              <FilterDropdown
                label="Designation"
                value={selectedDesignation}
                onPress={() => {}}
              />
              <FilterDropdown
                label="Status"
                value={selectedStatus}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
          
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'table' && styles.viewButtonActive]}
              onPress={() => setViewMode('table')}
            >
              <CustomSvgIcon name="table" size={widthPixel(14)} color={viewMode === 'table' ? '#3B82F6' : colors.secondaryText} />
              <Text style={[styles.viewButtonText, { color: viewMode === 'table' ? '#3B82F6' : colors.secondaryText }]}>
                Table
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}
              onPress={() => setViewMode('grid')}
            >
              <CustomSvgIcon name="grid" size={widthPixel(14)} color={viewMode === 'grid' ? '#3B82F6' : colors.secondaryText} />
              <Text style={[styles.viewButtonText, { color: viewMode === 'grid' ? '#3B82F6' : colors.secondaryText }]}>
                Grid
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content based on view mode */}
        {viewMode === 'table' ? (
          /* Table View */
          <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableContainer}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableHeader, { backgroundColor: colors.lightGray }]}>
                <View style={styles.employeeHeaderCell}>
                  <Text style={[styles.headerCellText, { color: colors.textColor }]}>EMPLOYEE</Text>
                </View>
                <View style={styles.departmentHeaderCell}>
                  <Text style={[styles.headerCellText, { color: colors.textColor }]}>DEPARTMENT</Text>
                </View>
                <View style={styles.designationHeaderCell}>
                  <Text style={[styles.headerCellText, { color: colors.textColor }]}>DESIGNATION</Text>
                </View>
                <View style={styles.joiningHeaderCell}>
                  <Text style={[styles.headerCellText, { color: colors.textColor }]}>JOINING DATE</Text>
                </View>
                <View style={styles.statusHeaderCell}>
                  <Text style={[styles.headerCellText, { color: colors.textColor }]}>STATUS</Text>
                </View>
                <View style={styles.actionsHeaderCell}>
                  <Text style={[styles.headerCellText, { color: colors.textColor }]}>ACTIONS</Text>
                </View>
              </View>

              {/* Table Rows */}
              <FlatList
                data={filteredEmployees}
                renderItem={renderEmployeeRow}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
        ) : (
          /* Grid View */
          <View style={styles.gridContainer}>
            <FlatList
              data={filteredEmployees}
              renderItem={renderGridItem}
              keyExtractor={(item) => item.id}
              numColumns={isSmallScreen ? 1 : 2}
              key={isSmallScreen ? 'single' : 'double'}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={styles.gridContent}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6366F1',
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  headerContent: {
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPixel(4),
  },
  headerTitle: {
    fontSize: fontPixel(20),
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: widthPixel(8),
  },
  headerSubtitle: {
    fontSize: fontPixel(13),
    color: '#E2E8F0',
    marginBottom: heightPixel(12),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: heightPixel(8),
  },
  statsContainerMobile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: fontPixel(24),
    fontWeight: '700',
    marginBottom: heightPixel(2),
  },
  statLabel: {
    fontSize: fontPixel(11),
    color: '#E2E8F0',
    fontWeight: '500',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  filtersScroll: {
    flexGrow: 0,
  },
  gridContainer: {
    paddingHorizontal: widthPixel(20),
  },
  gridContent: {
    paddingBottom: heightPixel(20),
  },
  gridCard: {
    borderRadius: widthPixel(12),
    padding: widthPixel(16),
    marginBottom: heightPixel(16),
    marginHorizontal: widthPixel(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
  },
  gridCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPixel(12),
  },
  gridCardInfo: {
    marginLeft: widthPixel(12),
    flex: 1,
  },
  gridCardName: {
    fontSize: fontPixel(14),
    fontWeight: '600',
    marginBottom: heightPixel(2),
  },
  gridCardId: {
    fontSize: fontPixel(12),
  },
  gridCardDetails: {
    marginBottom: heightPixel(12),
  },
  gridCardLabel: {
    fontSize: fontPixel(11),
    fontWeight: '500',
    marginTop: heightPixel(8),
    marginBottom: heightPixel(2),
  },
  gridCardValue: {
    fontSize: fontPixel(13),
    fontWeight: '500',
  },
  gridCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridCardActions: {
    flexDirection: 'row',
    gap: widthPixel(8),
  },
  gridActionButton: {
    padding: widthPixel(8),
    borderRadius: widthPixel(6),
    backgroundColor: '#F8FAFC',
  },
  searchSection: {
    paddingHorizontal: widthPixel(24),
    paddingVertical: heightPixel(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPixel(16),
  },
  searchSectionMobile: {
    flexDirection: 'column',
    gap: heightPixel(16),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: widthPixel(8),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: widthPixel(12),
    height: heightPixel(44),
  },
  searchContainerMobile: {
    flex: 0,
    width: '100%',
  },
  searchIcon: {
    marginRight: widthPixel(8),
  },
  searchInput: {
    flex: 1,
    fontSize: fontPixel(14),
    height: '100%',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: widthPixel(12),
  },
  actionButtonsMobile: {
    width: '100%',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(10),
    borderRadius: widthPixel(8),
    gap: widthPixel(8),
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: fontPixel(14),
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(10),
    borderRadius: widthPixel(8),
    borderWidth: 1,
    gap: widthPixel(8),
    backgroundColor: '#FFFFFF',
  },
  actionButtonText: {
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  filtersSection: {
    paddingHorizontal: widthPixel(24),
    paddingBottom: heightPixel(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filtersSectionMobile: {
    flexDirection: 'column',
    gap: heightPixel(16),
  },
  filters: {
    flexDirection: 'row',
    gap: widthPixel(16),
  },
  filtersMobile: {
    width: '100%',
    justifyContent: 'space-between',
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(8),
    borderRadius: widthPixel(6),
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    gap: widthPixel(8),
    minWidth: widthPixel(140),
  },
  filterText: {
    fontSize: fontPixel(14),
    flex: 1,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    borderRadius: widthPixel(8),
    padding: widthPixel(4),
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(8),
    borderRadius: widthPixel(6),
    gap: widthPixel(6),
  },
  viewButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  viewButtonText: {
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  tableContainer: {
    flex: 1,
  },
  table: {
    minWidth: widthPixel(800),
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: heightPixel(12),
    paddingHorizontal: widthPixel(24),
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  employeeHeaderCell: {
    width: widthPixel(250),
  },
  departmentHeaderCell: {
    width: widthPixel(150),
  },
  designationHeaderCell: {
    width: widthPixel(150),
  },
  joiningHeaderCell: {
    width: widthPixel(120),
  },
  statusHeaderCell: {
    width: widthPixel(100),
  },
  actionsHeaderCell: {
    width: widthPixel(130),
  },
  headerCellText: {
    fontSize: fontPixel(12),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: heightPixel(16),
    paddingHorizontal: widthPixel(24),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    alignItems: 'center',
  },
  employeeCell: {
    width: widthPixel(250),
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPixel(12),
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: fontPixel(14),
    fontWeight: '600',
    marginBottom: heightPixel(2),
  },
  employeeId: {
    fontSize: fontPixel(12),
  },
  departmentCell: {
    width: widthPixel(150),
  },
  designationCell: {
    width: widthPixel(150),
  },
  joiningCell: {
    width: widthPixel(120),
  },
  statusCell: {
    width: widthPixel(100),
  },
  actionsCell: {
    width: widthPixel(130),
    flexDirection: 'row',
    gap: widthPixel(8),
  },
  cellText: {
    fontSize: fontPixel(14),
  },
  statusBadge: {
    paddingHorizontal: widthPixel(8),
    paddingVertical: heightPixel(4),
    borderRadius: widthPixel(12),
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: fontPixel(12),
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPixel(4),
  },
  actionText: {
    fontSize: fontPixel(12),
    color: '#3B82F6',
    fontWeight: '500',
  },
  avatar: {
    borderRadius: widthPixel(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default AllEmployeesScreen;
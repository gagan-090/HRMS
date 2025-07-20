
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Dimensions,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Define colors
const colors = {
  primaryBackground: '#F3F4F6',
  cardBackground: '#FFFFFF',
  sidebarBackground: '#1D2B64',
  headerSearchBg: '#F3F4F6',
  searchIcon: '#6B7280',
  userNameText: '#1F2937',
  userRoleText: '#6B7280',
  bellChevronIcon: '#6B7280',
  avatarBg: '#007BFF',
  cardGradientStart: '#1D2B64',
  cardGradientEnd: '#192655',
  cardText: '#FFFFFF',
  addEmployeeBg: '#00B894',
  addEmployeeText: '#FFFFFF',
  importExportBg: '#FFFFFF',
  importExportText: '#6B7280',
  importExportBorder: '#E5E7EB',
  dropdownBg: '#FFFFFF',
  dropdownText: '#1F2937',
  dropdownBorder: '#E5E7EB',
  dropdownChevron: '#6B7280',
  toggleActiveBg: '#007BFF',
  toggleActiveText: '#FFFFFF',
  toggleInactiveBg: '#FFFFFF',
  toggleInactiveText: '#6B7280',
  toggleBorder: '#E5E7EB',
  tableHeaderBg: '#FFFFFF',
  tableHeaderText: '#6B7280',
  tableRowBg: '#FFFFFF',
  employeeName: '#1F2937',
  employeeEmail: '#6B7280',
  employeeId: '#DC3545',
  departmentLink: '#007BFF',
  designationJoinDate: '#1F2937',
  statusBg: '#E6F7ED',
  statusText: '#00B894',
  statusBorder: '#00B894',
  actionBg: '#E6F7ED',
  actionText: '#00B894',
  actionBorder: '#00B894',
};

// Define typography
const typography = {
  fontFamily: 'sans-serif',
};

// Define types for icon props
interface IconProps {
  color: string;
  size: number;
}

// SVG Icons
import { StyleProp, ViewStyle } from 'react-native';

interface IconProps {
  color: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}

const HamburgerIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path d="M3 12H21M3 6H21M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.5 15.5L19 19M11 6C8.23858 6 6 8.23858 6 11C6 13.7614 8.23858 16 11 16C13.7614 16 16 13.7614 16 11C16 8.23858 13.7614 6 11 6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BellIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={color} strokeWidth="2" />
    <Path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21H13.73Z" fill={color} />
  </Svg>
);

const ChevronDownIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UsersIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 11C10.3431 11 9 12.3431 9 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UserPlusIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 4.5C13.6569 4.5 15 5.84315 15 7.5C15 9.15685 13.6569 10.5 12 10.5C10.3431 10.5 9 9.15685 9 7.5C9 5.84315 10.3431 4.5 12 4.5ZM12 4.5C13.6569 4.5 15 3.15685 15 1.5C15 0.671573 14.3284 0 13.5 0H10.5C9.67157 0 9 0.671573 9 1.5C9 3.15685 10.3431 4.5 12 4.5ZM18 15C19.6569 15 21 14.6569 21 14C21 12.3431 19.6569 12 18 12C16.3431 12 15 12.3431 15 14C15 14.6569 16.3431 15 18 15ZM6 12C4.34315 12 3 12.3431 3 14C3 14.6569 4.34315 15 6 15C7.65685 15 9 14.6569 9 14C9 12.3431 7.65685 12 6 12ZM6 12C7.65685 12 9 10.6569 9 9C9 7.34315 7.65685 6 6 6C4.34315 6 3 7.34315 3 9C3 10.6569 4.34315 12 6 12ZM18 22C19.6569 22 21 21.6569 21 21C21 19.3431 19.6569 19 18 19C16.3431 19 15 19.3431 15 21C15 21.6569 16.3431 22 18 22ZM6 19C7.65685 19 9 18.6569 9 18C9 16.3431 7.65685 16 6 16C4.34315 16 3 16.3431 3 18C3 18.6569 4.34315 19 6 19Z" fill={color} />
  </Svg>
);

const UploadIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 5M12 5L17 10M12 5V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DownloadIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ListIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6H21M3 12H21M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GridIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 3H9V9H3V3ZM3 15H9V21H3V15ZM15 3H21V9H15V3ZM15 15H21V21H15V15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckCircleIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={color} />
  </Svg>
);

const EyeIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill={color} />
  </Svg>
);

const EditIcon: React.FC<IconProps> = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13M18.4142 10L22.5 6.00001L18 1.50001L13.5 5.50001L17.5858 9.58579C17.9629 9.96288 18.4371 10.25 18.9393 10.4375C19.4415 10.625 19.9698 10.7071 20.5 10.7071C21.0302 10.7071 21.5585 10.625 22.0607 10.4375C22.5629 10.25 23.0371 9.96288 23.4142 9.58579L23.5 9.5M13.5 5.50001L23.5 15.5V20H18L8 10H13.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// --- Header Component ---
interface HeaderProps {
  onMenuPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
        <HamburgerIcon color={colors.bellChevronIcon} size={28} />
      </TouchableOpacity>
      <View style={styles.searchBarContainer}>
        <SearchIcon color={colors.searchIcon} size={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search employees, documents..."
          placeholderTextColor={colors.searchIcon}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.userProfileContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <BellIcon color={colors.bellChevronIcon} size={28} />
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AS</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Advika Singh</Text>
            <Text style={styles.userRole}>HR Admin</Text>
          </View>
          <ChevronDownIcon color={colors.bellChevronIcon} size={16} />
        </View>
      </View>
    </View>
  );
};

// --- EmployeeManagementCard Component ---
const EmployeeManagementCard = () => {
  return (
    <View style={styles.employeeCardContainer}>
      <View style={styles.cardContent}>
        <UsersIcon color={colors.cardText} size={32} style={styles.cardIcon} />
        <Text style={styles.cardTitle}>Employee Management</Text>
        <Text style={styles.cardSubtext}>Manage your workforce efficiently</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>51</Text>
            <Text style={styles.statLabel}>Total Employees</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// --- FilterActionBar Component ---
const FilterActionBar = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState('Table');

  return (
    <View style={styles.filterActionBar}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setSelectedDepartment('New Dept')}>
        <Text style={styles.dropdownText}>{selectedDepartment}</Text>
        <ChevronDownIcon color={colors.dropdownChevron} size={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dropdown} onPress={() => setSelectedDesignation('New Desig')}>
        <Text style={styles.dropdownText}>{selectedDesignation}</Text>
        <ChevronDownIcon color={colors.dropdownChevron} size={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dropdown} onPress={() => setSelectedStatus('New Status')}>
        <Text style={styles.dropdownText}>{selectedStatus}</Text>
        <ChevronDownIcon color={colors.dropdownChevron} size={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addEmployeeButton}>
        <UserPlusIcon color={colors.addEmployeeText} size={16} style={styles.buttonIcon} />
        <Text style={styles.addEmployeeText}>Add Employee</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <UploadIcon color={colors.importExportText} size={16} style={styles.buttonIcon} />
        <Text style={styles.importExportText}>Import</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <DownloadIcon color={colors.importExportText} size={16} style={styles.buttonIcon} />
        <Text style={styles.importExportText}>Export</Text>
      </TouchableOpacity>
      <View style={styles.viewToggleContainer}>
        <TouchableOpacity style={[styles.toggleButton, viewMode === 'Table' && styles.toggleButtonActive]} onPress={() => setViewMode('Table')}>
          <ListIcon color={viewMode === 'Table' ? colors.toggleActiveText : colors.toggleInactiveText} size={16} />
          <Text style={[styles.toggleText, viewMode === 'Table' && styles.toggleTextActive]}>Table</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleButton, viewMode === 'Grid' && styles.toggleButtonActive]} onPress={() => setViewMode('Grid')}>
          <GridIcon color={viewMode === 'Grid' ? colors.toggleActiveText : colors.toggleInactiveText} size={16} />
          <Text style={[styles.toggleText, viewMode === 'Grid' && styles.toggleTextActive]}>Grid</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


interface EmployeeTableRowProps {
  data: {
    avatar: string;
    name: string;
    email: string;
    id: string;
    department: string;
    designation: string;
    joiningDate: string;
  };
}

const EmployeeTableRow: React.FC<EmployeeTableRowProps> = ({ data }) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{data.avatar}</Text>
        </View>
        <View>
          <Text style={styles.employeeName}>{data.name}</Text>
          <Text style={styles.employeeEmail}>{data.email}</Text>
        </View>
      </View>
      <Text style={styles.employeeId}>{data.id}</Text>
      <Text style={styles.department}>{data.department}</Text>
      <Text style={styles.designation}>{data.designation}</Text>
      <Text style={styles.joiningDate}>{data.joiningDate}</Text>
      <View style={styles.statusPill}>
        <CheckCircleIcon color={colors.statusText} size={14} />
        <Text style={styles.statusText}>Active</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButtonSmall}>
          <EyeIcon color={colors.actionText} size={14} />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButtonSmall}>
          <EditIcon color={colors.actionText} size={14} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface AllEmployeeScreenProps {
  navigation: {
    toggleDrawer: () => void;
  };
}

const AllEmployeeScreen: React.FC<AllEmployeeScreenProps> = ({ navigation }) => {
  const employeeData = [
    { avatar: 'AB', name: 'mrs Aadhya Devi Bansal', email: 'aadhya.bansal@company.com', id: 'EMP0035', department: 'Human Resources', designation: 'Manager', joiningDate: 'Mar 29, 2023' },
    { avatar: 'AJ', name: 'mr Aadhya Jain', email: 'aadhya.jain@company.com', id: 'EMP0049', department: 'Marketing', designation: 'Executive', joiningDate: 'Jun 03, 2023' },
    { avatar: 'AS', name: 'ms Aadhya Srivastava', email: 'aadhya.srivastava@company.com', id: 'EMP0045', department: 'Marketing', designation: 'Analyst', joiningDate: 'Apr 17, 2024' },
    { avatar: 'AB', name: 'mr Aarohi Bansal', email: 'aarohi.bansal@company.com', id: 'EMP0011', department: 'Finance', designation: 'Accountant', joiningDate: 'Nov 23, 2023' },
    { avatar: 'AK', name: 'mr Aarohi Singh Kumar', email: 'aarohi.kumar@company.com', id: 'EMP0024', department: 'Human Resources', designation: 'Recruiter', joiningDate: 'Mar 05, 2024' },
  ];

  const onMenuPress = () => {
    if (Platform.OS === 'android' && navigation) {
      navigation.toggleDrawer();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onMenuPress={onMenuPress} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <EmployeeManagementCard />
        <FilterActionBar />
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>EMPLOYEE</Text>
            <Text style={styles.tableHeaderText}>EMPLOYEE ID</Text>
            <Text style={styles.tableHeaderText}>DEPARTMENT</Text>
            <Text style={styles.tableHeaderText}>DESIGNATION</Text>
            <Text style={styles.tableHeaderText}>JOINING DATE</Text>
            <Text style={styles.tableHeaderText}>STATUS</Text>
            <Text style={styles.tableHeaderText}>ACTIONS</Text>
          </View>
          {employeeData.map((data, index) => (
            <React.Fragment key={index}>
              <EmployeeTableRow data={data} />
              {index < employeeData.length - 1 && <View style={styles.tableDivider} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.importExportBorder,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.headerSearchBg,
    borderRadius: 25,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.avatarBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: colors.cardBackground,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: typography.fontFamily,
  },
  userInfo: {
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  userRole: {
    fontSize: 12,
    color: colors.userRoleText,
    fontFamily: typography.fontFamily,
  },
  employeeCardContainer: {
    backgroundColor: colors.cardGradientStart,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.cardText,
    marginBottom: 4,
    fontFamily: typography.fontFamily,
  },
  cardSubtext: {
    fontSize: 14,
    color: colors.cardText,
    fontFamily: typography.fontFamily,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.cardText,
    fontFamily: typography.fontFamily,
  },
  statLabel: {
    fontSize: 13,
    color: colors.cardText,
    fontFamily: typography.fontFamily,
  },
  filterActionBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    alignItems: 'center', // Ensure vertical alignment
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dropdownBg,
    borderWidth: 1,
    borderColor: colors.dropdownBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    minWidth: 120,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.dropdownText,
    fontFamily: typography.fontFamily,
    marginRight: 8,
  },
  addEmployeeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.addEmployeeBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  addEmployeeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.addEmployeeText,
    fontFamily: typography.fontFamily,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.importExportBg,
    borderWidth: 1,
    borderColor: colors.importExportBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    marginLeft: 8,
  },
  importExportText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.importExportText,
    fontFamily: typography.fontFamily,
  },
  viewToggleContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.toggleBorder,
    borderRadius: 8,
    marginBottom: 8,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.toggleInactiveBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: colors.toggleActiveBg,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.toggleInactiveText,
    fontFamily: typography.fontFamily,
    marginLeft: 8,
  },
  toggleTextActive: {
    color: colors.toggleActiveText,
  },
  tableContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.importExportBorder,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.tableHeaderText,
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.importExportBorder,
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  employeeName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.employeeName,
    fontFamily: typography.fontFamily,
    marginLeft: 8,
  },
  employeeEmail: {
    fontSize: 12,
    color: colors.employeeEmail,
    fontFamily: typography.fontFamily,
    marginLeft: 8,
  },
  employeeId: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.employeeId,
    fontFamily: typography.fontFamily,
    flex: 1,
    textAlign: 'center',
  },
  department: {
    fontSize: 14,
    color: colors.departmentLink,
    textDecorationLine: 'underline',
    fontFamily: typography.fontFamily,
    flex: 1,
    textAlign: 'center',
  },
  designation: {
    fontSize: 14,
    color: colors.designationJoinDate,
    fontFamily: typography.fontFamily,
    flex: 1,
    textAlign: 'center',
  },
  joiningDate: {
    fontSize: 14,
    color: colors.designationJoinDate,
    fontFamily: typography.fontFamily,
    flex: 1,
    textAlign: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.statusBg,
    borderWidth: 1,
    borderColor: colors.statusBorder,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flex: 1,
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.statusText,
    fontFamily: typography.fontFamily,
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  actionButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.actionBg,
    borderWidth: 1,
    borderColor: colors.actionBorder,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.actionText,
    fontFamily: typography.fontFamily,
    marginLeft: 4,
  },
  tableDivider: {
    height: 1,
    backgroundColor: colors.importExportBorder,
    marginHorizontal: -16,
  },
});

export default AllEmployeeScreen;
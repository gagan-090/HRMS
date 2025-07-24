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
  
} from 'react-native';
import Svg, { Path, Circle, Stop, G, Rect, } from 'react-native-svg';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Define colors
const colors = {
  primaryBackground: '#F3F4F6',
  cardBackground: '#FFFFFF',
  headerSearchBg: '#F3F4F6',
  searchIcon: '#6B7280',
  userNameText: '#1F2937',
  userRoleText: '#6B7280',
  bellChevronIcon: '#6B7280',
  avatarBg: '#007BFF',
  titleText: '#1F2937',
  descriptionText: '#6B7280',
  accentBlue: '#007BFF',
  accentGreen: '#00B894',
  accentRed: '#DC3545',
  accentYellow: '#FFC107',
  whiteText: '#FFFFFF',
  secondaryText: '#6B7280',
  inputBorder: '#E5E7EB',
  buttonBorder: '#E5E7EB',
  bannerStart: '#00B894',
  bannerEnd: '#00A382',
  statsBg: '#00997A',
  quickActionBg: 'rgba(0, 123, 255, 0.1)',
  quickActionText: '#007BFF',
  leaveTypeBg: 'rgba(0, 123, 255, 0.1)',
  pendingBg: 'rgba(255, 193, 7, 0.1)',
  approvedBg: 'rgba(0, 184, 148, 0.1)',
  rejectedBg: 'rgba(220, 53, 69, 0.1)',
  viewBg: 'rgba(0, 123, 255, 0.1)',
  approveBg: 'rgba(0, 184, 148, 0.1)',
  rejectBg: 'rgba(220, 53, 69, 0.1)',
  shadow: '#000',
};

// Define typography
const typography = {
  fontFamily: 'sans-serif',
};

// SVG Icons
const HamburgerIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12H21M3 6H21M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SearchIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.5 15.5L19 19M11 6C8.23858 6 6 8.23858 6 11C6 13.7614 8.23858 16 11 16C13.7614 16 16 13.7614 16 11C16 8.23858 13.7614 6 11 6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BellIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={color} strokeWidth="2" />
    <Path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21H13.73Z" fill={color} />
  </Svg>
);

const ChevronDownIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarCheckIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 22L18 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FilePlusIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2V8H20M12 11H16M8 15H16M12 15V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClipboardListIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M16 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8L16 4ZM16 4L16 8H20M8 12H12M8 16H12M12 8H8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FilterIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 4H21M4 4H20L16 10H8L4 16H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DownloadIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UsersIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 11C9.79086 11 8 12.7909 8 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2L20 8H14V2ZM16 10V18M12 14H16M8 10H12M8 14H12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckCircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={color} />
  </Svg>
);

const XCircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EyeIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// --- Header Component ---
const Header = ({ navigation }) => {
  const onMenuPress = () => {
    if (Platform.OS === 'android' && navigation) {
      navigation.toggleDrawer();
    }
  };

 
};

// --- Banner Component ---
const Banner = () => (
  <View style={styles.bannerContainer}>
    <LinearGradient
      colors={[colors.bannerStart, colors.bannerEnd]}
      style={styles.bannerGradient}
    >
      <View style={styles.bannerContent}>
        <CalendarCheckIcon color={colors.whiteText} size={32} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Leave Management</Text>
          <Text style={styles.bannerSubtext}>Manage employee leave requests and approvals</Text>
        </View>
        <View style={styles.bannerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>TOTAL REQUESTS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>PENDING</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>APPROVED</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>REJECTED</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>
);

// --- Quick Actions Component ---
const QuickActions = () => {
  const [activeButton, setActiveButton] = useState('Apply Leave');
  return (
    <View style={styles.quickActionsContainer}>
      {['Apply Leave', 'Pending Approvals', 'Leave Calendar', 'My Leave History'].map((action) => (
        <TouchableOpacity
          key={action}
          style={[styles.quickActionButton, activeButton === action && { backgroundColor: colors.quickActionBg, borderColor: colors.accentBlue }]}
          onPress={() => setActiveButton(action)}
        >
          {action === 'Apply Leave' && <FilePlusIcon color={activeButton === action ? colors.quickActionText : colors.secondaryText} size={16} />}
          {action === 'Pending Approvals' && <ClockIcon color={activeButton === action ? colors.quickActionText : colors.secondaryText} size={16} />}
          {action === 'Leave Calendar' && <CalendarIcon color={activeButton === action ? colors.quickActionText : colors.secondaryText} size={16} />}
          {action === 'My Leave History' && <ClipboardListIcon color={activeButton === action ? colors.quickActionText : colors.secondaryText} size={16} />}
          <Text style={[styles.quickActionText, activeButton === action && { color: colors.quickActionText }]}>{action}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// --- Filter Bar Component ---
const FilterBar = () => (
  <View style={styles.filterBar}>
    <View style={[styles.inputContainer, { flex: 2, marginRight: 8 }]}>
      <SearchIcon color={colors.secondaryText} size={16} style={styles.searchIcon} />
      <TextInput
        placeholder="Search by employee name or leave type..."
        placeholderTextColor={colors.secondaryText}
        style={styles.input}
      />
    </View>
    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
      <CalendarIcon color={colors.secondaryText} size={16} style={styles.searchIcon} />
      <TextInput
        placeholder="Date From"
        placeholderTextColor={colors.secondaryText}
        style={styles.input}
      />
    </View>
    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
      <CalendarIcon color={colors.secondaryText} size={16} style={styles.searchIcon} />
      <TextInput
        placeholder="Date To"
        placeholderTextColor={colors.secondaryText}
        style={styles.input}
      />
    </View>
    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
      <Text style={styles.dropdownText}>All Employees</Text>
      <ChevronDownIcon color={colors.secondaryText} size={16} />
    </View>
    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
      <Text style={styles.dropdownText}>All Types</Text>
      <ChevronDownIcon color={colors.secondaryText} size={16} />
    </View>
    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
      <Text style={styles.dropdownText}>All Status</Text>
      <ChevronDownIcon color={colors.secondaryText} size={16} />
    </View>
    <TouchableOpacity style={[styles.actionButton, { flex: 1, backgroundColor: colors.accentGreen, marginRight: 8 }]}>
      <FilePlusIcon color={colors.whiteText} size={16} />
      <Text style={[styles.actionButtonText, { color: colors.whiteText }]}>Apply Leave</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.actionButton, { flex: 1, borderColor: colors.inputBorder, marginRight: 8 }]}>
      <CalendarIcon color={colors.secondaryText} size={16} />
      <Text style={[styles.actionButtonText, { color: colors.secondaryText }]}>Calendar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.actionButton, { flex: 1, borderColor: colors.inputBorder, marginRight: 8 }]}>
      <DownloadIcon color={colors.secondaryText} size={16} />
      <Text style={[styles.actionButtonText, { color: colors.secondaryText }]}>Export</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.filterButton, { flex: 1, backgroundColor: colors.accentBlue }]}>
      <FilterIcon color={colors.whiteText} size={16} />
      <Text style={[styles.filterButtonText, { color: colors.whiteText }]}>Filter</Text>
    </TouchableOpacity>
  </View>
);

// --- Leave Applications Table Component ---
const LeaveApplicationsTable = () => {
  const rows = [
    { employee: 'mr Advik Singh', id: 'EMP0013', dept: 'Marketing', type: 'Annual Leave', duration: 'Full Day', start: 'Aug 06, 2025 (Wed)', end: 'Aug 08, 2025 (Fri)', days: '3.0', status: 'PENDING', applied: 'Jun 30, 2025 (03:44)' },
    { employee: 'mr Advik Singh', id: 'EMP0013', dept: 'Marketing', type: 'Casual Leave', duration: 'Full Day', start: 'Aug 04, 2025 (Mon)', end: 'Aug 04, 2025 (Mon)', days: '1.0', status: 'APPROVED', applied: 'Jun 30, 2025 (03:44)' },
    { employee: 'mr Advik Singh', id: 'EMP0013', dept: 'Marketing', type: 'Annual Leave', duration: 'Full Day', start: 'May 19, 2025 (Mon)', end: 'May 25, 2025 (Sun)', days: '5.0', status: 'APPROVED', applied: 'Jun 30, 2025 (03:44)' },
    { employee: 'mrs Aditiya Bansal', id: 'EMP0014', dept: 'Human Resources', type: 'Paternity Leave', duration: 'Full Day', start: 'Aug 26, 2025 (Tue)', end: 'Aug 31, 2025 (Sun)', days: '4.0', status: 'PENDING', applied: 'Jun 30, 2025 (03:44)' },
    { employee: 'mr Diya Singh', id: 'EMP0015', dept: 'Operations', type: 'Sick Leave', duration: 'Full Day', start: 'Aug 24, 2025 (Sun)', end: 'Aug 25, 2025 (Mon)', days: '1.0', status: 'PENDING', applied: 'Jun 30, 2025 (03:44)' },
  ];

  const columnWidths = {
    employee: 150,
    leaveType: 100,
    duration: 80,
    startDate: 120,
    endDate: 120,
    days: 50,
    status: 100,
    appliedOn: 120,
    actions: 200,
  };

  return (
    <ScrollView horizontal={true} style={styles.tableScroll}>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { width: columnWidths.employee }]}><UsersIcon color={colors.secondaryText} size={16} /> Employee</Text>
          <Text style={[styles.tableHeaderText, { width: columnWidths.leaveType }]}><FileTextIcon color={colors.secondaryText} size={16} /> Leave Type</Text>
          <Text style={[styles.tableHeaderText, { width: columnWidths.duration }]}>Duration</Text>
          <Text style={[styles.tableHeaderText, { width: columnWidths.startDate }]}>Start Date</Text>
          <Text style={[styles.tableHeaderText, { width: columnWidths.endDate }]}>End Date</Text>
          <Text style={[styles.tableHeaderText, { width: columnWidths.days }]}>Days</Text>
          <Text style={[styles.tableHeaderText, { width: columnWidths.status }]}><CheckCircleIcon color={colors.secondaryText} size={16} /> Status</Text>
          <Text style={[styles.tableHeaderText, { width: columnWidths.appliedOn }]}>Applied On</Text>
          <View style={[styles.tableHeaderText, { width: columnWidths.actions }]}><Text>Actions</Text></View>
        </View>
        {rows.map((row, index) => (
          <View key={index} style={[styles.tableRow, index < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.inputBorder }]}>
            <View style={[styles.tableCell, { width: columnWidths.employee, paddingRight: 8 }]}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{row.employee.split(' ')[1][0] + row.employee.split(' ')[0][0]}</Text>
              </View>
              <View style={styles.employeeDetailsContainer}>
                <Text style={styles.employeeName}>{row.employee}</Text>
                <Text style={styles.employeeDetails}>{row.id} • {row.dept}</Text>
              </View>
            </View>
            <Text style={[styles.tableCellText, { width: columnWidths.leaveType }]}>
              <View style={[styles.pill, { backgroundColor: colors.leaveTypeBg, borderColor: colors.accentBlue }]}>
                <Text style={[styles.pillText, { color: colors.accentBlue }]}>{row.type}</Text>
              </View>
            </Text>
            <Text style={[styles.tableCellText, { width: columnWidths.duration }]}>{row.duration}</Text>
            <Text style={[styles.tableCellText, { width: columnWidths.startDate }]}>{row.start}</Text>
            <Text style={[styles.tableCellText, { width: columnWidths.endDate }]}>{row.end}</Text>
            <Text style={[styles.tableCellText, { width: columnWidths.days }]}>{row.days}</Text>
            <Text style={[styles.tableCellText, { width: columnWidths.status }]}>
              <View style={[styles.pill, { backgroundColor: row.status === 'PENDING' ? colors.pendingBg : row.status === 'APPROVED' ? colors.approvedBg : colors.rejectedBg, borderColor: row.status === 'PENDING' ? colors.accentYellow : row.status === 'APPROVED' ? colors.accentGreen : colors.accentRed }]}>
                <Text style={[styles.pillText, { color: row.status === 'PENDING' ? colors.accentYellow : row.status === 'APPROVED' ? colors.accentGreen : colors.accentRed }]}>{row.status}</Text>
              </View>
            </Text>
            <Text style={[styles.tableCellText, { width: columnWidths.appliedOn }]}>{row.applied}</Text>
            <View style={[styles.actionsContainer, { width: columnWidths.actions }]}>
              <TouchableOpacity style={[styles.actionButtonSmall, { backgroundColor: colors.viewBg, borderColor: colors.accentBlue }]}>
                <EyeIcon color={colors.accentBlue} size={14} />
                <Text style={[styles.actionButtonSmallText, { color: colors.accentBlue }]}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButtonSmall, { backgroundColor: colors.approveBg, borderColor: colors.accentGreen }]}>
                <CheckCircleIcon color={colors.accentGreen} size={14} />
                <Text style={[styles.actionButtonSmallText, { color: colors.accentGreen }]}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButtonSmall, { backgroundColor: colors.rejectBg, borderColor: colors.accentRed }]}>
                <XCircleIcon color={colors.accentRed} size={14} />
                <Text style={[styles.actionButtonSmallText, { color: colors.accentRed }]}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// --- AllLeavesScreen Component ---
const AllLeavesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Banner />
        <QuickActions />
        <FilterBar />
        <LeaveApplicationsTable />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
    shadowColor: colors.shadow,
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
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
    borderWidth: 0,
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
    color: colors.whiteText,
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
  bannerContainer: {
    marginTop: 32,
  },
  bannerGradient: {
    padding: 24,
    borderRadius: 8,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    flex: 1,
    marginLeft: 16,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  bannerSubtext: {
    fontSize: 14,
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  bannerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.statsBg,
    padding: 8,
    borderRadius: 8,
    width: 70,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  statLabel: {
    fontSize: 13,
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  filterBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 8,
    marginTop: 32,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    flex: 1,
    minWidth: 120,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    flex: 1,
    minWidth: 120,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    minWidth: 120,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  tableScroll: {
    marginBottom: 16,
  },
  tableContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
    alignItems: 'center',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily,
    textAlign: 'left',
    flexShrink: 0,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  employeeDetailsContainer: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  employeeName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  employeeDetails: {
    fontSize: 12,
    color: colors.descriptionText,
    fontFamily: typography.fontFamily,
  },
  tableCellText: {
    fontSize: 14,
    color: colors.titleText,
    fontFamily: typography.fontFamily,
    textAlign: 'left',
    flexShrink: 0,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  actionButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  actionButtonSmallText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  pill: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: typography.fontFamily,
  },
});

export default AllLeavesScreen;
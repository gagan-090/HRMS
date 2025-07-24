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
import Svg, { Path, G, Circle } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
// Define colors
const colors = {
  primaryBackground: '#a5eef818',
  cardBackground: '#FFFFFF',
  headerSearchBg: '#F3F4F6',
  searchIcon: '#6B7280',
  userNameText: '#1F2937',
  userRoleText: '#6B7280',
  bellChevronIcon: '#6B7280',
  avatarBg: '#007BFF',
  titleText: '#1F2937',
  secondaryText: '#6B7280',
  accentBlue: '#007BFF',
  accentGreen: '#00B894',
  accentRed: '#DC3545',
  accentYellow: '#FFC107',
  whiteText: '#FFFFFF',
  inputBorder: '#E5E7EB',
  bannerStart: '#FFC107',
  bannerEnd: '#ff8400e3',
  metricBg1: '#FFF8E1',
  metricBg2: '#E0F2F7',
  metricBg3: '#E6F7ED',
  metricBg4: '#FDE7E7',
  shadow: '#000',
  lightBluePill: 'rgba(0, 123, 255, 0.1)',
  lightGrayPill: 'rgba(107, 114, 128, 0.1)',
  lightRedPill: 'rgba(220, 53, 69, 0.1)',
};

// Define typography
const typography = {
  fontFamily: 'sans-serif',
};

// SVG Icons (unchanged, included for completeness)
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

const UsersIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 11C9.79086 11 8 12.7909 8 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const AlertTriangleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M10.29 3.86L1.82 18C1.65 18.35 1.5 18.74 1.5 19.14C1.5 20.1 2.22 21 3.18 21H20.82C21.78 21 22.5 20.1 22.5 19.14C22.5 18.74 22.35 18.35 22.18 18L13.71 3.86C13.38 3.34 12.62 3.34 12.29 3.86Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 9V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 17H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckCircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={color} />
  </Svg>
);

const XCircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15 9L12 12M9 15L12 12M12 12L15 15L9 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ListIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8 6H21M8 12H21M8 18H21M4 6H4.01M4 12H4.01M4 18H4.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FilePlusIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2V8H20M16 10V17M12 14H16M8 10H8.01M8 14H8.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DownloadIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2V8H20M16 10V17M12 14H16M8 10H8.01M8 14H8.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MoreHorizontalIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EyeIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM12 7C8.13 7 5 9.92 5 12C5 14.08 8.13 17 12 17C15.87 17 19 14.08 19 12C19 9.92 15.87 7 12 7Z" fill={color} />
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

// --- Breadcrumbs Component ---
const Breadcrumbs = () => (
  <View style={styles.breadcrumbsContainer}>
    <Text style={styles.breadcrumbText}>Dashboard / Leaves / Pending Approvals</Text>
  </View>
);

// --- Banner Component ---
const Banner = () => (
  <View style={styles.bannerContainer}>
    <LinearGradient colors={[colors.bannerStart, colors.bannerEnd]} style={styles.bannerGradient}>
      <View style={styles.bannerContent}>
        <ClockIcon color={colors.whiteText} size={32} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Pending Leave Approvals</Text>
          <Text style={styles.bannerSubtext}>Review and manage all pending leave requests</Text>
        </View>
        <View style={styles.bannerButtons}>
          <TouchableOpacity style={styles.allLeavesButton}>
            <ListIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
            <Text style={styles.allLeavesText}>All Leaves</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyLeaveButton}>
            <FilePlusIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
            <Text style={styles.applyLeaveText}>Apply Leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  </View>
);

// --- Key Approval Metrics Cards ---
const KeyApprovalMetrics = () => {
  const metrics = [
    { value: 8, label: 'Pending Approvals', bg: colors.metricBg1, icon: <ClockIcon color={colors.accentYellow} size={24} /> },
    { value: 30.0, label: 'Total Days Requested', bg: colors.metricBg2, icon: <CalendarIcon color={colors.accentBlue} size={24} /> },
    { value: 8, label: 'Employees', bg: colors.metricBg3, icon: <UsersIcon color={colors.accentGreen} size={24} /> },
    { value: 2, label: 'Emergency Requests', bg: colors.metricBg4, icon: <AlertTriangleIcon color={colors.accentRed} size={24} /> },
  ];

  return (
    <View style={styles.metricsContainer}>
      {metrics.map((metric, index) => (
        <View key={index} style={styles.metricCard}>
          <View style={[styles.metricIcon, { backgroundColor: metric.bg }]}>
            {metric.icon}
          </View>
          <View style={styles.metricContent}>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// --- Filter Bar & Bulk Actions ---
const FilterBar = () => (
  <View style={styles.filterBar}>
    <View style={styles.inputContainer}>
      <Text style={styles.dropdownText}>All Leave Types</Text>
      <ChevronDownIcon color={colors.secondaryText} size={16} />
    </View>
    <TouchableOpacity style={styles.bulkApproveButton}>
      <CheckCircleIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
      <Text style={styles.bulkActionText}>Bulk Approve</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bulkRejectButton}>
      <XCircleIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
      <Text style={styles.bulkActionText}>Bulk Reject</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.exportButton}>
      <DownloadIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
      <Text style={styles.exportText}>Export</Text>
    </TouchableOpacity>
  </View>
);

// --- Leave Approvals Table ---
const LeaveApprovalsTable = () => {
  const data = [
    { name: 'Advik Singh', initials: 'AS', id: 'EMP0015', dept: 'Marketing', type: 'ANNUAL LEAVE', duration: '3.0 days', start: 'Aug 06, 2025', startDay: 'Wed', end: 'Aug 08, 2025', endDay: 'Fri', days: '3.0', applied: 'Jun 30, 2025, 03:44', ago: '2 weeks, 3 days ago', priority: 'Normal' },
    { name: 'Aditiya Bansal', initials: 'AB', id: 'EMP0014', dept: 'Human Resources', type: 'PATERNITY LEAVE', duration: '4.0 days', start: 'Aug 26, 2025', startDay: 'Tue', end: 'Aug 31, 2025', endDay: 'Sun', days: '4.0', applied: 'Jun 30, 2025, 03:44', priority: 'Emergency' },
    { name: 'Diya Singh', initials: 'DS', id: 'EMP0013', dept: 'Operations', type: 'SICK LEAVE', duration: '1.0 day', start: 'Aug 24, 2025', startDay: 'Sun', end: 'Aug 25, 2025', endDay: 'Mon', days: '1.0', applied: 'Jun 30, 2025, 03:44', priority: 'Normal' },
    { name: 'Aarohi Bansal', initials: 'AB', id: 'EMP0011', dept: 'Finance', type: 'COMPENSATORY LEAVE', duration: '3.0 days', start: 'Aug 18, 2025', startDay: 'Sat', end: 'Aug 20, 2025', endDay: 'Mon', days: '3.0', applied: 'Jun 30, 2025, 03:44', priority: 'Normal' },
    { name: 'Kiara Sharma', initials: 'KS', id: 'EMP0007', dept: 'Administration', type: 'MATERNITY LEAVE', duration: '2.0 days', start: 'Aug 19, 2025', startDay: 'Tue', end: 'Aug 20, 2025', endDay: 'Wed', days: '2.0', applied: 'Jun 30, 2025, 03:44', priority: 'Normal' },
  ];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.tableContainer}
    >
      <View style={styles.tableWrapper}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Employee</Text>
          <Text style={styles.tableHeaderText}>Leave Type</Text>
          <Text style={styles.tableHeaderText}>Duration</Text>
          <Text style={styles.tableHeaderText}>Start Date</Text>
          <Text style={styles.tableHeaderText}>End Date</Text>
          <Text style={styles.tableHeaderText}>Days</Text>
          <Text style={styles.tableHeaderText}>Applied On</Text>
          <Text style={styles.tableHeaderText}>Priority</Text>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>
        {data.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{row.initials}</Text>
              </View>
              <View style={styles.employeeDetails}>
                <Text style={styles.employeeName}>{row.name}</Text>
                <Text style={styles.employeeInfo}>{row.id} • {row.dept}</Text>
              </View>
            </View>
            <View style={styles.tableCell}>
              <View style={styles.leaveTypePill}>
                <Circle cx="4" cy="8" r="2" fill={colors.accentBlue} />
                <Text style={styles.leaveTypeText}>{row.type}</Text>
              </View>
            </View>
            <Text style={styles.tableCellText}>{row.duration}</Text>
            <Text style={styles.tableCellText}>{row.start} ({row.startDay})</Text>
            <Text style={styles.tableCellText}>{row.end} ({row.endDay})</Text>
            <Text style={styles.tableCellText}>{row.days}</Text>
            <Text style={styles.tableCellText}>{row.applied}{row.ago && `, ${row.ago}`}</Text>
            <View style={styles.tableCell}>
              <View style={[styles.priorityPill, row.priority === 'Emergency' ? { backgroundColor: colors.lightRedPill, borderColor: colors.accentRed } : { backgroundColor: colors.lightGrayPill, borderColor: colors.secondaryText }]}>
                <Circle cx="4" cy="8" r="2" fill={row.priority === 'Emergency' ? colors.accentRed : colors.secondaryText} />
                <Text style={[styles.priorityText, row.priority === 'Emergency' ? { color: colors.accentRed } : { color: colors.secondaryText }]}>{row.priority}</Text>
              </View>
            </View>
            <View style={styles.tableCell}>
              <TouchableOpacity style={styles.actionButton}>
                <EyeIcon color={colors.accentBlue} size={16} />
              </TouchableOpacity>
              <View style={styles.dotSeparator} />
              <TouchableOpacity style={styles.actionButton}>
                <CheckCircleIcon color={colors.accentGreen} size={16} />
              </TouchableOpacity>
              <View style={styles.dotSeparator} />
              <TouchableOpacity style={styles.actionButton}>
                <XCircleIcon color={colors.accentRed} size={16} />
              </TouchableOpacity>
            </View>
            {index < data.length - 1 && <View style={styles.tableDivider} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// --- PendingApprovalsScreen Component ---
const PendingApprovalsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Breadcrumbs />
        <Banner />
        <KeyApprovalMetrics />
        <FilterBar />
        <LeaveApprovalsTable />
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
    fontWeight: '600',
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
  breadcrumbsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  breadcrumbText: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  bannerContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  bannerGradient: {
    padding: 24,
    borderRadius: 8,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
  bannerButtons: {
    flexDirection: 'row',
  },
  allLeavesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  applyLeaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentBlue,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  allLeavesText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  applyLeaveText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    flexWrap: 'wrap',
  },
  metricCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    width: '23.5%', // Adjusted for four cards to fit perfectly
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricContent: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  metricLabel: {
    fontSize: 13,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    textAlign: 'center',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    marginBottom: 8,
    minWidth: 180,
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  bulkApproveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentGreen,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  bulkRejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentRed,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  bulkActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  exportText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  tableContainer: {
    marginTop: 32,
  },
  tableWrapper: {
    minWidth: Dimensions.get('window').width - 48, // Adjust for padding
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily,
    minWidth: 120,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 120,
  },
  tableCellText: {
    fontSize: 14,
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  employeeDetails: {
    marginLeft: 12,
  },
  employeeName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  employeeInfo: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  leaveTypePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBluePill,
    borderWidth: 1,
    borderColor: colors.accentBlue,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  leaveTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accentBlue,
    fontFamily: typography.fontFamily,
    marginLeft: 4,
  },
  priorityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: typography.fontFamily,
    marginLeft: 4,
  },
  actionButton: {
    padding: 4,
    borderRadius: 12,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.secondaryText,
    marginHorizontal: 4,
  },
  tableDivider: {
    height: 1,
    backgroundColor: colors.inputBorder,
    marginVertical: 8,
  },
});

export default PendingApprovalsScreen;
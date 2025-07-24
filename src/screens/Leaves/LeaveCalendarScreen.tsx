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
import Svg, { Path, G, } from 'react-native-svg';
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
  bannerStart: '#007BFF',
  bannerEnd: '#1D2B64',
  statsBg: '#006BBF',
  metricBg1: '#E0F2F7',
  metricBg2: '#E6F7ED',
  metricBg3: '#FFF8E1',
  metricBg4: '#FDE7E7',
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

const CalendarIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UsersIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 11C9.79086 11 8 12.7909 8 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckCircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={color} />
  </Svg>
);

const BarChartIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 3V21H21M3 3H21M3 3L6 9L9 6L12 12L15 9L18 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronLeftIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronRightIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 6L15 12L9 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FilterIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 4H21M4 4H20L16 10H8L4 16H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InfoIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        <View style={styles.iconWrapper}>
          <CalendarCheckIcon color={colors.whiteText} size={32} />
        </View>
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Leave Calendar</Text>
          <Text style={styles.bannerSubtext}>View team leaves and plan your schedule</Text>
        </View>
        <View style={styles.bannerStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <CalendarIcon color={colors.whiteText} size={12} style={styles.statIcon} />
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <ClockIcon color={colors.accentYellow} size={12} style={styles.statIcon} />
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>
);

// --- Key Leave Metrics Cards ---
const KeyLeaveMetrics = () => {
  const metrics = [
    { value: 0, label: 'EMPLOYEES ON LEAVE TODAY', bg: colors.metricBg1, icon: <UsersIcon color={colors.accentBlue} size={24} /> },
    { value: 0, label: 'APPROVED THIS MONTH', bg: colors.metricBg2, icon: <CheckCircleIcon color={colors.accentGreen} size={24} /> },
    { value: 0, label: 'PENDING APPROVALS', bg: colors.metricBg3, icon: <ClockIcon color={colors.accentYellow} size={24} /> },
    { value: 0, label: 'AVG DAYS PER EMPLOYEE', bg: colors.metricBg4, icon: <BarChartIcon color={colors.accentRed} size={24} /> },
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

// --- Calendar Navigation & View Toggles ---
const CalendarNav = () => {
  const [activeView, setActiveView] = useState('Month');
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => {}}>
        <ChevronLeftIcon color={colors.secondaryText} size={16} />
      </TouchableOpacity>
      <Text style={styles.navMonth}>July 2025</Text>
      <TouchableOpacity style={styles.navButton} onPress={() => {}}>
        <ChevronRightIcon color={colors.secondaryText} size={16} />
      </TouchableOpacity>
      <View style={styles.toggleGroup}>
        {['Month', 'Week', 'List'].map((view) => (
          <TouchableOpacity
            key={view}
            style={[styles.toggleButton, activeView === view && { backgroundColor: colors.accentBlue, borderColor: colors.accentBlue }]}
            onPress={() => setActiveView(view)}
          >
            <Text style={[styles.toggleText, activeView === view && { color: colors.whiteText }]}>{view}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// --- Filter Bar ---
const FilterBar = () => (
  <View style={styles.filterBar}>
    <View style={styles.inputContainer}>
      <Text style={styles.dropdownText}>All Departments</Text>
      <ChevronDownIcon color={colors.secondaryText} size={16} />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.dropdownText}>All Types</Text>
      <ChevronDownIcon color={colors.secondaryText} size={16} />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.dropdownText}>All Status</Text>
      <ChevronDownIcon color={colors.secondaryText} size={16} />
    </View>
    <TouchableOpacity style={styles.applyFilterButton} onPress={() => {}}>
      <FilterIcon color={colors.whiteText} size={16} />
      <Text style={styles.applyFilterText}>Apply Filters</Text>
    </TouchableOpacity>
  </View>
);

// --- Calendar Grid ---
const CalendarGrid = () => {
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const { width } = Dimensions.get('window');
  const cellWidth = width / 7 - 1; // Adjust for border

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        {days.map((day, index) => (
          <Text key={index} style={[styles.calendarHeaderText, { width: cellWidth }]}>{day}</Text>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {Array(35).fill().map((_, index) => (
          <View key={index} style={[styles.calendarCell, { width: cellWidth, height: cellWidth }]}>
            <Text style={styles.calendarDay}>{index < 31 ? index + 1 : ''}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// --- Legend Section ---
const LegendSection = () => {
  const [todayChecked, setTodayChecked] = useState(true);
  const [hasLeavesChecked, setHasLeavesChecked] = useState(true);
  return (
    <View style={styles.legendContainer}>
      <View style={styles.legendHeader}>
        <InfoIcon color={colors.accentBlue} size={20} />
        <Text style={styles.legendTitle}>Legend</Text>
      </View>
      <View style={styles.legendContent}>
        <View style={styles.legendItem}>
          <View style={[styles.legendSquare, { backgroundColor: '#E0F2F7' }]} />
          <Text style={styles.legendText}>Half Day</Text>
        </View>
        <View style={styles.legendItem}>
          <TouchableOpacity
            style={[styles.checkbox, todayChecked && { backgroundColor: colors.accentBlue }]}
            onPress={() => setTodayChecked(!todayChecked)}
          >
            {todayChecked && <G><Path d="M10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={colors.whiteText} /></G>}
          </TouchableOpacity>
          <Text style={styles.legendText}>Today</Text>
        </View>
        <View style={styles.legendItem}>
          <TouchableOpacity
            style={[styles.checkbox, hasLeavesChecked && { backgroundColor: colors.accentGreen }]}
            onPress={() => setHasLeavesChecked(!hasLeavesChecked)}
          >
            {hasLeavesChecked && <G><Path d="M10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={colors.whiteText} /></G>}
          </TouchableOpacity>
          <Text style={styles.legendText}>Has Leaves</Text>
        </View>
      </View>
    </View>
  );
};

// --- LeaveCalendarScreen Component ---
const LeaveCalendarScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Banner />
        <KeyLeaveMetrics />
        <CalendarNav />
        <FilterBar />
        <CalendarGrid />
        <LegendSection />
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
    width: '100%',
    flexShrink: 1,
  },
  iconWrapper: {
    marginRight: 16,
  },
  bannerText: {
    flex: 1,
    marginRight: 16,
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
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.statsBg,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    minWidth: 80,
    flexShrink: 0,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  statIcon: {
    marginVertical: 4,
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
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  metricCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    width: '48%',
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
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  navButton: {
    padding: 8,
  },
  navMonth: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.titleText,
    marginHorizontal: 16,
    fontFamily: typography.fontFamily,
  },
  toggleGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
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
    flex: 1,
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  applyFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentBlue,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  applyFilterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  calendarContainer: {
    marginTop: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  calendarHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
  },
  calendarCell: {
    width: '14.28%',
    height: 60,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDay: {
    fontSize: 14,
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  legendContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.titleText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  legendContent: {
    flexDirection: 'column',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendSquare: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: colors.accentBlue,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: colors.whiteText,
  },
  legendText: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
});

export default LeaveCalendarScreen;
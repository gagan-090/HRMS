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
import Svg, { Path, Circle } from 'react-native-svg';

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
  linkBlue: '#007BFF',
  greenAccent: '#00B894',
  redAccent: '#DC3545',
  yellowAccent: '#FFC107',
  whiteText: '#FFFFFF',
  secondaryText: '#6B7280',
  inputBorder: '#E5E7EB',
  buttonBorder: '#E5E7EB',
  statCardBg: '#E0F2F7',
  statPendingBg: '#FFF8E1',
  statInterviewBg: '#E6F7ED',
  statHiredBg: '#FDE7E7',
  todayBg: '#E0F2F7',
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

const ChevronRightIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 5L16 12L9 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlusIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4ZM16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FilterIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 4H21M4 4H20L16 10H8L4 16H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const RefreshCwIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M23 4L18.5 9M23 4V9M23 4H18M1 20L5.5 15M1 20V15M1 20H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3.51 9C3.51 5.35786 6.36786 2.5 10.01 2.5C12.9871 2.5 15.521 4.524 16.09 7.5M20.49 15C20.49 18.6421 17.6321 21.5 13.99 21.5C11.0129 21.5 8.47899 19.476 7.90999 16.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarCheckIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4ZM16 2V6M8 2V6M3 10H21M9 15L11 17L15 13M9 17H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckCircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 12L11 14L15 10M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarXIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4ZM16 2V6M8 2V6M3 10H21M9 15L11 17L15 13M15 15L13 17L9 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const Breadcrumbs = () => {
  return (
    <View style={styles.breadcrumbsContainer}>
      <Text style={styles.breadcrumbText}>Home</Text>
      <ChevronRightIcon color={colors.secondaryText} size={12} style={styles.breadcrumbIcon} />
      <Text style={styles.breadcrumbText}>Recruitment</Text>
      <ChevronRightIcon color={colors.secondaryText} size={12} style={styles.breadcrumbIcon} />
      <Text style={styles.breadcrumbText}>Interviews</Text>
    </View>
  );
};

// --- Title Section Component ---
const TitleSection = () => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.titleText}>Interviews</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.scheduleButton}>
          <PlusIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
          <Text style={styles.scheduleButtonText}>Schedule Interview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.calendarButton}>
          <CalendarIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.calendarButtonText}>Calendar View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.todayButton}>
          <ClockIcon color={colors.linkBlue} size={16} style={styles.buttonIcon} />
          <Text style={styles.todayButtonText}>Today's Interviews</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Filters Component ---
const Filters = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('All Status');
  const [interviewType, setInterviewType] = useState('All Types');
  const [interviewer, setInterviewer] = useState('All Interviewers');
  const [dateRange, setDateRange] = useState('All Time');

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.filterHeader} onPress={() => setIsExpanded(!isExpanded)}>
        <FilterIcon color={colors.linkBlue} size={20} />
        <Text style={styles.filterHeaderText}>Filters</Text>
        <ChevronDownIcon color={colors.secondaryText} size={16} style={[styles.chevron, { transform: [{ rotate: isExpanded ? '0deg' : '-90deg' }] }]} />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.filterContent}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search interviews..."
            placeholderTextColor={colors.secondaryText}
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{status}</Text>
              <ChevronDownIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{interviewType}</Text>
              <ChevronDownIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{interviewer}</Text>
              <ChevronDownIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{dateRange}</Text>
              <ChevronDownIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton}>
              <SearchIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton}>
              <RefreshCwIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// --- Stat Card Component ---
const StatCard = ({ icon, value, label, bgColor, iconColor }) => {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: bgColor }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

// --- No Interviews Component ---
const NoInterviews = () => {
  return (
    <View style={styles.noInterviewsContainer}>
      <CalendarXIcon color={colors.secondaryText} size={40} />
      <Text style={styles.noInterviewsText}>No interviews scheduled</Text>
      <Text style={styles.noInterviewsSubtext}>Interviews will appear here when you schedule them.</Text>
      <TouchableOpacity style={styles.scheduleFirstButton}>
        <PlusIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
        <Text style={styles.scheduleFirstButtonText}>Schedule First Interview</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- InterviewsScreen Component ---
const InterviewsScreen = ({ navigation }) => {
  console.log('InterviewsScreen rendering at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Breadcrumbs />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TitleSection />
        <Filters />
        <View style={styles.statsRow}>
          <StatCard
            icon={<CalendarIcon color={colors.linkBlue} size={24} />}
            value="0"
            label="TOTAL INTERVIEWS"
            bgColor={colors.statCardBg}
            iconColor={colors.linkBlue}
          />
          <StatCard
            icon={<ClockIcon color={colors.yellowAccent} size={24} />}
            value="0"
            label="TODAY'S INTERVIEWS"
            bgColor={colors.statPendingBg}
            iconColor={colors.yellowAccent}
          />
          <StatCard
            icon={<CalendarCheckIcon color={colors.greenAccent} size={24} />}
            value="0"
            label="THIS WEEK"
            bgColor={colors.statInterviewBg}
            iconColor={colors.greenAccent}
          />
          <StatCard
            icon={<CheckCircleIcon color={colors.redAccent} size={24} />}
            value="0"
            label="COMPLETED"
            bgColor={colors.statHiredBg}
            iconColor={colors.redAccent}
          />
        </View>
        <View style={styles.interviewsSection}>
          <Text style={styles.interviewsCount}>Interviews (0)</Text>
          <NoInterviews />
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
    fontSize: 14,
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  breadcrumbsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  breadcrumbText: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  breadcrumbIcon: {
    marginHorizontal: 4,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  todayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.todayBg,
    borderWidth: 1,
    borderColor: colors.linkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  scheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  calendarButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  todayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.linkBlue,
    fontFamily: typography.fontFamily,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginTop: 32,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.userNameText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  chevron: {
    marginLeft: 'auto',
  },
  filterContent: {
    marginTop: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  dropdown: {
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
    fontSize: 14,
    color: colors.secondaryText,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    padding: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  statLabel: {
    fontSize: 13,
    color: colors.secondaryText,
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily,
  },
  interviewsSection: {
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  interviewsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  noInterviewsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noInterviewsText: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    marginTop: 16,
  },
  noInterviewsSubtext: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    marginTop: 8,
    textAlign: 'center',
  },
  scheduleFirstButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
  },
  scheduleFirstButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
});

export default InterviewsScreen;
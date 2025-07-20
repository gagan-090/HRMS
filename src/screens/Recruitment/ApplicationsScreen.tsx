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

const DownloadIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MoreHorizontalIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 12H4.01M12 12H12.01M20 12H20.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2L20 8M9 15H15M9 12H15M9 9H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    <Path d="M9 12L11 14L15 10M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ListIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 6H21M9 12H21M9 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GridIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM13 13H21V21H13V13Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BriefcaseIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 6H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V6ZM21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9ZM21 9H3M15 13H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// --- Header Component ---
const Header = ({ navigation }) => {
  const onMenuPress = () => {
    if (Platform.OS === 'android' && navigation) {
      navigation.toggleDrawer();
    }
  };

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

// --- Breadcrumbs Component ---
const Breadcrumbs = () => {
  return (
    <View style={styles.breadcrumbsContainer}>
      <Text style={styles.breadcrumbText}>Home</Text>
      <ChevronRightIcon color={colors.secondaryText} size={12} style={styles.breadcrumbIcon} />
      <Text style={styles.breadcrumbText}>Recruitment</Text>
      <ChevronRightIcon color={colors.secondaryText} size={12} style={styles.breadcrumbIcon} />
      <Text style={styles.breadcrumbText}>Applications</Text>
    </View>
  );
};

// --- Title Section Component ---
const TitleSection = () => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.titleText}>Job Applications</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.newAppButton}>
          <PlusIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
          <Text style={styles.newAppButtonText}>New Application</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportButton}>
          <DownloadIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.exportButtonText}>Export</Text>
          <ChevronDownIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bulkButton}>
          <MoreHorizontalIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.bulkButtonText}>Bulk Actions</Text>
          <ChevronDownIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
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
  const [jobPosition, setJobPosition] = useState('All Jobs');
  const [source, setSource] = useState('All Sources');
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
            placeholder="Search applications..."
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
              <Text style={styles.dropdownText}>{jobPosition}</Text>
              <ChevronDownIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{source}</Text>
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

// --- Applications Table Component ---
const ApplicationsTable = () => {
  const applications = [
    { id: 'APP2025007', candidate: 'Meera Nair', email: 'meera.nair@email.com', job: 'Admin Manager - Administration', dept: 'Administration', date: 'Jun 30, 2025', time: '03:44', status: 'Unassigned', source: 'LinkedIn', assigned: 'Unassigned' },
    { id: 'APP2025006', candidate: 'Sanjay Reddy', email: 'sanjay.reddy@email.com', job: 'HR Manager - Human Resources', dept: 'Human Resources', date: 'Jun 30, 2025', time: '03:44', status: 'Unassigned', source: 'Employee Referral', assigned: 'Unassigned' },
    { id: 'APP2025005', candidate: 'Pooja Agarwal', email: 'pooja.agarwal@email.com', job: 'Finance Manager - Finance', dept: 'Finance', date: 'Jun 30, 2025', time: '03:44', status: 'Unassigned', source: 'Job Portal', assigned: 'Unassigned' },
    { id: 'APP2025004', candidate: 'Amit Jain', email: 'amit.jain@email.com', job: 'Operations Director - Operations', dept: 'Administration', date: 'Jun 30, 2025', time: '03:44', status: 'Unassigned', source: 'Job Portal', assigned: 'Unassigned' },
    { id: 'APP2025003', candidate: 'Vikash Kumar', email: 'vikash.kumar@email.com', job: 'Admin Manager - Administration', dept: 'Administration', date: 'Jun 30, 2025', time: '03:44', status: 'Unassigned', source: 'Job Portal', assigned: 'Unassigned' },
    { id: 'APP2025002', candidate: 'Priya Gupta', email: 'priya.gupta@email.com', job: 'Admin Manager - Administration', dept: 'Administration', date: 'Jun 30, 2025', time: '03:44', status: 'Unassigned', source: 'Employee Referral', assigned: 'Unassigned' },
  ];

  const [selectAll, setSelectAll] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.tableHeaderRow}>
        <Text style={styles.tableHeaderText}>Applications (7)</Text>
        <View style={styles.tableControls}>
          <TouchableOpacity style={styles.selectAll}>
            <Svg width={16} height={16} viewBox="0 0 16 16">
              <Path d="M14 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1Z" stroke={colors.linkBlue} strokeWidth="2" fill={selectAll ? colors.linkBlue : 'transparent'} />
              {selectAll && <Path d="M4 8L7 11L12 6" stroke={colors.whiteText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
            </Svg>
            <Text style={styles.selectAllText}>Select All</Text>
          </TouchableOpacity>
          <View style={styles.viewToggleGroup}>
            <TouchableOpacity style={[styles.viewToggle, styles.viewToggleActive]}>
              <ListIcon color={colors.whiteText} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewToggle}>
              <GridIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView horizontal>
        <View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { width: 40 }]}></Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Application #</Text>
            <Text style={[styles.tableHeader, { width: 200 }]}>Candidate</Text>
            <Text style={[styles.tableHeader, { width: 250 }]}>Job Position</Text>
            <Text style={[styles.tableHeader, { width: 150 }]}>Applied Date</Text>
            <Text style={[styles.tableHeader, { width: 100 }]}>Status</Text>
            <Text style={[styles.tableHeader, { width: 100 }]}>Source</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Assigned To</Text>
            <Text style={[styles.tableHeader, { width: 80 }]}>Actions</Text>
          </View>
          {applications.map((app, index) => (
            <View key={index} style={styles.tableRow}>
              <TouchableOpacity style={[styles.checkbox, { width: 40 }]}>
                <Svg width={16} height={16} viewBox="0 0 16 16">
                  <Path d="M14 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1Z" stroke={colors.linkBlue} strokeWidth="2" fill="transparent" />
                </Svg>
              </TouchableOpacity>
              <Text style={[styles.tableCell, { width: 120, color: colors.linkBlue }]}>{app.id}</Text>
              <View style={[styles.candidateCell, { width: 200 }]}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{app.candidate.split(' ')[0][0] + app.candidate.split(' ')[1][0]}</Text>
                </View>
                <View>
                  <Text style={styles.candidateName}>{app.candidate}</Text>
                  <Text style={styles.candidateEmail}>{app.email}</Text>
                </View>
              </View>
              <View style={[styles.jobCell, { width: 250 }]}>
                <Text style={[styles.jobPosition, { color: colors.linkBlue }]}>{app.job}</Text>
                <Text style={styles.jobDept}>{app.dept}</Text>
              </View>
              <Text style={[styles.tableCell, { width: 150 }]}>
                {app.date}, {app.time}
              </Text>
              <Text style={[styles.tableCell, { width: 100 }]}>{app.status}</Text>
              <Text style={[styles.tableCell, { width: 100 }]}>{app.source}</Text>
              <Text style={[styles.tableCell, { width: 120 }]}>{app.assigned}</Text>
              <TouchableOpacity style={[styles.actionsButton, { width: 80 }]}>
                <MoreHorizontalIcon color={colors.secondaryText} size={16} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// --- ApplicationsScreen Component ---
const ApplicationsScreen = ({ navigation }) => {
  console.log('ApplicationsScreen rendering at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Breadcrumbs />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TitleSection />
        <Filters />
        <View style={styles.statsRow}>
          <StatCard
            icon={<FileTextIcon color={colors.linkBlue} size={24} />}
            value="36"
            label="TOTAL APPLICATIONS"
            bgColor={colors.statCardBg}
            iconColor={colors.linkBlue}
          />
          <StatCard
            icon={<ClockIcon color={colors.yellowAccent} size={24} />}
            value="12"
            label="PENDING REVIEW"
            bgColor={colors.statPendingBg}
            iconColor={colors.yellowAccent}
          />
          <StatCard
            icon={<UsersIcon color={colors.greenAccent} size={24} />}
            value="0"
            label="IN INTERVIEW"
            bgColor={colors.statInterviewBg}
            iconColor={colors.greenAccent}
          />
          <StatCard
            icon={<CheckCircleIcon color={colors.redAccent} size={24} />}
            value="0"
            label="HIRED THIS MONTH"
            bgColor={colors.statHiredBg}
            iconColor={colors.redAccent}
          />
        </View>
        <ApplicationsTable />
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
  newAppButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  exportButton: {
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
  bulkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  newAppButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  bulkButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
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
    marginBottom:16,
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
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  tableControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAll: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  selectAllText: {
    fontSize: 14,
    color: colors.secondaryText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  viewToggleGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
  },
  viewToggle: {
    padding: 8,
    borderRadius: 8,
  },
  viewToggleActive: {
    backgroundColor: colors.linkBlue,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryText,
    textTransform: 'uppercase',
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  checkbox: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 14,
    color: colors.userNameText,
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  candidateCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  candidateName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.userNameText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  candidateEmail: {
    fontSize: 12,
    color: colors.secondaryText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  jobCell: {
    flexDirection: 'column',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  jobPosition: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.linkBlue,
    fontFamily: typography.fontFamily,
  },
  jobDept: {
    fontSize: 12,
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  actionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default ApplicationsScreen;
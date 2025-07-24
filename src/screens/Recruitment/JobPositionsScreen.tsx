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
import Svg, { Path, Circle, LinearGradient } from 'react-native-svg';

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
  whiteText: '#FFFFFF',
  secondaryText: '#6B7280',
  inputBorder: '#E5E7EB',
  buttonBorder: '#E5E7EB',
  shadow: '#000',
  statusPillBg: '#E6F7ED',
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

const BriefcaseIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 6H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V6ZM21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9ZM21 9H3M15 13H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlusIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2L20 8M9 15H15M9 12H15M9 9H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const MapPinIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={color} strokeWidth="2" />
    <Path d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z" stroke={color} strokeWidth="2" />
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
      <Text style={styles.breadcrumbText}>Jobs</Text>
    </View>
  );
};

// --- Title Section Component ---
const TitleSection = () => {
  return (
    <View style={styles.titleSection}>
      <View>
        <BriefcaseIcon color={colors.secondaryText} size={32} />
        <Text style={styles.titleText}>Job Positions</Text>
        <Text style={styles.descriptionText}>Manage all job postings and openings</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.postButton}>
          <PlusIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
          <Text style={styles.postButtonText}>Post New Job</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.templatesButton}>
          <FileTextIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.templatesButtonText}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <ChevronDownIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.moreButtonText}>More Actions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Filter and Search Bar Component ---
const FilterSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('All Status');
  const [department, setDepartment] = useState('All Departments');

  return (
    <View style={styles.filterSearchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search job title, code, or department..."
        placeholderTextColor={colors.secondaryText}
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{status}</Text>
        <ChevronDownIcon color={colors.secondaryText} size={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{department}</Text>
        <ChevronDownIcon color={colors.secondaryText} size={16} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <FilterIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.refreshButton}>
        <RefreshCwIcon color={colors.secondaryText} size={16} />
      </TouchableOpacity>
    </View>
  );
};

// --- All Jobs Table Component ---
const AllJobsTable = () => {
  const jobData = [
    { id: 'JOB010', title: 'Admin Executive - Administration', location: 'Mumbai, India', dept: 'Administration', apps: 8, status: 'Active', date: 'Jun 03, 2025', timeAgo: '1 month, 2 weeks ago' },
    { id: 'JOB009', title: 'Finance Manager - Finance', location: 'Mumbai, India', dept: 'Finance', apps: 8, status: 'Active', date: 'Jun 06, 2025', timeAgo: '1 month, 1 week ago' },
    { id: 'JOB008', title: 'Admin Manager - Administration', location: 'Mumbai, India', dept: 'Administration', apps: 2, status: 'Active', date: 'Jun 19, 2025', timeAgo: '4 weeks ago' },
    { id: 'JOB007', title: 'Finance Manager - Finance', location: 'Mumbai, India', dept: 'Finance', apps: 1, status: 'Active', date: 'Jun 04, 2025', timeAgo: '1 month, 4 weeks ago' },
    { id: 'JOB006', title: 'Marketing Director - Marketing', location: 'Mumbai, India', dept: 'Marketing', apps: 9, status: 'Active', date: 'Jun 10, 2025', timeAgo: '1 month, 1 week ago' },
    { id: 'JOB005', title: 'Admin Manager - Administration', location: 'Mumbai, India', dept: 'Administration', apps: 1, status: 'Active', date: 'Jun 08, 2025', timeAgo: '1 month, 1 week ago' },
    { id: 'JOB004', title: 'HR Senior Executive - Human Resources', location: 'Mumbai, India', dept: 'Human Resources', apps: 9, status: 'Active', date: 'Jun 16, 2025', timeAgo: '1 month, 1 week ago' },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.tableHeaderRow}>
        <Text style={styles.tableHeaderText}>All Jobs (10 found)</Text>
        <View style={styles.tableControls}>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>10</Text>
            <ChevronDownIcon color={colors.secondaryText} size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewToggle}>
            <ListIcon color={colors.whiteText} size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewToggle}>
            <GridIcon color={colors.secondaryText} size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView horizontal>
        <View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { width: 40 }]}></Text>
            <Text style={[styles.tableHeader, { width: 200 }]}>Job Details</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Department</Text>
            <Text style={[styles.tableHeader, { width: 100 }]}>Applications</Text>
            <Text style={[styles.tableHeader, { width: 100 }]}>Status</Text>
            <Text style={[styles.tableHeader, { width: 150 }]}>Posted Date</Text>
            <Text style={[styles.tableHeader, { width: 100 }]}>Actions</Text>
          </View>
          {jobData.map((job, index) => (
            <View key={index} style={styles.tableRow}>
              <TouchableOpacity style={[styles.checkbox, { width: 40 }]}>
                <Svg width={16} height={16} viewBox="0 0 16 16">
                  <Path d="M14 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1Z" stroke={colors.linkBlue} strokeWidth="2" fill={job.checked ? colors.linkBlue : 'transparent'} />
                  {job.checked && <Path d="M4 8L7 11L12 6" stroke={colors.whiteText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
                </Svg>
              </TouchableOpacity>
              <View style={[styles.jobDetails, { width: 200 }]}>
                <Text style={styles.jobTitle}>{job.title} ({job.id})</Text>
                <View style={styles.locationRow}>
                  <MapPinIcon color={colors.secondaryText} size={16} />
                  <Text style={styles.locationText}>{job.location}</Text>
                </View>
              </View>
              <Text style={[styles.tableCell, { width: 120, textAlign: 'left' }]}>{job.dept}</Text>
              <View style={[styles.appsCell, { width: 100, justifyContent: 'center' }]}>
                {job.apps > 1 ? (
                  <Text style={styles.appsText}>{job.apps}</Text>
                ) : (
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                )}
                <UsersIcon color={colors.linkBlue} size={14} />
              </View>
              <View style={[styles.statusPill, { width: 100, justifyContent: 'center', borderColor: colors.greenAccent }]}>
                <CheckCircleIcon color={colors.greenAccent} size={14} />
                <Text style={styles.statusText}>Active</Text>
              </View>
              <Text style={[styles.tableCell, { width: 150, textAlign: 'left' }]}>{job.date} ({job.timeAgo})</Text>
              <TouchableOpacity style={[styles.actionsButton, { width: 100, justifyContent: 'center' }]}>
                <ChevronDownIcon color={colors.secondaryText} size={16} />
                <Text style={styles.actionsText}>Actions</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// --- JobPositionsScreen Component ---
const JobPositionsScreen = ({ navigation }) => {
  console.log('JobPositionsScreen rendering at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Breadcrumbs />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TitleSection />
        <FilterSearchBar />
        <AllJobsTable />
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
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.descriptionText,
    marginTop: 4,
    fontFamily: typography.fontFamily,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  templatesButton: {
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
  moreButton: {
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
  postButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  templatesButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  filterSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
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
  },
  dropdownText: {
    fontSize: 14,
    color: colors.secondaryText,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterButtonText: {
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
  viewToggle: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
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
  jobDetails: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: colors.secondaryText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  tableCell: {
    fontSize: 14,
    color: colors.userNameText,
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  appsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  appsText: {
    fontSize: 14,
    color: colors.linkBlue,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
  viewButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.linkBlue,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 12,
    color: colors.linkBlue,
    fontFamily: typography.fontFamily,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: colors.statusPillBg,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.greenAccent,
    marginLeft: 4,
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
  actionsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
});

export default JobPositionsScreen;
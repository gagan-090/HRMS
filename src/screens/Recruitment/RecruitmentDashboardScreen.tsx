import React from 'react';
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
  redAccent: '#DC3545',
  yellowAccent: '#FFC107',
  whiteText: '#FFFFFF',
  secondaryText: '#6B7280',
  tableHeaderText: '#6B7280',
  tableDataText: '#1F2937',
  inputBorder: '#E5E7EB',
  buttonBorder: '#E5E7EB',
  shadow: '#000',
  jobsIconBg: '#E6F7ED',
  appsIconBg: '#FFF8E1',
  interviewsIconBg: '#E0F2F7',
  offersIconBg: '#FDE7E7',
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
    <Path d="M9 6L15 12L9 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BriefcaseIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 6H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V6ZM21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9ZM21 9H3M15 13H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2L20 8M9 15H15M9 12H15M9 9H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4ZM19 4V2M5 4V2M8 6V20M16 6V20M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DollarSignIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2V22M17 5H9.5C8.57174 5 8 5.57174 8 6.5C8 7.42826 8.57174 8 9.5 8H14C14.5523 8 15 8.44772 15 9C15 9.55228 14.5523 10 14 10H9.5C8.57174 10 8 10.5717 8 11.5C8 12.4283 8.57174 13 9.5 13H17V17H9.5C8.57174 17 8 17.5717 8 18.5C8 19.4283 8.57174 20 9.5 20C10.4283 20 11 19.4283 11 18.5V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H11V7H17V5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlusIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BarChartIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 21H21M7 17V3M10 13V3M14 17V3M17 13V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ArrowRightIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 5L16 12L9 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const EyeIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EditIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13M18.4142 10L22 5.41421L18.5858 2L15 5.58579L18.4142 10ZM18.4142 10L13 14.4142V17H15.5858L21 11.5858L18.4142 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          placeholder="Search jobs, candidates..."
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
      <Text style={styles.breadcrumbText}>Dashboard</Text>
    </View>
  );
};

// --- Title Section Component ---
const TitleSection = () => {
  return (
    <View style={styles.titleSection}>
      <View>
        <Text style={styles.titleText}>Recruitment Dashboard</Text>
        <Text style={styles.descriptionText}>Manage your hiring process efficiently</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.postButton}>
          <PlusIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
          <Text style={styles.postButtonText}>Post new Job</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pipelineButton}>
          <BarChartIcon color={colors.linkBlue} size={16} style={styles.buttonIcon} />
          <Text style={styles.pipelineButtonText}>Pipeline View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <ChevronDownIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.moreButtonText}>More Actions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Key Metrics Card Component ---
const KeyMetricsCard = ({ title, value, status, icon, iconBg, iconColor }) => {
  return (
    <View style={styles.metricsCard}>
      <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
        {icon({ color: iconColor, size: 24 })}
      </View>
      <Text style={styles.metricsValue}>{value}</Text>
      <Text style={styles.metricsLabel}>{title}</Text>
      <Text style={styles.metricsStatus}>{status}</Text>
    </View>
  );
};

// --- Recent Job Postings Component ---
const RecentJobPostings = () => {
  const jobData = [
    { title: 'Admin Executive - Administration', id: 'JOB010', dept: 'Administration', apps: 9, status: 'Active' },
    { title: 'Admin Manager - Finance', id: 'JOB009', dept: 'Finance', apps: 9, status: 'Active' },
    { title: 'Admin Manager - Administration', id: 'JOB008', dept: 'Administration', apps: 7, status: 'Active' },
    { title: 'Finance Manager - Finance', id: 'JOB007', dept: 'Finance', apps: 9, status: 'Active' },
    { title: 'Marketing Director - Marketing', id: 'JOB006', dept: 'Marketing', apps: 9, status: 'Active' },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Job Postings</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <ArrowRightIcon color={colors.linkBlue} size={16} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        <View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Job Title</Text>
            <Text style={styles.tableHeader}>Department</Text>
            <Text style={styles.tableHeader}>Applications</Text>
            <Text style={styles.tableHeader}>Status</Text>
            <Text style={styles.tableHeader}>Actions</Text>
          </View>
          {jobData.map((job, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{job.title} - {job.id}</Text>
              <Text style={styles.tableCell}>{job.dept}</Text>
              <View style={styles.appsCell}>
                <UsersIcon color={colors.linkBlue} size={14} />
                <Text style={styles.appsText}>{job.apps}</Text>
              </View>
              <View style={[styles.statusPill, { backgroundColor: job.status === 'Active' ? colors.jobsIconBg : '#FFF' }]}>
                <CheckCircleIcon color={colors.greenAccent} size={14} />
                <Text style={styles.statusText}>{job.status}</Text>
              </View>
              <View style={styles.actionsCell}>
                <TouchableOpacity style={styles.actionButton}>
                  <EyeIcon color={colors.greenAccent} size={14} />
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <EditIcon color={colors.greenAccent} size={14} />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// --- Recent Applications Component ---
const RecentApplications = () => {
  const appData = [
    { name: 'Meera Nair', role: 'Admin Manager - Administration', time: '2 weeks, 3 days ago', status: 'Under Screening' },
    { name: 'Sanjay Reddy', role: 'HR Manager - Human Resources', time: '2 weeks, 3 days ago', status: 'Selected' },
    { name: 'Pooja Agarwal', role: 'Finance Manager - Finance', time: '2 weeks, 3 days ago', status: 'Interview Scheduled' },
    { name: 'Amit Jain', role: 'Operations Director - Operations', time: '2 weeks, 3 days ago', status: 'Rejected' },
    { name: 'Vikash Kumar', role: 'Admin Manager - Administration', time: '2 weeks, 3 days ago', status: 'Submitted' },
    { name: 'Priya Gupta', role: 'Admin Manager - Administration', time: '2 weeks, 3 days ago', status: 'Selected' },
    { name: 'Arjun Sharma', role: 'Operations Director - Operations', time: '2 weeks, 3 days ago', status: 'Submitted' },
  ];

  const statusColors = {
    'Under Screening': { bg: '#E0F2F7', text: '#007BFF' },
    'Selected': { bg: '#FFF8E1', text: '#FFC107' },
    'Rejected': { bg: '#FDE7E7', text: '#DC3545' },
    'Interview Scheduled': { bg: '#E6F7ED', text: '#00B894' },
    'Submitted': { bg: '#E0F2F7', text: '#007BFF' },
  };

  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Applications</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <ArrowRightIcon color={colors.linkBlue} size={16} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
      {appData.map((app, index) => (
        <View key={index} style={styles.appItem}>
          <Svg width={8} height={8} viewBox="0 0 8 8" style={styles.bullet}>
            <Circle cx="4" cy="4" r="4" fill={colors.linkBlue} />
          </Svg>
          <View style={styles.appDetails}>
            <Text style={styles.appName}>{app.name}</Text>
            <Text style={styles.appInfo}>{app.role}, {app.time}</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: statusColors[app.status].bg, borderColor: statusColors[app.status].text }]}>
            <Text style={[styles.statusText, { color: statusColors[app.status].text }]}>{app.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// --- RecruitmentDashboardScreen Component ---
const RecruitmentDashboardScreen = ({ navigation }) => {
  console.log('RecruitmentDashboardScreen rendering at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Breadcrumbs />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TitleSection />
        <View style={styles.metricsRow}>
          <KeyMetricsCard title="TOTAL JOBS" value="10" status="Active: 10" icon={BriefcaseIcon} iconBg={colors.jobsIconBg} iconColor={colors.greenAccent} />
          <KeyMetricsCard title="APPLICATIONS" value="7" status="Pending: 2" icon={FileTextIcon} iconBg={colors.appsIconBg} iconColor={colors.yellowAccent} />
          <KeyMetricsCard title="TODAY'S INTERVIEWS" value="0" status="Scheduled" icon={CalendarIcon} iconBg={colors.interviewsIconBg} iconColor={colors.linkBlue} />
          <KeyMetricsCard title="OFFERS PENDING" value="5" status="Awaiting Response" icon={DollarSignIcon} iconBg={colors.offersIconBg} iconColor={colors.redAccent} />
        </View>
        <RecentJobPostings />
        <RecentApplications />
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
  pipelineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.linkBlue,
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
    borderColor: colors.inputBorder,
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
  pipelineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.linkBlue,
    fontFamily: typography.fontFamily,
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  metricsCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.tableDataText,
    fontFamily: typography.fontFamily,
  },
  metricsLabel: {
    fontSize: 13,
    color: colors.secondaryText,
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily,
  },
  metricsStatus: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 4,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.linkBlue,
    marginRight: 4,
    fontFamily: typography.fontFamily,
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
    color: colors.tableHeaderText,
    textTransform: 'uppercase',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  tableCell: {
    fontSize: 14,
    color: colors.tableDataText,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  appsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appsText: {
    fontSize: 14,
    color: colors.linkBlue,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  actionsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.jobsIconBg,
    borderWidth: 1,
    borderColor: colors.greenAccent,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.greenAccent,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  bullet: {
    marginRight: 8,
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.tableDataText,
    fontFamily: typography.fontFamily,
  },
  appInfo: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
});

export default RecruitmentDashboardScreen;
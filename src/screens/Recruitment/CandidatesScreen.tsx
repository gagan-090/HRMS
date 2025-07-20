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
  appsPillBg: '#E6F7ED',
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

const UserPlusIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 11C9.79086 11 8 12.7909 8 15M15 6H18M12 9V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UploadIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 5M12 5L17 10M12 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DownloadIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const MoreVerticalIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM12 8.5C12.5523 8.5 13 8.05228 13 7.5C13 6.94772 12.5523 6.5 12 6.5C11.4477 6.5 11 6.94772 11 7.5C11 8.05228 11.4477 8.5 12 8.5ZM12 17.5C12.5523 17.5 13 17.0523 13 16.5C13 15.9477 12.5523 15.5 12 15.5C11.4477 15.5 11 15.9477 11 16.5C11 17.0523 11.4477 17.5 12 17.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2L20 8M9 15H15M9 12H15M9 9H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CodeIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7 8L3 12L7 16M17 8L21 12L17 16M14 4L10 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <Text style={styles.breadcrumbText}>Candidates</Text>
    </View>
  );
};

// --- Title Section Component ---
const TitleSection = () => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.titleText}>Candidates</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.addButton}>
          <UserPlusIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
          <Text style={styles.addButtonText}>Add Candidate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bulkButton}>
          <UploadIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.bulkButtonText}>Bulk Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exportButton}>
          <DownloadIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.exportButtonText}>Export</Text>
          <ChevronDownIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Search & Filters Component ---
const SearchFilters = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('All Status');
  const [experience, setExperience] = useState('All Experience');
  const [skills, setSkills] = useState('Skills...');

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.filterHeader} onPress={() => setIsExpanded(!isExpanded)}>
        <SearchIcon color={colors.linkBlue} size={20} />
        <Text style={styles.filterHeaderText}>Search & Filters</Text>
        <ChevronDownIcon color={colors.secondaryText} size={16} style={[styles.chevron, { transform: [{ rotate: isExpanded ? '0deg' : '-90deg' }] }]} />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.filterContent}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search candidates..."
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
              <Text style={styles.dropdownText}>{experience}</Text>
              <ChevronDownIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{skills}</Text>
              <ChevronDownIcon color={colors.secondaryText} size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton}>
              <SearchIcon color={colors.whiteText} size={16} style={styles.buttonIcon} />
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// --- Candidate Card Component ---
const CandidateCard = ({ initials, name, email, experience, applications, skills, added }) => {
  return (
    <View style={styles.candidateCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <MoreVerticalIcon color={colors.secondaryText} size={16} style={styles.menuIcon} />
      </View>
      <Text style={styles.candidateName}>{name}</Text>
      <Text style={styles.candidateEmail}>{email}</Text>
      <View style={styles.experienceRow}>
        <ClockIcon color={colors.secondaryText} size={14} />
        <Text style={styles.experienceText}>Experience</Text>
        <Text style={styles.experienceYears}>{experience} Years</Text>
      </View>
      <View style={styles.appsRow}>
        <FileTextIcon color={colors.greenAccent} size={14} />
        <Text style={styles.appsText}>Applications</Text>
        <View style={styles.appsPill}>
          <Text style={styles.appsCount}>{applications}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.skillsRow}>
        <CodeIcon color={colors.secondaryText} size={14} />
        <Text style={styles.skillsText}>Key Skills</Text>
        <View style={styles.skillsTags}>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.skillTag}>{skill}</Text>
          ))}
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.addedRow}>
        <Text style={styles.addedText}>Added {added}</Text>
      </View>
    </View>
  );
};

// --- Candidates Section Component ---
const CandidatesSection = () => {
  const candidates = [
    { initials: 'MN', name: 'Meera Nair', email: 'meera.nair@email.com', experience: 3.7, applications: 1, skills: ['Java', 'Python', 'AWS'], added: '2 weeks, 3 days ago' },
    { initials: 'SR', name: 'Sanjay Reddy', email: 'sanjay.reddy@email.com', experience: 6.3, applications: 1, skills: ['Java', 'SQL', 'React'], added: '2 weeks, 3 days ago' },
    { initials: 'PA', name: 'Pooja Agarwal', email: 'pooja.agarwal@email.com', experience: 1.8, applications: 1, skills: ['SQL', 'Java', 'Python'], added: '2 weeks, 3 days ago' },
    { initials: 'AJ', name: 'Amit Jain', email: 'amit.jain@email.com', experience: 8.2, applications: 1, skills: ['Python', 'Java', 'React'], added: '2 weeks, 3 days ago' },
    { initials: 'KP', name: 'Kavya Patel', email: 'kavya.patel@email.com', experience: 4.1, applications: 0, skills: ['Python', 'SQL'], added: '2 weeks, 3 days ago' },
    { initials: 'RS', name: 'Rahul Singh', email: 'rahul.singh@email.com', experience: 10.0, applications: 0, skills: ['AWS', 'SQL', 'React'], added: '2 weeks, 3 days ago' },
  ];

  const [viewMode, setViewMode] = useState('grid');

  return (
    <View style={styles.candidatesSection}>
      <View style={styles.candidatesHeader}>
        <Text style={styles.candidatesCount}>Candidates (10)</Text>
        <View style={styles.viewToggleGroup}>
          <TouchableOpacity style={[styles.viewToggle, viewMode === 'table' && styles.viewToggleActive]} onPress={() => setViewMode('table')}>
            <ListIcon color={viewMode === 'table' ? colors.whiteText : colors.secondaryText} size={16} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.viewToggle, viewMode === 'grid' && styles.viewToggleActive]} onPress={() => setViewMode('grid')}>
            <GridIcon color={viewMode === 'grid' ? colors.whiteText : colors.secondaryText} size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView horizontal={false}>
        <View style={styles.candidateGrid}>
          {candidates.map((candidate, index) => (
            <CandidateCard
              key={index}
              initials={candidate.initials}
              name={candidate.name}
              email={candidate.email}
              experience={candidate.experience}
              applications={candidate.applications}
              skills={candidate.skills}
              added={candidate.added}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// --- CandidatesScreen Component ---
const CandidatesScreen = ({ navigation }) => {
  console.log('CandidatesScreen rendering at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Breadcrumbs />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TitleSection />
        <SearchFilters />
        <CandidatesSection />
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linkBlue,
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
  },
  buttonIcon: {
    marginRight: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    fontFamily: typography.fontFamily,
  },
  bulkButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  exportButtonText: {
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
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
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
  candidatesSection: {
    marginTop: 32,
  },
  candidatesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  candidatesCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.userNameText,
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
  candidateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  candidateCard: {
    width: '32%',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  menuIcon: {
    padding: 4,
  },
  candidateName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.linkBlue,
    marginBottom: 4,
    fontFamily: typography.fontFamily,
  },
  candidateEmail: {
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: 8,
    fontFamily: typography.fontFamily,
  },
  experienceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  experienceText: {
    fontSize: 12,
    color: colors.secondaryText,
    marginLeft: 4,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
  experienceYears: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  appsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  appsText: {
    fontSize: 12,
    color: colors.secondaryText,
    marginLeft: 4,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
  appsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: colors.appsPillBg,
    borderWidth: 1,
    borderColor: colors.greenAccent,
  },
  appsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.greenAccent,
    fontFamily: typography.fontFamily,
  },
  divider: {
    height: 1,
    backgroundColor: colors.inputBorder,
    marginVertical: 8,
  },
  skillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillsText: {
    fontSize: 12,
    color: colors.secondaryText,
    marginLeft: 4,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
  skillsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginTop: 4,
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  addedRow: {
    marginTop: 8,
  },
  addedText: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
});

export default CandidatesScreen;
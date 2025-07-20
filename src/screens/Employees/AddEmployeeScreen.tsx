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
import Svg, { Path, ColorProps, Defs, G, Rect, ClipPath, Stop } from 'react-native-svg';
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
  bannerGradientStart: '#00B894',
  bannerGradientEnd: '#00A382',
  bannerText: '#FFFFFF',
  activeTabText: '#007BFF',
  inactiveTabText: '#6B7280',
  tabBorder: '#E5E7EB',
  inputBg: '#FFFFFF',
  inputText: '#1F2937',
  inputBorder: '#E5E7EB',
  inputPlaceholder: '#6B7280',
  labelText: '#6B7280',
  cancelButtonBg: '#FFFFFF',
  cancelButtonText: '#6B7280',
  cancelButtonBorder: '#E5E7EB',
  prevButtonBg: '#FFFFFF',
  prevButtonText: '#6B7280',
  prevButtonBorder: '#E5E7EB',
  nextCreateButtonBg: '#007BFF',
  nextCreateButtonText: '#FFFFFF',
  addButtonBg: '#007BFF',
  addButtonText: '#FFFFFF',
  uploadBorder: '#D1D5DB',
  errorRed: '#DC3545',
  linkBlue: '#007BFF',
  greenAccent: '#00B894',
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

const UserPlusIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 4.5C13.6569 4.5 15 5.84315 15 7.5C15 9.15685 13.6569 10.5 12 10.5C10.3431 10.5 9 9.15685 9 7.5C9 5.84315 10.3431 4.5 12 4.5ZM12 4.5C13.6569 4.5 15 3.15685 15 1.5C15 0.671573 14.3284 0 13.5 0H10.5C9.67157 0 9 0.671573 9 1.5C9 3.15685 10.3431 4.5 12 4.5ZM18 15C19.6569 15 21 14.6569 21 14C21 12.3431 19.6569 12 18 12C16.3431 12 15 12.3431 15 14C15 14.6569 16.3431 15 18 15ZM6 12C4.34315 12 3 12.3431 3 14C3 14.6569 4.34315 15 6 15C7.65685 15 9 14.6569 9 14C9 12.3431 7.65685 12 6 12ZM6 12C7.65685 12 9 10.6569 9 9C9 7.34315 7.65685 6 6 6C4.34315 6 3 7.34315 3 9C3 10.6569 4.34315 12 6 12ZM18 22C19.6569 22 21 21.6569 21 21C21 19.3431 19.6569 19 18 19C16.3431 19 15 19.3431 15 21C15 21.6569 16.3431 22 18 22ZM6 19C7.65685 19 9 18.6569 9 18C9 16.3431 7.65685 16 6 16C4.34315 16 3 16.3431 3 18C3 18.6569 4.34315 19 6 19Z" fill={color} />
  </Svg>
);

const CheckCircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={color} />
  </Svg>
);

const CircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill={color} fillOpacity={0.5} />
  </Svg>
);

const InfoIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill={color} />
  </Svg>
);

const UserIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BriefcaseIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16ZM16 12H8M16 8V10M8 8V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PhoneIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M16 8C17.0609 8 18.0783 8.42143 18.8284 9.17157C19.5786 9.92172 20 10.9391 20 12V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V12C4 10.9391 4.42143 9.92172 5.17157 9.17157C5.92172 8.42143 6.93913 8 8 8H16ZM16 8V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2H8C6.93913 2 5.92172 2.42143 5.17157 3.17157C4.42143 3.92172 4 4.93913 4 6V8M15 12H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MapPinIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill={color} />
  </Svg>
);

const UsersIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 11C10.3431 11 9 12.3431 9 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CameraIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const AwardIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L15.09 8.26L22 9.27L17.45 14.09L18.32 21L12 17.77L5.68 21L6.55 14.09L2 9.27L8.91 8.26L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CodeIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7 8L3 12L7 16M17 16L21 12L17 8M14 4L10 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4ZM16 2V8M8 2V8M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronLeftIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronRightIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

// --- Banner Component ---
const Banner = () => {
  return (
    <LinearGradient
      colors={[colors.bannerGradientStart, colors.bannerGradientEnd]}
      style={styles.bannerContainer}
    >
      <View style={styles.bannerContent}>
        <UserPlusIcon color={colors.bannerText} size={32} />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Add New Employee</Text>
          <Text style={styles.bannerSubtext}>Create a comprehensive employee profile with all necessary details.</Text>
        </View>
        <View style={styles.progressContainer}>
          <CheckCircleIcon color={colors.bannerText} size={16} />
          <Text style={styles.progressText}>Basic Info</Text>
          <CircleIcon color={colors.bannerText} size={16} />
          <Text style={[styles.progressText, { opacity: 0.5 }]}>Personal</Text>
          <CircleIcon color={colors.bannerText} size={16} />
          <Text style={[styles.progressText, { opacity: 0.5 }]}>Additional</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

// --- Tab Component ---
const Tab = ({ title, icon, isActive, onPress }) => (
  <TouchableOpacity style={[styles.tab, isActive && styles.activeTab]} onPress={onPress}>
    {icon}
    <Text style={[styles.tabText, isActive ? styles.activeTabText : styles.inactiveTabText]}>{title}</Text>
    {isActive && <View style={styles.activeUnderline} />}
  </TouchableOpacity>
);

// --- Form Components ---
const BasicInformationForm = () => {
  const [formData, setFormData] = useState({
    username: '', password: '', title: '', firstName: '', middleName: '', lastName: '',
    dob: '', gender: '', mobile: '', residence: '', officialEmail: '', personalEmail: '',
    department: '', designation: '', grade: '', secondaryTitle: '', doj: '', employeeType: '',
    shiftType: '', reportingManager: '',
  });

  return (
    <View style={styles.formCard}>
      <View style={styles.sectionHeader}>
        <UserIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Basic Employee Information</Text>
      </View>
      <Text style={styles.sectionDescription}>Enter the essential information for the new employee including login credentials and professional details.</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>USERNAME <Text style={{ color: colors.errorRed }}>*</Text></Text>
        <TextInput style={styles.input} value={formData.username} onChangeText={(text) => setFormData({ ...formData, username: text })} placeholder="Username for login" placeholderTextColor={colors.inputPlaceholder} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>PASSWORD <Text style={{ color: colors.errorRed }}>*</Text></Text>
        <TextInput style={styles.input} value={formData.password} onChangeText={(text) => setFormData({ ...formData, password: text })} placeholder="Password for the employee login account" placeholderTextColor={colors.inputPlaceholder} secureTextEntry />
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>TITLE <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.title} onChangeText={(text) => setFormData({ ...formData, title: text })} placeholder="Mr." placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>FIRST NAME <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.firstName} onChangeText={(text) => setFormData({ ...formData, firstName: text })} placeholder="First Name" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>MIDDLE NAME</Text>
          <TextInput style={styles.input} value={formData.middleName} onChangeText={(text) => setFormData({ ...formData, middleName: text })} placeholder="Optional" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>LAST NAME <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.lastName} onChangeText={(text) => setFormData({ ...formData, lastName: text })} placeholder="Last Name" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>DATE OF BIRTH <Text style={{ color: colors.errorRed }}>*</Text></Text>
        <View style={styles.inputWithIcon}>
          <TextInput style={styles.input} value={formData.dob} onChangeText={(text) => setFormData({ ...formData, dob: text })} placeholder="dd-mm-yyyy" placeholderTextColor={colors.inputPlaceholder} />
          <CalendarIcon color={colors.bellChevronIcon} size={16} style={styles.icon} />
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>GENDER <Text style={{ color: colors.errorRed }}>*</Text></Text>
        <TextInput style={styles.input} value={formData.gender} onChangeText={(text) => setFormData({ ...formData, gender: text })} placeholder="------" placeholderTextColor={colors.inputPlaceholder} />
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>MOBILE NUMBER <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.mobile} onChangeText={(text) => setFormData({ ...formData, mobile: text })} placeholder="+91-XXXXXXXXXX" placeholderTextColor={colors.inputPlaceholder} keyboardType="phone-pad" />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>RESIDENCE NUMBER</Text>
          <TextInput style={styles.input} value={formData.residence} onChangeText={(text) => setFormData({ ...formData, residence: text })} placeholder="Landline Number" placeholderTextColor={colors.inputPlaceholder} keyboardType="phone-pad" />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>OFFICIAL EMAIL <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.officialEmail} onChangeText={(text) => setFormData({ ...formData, officialEmail: text })} placeholder="official@company.com" placeholderTextColor={colors.inputPlaceholder} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>PERSONAL EMAIL</Text>
          <TextInput style={styles.input} value={formData.personalEmail} onChangeText={(text) => setFormData({ ...formData, personalEmail: text })} placeholder="personal@gmail.com" placeholderTextColor={colors.inputPlaceholder} keyboardType="email-address" autoCapitalize="none" />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>DEPARTMENT <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.department} onChangeText={(text) => setFormData({ ...formData, department: text })} placeholder="---------" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>DESIGNATION <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.designation} onChangeText={(text) => setFormData({ ...formData, designation: text })} placeholder="---------" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>GRADE <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.grade} onChangeText={(text) => setFormData({ ...formData, grade: text })} placeholder="---------" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>SECONDARY JOB TITLE</Text>
          <TextInput style={styles.input} value={formData.secondaryTitle} onChangeText={(text) => setFormData({ ...formData, secondaryTitle: text })} placeholder="Secondary Job Title" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>DATE OF JOINING <Text style={{ color: colors.errorRed }}>*</Text></Text>
        <View style={styles.inputWithIcon}>
          <TextInput style={styles.input} value={formData.doj} onChangeText={(text) => setFormData({ ...formData, doj: text })} placeholder="dd-mm-yyyy" placeholderTextColor={colors.inputPlaceholder} />
          <CalendarIcon color={colors.bellChevronIcon} size={16} style={styles.icon} />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>EMPLOYEE TYPE <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.employeeType} onChangeText={(text) => setFormData({ ...formData, employeeType: text })} placeholder="Permanent" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>SHIFT TYPE <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.shiftType} onChangeText={(text) => setFormData({ ...formData, shiftType: text })} placeholder="General Shift" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>REPORTING MANAGER</Text>
        <TextInput style={styles.input} value={formData.reportingManager} onChangeText={(text) => setFormData({ ...formData, reportingManager: text })} placeholder="Reporting Manager" placeholderTextColor={colors.inputPlaceholder} />
      </View>
    </View>
  );
};

const PersonalFamilyForm = () => {
  const [formData, setFormData] = useState({
    currentAddress: '', permanentAddress: '', sameAsCurrent: false, city: '', state: '', postalCode: '',
    country: '', maritalStatus: '', marriageDate: '', fatherName: '', motherName: '', spouseName: '',
    childrenDetails: '', bloodGroup: '', physicalHandicap: '', languages: '', panNumber: '', aadhaarNumber: '',
    drivingLicense: '', dlValidUntil: '',
  });

  return (
    <View style={styles.formCard}>
      <View style={styles.sectionHeader}>
        <MapPinIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Address Information</Text>
      </View>
      <Text style={styles.sectionDescription}>Provide address details and family information for the employee.</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>CURRENT ADDRESS <Text style={{ color: colors.errorRed }}>*</Text></Text>
        <TextInput style={[styles.input, { height: 80 }]} value={formData.currentAddress} onChangeText={(text) => setFormData({ ...formData, currentAddress: text })} placeholder="Current Address" placeholderTextColor={colors.inputPlaceholder} multiline />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>PERMANENT ADDRESS <Text style={{ color: colors.errorRed }}>*</Text></Text>
        <TextInput style={[styles.input, { height: 80 }]} value={formData.permanentAddress} onChangeText={(text) => setFormData({ ...formData, permanentAddress: text })} placeholder="Permanent Address" placeholderTextColor={colors.inputPlaceholder} multiline />
      </View>
      <View style={styles.formGroup}>
        <TouchableOpacity onPress={() => setFormData({ ...formData, sameAsCurrent: !formData.sameAsCurrent })}>
          <Text style={styles.checkboxLabel}>Same as current address</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>CITY <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.city} onChangeText={(text) => setFormData({ ...formData, city: text })} placeholder="City" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>STATE <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.state} onChangeText={(text) => setFormData({ ...formData, state: text })} placeholder="State" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>POSTAL CODE <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.postalCode} onChangeText={(text) => setFormData({ ...formData, postalCode: text })} placeholder="PIN Code" placeholderTextColor={colors.inputPlaceholder} keyboardType="numeric" />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>COUNTRY <Text style={{ color: colors.errorRed }}>*</Text></Text>
          <TextInput style={styles.input} value={formData.country} onChangeText={(text) => setFormData({ ...formData, country: text })} placeholder="India" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <UsersIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Family Information</Text>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>MARITAL STATUS <Text style={{ color: colors.errorRed }}>*</Text></Text>
        <TextInput style={styles.input} value={formData.maritalStatus} onChangeText={(text) => setFormData({ ...formData, maritalStatus: text })} placeholder="Single" placeholderTextColor={colors.inputPlaceholder} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>MARRIAGE DATE</Text>
        <View style={styles.inputWithIcon}>
          <TextInput style={styles.input} value={formData.marriageDate} onChangeText={(text) => setFormData({ ...formData, marriageDate: text })} placeholder="dd-mm-yyyy" placeholderTextColor={colors.inputPlaceholder} />
          <CalendarIcon color={colors.bellChevronIcon} size={16} style={styles.icon} />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>FATHER'S NAME</Text>
          <TextInput style={styles.input} value={formData.fatherName} onChangeText={(text) => setFormData({ ...formData, fatherName: text })} placeholder="Father's Name" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>MOTHER'S NAME</Text>
          <TextInput style={styles.input} value={formData.motherName} onChangeText={(text) => setFormData({ ...formData, motherName: text })} placeholder="Mother's Name" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>SPOUSE NAME</Text>
          <TextInput style={styles.input} value={formData.spouseName} onChangeText={(text) => setFormData({ ...formData, spouseName: text })} placeholder="Spouse's Name" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>CHILDREN DETAILS</Text>
          <TextInput style={styles.input} value={formData.childrenDetails} onChangeText={(text) => setFormData({ ...formData, childrenDetails: text })} placeholder="Children details (Name, Age, etc.)" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.recommendation}>Please provide names and ages of children</Text>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <UserIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Personal Information</Text>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>BLOOD GROUP</Text>
          <TextInput style={styles.input} value={formData.bloodGroup} onChangeText={(text) => setFormData({ ...formData, bloodGroup: text })} placeholder="---------" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>PHYSICAL HANDICAP</Text>
          <TextInput style={styles.input} value={formData.physicalHandicap} onChangeText={(text) => setFormData({ ...formData, physicalHandicap: text })} placeholder="If any, please specify" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>LANGUAGES KNOWN</Text>
        <TextInput style={styles.input} value={formData.languages} onChangeText={(text) => setFormData({ ...formData, languages: text })} placeholder="English, Hindi, etc." placeholderTextColor={colors.inputPlaceholder} />
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>PAN NUMBER</Text>
          <TextInput style={styles.input} value={formData.panNumber} onChangeText={(text) => setFormData({ ...formData, panNumber: text })} placeholder="ABCDE1234F" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>AADHAAR NUMBER</Text>
          <TextInput style={styles.input} value={formData.aadhaarNumber} onChangeText={(text) => setFormData({ ...formData, aadhaarNumber: text })} placeholder="1234 5678 9012" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>DRIVING LICENSE NUMBER</Text>
          <TextInput style={styles.input} value={formData.drivingLicense} onChangeText={(text) => setFormData({ ...formData, drivingLicense: text })} placeholder="Driving License Number" placeholderTextColor={colors.inputPlaceholder} />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={styles.label}>DL VALID UNTIL</Text>
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input} value={formData.dlValidUntil} onChangeText={(text) => setFormData({ ...formData, dlValidUntil: text })} placeholder="dd-mm-yyyy" placeholderTextColor={colors.inputPlaceholder} />
            <CalendarIcon color={colors.bellChevronIcon} size={16} style={styles.icon} />
          </View>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <CameraIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Profile Picture</Text>
      </View>
      <View style={styles.uploadContainer}>
        <CameraIcon color={colors.bellChevronIcon} size={40} />
        <Text style={styles.uploadText}>Upload Profile Picture</Text>
        <Text style={styles.recommendation}>Click to browse or drag and drop an image file</Text>
        <Text style={styles.recommendation}>Recommendation: 800x800px, Max size 1MB</Text>
      </View>
    </View>
  );
};

const ExperienceSkillsForm = () => {
  const [educationItems, setEducationItems] = useState([{ id: 1 }]);
  const [experienceItems, setExperienceItems] = useState([{ id: 1 }]);
  const [skillItems, setSkillItems] = useState([{ id: 1 }]);
  const [contactItems, setContactItems] = useState([{ id: 1 }]);

  const addItem = (setItems, items) => {
    setItems([...items, { id: items.length + 1 }]);
  };

  return (
    <View style={styles.formCard}>
      <View style={styles.sectionHeader}>
        <AwardIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Educational Qualifications</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addItem(setEducationItems, educationItems)}>
          <Text style={styles.addButtonText}>+ Add Education</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionDescription}>Add educational qualifications, work experience, technical skills, and emergency contacts.</Text>
      {educationItems.map((item) => (
        <View key={item.id} style={styles.formGroup}>
          <Text style={styles.label}>QUALIFICATION TYPE</Text>
          <TextInput style={styles.input} placeholder="Degree Name" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>DEGREE NAME</Text>
          <TextInput style={styles.input} placeholder="Degree Name" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>INSTITUTION</Text>
          <TextInput style={styles.input} placeholder="School/College Name" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>UNIVERSITY</Text>
          <TextInput style={styles.input} placeholder="University Name" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>YEAR OF PASSING</Text>
          <TextInput style={styles.input} placeholder="YYYY" placeholderTextColor={colors.inputPlaceholder} keyboardType="numeric" />
          <Text style={styles.label}>PERCENTAGE/CGPA</Text>
          <TextInput style={styles.input} placeholder="XX% or X.X CGPA" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>SPECIALIZATION</Text>
          <TextInput style={styles.input} placeholder="Specialization/Stream" placeholderTextColor={colors.inputPlaceholder} />
        </View>
      ))}
      <View style={styles.sectionHeader}>
        <BriefcaseIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Work Experience</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addItem(setExperienceItems, experienceItems)}>
          <Text style={styles.addButtonText}>+ Add Experience</Text>
        </TouchableOpacity>
      </View>
      {experienceItems.map((item) => (
        <View key={item.id} style={styles.formGroup}>
          <Text style={styles.label}>COMPANY NAME</Text>
          <TextInput style={styles.input} placeholder="Company Name" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>JOB TITLE</Text>
          <TextInput style={styles.input} placeholder="Job Title" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>START DATE</Text>
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input} placeholder="dd-mm-yyyy" placeholderTextColor={colors.inputPlaceholder} />
            <CalendarIcon color={colors.bellChevronIcon} size={16} style={styles.icon} />
          </View>
          <Text style={styles.label}>END DATE</Text>
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input} placeholder="dd-mm-yyyy" placeholderTextColor={colors.inputPlaceholder} />
            <CalendarIcon color={colors.bellChevronIcon} size={16} style={styles.icon} />
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.checkboxLabel}>IS CURRENT JOB</Text>
          </TouchableOpacity>
          <Text style={styles.label}>LAST SALARY</Text>
          <TextInput style={styles.input} placeholder="Last Salary" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>RESPONSIBILITIES</Text>
          <TextInput style={[styles.input, { height: 80 }]} placeholder="Responsibilities" placeholderTextColor={colors.inputPlaceholder} multiline />
        </View>
      ))}
      <View style={styles.sectionHeader}>
        <CodeIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addItem(setSkillItems, skillItems)}>
          <Text style={styles.addButtonText}>+ Add Skill</Text>
        </TouchableOpacity>
      </View>
      {skillItems.map((item) => (
        <View key={item.id} style={styles.formGroup}>
          <Text style={styles.label}>SKILL NAME</Text>
          <TextInput style={styles.input} placeholder="e.g., Python, Java, SAP" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>CATEGORY</Text>
          <TextInput style={styles.input} placeholder="e.g., Programming, Database" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>PROFICIENCY LEVEL</Text>
          <TextInput style={styles.input} placeholder="Basic, Intermediate, Expert" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>YEARS OF EXPERIENCE</Text>
          <TextInput style={styles.input} placeholder="0" placeholderTextColor={colors.inputPlaceholder} keyboardType="numeric" />
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.checkboxLabel}>CERTIFICATION AVAILABLE</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.sectionHeader}>
        <PhoneIcon color={colors.linkBlue} size={20} />
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addItem(setContactItems, contactItems)}>
          <Text style={styles.addButtonText}>+ Add Contact</Text>
        </TouchableOpacity>
      </View>
      {contactItems.map((item) => (
        <View key={item.id} style={styles.formGroup}>
          <Text style={styles.label}>CONTACT NAME</Text>
          <TextInput style={styles.input} placeholder="Contact Name" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>RELATIONSHIP</Text>
          <TextInput style={styles.input} placeholder="---------" placeholderTextColor={colors.inputPlaceholder} />
          <Text style={styles.label}>PHONE NUMBER</Text>
          <TextInput style={styles.input} placeholder="+91-XXXXXXXXXX" placeholderTextColor={colors.inputPlaceholder} keyboardType="phone-pad" />
          <Text style={styles.label}>EMAIL</Text>
          <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor={colors.inputPlaceholder} keyboardType="email-address" autoCapitalize="none" />
        </View>
      ))}
    </View>
  );
};

// --- Footer Component ---
const Footer = ({ activeTab, navigation }) => {
  const handleCancel = () => {
    if (navigation) navigation.goBack();
  };

  const handlePrevious = () => {
    // Logic to switch to previous tab
  };

  const handleNext = () => {
    // Logic to switch to next tab
  };

  const handleCreate = () => {
    // Logic to create employee
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerButton} onPress={handleCancel}>
        <Text style={styles.footerButtonText}>Cancel</Text>
      </TouchableOpacity>
      {activeTab > 0 && (
        <TouchableOpacity style={styles.footerButton} onPress={handlePrevious}>
          <ChevronLeftIcon color={colors.prevButtonText} size={16} />
          <Text style={styles.footerButtonText}>Previous</Text>
        </TouchableOpacity>
      )}
      {activeTab < 2 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
          <ChevronRightIcon color={colors.nextCreateButtonText} size={16} />
        </TouchableOpacity>
      )}
      {activeTab === 2 && (
        <TouchableOpacity style={styles.nextButton} onPress={handleCreate}>
          <Text style={styles.nextButtonText}>Create Employee</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// --- AddEmployeeScreen Component ---
const AddEmployeeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderFormContent = () => {
    switch (activeTab) {
      case 0: return <BasicInformationForm />;
      case 1: return <PersonalFamilyForm />;
      case 2: return <ExperienceSkillsForm />;
      default: return <BasicInformationForm />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Banner />
      <View style={styles.tabContainer}>
        <Tab
          title="Basic Information"
          icon={<InfoIcon color={activeTab === 0 ? colors.activeTabText : colors.inactiveTabText} size={16} />}
          isActive={activeTab === 0}
          onPress={() => setActiveTab(0)}
        />
        <Tab
          title="Personal & Family"
          icon={<UserIcon color={activeTab === 1 ? colors.activeTabText : colors.inactiveTabText} size={16} />}
          isActive={activeTab === 1}
          onPress={() => setActiveTab(1)}
        />
        <Tab
          title="Experience & Skills"
          icon={<BriefcaseIcon color={activeTab === 2 ? colors.activeTabText : colors.inactiveTabText} size={16} />}
          isActive={activeTab === 2}
          onPress={() => setActiveTab(2)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderFormContent()}
      </ScrollView>
      <Footer activeTab={activeTab} navigation={navigation} />
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
    borderBottomColor: colors.tabBorder,
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
  bannerContainer: {
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bannerTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.bannerText,
    fontFamily: typography.fontFamily,
  },
  bannerSubtext: {
    fontSize: 14,
    color: colors.bannerText,
    fontFamily: typography.fontFamily,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.bannerText,
    fontFamily: typography.fontFamily,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.tabBorder,
    backgroundColor: colors.cardBackground,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.cardBackground,
  },
  tabText: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  activeTabText: {
    fontWeight: '600',
    color: colors.activeTabText,
  },
  inactiveTabText: {
    color: colors.inactiveTabText,
  },
  activeUnderline: {
    position: 'absolute',
    bottom: -1,
    height: 2,
    width: '50%',
    backgroundColor: colors.activeTabText,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Space for footer
  },
  formCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.userNameText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  sectionDescription: {
    fontSize: 12,
    color: colors.labelText,
    marginBottom: 16,
    fontFamily: typography.fontFamily,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formGroupHalf: {
    flex: 0.48,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.labelText,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontFamily: typography.fontFamily,
  },
  input: {
    height: 40,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.inputText,
    fontFamily: typography.fontFamily,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.inputText,
    fontFamily: typography.fontFamily,
  },
  recommendation: {
    fontSize: 12,
    color: colors.labelText,
    marginTop: 4,
    fontFamily: typography.fontFamily,
  },
  uploadContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.uploadBorder,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.userNameText,
    marginTop: 8,
    fontFamily: typography.fontFamily,
  },
  addButton: {
    backgroundColor: colors.addButtonBg,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.addButtonText,
    fontFamily: typography.fontFamily,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.tabBorder,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cancelButtonBg,
    borderWidth: 1,
    borderColor: colors.cancelButtonBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.cancelButtonText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.nextCreateButtonBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.nextCreateButtonText,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
});

export default AddEmployeeScreen;
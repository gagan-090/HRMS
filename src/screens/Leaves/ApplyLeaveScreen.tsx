import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Platform,
} from 'react-native';
import Svg, { Path, Stop, G, LinearGradient } from 'react-native-svg';
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
  whiteText: '#FFFFFF',
  secondaryText: '#6B7280',
  inputBorder: '#E5E7EB',
  buttonBorder: '#E5E7EB',
  bannerStart: '#00B894',
  bannerEnd: '#00A382',
  reminderBg: '#FFF3CD',
  reminderBorder: '#FFE082',
  uploadBorder: '#D1D5DB',
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

const FilePlusIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2V8H20M12 11H16M8 15H16M12 15V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InfoIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const AlertTriangleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10.29 14.29L12 12.59L13.71 14.29L14.29 13.71L12.59 12L14.29 10.29L13.71 9.71L12 11.41L10.29 9.71L9.71 10.29L11.41 12L9.71 13.71L10.29 14.29Z" fill={color} />
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

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2L20 8H14V2ZM16 10V18M12 14H16M8 10H12M8 14H12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PaperclipIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.6 7L3.6 19L7.2 22.6L19.2 10.6L15.6 7ZM15.6 7L19.2 10.6M7.2 22.6L3.6 19C2.69381 18.0938 2.69381 16.6562 3.6 15.75L15.75 3.6C16.6562 2.69381 18.0938 2.69381 19 3.6L20.4 5M19.2 10.6L20.4 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UploadCloudIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 16.5V14.2C4 10.2819 7.58172 7 11.6 7C14.1487 7 16.3896 8.55764 17.3896 10.7M12 11V17M12 11L9 14M12 11L15 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M20 14.2C20 17.7 16.4183 20.5 12.6 20.5H4C2.89543 20.5 2 19.6046 2 18.5V14.2C2 10.7 5.58172 8 9.6 8C10.9871 8 12.3015 8.44507 13.3896 9.2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckCircleIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={color} />
  </Svg>
);

const XIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
const Banner = () => (
  <View style={styles.bannerContainer}>
    <LinearGradient
      colors={[colors.bannerStart, colors.bannerEnd]}
      style={styles.bannerGradient}
    >
      <View style={styles.bannerContent}>
        <FilePlusIcon color={colors.whiteText} size={32} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Apply for Leave</Text>
          <Text style={styles.bannerSubtext}>Submit your leave request with all required details.</Text>
        </View>
      </View>
    </LinearGradient>
  </View>
);

// --- Leave Balance Card ---
const LeaveBalanceCard = () => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <InfoIcon color={colors.accentBlue} size={20} />
      <Text style={styles.cardTitle}>Your Leave Balance</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.balanceValue}>---</Text>
      <Text style={styles.noDataText}>NO DATA</Text>
    </View>
  </View>
);

// --- Leave Policy Reminders Card ---
const LeavePolicyRemindersCard = () => (
  <View style={styles.reminderCard}>
    <View style={styles.reminderHeader}>
      <AlertTriangleIcon color={'#FFC107'} size={20} />
      <Text style={styles.reminderTitle}>Leave Policy Reminders</Text>
    </View>
    <View style={styles.reminderContent}>
      <Text style={styles.reminderText}>• Leave requests must be submitted at least 2 days in advance</Text>
      <Text style={styles.reminderText}>• Medical certificates are mandatory for sick leave</Text>
      <Text style={styles.reminderText}>• Annual leave balance cannot be carried forward beyond company policy</Text>
      <Text style={styles.reminderText}>• Casual leave can be taken for a maximum of 3 consecutive days</Text>
      <Text style={styles.reminderText}>• Half-day leaves can be taken in the first or second half of the day.</Text>
    </View>
  </View>
);

// --- Leave Type & Duration Card ---
const LeaveTypeDurationCard = () => {
  const [activeDuration, setActiveDuration] = useState('Full Day Leave');
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <CalendarCheckIcon color={colors.accentBlue} size={20} />
        <Text style={styles.cardTitle}>Leave Type & Duration</Text>
      </View>
      <Text style={styles.cardDescription}>Select the type of leave you want to apply for</Text>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>LEAVE TYPE *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="---------"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
            />
            <ChevronDownIcon color={colors.secondaryText} size={16} />
          </View>
        </View>
      </View>
      <View style={styles.formRow}>
        <Text style={styles.formLabel}>DURATION</Text>
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[styles.toggleButton, activeDuration === 'Full Day Leave' && { backgroundColor: colors.accentBlue, borderColor: colors.accentBlue }]}
            onPress={() => setActiveDuration('Full Day Leave')}
          >
            <Text style={[styles.toggleText, activeDuration === 'Full Day Leave' && { color: colors.whiteText }]}>Full Day Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, activeDuration === 'Half Day Leave' && { backgroundColor: colors.accentBlue, borderColor: colors.accentBlue }]}
            onPress={() => setActiveDuration('Half Day Leave')}
          >
            <Text style={[styles.toggleText, activeDuration === 'Half Day Leave' && { color: colors.whiteText }]}>Half Day Leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- Leave Dates Card ---
const LeaveDatesCard = () => {
  const [totalDays, setTotalDays] = useState(0);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <CalendarIcon color={colors.accentBlue} size={20} />
        <Text style={styles.cardTitle}>Leave Dates</Text>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>START DATE *</Text>
          <View style={styles.inputContainer}>
            <CalendarIcon color={colors.secondaryText} size={16} />
            <TextInput
              placeholder="dd-mm-yyyy"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>END DATE *</Text>
          <View style={styles.inputContainer}>
            <CalendarIcon color={colors.secondaryText} size={16} />
            <TextInput
              placeholder="dd-mm-yyyy"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
            />
          </View>
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>TOTAL DAYS</Text>
          <View style={styles.inputContainer}>
            <ClockIcon color={colors.accentGreen} size={16} />
            <Text style={styles.totalDaysText}>{totalDays} days</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// --- Leave Details Card ---
const LeaveDetailsCard = () => {
  const [isEmergency, setIsEmergency] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <FileTextIcon color={colors.accentBlue} size={20} />
        <Text style={styles.cardTitle}>Leave Details</Text>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroupFull}>
          <Text style={styles.formLabel}>REASON FOR LEAVE *</Text>
          <TextInput
            placeholder="Please provide reason for leave"
            placeholderTextColor={colors.secondaryText}
            style={[styles.input, styles.textarea]}
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </View>
      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>CONTACT DETAILS DURING LEAVE</Text>
          <TextInput
            placeholder="Contact details during leave (phone, address, etc.)"
            placeholderTextColor={colors.secondaryText}
            style={styles.input}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>EMERGENCY CONTACT</Text>
          <TextInput
            placeholder="Emergency contact number"
            placeholderTextColor={colors.secondaryText}
            style={styles.input}
          />
        </View>
      </View>
      <Text style={styles.smallText}>Contact information during your leave period</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isEmergency && { backgroundColor: colors.accentBlue }]}
          onPress={() => setIsEmergency(!isEmergency)}
        >
          {isEmergency && <G><Path d="M10 15.17L17.58 7.59L19 9L10 18L5 13L6.41 11.59L10 15.17Z" fill={colors.whiteText} /></G>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>This is an emergency leave request</Text>
      </View>
      <Text style={styles.smallText}>Check this if is an urgent/emergency leave request</Text>
    </View>
  );
};

// --- Supporting Documents Card ---
const SupportingDocumentsCard = () => {
  const [fileName, setFileName] = useState('No file chosen');
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <PaperclipIcon color={colors.accentBlue} size={20} />
        <Text style={styles.cardTitle}>Supporting Documents (OPTIONAL)</Text>
      </View>
      <View style={styles.uploadContainer}>
        <UploadCloudIcon color={colors.secondaryText} size={40} />
        <Text style={styles.uploadText}>Click to upload or drag and drop</Text>
        <Text style={styles.uploadSubtext}>Medical certificates, travel documents, etc. (Max 5MB)</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Choose File</Text>
        </TouchableOpacity>
        <Text style={styles.fileNameText}>{fileName}</Text>
      </View>
    </View>
  );
};

// --- Footer Buttons ---
const FooterButtons = ({ navigation }) => (
  <View style={styles.footer}>
    <TouchableOpacity style={styles.cancelButton}>
      <XIcon color={colors.secondaryText} size={16} />
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.submitButton}>
      <CheckCircleIcon color={colors.whiteText} size={16} />
      <Text style={styles.submitButtonText}>Submit Leave Application</Text>
    </TouchableOpacity>
  </View>
);

// --- ApplyLeaveScreen Component ---
const ApplyLeaveScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Banner />
        <LeaveBalanceCard />
        <LeavePolicyRemindersCard />
        <LeaveTypeDurationCard />
        <LeaveDatesCard />
        <LeaveDetailsCard />
        <SupportingDocumentsCard />
        <FooterButtons navigation={navigation} />
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
  },
  bannerText: {
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.titleText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  cardContent: {
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  noDataText: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  reminderCard: {
    backgroundColor: colors.reminderBg,
    borderWidth: 1,
    borderColor: colors.reminderBorder,
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.titleText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  reminderContent: {
    marginTop: 8,
  },
  reminderText: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: colors.descriptionText,
    fontFamily: typography.fontFamily,
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formGroup: {
    flex: 1,
    marginRight: 16,
  },
  formGroupFull: {
    flex: 1,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.titleText,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontFamily: typography.fontFamily,
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
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },
  toggleGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  totalDaysText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.titleText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  smallText: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  checkboxLabel: {
    fontSize: 14,
    color: colors.titleText,
    fontFamily: typography.fontFamily,
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: colors.uploadBorder,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  uploadText: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    marginTop: 4,
  },
  uploadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    marginTop: 16,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  fileNameText: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentGreen,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.whiteText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
});

export default ApplyLeaveScreen;
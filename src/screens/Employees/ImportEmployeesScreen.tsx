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
  bannerGradientStart: '#7F00FF',
  bannerGradientEnd: '#E100FF',
  bannerText: '#FFFFFF',
  linkBlue: '#007BFF',
  redText: '#DC3545',
  secondaryText: '#6B7280',
  tableHeaderText: '#6B7280',
  tableDataText: '#1F2937',
  inputBorder: '#E5E7EB',
  buttonBorder: '#E5E7EB',
  progressBg: '#E5E7EB',
  progressFill: '#007BFF',
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

const UploadCloudIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16C20 14.4183 19.1046 13.0609 17.8182 12.3182C17.5359 10.8246 16.2009 9.66289 14.6364 9.63636C13.3273 7.38182 10.8909 6 8 6C5.23858 6 2.76182 7.74545 2 10C2.29091 10.0091 2.58182 10.0182 2.87273 10.0273C4.18182 7.29091 6.76364 5.4 9.63636 5.4C12.5091 5.4 14.9636 7.16364 15.6364 9.63636C13.0545 9.70909 10.8727 11.2909 10.4182 13.5273C8.43636 13.7818 6.87273 15.5636 6.87273 17.5636C6.87273 18.4182 7.16364 19.2 7.63636 19.8C6.50909 19.8727 5.52727 18.9818 5.52727 17.8545C5.52727 16.8727 6.2 16.0727 7.09091 15.7818C7.27273 15.0182 7.78182 14.3818 8.47273 13.9818C9.16364 13.5818 9.96364 13.4364 10.7455 13.5636C11.4182 14.7818 12.7818 15.6545 14.3091 15.7818C14.7818 16.5636 15.4727 17.2 16.3091 17.5636C16.7818 17.7818 17.3091 17.9091 17.8545 17.9091C18.9636 17.9091 19.9455 17.3091 20.4364 16.4182C20.8727 15.7818 21 15.0727 21 14.3455C21 12.2 19.1636 10.4727 17 10.4727C15.9818 10.4727 15.0727 10.8909 14.4364 11.5091" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InfoIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill={color} />
  </Svg>
);

const UploadIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 5M12 5L17 10M12 5V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FolderIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 20C3.44772 20 3 19.5523 3 19V7C3 6.44772 3.44772 6 4 6H10L12 8H20C20.5523 8 21 8.44772 21 9V19C21 19.5523 20.5523 20 20 20H4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DownloadIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 16L12 23M12 23L20 16M12 23V2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const XIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2L20 8M9 15H15M9 12H15M9 9H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        <UploadCloudIcon color={colors.bannerText} size={32} />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Import Employees</Text>
          <Text style={styles.bannerSubtext}>Bulk upload employee data using CSV or Excel files</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

// --- Important Instructions Card ---
const ImportantInstructionsCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <InfoIcon color={colors.linkBlue} size={20} />
        <Text style={styles.cardTitle}>Important Instructions</Text>
      </View>
      <Text style={styles.instructionText}>
        <Svg width={6} height={6} viewBox="0 0 6 6" style={styles.bullet}>
          <Circle cx="3" cy="3" r="3" fill={colors.secondaryText} />
        </Svg> Supported formats: CSV, Excel (.xlsx, .xls)
      </Text>
      <Text style={styles.instructionText}>
        <Svg width={6} height={6} viewBox="0 0 6 6" style={styles.bullet}>
          <Circle cx="3" cy="3" r="3" fill={colors.secondaryText} />
        </Svg> Maximum file size: 10MB
      </Text>
      <Text style={styles.instructionText}>
        <Svg width={6} height={6} viewBox="0 0 6 6" style={styles.bullet}>
          <Circle cx="3" cy="3" r="3" fill={colors.secondaryText} />
        </Svg> First row should contain column headers
      </Text>
      <Text style={styles.instructionText}>
        <Svg width={6} height={6} viewBox="0 0 6 6" style={styles.bullet}>
          <Circle cx="3" cy="3" r="3" fill={colors.secondaryText} />
        </Svg> Ensure data is properly formatted
      </Text>
      <Text style={styles.requiredText}>Required Columns:</Text>
      <Text style={[styles.instructionText, { marginLeft: 10 }]}><Text style={{ color: colors.redText }}>•</Text> first_name - Employee's first name</Text>
      <Text style={[styles.instructionText, { marginLeft: 10 }]}><Text style={{ color: colors.redText }}>•</Text> last_name - Employee's last name</Text>
      <Text style={[styles.instructionText, { marginLeft: 10 }]}><Text style={{ color: colors.redText }}>•</Text> email_official - Official email address</Text>
      <Text style={[styles.instructionText, { marginLeft: 10 }]}><Text style={{ color: colors.redText }}>•</Text> mobile_number - Contact number</Text>
      <Text style={[styles.instructionText, { marginLeft: 10 }]}><Text style={{ color: colors.redText }}>•</Text> employee_number - Unique employee ID</Text>
    </View>
  );
};

// --- Upload Employee Data Card ---
const UploadEmployeeDataCard = () => {
  const [selectedFile, setSelectedFile] = useState('No file chosen');
  const [isChecked, setIsChecked] = useState(false);

  const handleChooseFile = () => {
    // Simulate file picker
    setSelectedFile('example.csv');
  };

  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <UploadIcon color={colors.linkBlue} size={20} />
        <Text style={styles.cardTitle}>Upload Employee Data</Text>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Select Import File</Text>
        <TouchableOpacity style={styles.fileInput} onPress={handleChooseFile}>
          <FolderIcon color={colors.secondaryText} size={20} style={styles.fileIcon} />
          <Text style={styles.fileText}>{selectedFile}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formGroup}>
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <Text style={styles.checkboxLabel}>Update existing employees if employee number matches</Text>
        </TouchableOpacity>
        <Text style={styles.instructionText}>If unchecked, duplicate employee numbers will be skipped.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.downloadButton}>
          <DownloadIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
          <Text style={styles.downloadButtonText}>Download Template</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Upload Progress Card ---
const UploadProgressCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <UploadCloudIcon color={colors.secondaryText} size={40} />
        <Text style={styles.progressTitle}>Upload Progress</Text>
      </View>
      <Text style={styles.instructionText}>Select a file to begin the import process</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>
    </View>
  );
};

// --- Sample Data Format Card ---
const SampleDataFormatCard = () => {
  const tableData = [
    ['EMP001', 'John', 'Doe', 'john.doe@company.com', '9876543210', 'IT', 'Software Engineer'],
    ['EMP002', 'Jane', 'Smith', 'jane.smith@company.com', '9876543211', 'HR', 'HR Manager'],
    ['EMP003', 'Mike', 'Johnson', 'mike.johnson@company.com', '9876543212', 'Finance', 'Accountant'],
  ];

  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <FileTextIcon color={colors.linkBlue} size={20} />
        <Text style={styles.cardTitle}>Sample Data Format</Text>
      </View>
      <ScrollView horizontal>
        <View>
          <View style={styles.tableRow}>
            {['employee_number', 'first_name', 'last_name', 'email_official', 'mobile_number', 'department', 'designation'].map((header, index) => (
              <Text key={index} style={styles.tableHeader}>{header}</Text>
            ))}
          </View>
          {tableData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.map((cell, cellIndex) => (
                <Text key={cellIndex} style={styles.tableCell}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// --- Footer Component ---
const Footer = ({ navigation }) => {
  const handleCancel = () => {
    if (navigation) navigation.goBack();
  };

  const handleImport = () => {
    // Logic to import employees
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerButton} onPress={handleCancel}>
        <XIcon color={colors.secondaryText} size={16} />
        <Text style={styles.footerButtonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.importButton} onPress={handleImport}>
        <UploadIcon color={colors.bannerText} size={16} style={styles.buttonIcon} />
        <Text style={styles.importButtonText}>Import Employees</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- ImportEmployeesScreen Component ---
const ImportEmployeesScreen = ({ navigation }) => {
  console.log('ImportEmployeesScreen rendering at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Banner />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImportantInstructionsCard />
        <UploadEmployeeDataCard />
        <UploadProgressCard />
        <SampleDataFormatCard />
      </ScrollView>
      <Footer navigation={navigation} />
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Space for footer
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.inputBorder,
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.userNameText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  instructionText: {
    fontSize: 14,
    color: colors.secondaryText,
    marginBottom: 8,
    fontFamily: typography.fontFamily,
  },
  bullet: {
    marginRight: 8,
    marginBottom: 4,
  },
  requiredText: {
    fontSize: 14,
    color: colors.secondaryText,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    fontFamily: typography.fontFamily,
  },
  formGroup: {
    marginBottom: 16,
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fileIcon: {
    marginRight: 8,
  },
  fileText: {
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonIcon: {
    marginRight: 4,
  },
  downloadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.userNameText,
    marginLeft: 16,
    fontFamily: typography.fontFamily,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.progressBg,
    borderRadius: 8,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.progressFill,
    width: '50%', // Static 50% progress for UI task
    borderRadius: 8,
  },
  progressFill: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.tableHeaderText,
    textTransform: 'uppercase',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  tableCell: {
    fontSize: 14,
    color: colors.tableDataText,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.inputBorder,
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
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.linkBlue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  importButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.bannerText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
});

export default ImportEmployeesScreen;
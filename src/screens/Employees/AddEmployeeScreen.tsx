import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import {
  widthPixel,
  heightPixel,
  fontPixel,
  spacing,
  componentSizes,
} from '../../utils/responsive';

const AddEmployeeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('basic');

  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    username: '',
    password: '',
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    residenceNumber: '',
    officialEmail: '',
    personalEmail: '',
    department: '',
    designation: '',
    grade: '',
    secondaryJobTitle: '',
    dateOfJoining: '',
    employeeType: '',
    shiftType: '',
    reportingManager: '',

    // Personal & Family Information
    currentAddress: '',
    permanentAddress: '',
    sameAsCurrentAddress: false,
    city: '',
    pinCode: '',
    country: '',
    maritalStatus: '',
    spouseName: '',
    motherName: '',
    fatherName: '',
    emergencyDetails: '',
    bloodGroup: '',
    physicalHandicap: '',
    languagesKnown: '',
    panNumber: '',
    aadharNumber: '',
    passportNumber: '',
    drivingLicenseNumber: '',

    // Experience & Skills Information
    // Educational Qualifications
    qualificationType: '',
    degreeName: '',
    startDate: '',
    university: '',
    yearOfPassing: '',
    percentage: '',
    specialization: '',

    // Work Experience
    companyName: '',
    jobTitle: '',
    startYear: '',
    endYear: '',
    currentJob: false,
    responsibilities: '',

    // Technical Skills
    skillName: '',
    category: '',
    proficiencyLevel: '',
    yearsOfExperience: '',
    certificationAvailable: false,

    // Emergency Contacts
    contactName: '',
    relationship: '',
    phoneNumber: '',
    email: '',
    alternateContact: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const UserIcon = () => <Text style={styles.headerIcon}>👤</Text>;
  const CalendarIcon = () => <Text style={styles.inputIcon}>📅</Text>;
  const ChevronDownIcon = () => <Text style={styles.dropdownIcon}>▼</Text>;
  const UploadIcon = () => <Text style={styles.uploadIcon}>📁</Text>;
  const CheckboxIcon = ({ checked }: { checked: boolean }) => (
    <Text style={styles.checkboxIcon}>{checked ? '☑️' : '☐'}</Text>
  );

  const renderTabButton = (id: string, label: string, number: string) => (
    <TouchableOpacity
      key={id}
      style={[styles.tabButton, activeTab === id && styles.activeTabButton]}
      onPress={() => setActiveTab(id)}
    >
      <View
        style={[styles.tabNumber, activeTab === id && styles.activeTabNumber]}
      >
        <Text
          style={[
            styles.tabNumberText,
            activeTab === id && styles.activeTabNumberText,
          ]}
        >
          {number}
        </Text>
      </View>
      <Text style={[styles.tabText, activeTab === id && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderInput = (
    label: string,
    field: string,
    placeholder: string,
    width: 'full' | 'half' = 'half',
    type: 'text' | 'date' | 'dropdown' = 'text',
  ) => (
    <View
      style={[styles.inputContainer, width === 'full' && styles.fullWidthInput]}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={formData[field as keyof typeof formData]}
          onChangeText={value => updateFormData(field, value)}
        />
        {type === 'date' && <CalendarIcon />}
        {type === 'dropdown' && <ChevronDownIcon />}
      </View>
    </View>
  );

  const renderSection = (
    number: string,
    title: string,
    subtitle: string,
    children: React.ReactNode,
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionNumber}>
          <Text style={styles.sectionNumberText}>{number}</Text>
        </View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <UserIcon />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Add New Employee</Text>
              <Text style={styles.headerSubtitle}>
                Create a comprehensive employee profile with all necessary
                details
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Save Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Preview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerButtonText}>Additional</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {renderTabButton('basic', 'Basic Information', '1')}
          {renderTabButton('personal', 'Personal & Family', '2')}
          {renderTabButton('experience', 'Experience & Skills', '3')}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {activeTab === 'basic' && (
            <>
              {/* User Account Section */}
              {renderSection(
                '1',
                'User Account',
                'Enter the essential information for the new employee including login credentials and professional details.',
                <View style={styles.inputRow}>
                  {renderInput(
                    'USERNAME *',
                    'username',
                    'Enter the username',
                    'half',
                  )}
                  {renderInput(
                    'PASSWORD *',
                    'password',
                    'Password for the employee login account',
                    'half',
                  )}
                </View>,
              )}

              {/* Personal Details Section */}
              {renderSection(
                '2',
                'Personal Details',
                '',
                <>
                  <View style={styles.inputRow}>
                    {renderInput('TITLE', 'title', 'Mr', 'half')}
                    {renderInput(
                      'FIRST NAME *',
                      'firstName',
                      'First name of employee',
                      'half',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'MIDDLE NAME',
                      'middleName',
                      'Middle name of employee',
                      'half',
                    )}
                    {renderInput(
                      'LAST NAME *',
                      'lastName',
                      'Last name of employee',
                      'half',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'DATE OF BIRTH *',
                      'dateOfBirth',
                      'dd-mm-yyyy',
                      'half',
                      'date',
                    )}
                    {renderInput(
                      'GENDER *',
                      'gender',
                      'Select',
                      'half',
                      'dropdown',
                    )}
                  </View>
                </>,
              )}

              {/* Contact Information Section */}
              {renderSection(
                '3',
                'Contact Information',
                '',
                <>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'MOBILE NUMBER *',
                      'mobileNumber',
                      '+91-9876543210',
                      'half',
                    )}
                    {renderInput(
                      'RESIDENCE NUMBER',
                      'residenceNumber',
                      'Residence Number',
                      'half',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'OFFICIAL EMAIL *',
                      'officialEmail',
                      'official@company.com',
                      'half',
                    )}
                    {renderInput(
                      'PERSONAL EMAIL',
                      'personalEmail',
                      'personal@gmail.com',
                      'half',
                    )}
                  </View>
                </>,
              )}

              {/* Professional Details Section */}
              {renderSection(
                '4',
                'Professional Details',
                '',
                <>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'DEPARTMENT *',
                      'department',
                      'Select',
                      'half',
                      'dropdown',
                    )}
                    {renderInput(
                      'DESIGNATION *',
                      'designation',
                      'Select',
                      'half',
                      'dropdown',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'GRADE *',
                      'grade',
                      'Select',
                      'half',
                      'dropdown',
                    )}
                    {renderInput(
                      'SECONDARY JOB TITLE',
                      'secondaryJobTitle',
                      'Secondary Job Title',
                      'half',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'DATE OF JOINING *',
                      'dateOfJoining',
                      'dd-mm-yyyy',
                      'half',
                      'date',
                    )}
                    {renderInput(
                      'EMPLOYEE TYPE *',
                      'employeeType',
                      'Permanent',
                      'half',
                      'dropdown',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'SHIFT TYPE *',
                      'shiftType',
                      'General Shift',
                      'half',
                      'dropdown',
                    )}
                    {renderInput(
                      'REPORTING MANAGER *',
                      'reportingManager',
                      'Select',
                      'half',
                      'dropdown',
                    )}
                  </View>
                </>,
              )}
            </>
          )}

          {activeTab === 'personal' && (
            <>
              {/* Personal & Family Information Header */}
              <View style={styles.tabHeader}>
                <Text style={styles.tabHeaderTitle}>
                  Personal & family Information
                </Text>
                <Text style={styles.tabHeaderSubtitle}>
                  Collect information about family, emergency contact
                  information
                </Text>
              </View>

              {/* Address Information Section */}
              {renderSection(
                '1',
                'Address Information',
                '',
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>CURRENT ADDRESS *</Text>
                    <View style={styles.textAreaWrapper}>
                      <TextInput
                        style={styles.textArea}
                        placeholder="Current address"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={3}
                        value={formData.currentAddress}
                        onChangeText={value =>
                          updateFormData('currentAddress', value)
                        }
                      />
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>PERMANENT ADDRESS *</Text>
                    <View style={styles.textAreaWrapper}>
                      <TextInput
                        style={styles.textArea}
                        placeholder="Permanent Address"
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={3}
                        value={formData.permanentAddress}
                        onChangeText={value =>
                          updateFormData('permanentAddress', value)
                        }
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() =>
                      updateFormData(
                        'sameAsCurrentAddress',
                        (!formData.sameAsCurrentAddress).toString(),
                      )
                    }
                  >
                    <CheckboxIcon checked={formData.sameAsCurrentAddress} />
                    <Text style={styles.checkboxLabel}>
                      Same as current address
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.inputRow}>
                    {renderInput('CITY *', 'city', 'City', 'half')}
                    {renderInput(
                      'PIN/ZIP CODE *',
                      'pinCode',
                      'PIN Code',
                      'half',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput('COUNTRY *', 'country', 'INDIA', 'half')}
                    <View style={styles.inputContainer} />
                  </View>
                </>,
              )}

              {/* Family Information Section */}
              {renderSection(
                '2',
                'Family Information',
                '',
                <>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'MARITAL STATUS *',
                      'maritalStatus',
                      'Single',
                      'half',
                      'dropdown',
                    )}
                    {renderInput(
                      "SPOUSE'S NAME",
                      'spouseName',
                      "Spouse's Name",
                      'half',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      "MOTHER'S NAME",
                      'motherName',
                      "Mother's Name",
                      'half',
                    )}
                    {renderInput(
                      "FATHER'S NAME",
                      'fatherName',
                      "Father's Name",
                      'half',
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>EMERGENCY DETAILS *</Text>
                    <View style={styles.textAreaWrapper}>
                      <TextInput
                        style={styles.textArea}
                        placeholder="Emergency contact, Phone, etc."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={4}
                        value={formData.emergencyDetails}
                        onChangeText={value =>
                          updateFormData('emergencyDetails', value)
                        }
                      />
                    </View>
                  </View>
                </>,
              )}

              {/* Personal Information Section */}
              {renderSection(
                '3',
                'Personal Information',
                '',
                <>
                  <View style={styles.inputRow}>
                    {renderInput('BLOOD GROUP', 'bloodGroup', 'A+ve', 'half')}
                    {renderInput(
                      'PHYSICAL HANDICAP',
                      'physicalHandicap',
                      'Any physical handicap',
                      'half',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'LANGUAGES KNOWN *',
                      'languagesKnown',
                      'Hindi, English',
                      'half',
                    )}
                    <View style={styles.inputContainer} />
                  </View>

                  <View style={styles.inputRow}>
                    {renderInput(
                      'PAN NUMBER',
                      'panNumber',
                      'ABCDE1234F',
                      'half',
                    )}
                    {renderInput(
                      'AADHAR NUMBER',
                      'aadharNumber',
                      'XXXX XXXX XXXX',
                      'half',
                    )}
                  </View>
                  <View style={styles.inputRow}>
                    {renderInput(
                      'DRIVING LICENSE NUMBER',
                      'drivingLicenseNumber',
                      'DL1420110012345',
                      'half',
                    )}
                    {renderInput(
                      'PASSPORT NUMBER',
                      'passportNumber',
                      'AB1234567',
                      'half',
                      'dropdown',
                    )}
                  </View>
                </>,
              )}

              {/* Profile Picture Section */}
              {renderSection(
                '4',
                'Profile Picture',
                '',
                <View style={styles.uploadSection}>
                  <View style={styles.uploadContainer}>
                    <View style={styles.uploadIcon}>
                      <UploadIcon />
                    </View>
                    <Text style={styles.uploadTitle}>
                      Upload Profile Picture
                    </Text>
                    <Text style={styles.uploadSubtitle}>
                      Click to browse or drag and drop to upload file
                    </Text>
                    <Text style={styles.uploadNote}>
                      Recommended dimensions: 400 x 400 pixels
                    </Text>
                  </View>
                </View>,
              )}
            </>
          )}

          {activeTab === 'experience' && (
            <>
              {/* Experience & Skills Header */}
              <View style={styles.tabHeader}>
                <Text style={styles.tabHeaderTitle}>Experience & Skills</Text>
                <Text style={styles.tabHeaderSubtitle}>
                  Add educational qualifications and experience, technical
                  skill, and emergency contacts.
                </Text>
              </View>

              {/* Educational Qualifications Section */}
              {renderSection(
                '1',
                'Educational Qualifications',
                '',
                <>
                  <View style={styles.sectionHeaderWithButton}>
                    <View style={styles.inputRow}>
                      {renderInput(
                        'QUALIFICATION TYPE',
                        'qualificationType',
                        'Degree details',
                        'half',
                      )}
                      {renderInput(
                        'DEGREE NAME *',
                        'degreeName',
                        'Degree Name',
                        'half',
                      )}
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>Add Education</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputRow}>
                    {renderInput(
                      'START DATE *',
                      'startDate',
                      'Start Date',
                      'half',
                    )}
                    {renderInput(
                      'UNIVERSITY *',
                      'university',
                      'University Name',
                      'half',
                    )}
                  </View>

                  <View style={styles.inputRow}>
                    {renderInput(
                      'YEAR OF PASSING *',
                      'yearOfPassing',
                      'Year',
                      'half',
                    )}
                    {renderInput(
                      'PERCENTAGE/CGPA *',
                      'percentage',
                      'CGPA or Percentage',
                      'half',
                    )}
                  </View>

                  <View style={styles.inputRow}>
                    {renderInput(
                      'SPECIALIZATION',
                      'specialization',
                      'Specialization/Stream',
                      'half',
                    )}
                    <View style={styles.inputContainer} />
                  </View>
                </>,
              )}

              {/* Work Experience Section */}
              {renderSection(
                '2',
                'Work Experience',
                '',
                <>
                  <View style={styles.sectionHeaderWithButton}>
                    <View style={styles.inputRow}>
                      {renderInput(
                        'COMPANY NAME *',
                        'companyName',
                        'Job Title',
                        'half',
                      )}
                      {renderInput(
                        'JOB TITLE *',
                        'jobTitle',
                        'Job Title',
                        'half',
                      )}
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>Add Experience</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputRow}>
                    {renderInput(
                      'START YEAR *',
                      'startYear',
                      '01-Jan-2020',
                      'half',
                      'date',
                    )}
                    {renderInput(
                      'END YEAR *',
                      'endYear',
                      '01-Jan-2023',
                      'half',
                      'date',
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() =>
                      updateFormData(
                        'currentJob',
                        (!formData.currentJob).toString(),
                      )
                    }
                  >
                    <CheckboxIcon checked={formData.currentJob} />
                    <Text style={styles.checkboxLabel}>Is Current Job</Text>
                  </TouchableOpacity>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>RESPONSIBILITIES *</Text>
                    <View style={styles.textAreaWrapper}>
                      <TextInput
                        style={styles.textArea}
                        placeholder=""
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={4}
                        value={formData.responsibilities}
                        onChangeText={value =>
                          updateFormData('responsibilities', value)
                        }
                      />
                    </View>
                  </View>
                </>,
              )}

              {/* Technical Skills Section */}
              {renderSection(
                '3',
                'Technical Skills',
                '',
                <>
                  <View style={styles.sectionHeaderWithButton}>
                    <View style={styles.inputRow}>
                      {renderInput(
                        'SKILL NAME *',
                        'skillName',
                        'e.g. Python, Java, SQL',
                        'half',
                      )}
                      {renderInput(
                        'CATEGORY *',
                        'category',
                        'e.g. Programming, Database',
                        'half',
                      )}
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>Add Skill</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputRow}>
                    {renderInput(
                      'PROFICIENCY LEVEL *',
                      'proficiencyLevel',
                      'Select',
                      'half',
                      'dropdown',
                    )}
                    {renderInput(
                      'YEARS OF EXPERIENCE *',
                      'yearsOfExperience',
                      'Years',
                      'half',
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() =>
                      updateFormData(
                        'certificationAvailable',
                        (!formData.certificationAvailable).toString(),
                      )
                    }
                  >
                    <CheckboxIcon checked={formData.certificationAvailable} />
                    <Text style={styles.checkboxLabel}>
                      Certification Available
                    </Text>
                  </TouchableOpacity>
                </>,
              )}

              {/* Emergency Contacts Section */}
              {renderSection(
                '4',
                'Emergency Contacts',
                '',
                <>
                  <View style={styles.sectionHeaderWithButton}>
                    <View style={styles.inputRow}>
                      {renderInput(
                        'CONTACT NAME *',
                        'contactName',
                        'Full Name',
                        'half',
                      )}
                      {renderInput(
                        'RELATIONSHIP *',
                        'relationship',
                        'e.g. Father/Mother',
                        'half',
                      )}
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>Add Contact</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputRow}>
                    {renderInput(
                      'PHONE NUMBER *',
                      'phoneNumber',
                      'e.g. +91-9876543210',
                      'half',
                    )}
                    {renderInput('EMAIL', 'email', 'Email Address', 'half')}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>ALTERNATE CONTACT</Text>
                    <View style={styles.textAreaWrapper}>
                      <TextInput
                        style={styles.textArea}
                        placeholder=""
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={3}
                        value={formData.alternateContact}
                        onChangeText={value =>
                          updateFormData('alternateContact', value)
                        }
                      />
                    </View>
                  </View>
                </>,
              )}
            </>
          )}
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.previousButton}>
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>
              {activeTab === 'experience' ? 'Create Employee' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },

  // Header Styles
  header: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },

  // Tabs Styles
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: '#F3F4F6',
  },
  tabNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeTabNumber: {
    backgroundColor: '#3B82F6',
  },
  tabNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabNumberText: {
    color: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#374151',
  },

  // Main Content Styles
  mainContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
  },

  // Section Styles
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  sectionContent: {
    marginLeft: 44,
  },

  // Input Styles
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  inputContainer: {
    flex: 1,
  },
  fullWidthInput: {
    flex: 2,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 40,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
    paddingVertical: 0,
  },
  inputIcon: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },

  // Footer Styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  nextButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  // Personal & Family Tab Styles
  tabHeader: {
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tabHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  tabHeaderSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Text Area Styles
  textAreaWrapper: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 80,
  },
  textArea: {
    fontSize: 14,
    color: '#111827',
    textAlignVertical: 'top',
    paddingVertical: 0,
  },

  // Checkbox Styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  checkboxIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },

  // Upload Section Styles
  uploadSection: {
    alignItems: 'center',
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    width: '100%',
  },
  uploadIcon: {
    fontSize: 48,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  uploadNote: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Experience & Skills Section Styles
  sectionHeaderWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Footer Button Styles Update
  previousButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    marginRight: 12,
  },
  previousButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },

  // Coming Soon Styles
  comingSoon: {
    padding: 40,
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default AddEmployeeScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import {
  widthPixel,
  heightPixel,
  fontPixel,
  componentSizes,
  isSmallDevice,
} from '../../utils/responsive';

const MyProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: 'Advika',
    lastName: 'Singh',
    email: 'advika.singh50@company.com',
    phone: '',
    dateOfBirth: '',
    username: 'advika.singh50@company.com',
  });

  // Icons
  const UserIcon = () => (
    <Text style={styles.profileIcon}>👤</Text>
  );

  const PersonalInfoIcon = () => (
    <Text style={[styles.tabIcon, { color: activeTab === 'personal' ? colors.primaryDarkBlue : colors.grayText }]}>👤</Text>
  );

  const SettingsIcon = () => (
    <Text style={[styles.tabIcon, { color: activeTab === 'settings' ? colors.primaryDarkBlue : colors.grayText }]}>⚙️</Text>
  );

  const SecurityIcon = () => (
    <Text style={[styles.tabIcon, { color: activeTab === 'security' ? colors.primaryDarkBlue : colors.grayText }]}>🛡️</Text>
  );

  const SessionsIcon = () => (
    <Text style={[styles.tabIcon, { color: activeTab === 'sessions' ? colors.primaryDarkBlue : colors.grayText }]}>🕐</Text>
  );

  const CheckIcon = () => (
    <Text style={styles.buttonIcon}>✓</Text>
  );

  const CalendarIcon = () => (
    <Text style={[styles.inputIcon, { color: colors.grayText }]}>📅</Text>
  );

  const renderProfileHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <UserIcon />
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Advika Singh</Text>
          <View style={styles.roleContainer}>
            <Text style={styles.roleIcon}>📍</Text>
            <Text style={styles.roleText}>HR Admin</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>📅</Text>
          </View>
          <Text style={styles.statValue}>Jun 2025</Text>
          <Text style={styles.statLabel}>Member Since</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>Jul 24</Text>
          <Text style={styles.statLabel}>Last Login</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>28</Text>
          <Text style={styles.statLabel}>Active Sessions</Text>
        </View>
      </View>
    </View>
  );

  const renderTabNavigation = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'personal' && styles.activeTab]}
        onPress={() => setActiveTab('personal')}
      >
        <PersonalInfoIcon />
        <Text style={[
          styles.tabText, 
          { color: activeTab === 'personal' ? colors.primaryDarkBlue : colors.grayText }
        ]}>
          Personal Info
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
        onPress={() => setActiveTab('settings')}
      >
        <SettingsIcon />
        <Text style={[
          styles.tabText, 
          { color: activeTab === 'settings' ? colors.primaryDarkBlue : colors.grayText }
        ]}>
          Account Settings
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'security' && styles.activeTab]}
        onPress={() => setActiveTab('security')}
      >
        <SecurityIcon />
        <Text style={[
          styles.tabText, 
          { color: activeTab === 'security' ? colors.primaryDarkBlue : colors.grayText }
        ]}>
          Security
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'sessions' && styles.activeTab]}
        onPress={() => setActiveTab('sessions')}
      >
        <SessionsIcon />
        <Text style={[
          styles.tabText, 
          { color: activeTab === 'sessions' ? colors.primaryDarkBlue : colors.grayText }
        ]}>
          Active Sessions
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderFormField = (
    label: string,
    value: string,
    placeholder: string,
    keyName: keyof typeof formData,
    isDisabled = false,
    hasIcon = false
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={[styles.fieldLabel, { color: colors.grayText }]}>{label}</Text>
      <View style={[styles.inputContainer, { backgroundColor: colors.lightGray, borderColor: colors.borderGray }]}>
        <TextInput
          style={[
            styles.textInput, 
            { color: isDisabled ? colors.grayText : colors.darkGrayText }
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.grayText}
          editable={!isDisabled}
          onChangeText={(text) => setFormData(prev => ({ ...prev, [keyName]: text }))}
        />
        {hasIcon && <CalendarIcon />}
      </View>
      {isDisabled && (
        <Text style={[styles.helperText, { color: colors.grayText }]}>
          Username cannot be changed
        </Text>
      )}
    </View>
  );

  const renderPersonalInfoContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.sectionHeader}>
        <PersonalInfoIcon />
        <Text style={[styles.sectionTitle, { color: colors.darkGrayText }]}>Basic Information</Text>
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.formRow}>
          <View style={styles.halfWidth}>
            {renderFormField('First Name', formData.firstName, 'Enter first name', 'firstName')}
          </View>
          <View style={styles.halfWidth}>
            {renderFormField('Last Name', formData.lastName, 'Enter last name', 'lastName')}
          </View>
        </View>
        
        <View style={styles.formRow}>
          <View style={styles.halfWidth}>
            {renderFormField('Email Address', formData.email, 'Enter email address', 'email')}
          </View>
          <View style={styles.halfWidth}>
            {renderFormField('Phone Number', formData.phone, 'Enter phone number', 'phone')}
          </View>
        </View>
        
        <View style={styles.formRow}>
          <View style={styles.halfWidth}>
            {renderFormField('Date of Birth', formData.dateOfBirth, 'dd-mm-yyyy', 'dateOfBirth', false, true)}
          </View>
          <View style={styles.halfWidth}>
            {renderFormField('Username', formData.username, 'Username', 'username', true)}
          </View>
        </View>
        
        <TouchableOpacity style={[styles.updateButton, { backgroundColor: colors.accentGreen }]}>
          <CheckIcon />
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfoContent();
      case 'settings':
        return (
          <View style={styles.contentContainer}>
            <Text style={[styles.placeholderText, { color: colors.grayText }]}>
              Account Settings content coming soon...
            </Text>
          </View>
        );
      case 'security':
        return (
          <View style={styles.contentContainer}>
            <Text style={[styles.placeholderText, { color: colors.grayText }]}>
              Security settings content coming soon...
            </Text>
          </View>
        );
      case 'sessions':
        return (
          <View style={styles.contentContainer}>
            <Text style={[styles.placeholderText, { color: colors.grayText }]}>
              Active Sessions content coming soon...
            </Text>
          </View>
        );
      default:
        return renderPersonalInfoContent();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        {renderTabNavigation()}
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  
  // Header Styles - Matching Reference Image
  headerContainer: {
    backgroundColor: '#475569',
    borderRadius: widthPixel(16),
    margin: widthPixel(16),
    marginBottom: heightPixel(8),
    padding: widthPixel(24),
    paddingTop: heightPixel(32),
    paddingBottom: heightPixel(24),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPixel(32),
  },
  avatarContainer: {
    width: widthPixel(80),
    height: widthPixel(80),
    borderRadius: widthPixel(40),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthPixel(20),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileIcon: {
    fontSize: fontPixel(32),
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: fontPixel(28),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: heightPixel(8),
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleIcon: {
    fontSize: fontPixel(16),
    marginRight: widthPixel(8),
  },
  roleText: {
    fontSize: fontPixel(16),
    color: '#64B5F6',
    fontWeight: '500',
  },
  
  // Statistics Styles
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    width: widthPixel(32),
    height: widthPixel(32),
    borderRadius: widthPixel(16),
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPixel(8),
  },
  statIcon: {
    fontSize: fontPixel(16),
    color: '#fff',
  },
  statValue: {
    fontSize: fontPixel(20),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: heightPixel(4),
  },
  statLabel: {
    fontSize: fontPixel(14),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  
  // Tab Navigation Styles
  tabContainer: {
    flexDirection: isSmallDevice() ? 'column' : 'row',
    backgroundColor: '#fff',
    margin: widthPixel(16),
    marginTop: 0,
    borderRadius: widthPixel(16),
    padding: widthPixel(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: heightPixel(2) },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(8),
    elevation: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(12),
    borderRadius: widthPixel(12),
    flex: isSmallDevice() ? 0 : 1,
    justifyContent: isSmallDevice() ? 'flex-start' : 'center',
    marginBottom: isSmallDevice() ? heightPixel(4) : 0,
  },
  activeTab: {
    backgroundColor: '#E3F2FD',
  },
  tabIcon: {
    fontSize: fontPixel(16),
    marginRight: widthPixel(8),
  },
  tabText: {
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  
  // Content Styles
  contentContainer: {
    backgroundColor: '#fff',
    margin: widthPixel(16),
    marginTop: 0,
    borderRadius: widthPixel(16),
    padding: widthPixel(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: heightPixel(2) },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(8),
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPixel(24),
  },
  sectionTitle: {
    fontSize: fontPixel(20),
    fontWeight: '600',
    marginLeft: widthPixel(12),
  },
  
  // Form Styles
  formContainer: {
    gap: heightPixel(20),
  },
  formRow: {
    flexDirection: isSmallDevice() ? 'column' : 'row',
    gap: widthPixel(16),
  },
  halfWidth: {
    flex: isSmallDevice() ? 0 : 1,
  },
  fieldContainer: {
    marginBottom: heightPixel(4),
  },
  fieldLabel: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    marginBottom: heightPixel(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: widthPixel(8),
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(12),
    minHeight: componentSizes.inputHeight,
  },
  textInput: {
    flex: 1,
    fontSize: fontPixel(16),
  },
  inputIcon: {
    fontSize: fontPixel(16),
    marginLeft: widthPixel(8),
  },
  helperText: {
    fontSize: fontPixel(12),
    marginTop: heightPixel(4),
    fontStyle: 'italic',
  },
  
  // Button Styles
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPixel(24),
    paddingVertical: heightPixel(14),
    borderRadius: widthPixel(12),
    marginTop: heightPixel(16),
    alignSelf: 'flex-start',
    minHeight: componentSizes.buttonHeight,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: fontPixel(16),
    fontWeight: '600',
    marginLeft: widthPixel(8),
  },
  buttonIcon: {
    fontSize: fontPixel(16),
    color: '#fff',
  },
  
  // Placeholder Styles
  placeholderText: {
    fontSize: fontPixel(16),
    textAlign: 'center',
    padding: heightPixel(40),
  },
});

export default MyProfileScreen;
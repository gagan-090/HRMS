import React, { useState, useRef } from 'react';
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
  StatusBar,
  LayoutAnimation,
} from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polyline, G } from 'react-native-svg'; // Import G for grouping SVG elements
import LinearGradient from 'react-native-linear-gradient'; // For gradients

const colors = {
  primaryDarkBlue: '#1D2B64',
  white: '#FFFFFF',
  lightGray: '#F3F4F6',
  grayText: '#6B7280',
  darkGrayText: '#1F2937',
  blue: '#007BFF',
  green: '#198754',
  yellow: '#FFC107',
  red: '#DC3545',
  lightBlue: '#0D6EFD',
  secondaryText: '#6C757D',
  borderGray: '#E5E7EB',
  gradientPurpleEnd: '#E100FF',
  sidebarActiveBg: '#3A4B8F',
  sidebarSubItemBg: '#2A376B',
  sidebarSectionTitle: '#9CA3AF',
};

// Define typography
const typography = {
  fontFamily: 'System',
};

// --- CustomSvgIcon Component ---
interface CustomSvgIconProps {
  name: string;
  size: number;
  color: string;
  style?: object;
}

const CustomSvgIcon: React.FC<CustomSvgIconProps> = ({ name, size, color, style }) => {
  let iconPath;

  // Comprehensive SVG paths for all required icons
  switch (name) {
    case 'menu':
      iconPath = (
        <G>
          <Line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'search':
      iconPath = (
        <G>
          <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'bell':
      iconPath = (
        <G>
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'chevron-down':
      iconPath = <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
      break;
    case 'chevron-right':
      iconPath = <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />;
      break;
    case 'sun':
      iconPath = (
        <G>
          <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" />
          <Line x1="12" y1="1" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="12" y1="21" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="1" y1="12" x2="3" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="21" y1="12" x2="23" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'users':
      iconPath = (
        <G>
          <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" />
          <Path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'check-circle':
      iconPath = (
        <G>
          <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M22 4L12 14.01l-3-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'briefcase':
      iconPath = (
        <G>
          <Rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke={color} strokeWidth="2" />
          <Path d="M16 2a2 2 0 0 0-2 2V7H10V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3h16V4a2 2 0 0 0-2-2h-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'calendar':
      iconPath = (
        <G>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" />
          <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'file-text':
      iconPath = (
        <G>
          <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M14 2v6h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'dollar-sign':
      iconPath = (
        <G>
          <Line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 1 0 1 0 7H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'clock':
      iconPath = (
        <G>
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
          <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'user':
      iconPath = (
        <G>
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
        </G>
      );
      break;
    case 'lock':
      iconPath = (
        <G>
          <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="2" />
          <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'grid':
      iconPath = (
        <G>
          <Rect x="3" y="3" width="7" height="7" rx="1" ry="1" stroke={color} strokeWidth="2" />
          <Rect x="14" y="3" width="7" height="7" rx="1" ry="1" stroke={color} strokeWidth="2" />
          <Rect x="14" y="14" width="7" height="7" rx="1" ry="1" stroke={color} strokeWidth="2" />
          <Rect x="3" y="14" width="7" height="7" rx="1" ry="1" stroke={color} strokeWidth="2" />
        </G>
      );
      break;
    case 'list': // All Employees, All Attendance, All Leaves, Job Positions
        iconPath = (
            <G>
                <Line x1="8" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="6" x2="3.01" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="12" x2="3.01" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="18" x2="3.01" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'user-plus': // Add Employee
        iconPath = (
            <G>
                <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="8.5" cy="7" r="4" stroke={color} strokeWidth="2" />
                <Line x1="20" y1="8" x2="20" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="23" y1="11" x2="17" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'upload': // Import Employees, Bulk Upload
        iconPath = (
            <G>
                <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Polyline points="17 8 12 3 7 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="3" x2="12" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'download': // Export Employees
        iconPath = (
            <G>
                <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Polyline points="7 10 12 15 17 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'pie-chart': // Dashboard (Recruitment), Dashboard (Payroll)
        iconPath = (
            <G>
                <Path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M22 12A10 10 0 0 0 12 2v10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'clipboard-list': // Job Positions, Applications
        iconPath = (
            <G>
                <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke={color} strokeWidth="2" />
                <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="11" x2="12" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="9" y1="14" x2="15" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'users-plus': // Candidates
        iconPath = (
            <G>
                <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="8.5" cy="7" r="4" stroke={color} strokeWidth="2" />
                <Path d="M20 8v6M23 11h-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'file-plus': // Mark Attendance, Apply Leave
        iconPath = (
            <G>
                <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M14 2v6h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="18" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="9" y1="15" x2="15" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'bar-chart': // Reports (Attendance), Analytics (Recruitment)
        iconPath = (
            <G>
                <Line x1="12" y1="20" x2="12" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="6" y1="20" x2="6" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'refresh-cw': // Biometric Sync
        iconPath = (
            <G>
                <Path d="M23 4v6h-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'calendar-check': // Leave Calendar
        iconPath = (
            <G>
                <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" />
                <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Polyline points="9 16 12 19 19 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'clock-history': // Pending Approvals (using a variant of clock)
        iconPath = (
            <G>
                <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
                <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M8 12H2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M22 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'credit-card': // Payslips
        iconPath = (
            <G>
                <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke={color} strokeWidth="2" />
                <Line x1="1" y1="10" x2="23" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'git-branch': // Salary Structures, Salary Components (using branch for structure/component)
        iconPath = (
            <G>
                <Line x1="6" y1="3" x2="6" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Circle cx="18" cy="6" r="3" stroke={color} strokeWidth="2" />
                <Circle cx="6" cy="18" r="3" stroke={color} strokeWidth="2" />
                <Path d="M18 9a9 9 0 0 1-9 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'users-check': // Employee Salaries (users with check)
        iconPath = (
            <G>
                <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Circle cx="8.5" cy="7" r="4" stroke={color} strokeWidth="2" />
                <Polyline points="17 11 19 13 23 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'calendar-alt': // Payroll Periods (a simpler calendar for this specific use)
        iconPath = (
            <G>
                <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" />
                <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'coins': // Employee Loans
        iconPath = (
            <G>
                <Circle cx="8" cy="8" r="6" stroke={color} strokeWidth="2" />
                <Path d="M18.09 10.59a2 2 0 0 1 0 2.82l-1.58 1.58a2 2 0 0 1-2.82 0l-1.58-1.58a2 2 0 0 1 0-2.82l1.58-1.58a2 2 0 0 1 2.82 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M18 13L20 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </G>
        );
        break;
    case 'arrow-up-circle': // Salary Revision
        iconPath = (
            <G>
                <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
                <Polyline points="16 12 12 8 8 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="12" y1="16" x2="12" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    case 'file-invoice': // Tax Declarations (using file-text as base for now)
        iconPath = (
            <G>
                <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M14 2v6h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
                <Line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </G>
        );
        break;
    default:
      console.warn(`Unknown icon: ${name}. Rendering fallback circle.`);
      iconPath = <Circle cx="12" cy="12" r="10" fill="transparent" stroke={color} strokeWidth="2" />; // Fallback: a circle
      break;
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {iconPath}
    </Svg>
  );
};

// TypeScript interfaces for component props (remain the same)
interface HeaderProps {
  onMenuPress: () => void;
}

interface StatsCardProps {
  value: string | number;
  label: string;
  icon: string;
}

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  style?: object;
}

interface QuickActionButtonProps {
  iconName: string;
  label: string;
  color: string;
}

// --- Header Component ---
const Header: React.FC<HeaderProps> = ({ onMenuPress }) => {
  return (
    <View style={headerStyles.headerContainer}>
      <TouchableOpacity style={headerStyles.iconButton} onPress={onMenuPress}>
        <CustomSvgIcon name="menu" color={colors.grayText} size={28} />
      </TouchableOpacity>
      <View style={headerStyles.searchBarContainer}>
        <CustomSvgIcon name="search" color={colors.secondaryText} size={20} style={headerStyles.searchIcon} />
        <TextInput
          placeholder="Search employees, documents..."
          placeholderTextColor={colors.secondaryText}
          style={headerStyles.searchInput}
        />
      </View>
      <View style={headerStyles.userProfileContainer}>
        <TouchableOpacity style={headerStyles.iconButton}>
          <CustomSvgIcon name="bell" color={colors.grayText} size={28} />
        </TouchableOpacity>
        <View style={headerStyles.profileDetails}>
          <View style={headerStyles.avatar}>
            <Text style={headerStyles.avatarText}>AS</Text>
          </View>
          <View style={headerStyles.userInfo}>
            <Text style={headerStyles.userName}>Advika Singh</Text>
            <Text style={headerStyles.userRole}>HR Admin</Text>
          </View>
          <CustomSvgIcon name="chevron-down" color={colors.grayText} size={16} />
        </View>
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    backgroundColor: colors.lightGray,
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
    color: colors.darkGrayText,
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
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    marginRight: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGrayText,
  },
  userRole: {
    fontSize: 12,
    color: colors.secondaryText,
  },
});

const StatsCard: React.FC<StatsCardProps> = ({ value, label, icon }) => {
  let iconColor = colors.blue;
  if (icon === 'check-circle') iconColor = colors.green;
  else if (icon === 'users') iconColor = colors.gradientPurpleEnd || colors.blue;
  else if (icon === 'calendar') iconColor = colors.red;

  return (
    <View style={statsCardStyles.cardContainer}>
      <View>
        <Text style={statsCardStyles.valueText}>{value}</Text>
        <Text style={statsCardStyles.labelText}>{label}</Text>
      </View>
      <CustomSvgIcon name={icon} color={iconColor} size={32} />
    </View>
  );
};

const statsCardStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: Dimensions.get('window').width / 2 - 24,
    marginBottom: 8,
  },
  valueText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkGrayText,
  },
  labelText: {
    fontSize: 13,
    color: colors.secondaryText,
    marginTop: 4,
  },
});

const SectionCard: React.FC<SectionCardProps> = ({ title, children, style }) => {
  return (
    <View style={[sectionCardStyles.cardContainer, style]}>
      <Text style={sectionCardStyles.titleText}>{title}</Text>
      <View style={sectionCardStyles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

const sectionCardStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkGrayText,
    marginBottom: 12,
  },
  contentContainer: {
    flex: 1,
  },
});

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ iconName, label, color }) => {
  return (
    <TouchableOpacity style={quickActionButtonStyles.buttonContainer}>
      <View style={[quickActionButtonStyles.iconBackground, { backgroundColor: color + '1A' }]}>
        <CustomSvgIcon name={iconName} color={color} size={32} />
      </View>
      <Text style={quickActionButtonStyles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

const quickActionButtonStyles = StyleSheet.create({
  buttonContainer: {
    width: '48%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderGray,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.darkGrayText,
    textAlign: 'center',
  },
});

// --- Sidebar Component ---
interface SidebarProps {
  // No props needed for this self-contained version, but can be added if state needs to be passed down
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [activeItem, setActiveItem] = useState<string>('Dashboard'); // State to manage active item

  const toggleSection = (sectionLabel: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections(prevState => ({
      ...prevState,
      [sectionLabel]: !prevState[sectionLabel],
    }));
  };

  const handleItemPress = (itemLabel: string, hasChildren: boolean = false) => {
    if (hasChildren) {
      toggleSection(itemLabel);
    } else {
      setActiveItem(itemLabel);
      // In a real app, you'd navigate here
      console.log(`Navigating to: ${itemLabel}`);
    }
  };

  const sidebarSections: { title: string; items: { icon: string; label: string; children?: { icon: string; label: string }[] }[] }[] = [
    {
      title: 'MAIN',
      items: [
        { icon: 'grid', label: 'Dashboard' },
      ],
    },
    {
      title: 'HR MANAGEMENT',
      items: [
        {
          icon: 'users',
          label: 'Employees',
          children: [
            { icon: 'list', label: 'All Employees' },
            { icon: 'user-plus', label: 'Add Employee' },
            { icon: 'upload', label: 'Import Employees' },
            { icon: 'download', label: 'Export Employees' },
          ],
        },
        {
          icon: 'briefcase',
          label: 'Recruitment',
          children: [
            { icon: 'pie-chart', label: 'Dashboard' },
            { icon: 'list', label: 'Job Positions' }, // Changed to list
            { icon: 'users-plus', label: 'Candidates' },
            { icon: 'file-text', label: 'Applications' },
            { icon: 'calendar', label: 'Interviews' },
            { icon: 'bar-chart', label: 'Analytics' },
          ],
        },
        {
          icon: 'calendar', // Main icon for Attendance
          label: 'Attendance',
          children: [
            { icon: 'list', label: 'All Attendance' },
            { icon: 'user', label: 'My Attendance' },
            { icon: 'file-plus', label: 'Mark Attendance' },
            { icon: 'bar-chart', label: 'Reports' },
            { icon: 'refresh-cw', label: 'Biometric Sync' },
          ],
        },
        {
          icon: 'calendar', // Main icon for Leaves
          label: 'Leaves',
          children: [
            { icon: 'list', label: 'All Leaves' },
            { icon: 'file-plus', label: 'Apply Leave' },
            { icon: 'calendar-check', label: 'Leave Calendar' },
            { icon: 'clock-history', label: 'Pending Approvals' },
          ],
        },
        {
          icon: 'dollar-sign', // Main icon for Payroll
          label: 'Payroll',
          children: [
            { icon: 'pie-chart', label: 'Dashboard' },
            { icon: 'credit-card', label: 'Payslips' },
            { icon: 'git-branch', label: 'Salary Structures' },
            { icon: 'git-branch', label: 'Salary Components' },
            { icon: 'users-check', label: 'Employee Salaries' },
            { icon: 'calendar-alt', label: 'Payroll Periods' },
            { icon: 'coins', label: 'Employee Loans' },
            { icon: 'upload', label: 'Bulk Upload' },
            { icon: 'arrow-up-circle', label: 'Salary Revision' },
            { icon: 'file-invoice', label: 'Tax Declarations' },
          ],
        },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { icon: 'user', label: 'My Profile' },
        { icon: 'lock', label: 'Security & Sessions' },
      ],
    },
  ];

  return (
    <View style={sidebarStyles.container}>
      <View style={sidebarStyles.header}>
        <View style={sidebarStyles.logoContainer}>
          <CustomSvgIcon name="briefcase" color={colors.white} size={28} style={{ marginRight: 8 }} />
          <View>
            <Text style={sidebarStyles.headerText}>HRMS</Text>
            <Text style={sidebarStyles.subHeaderText}>Tech Innovations Pvt Ltd</Text>
          </View>
        </View>
      </View>
      <ScrollView style={sidebarStyles.scrollView}>
        {sidebarSections.map((section, sectionIndex) => (
          <View key={section.title} style={sidebarStyles.sectionContainer}>
            <Text style={sidebarStyles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => {
              const isActive = activeItem === item.label;
              const isExpanded = expandedSections[item.label];
              const hasChildren = item.children && item.children.length > 0;

              return (
                <View key={item.label}>
                  <TouchableOpacity
                    style={[
                      sidebarStyles.item,
                      isActive && sidebarStyles.activeItem,
                      hasChildren && sidebarStyles.parentItem,
                    ]}
                    onPress={() => handleItemPress(item.label, hasChildren)}
                  >
                    <CustomSvgIcon name={item.icon} color={isActive ? colors.white : colors.white} size={20} />
                    <Text style={[sidebarStyles.label, isActive && sidebarStyles.activeLabel]}>{item.label}</Text>
                    {hasChildren && (
                      <CustomSvgIcon
                        name={isExpanded ? 'chevron-down' : 'chevron-right'}
                        color={colors.white}
                        size={16}
                        style={sidebarStyles.chevron}
                      />
                    )}
                  </TouchableOpacity>
                  {hasChildren && isExpanded && (
                    <View style={sidebarStyles.subItemsContainer}>
                      {item.children?.map((subItem) => {
                        const isSubItemActive = activeItem === subItem.label;
                        return (
                          <TouchableOpacity
                            key={subItem.label}
                            style={[
                              sidebarStyles.subItem,
                              isSubItemActive && sidebarStyles.activeSubItem,
                            ]}
                            onPress={() => handleItemPress(subItem.label)}
                          >
                            <CustomSvgIcon name={subItem.icon} color={isSubItemActive ? colors.white : colors.white} size={18} style={sidebarStyles.subItemIcon} />
                            <Text style={[sidebarStyles.subItemLabel, isSubItemActive && sidebarStyles.activeSubItemLabel]}>{subItem.label}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const sidebarStyles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: colors.primaryDarkBlue,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    fontFamily: typography.fontFamily,
  },
  subHeaderText: {
    fontSize: 12,
    color: colors.white,
    fontFamily: typography.fontFamily,
  },
  sectionContainer: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 12,
    color: colors.sidebarSectionTitle,
    paddingHorizontal: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  parentItem: {
    // No specific style for parent, handled by general item style
  },
  activeItem: {
    backgroundColor: colors.sidebarActiveBg,
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.white,
    fontWeight: '400',
    fontFamily: typography.fontFamily,
  },
  activeLabel: {
    fontWeight: '600',
    color: colors.white,
  },
  chevron: {
    marginLeft: 'auto',
  },
  subItemsContainer: {
    paddingLeft: 30, // Indent sub-items
    backgroundColor: colors.sidebarSubItemBg, // Slightly different background for sub-items
    marginHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden', // Ensure content respects border radius
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  activeSubItem: {
    backgroundColor: colors.sidebarActiveBg, // Active background for sub-items
  },
  subItemIcon: {
    marginRight: 10,
  },
  subItemLabel: {
    fontSize: 14,
    color: colors.white,
    fontFamily: typography.fontFamily,
  },
  activeSubItemLabel: {
    fontWeight: '600',
  },
});

// --- Main App Component ---
const quickActions = [
  { iconName: 'user', label: 'Add Employee', color: colors.blue },
  { iconName: 'file-text', label: 'Attendance Report', color: colors.blue },
  { iconName: 'check-circle', label: 'Leave Approvals', color: colors.yellow },
  { iconName: 'dollar-sign', label: 'Payroll', color: colors.green },
  { iconName: 'clock', label: 'My Attendance', color: colors.secondaryText },
  { iconName: 'calendar', label: 'Apply Leave', color: colors.red },
];

function App() {
  const drawer = useRef<DrawerLayoutAndroid | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (Platform.OS === 'android' && drawer.current) {
      if (isSidebarOpen) {
        drawer.current.closeDrawer();
      } else {
        drawer.current.openDrawer();
      }
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      console.log("Drawer toggle pressed on non-Android platform. Consider using @react-navigation/drawer for cross-platform.");
    }
  };

  const navigationView = () => <Sidebar />;

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <>
      {Platform.OS === 'android' ? (
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={250}
          drawerPosition="left"
          renderNavigationView={navigationView}
          onDrawerClose={() => setIsSidebarOpen(false)}
          onDrawerOpen={() => setIsSidebarOpen(true)}
        >
          <SafeAreaView style={styles.container}>
            <Header onMenuPress={toggleSidebar} />
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.welcomeBanner}>
                <View style={styles.welcomeTextContainer}>
                  <Text style={styles.welcomeTitle}>Welcome back, Advika Singh!</Text>
                  <Text style={styles.welcomeSubtitle}>{formattedDate} • Manage your team efficiently</Text>
                </View>
                <CustomSvgIcon name="sun" color={colors.white} size={36} />
              </View>
              <View style={styles.statsSection}>
                <StatsCard value="51" label="Total Employees" icon="users" />
                <StatsCard value="0" label="Present Today" icon="check-circle" />
                <StatsCard value="6" label="Departments" icon="users" />
                <StatsCard value="8" label="Pending Leaves" icon="calendar" />
              </View>
              <View style={styles.contentCardsContainer}>
                <SectionCard title="Recent Activities" style={styles.sectionCard}>
                  <View style={styles.noActivitiesContainer}>
                    <CustomSvgIcon name="file-text" color={colors.secondaryText} size={40} />
                    <Text style={styles.noActivitiesText}>No recent activities</Text>
                  </View>
                </SectionCard>
                <SectionCard title="Quick Actions" style={styles.sectionCard}>
                  <View style={styles.quickActionsGrid}>
                    {quickActions.map((action) => (
                      <QuickActionButton
                        key={action.label}
                        iconName={action.iconName}
                        label={action.label}
                        color={action.color}
                      />
                    ))}
                  </View>
                </SectionCard>
              </View>
              <SectionCard title="Monthly Attendance Overview" style={styles.attendanceOverviewCard}>
                <View style={styles.attendanceStats}>
                  <View style={styles.attendanceStatItem}>
                    <Text style={[styles.attendanceValue, { color: colors.green }]}>0.0%</Text>
                    <Text style={styles.attendanceLabel}>Attendance Rate</Text>
                  </View>
                  <View style={styles.attendanceStatItem}>
                    <Text style={[styles.attendanceValue, { color: colors.lightBlue }]}>0</Text>
                    <Text style={styles.attendanceLabel}>Present Days</Text>
                  </View>
                  <View style={styles.attendanceStatItem}>
                    <Text style={[styles.attendanceValue, { color: colors.yellow }]}>0</Text>
                    <Text style={styles.attendanceLabel}>Late Arrivals</Text>
                  </View>
                  <View style={styles.attendanceStatItem}>
                    <Text style={[styles.attendanceValue, { color: colors.red }]}>0</Text>
                    <Text style={styles.attendanceLabel}>Absent Days</Text>
                  </View>
                </View>
              </SectionCard>
            </ScrollView>
          </SafeAreaView>
        </DrawerLayoutAndroid>
      ) : (
        // Fallback for iOS and other platforms (e.g., web)
        <SafeAreaView style={styles.container}>
          <Header onMenuPress={toggleSidebar} />
          {/* Simple static sidebar for iOS to show the UI layout */}
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Sidebar />
            <ScrollView contentContainerStyle={[styles.scrollContent, { flex: 1 }]}>
              <View style={styles.welcomeBanner}>
                <View style={styles.welcomeTextContainer}>
                  <Text style={styles.welcomeTitle}>Welcome back, Advika Singh!</Text>
                  <Text style={styles.welcomeSubtitle}>{formattedDate} • Manage your team efficiently</Text>
                </View>
                <CustomSvgIcon name="sun" color={colors.white} size={36} />
              </View>
              <View style={styles.statsSection}>
                <StatsCard value="51" label="Total Employees" icon="users" />
                <StatsCard value="0" label="Present Today" icon="check-circle" />
                <StatsCard value="6" label="Departments" icon="users" />
                <StatsCard value="8" label="Pending Leaves" icon="calendar" />
              </View>
              <View style={styles.contentCardsContainer}>
                <SectionCard title="Recent Activities" style={styles.sectionCard}>
                  <View style={styles.noActivitiesContainer}>
                    <CustomSvgIcon name="file-text" color={colors.secondaryText} size={40} />
                    <Text style={styles.noActivitiesText}>No recent activities</Text>
                  </View>
                </SectionCard>
                <SectionCard title="Quick Actions" style={styles.sectionCard}>
                  <View style={styles.quickActionsGrid}>
                    {quickActions.map((action) => (
                      <QuickActionButton
                        key={action.label}
                        iconName={action.iconName}
                        label={action.label}
                        color={action.color}
                      />
                    ))}
                  </View>
                </SectionCard>
              </View>
              <SectionCard title="Monthly Attendance Overview" style={styles.attendanceOverviewCard}>
                <View style={styles.attendanceStats}>
                  <View style={styles.attendanceStatItem}>
                    <Text style={[styles.attendanceValue, { color: colors.green }]}>0.0%</Text>
                    <Text style={styles.attendanceLabel}>Attendance Rate</Text>
                  </View>
                  <View style={styles.attendanceStatItem}>
                    <Text style={[styles.attendanceValue, { color: colors.lightBlue }]}>0</Text>
                    <Text style={styles.attendanceLabel}>Present Days</Text>
                  </View>
                  <View style={styles.attendanceStatItem}>
                    <Text style={[styles.attendanceValue, { color: colors.yellow }]}>0</Text>
                    <Text style={styles.attendanceLabel}>Late Arrivals</Text>
                  </View>
                  <View style={styles.attendanceStatItem}>
                    <Text style={[styles.attendanceValue, { color: colors.red }]}>0</Text>
                    <Text style={styles.attendanceLabel}>Absent Days</Text>
                  </View>
                </View>
              </SectionCard>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  welcomeBanner: {
    backgroundColor: colors.primaryDarkBlue,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  welcomeTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
    fontFamily: typography.fontFamily,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
    fontFamily: typography.fontFamily,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  contentCardsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionCard: {
    flex: 1,
    minWidth: '48%',
    marginHorizontal: 6,
    marginBottom: 16,
  },
  noActivitiesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noActivitiesText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'center',
    fontFamily: typography.fontFamily,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  attendanceOverviewCard: {
    marginTop: 0,
    marginBottom: 16,
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    flexWrap: 'wrap',
  },
  attendanceStatItem: {
    alignItems: 'center',
    marginVertical: 8,
    width: '45%',
  },
  attendanceValue: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: typography.fontFamily,
  },
  attendanceLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
    textAlign: 'center',
  },
});

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header onMenuPress={() => {}} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeBanner}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Welcome back, Advika Singh!</Text>
            <Text style={styles.welcomeSubtitle}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              • Manage your team efficiently
            </Text>
          </View>
          <CustomSvgIcon name="sun" color={colors.white} size={36} />
        </View>
        <View style={styles.statsSection}>
          <StatsCard value="51" label="Total Employees" icon="users" />
          <StatsCard value="0" label="Present Today" icon="check-circle" />
          <StatsCard value="6" label="Departments" icon="users" />
          <StatsCard value="8" label="Pending Leaves" icon="calendar" />
        </View>
        <View style={styles.contentCardsContainer}>
          <SectionCard title="Recent Activities" style={styles.sectionCard}>
            <View style={styles.noActivitiesContainer}>
              <CustomSvgIcon name="file-text" color={colors.secondaryText} size={40} />
              <Text style={styles.noActivitiesText}>No recent activities</Text>
            </View>
          </SectionCard>
          <SectionCard title="Quick Actions" style={styles.sectionCard}>
            <View style={styles.quickActionsGrid}>
              <QuickActionButton iconName="user" label="Add Employee" color={colors.blue} />
              <QuickActionButton iconName="file-text" label="Attendance Report" color={colors.blue} />
              <QuickActionButton iconName="check-circle" label="Leave Approvals" color={colors.yellow} />
              <QuickActionButton iconName="dollar-sign" label="Payroll" color={colors.green} />
              <QuickActionButton iconName="clock" label="My Attendance" color={colors.secondaryText} />
              <QuickActionButton iconName="calendar" label="Apply Leave" color={colors.red} />
            </View>
          </SectionCard>
        </View>
        <SectionCard title="Monthly Attendance Overview" style={styles.attendanceOverviewCard}>
          <View style={styles.attendanceStats}>
            <View style={styles.attendanceStatItem}>
              <Text style={[styles.attendanceValue, { color: colors.green }]}>0.0%</Text>
              <Text style={styles.attendanceLabel}>Attendance Rate</Text>
            </View>
            <View style={styles.attendanceStatItem}>
              <Text style={[styles.attendanceValue, { color: colors.lightBlue }]}>0</Text>
              <Text style={styles.attendanceLabel}>Present Days</Text>
            </View>
            <View style={styles.attendanceStatItem}>
              <Text style={[styles.attendanceValue, { color: colors.yellow }]}>0</Text>
              <Text style={styles.attendanceLabel}>Late Arrivals</Text>
            </View>
            <View style={styles.attendanceStatItem}>
              <Text style={[styles.attendanceValue, { color: colors.red }]}>0</Text>
              <Text style={styles.attendanceLabel}>Absent Days</Text>
            </View>
          </View>
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

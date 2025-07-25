import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Svg, { Path, Circle, Rect, Line, G } from 'react-native-svg';

// Import responsive utilities
import { widthPixel, heightPixel, fontPixel } from '../utils/responsive';
// Import theme context
import { useTheme } from '../context/ThemeContext';

// --- CustomSvgIcon Component ---
interface CustomSvgIconProps {
  name: string;
  size: number;
  color: string;
  style?: object;
}

const CustomSvgIcon: React.FC<CustomSvgIconProps> = ({ name, size, color, style }) => {
  let iconPath;

  switch (name) {
    case 'sun':
      iconPath = (
        <G>
          <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
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
          <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
          <Path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'check-circle':
      iconPath = (
        <G>
          <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Path d="M22 4L12 14.01l-3-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'briefcase':
      iconPath = (
        <G>
          <Rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none" />
          <Path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'calendar':
      iconPath = (
        <G>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none" />
          <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'user-plus':
      iconPath = (
        <G>
          <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Circle cx="8.5" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
          <Line x1="20" y1="8" x2="20" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="23" y1="11" x2="17" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'file-text':
      iconPath = (
        <G>
          <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Path d="M14 2v6h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
      break;
    case 'check':
      iconPath = (
        <G>
          <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </G>
      );
      break;
    case 'dollar-sign':
      iconPath = (
        <G>
          <Line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </G>
      );
      break;
    case 'clock':
      iconPath = (
        <G>
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
          <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'calendar-check':
      iconPath = (
        <G>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none" />
          <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Path d="M9 16l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
      break;
    case 'moon':
      iconPath = (
        <G>
          <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </G>
      );
      break;
    case 'cloud':
      iconPath = (
        <G>
          <Path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </G>
      );
      break;
    default:
      iconPath = <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />;
      break;
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {iconPath}
    </Svg>
  );
};

// --- StatsCard Component ---
interface StatsCardProps {
  value: string | number;
  label: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ value, label, icon, iconColor, iconBgColor }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.statsCard, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.statsContent}>
        <Text style={[styles.statsValue, { color: colors.textColor }]}>{value}</Text>
        <Text style={[styles.statsLabel, { color: colors.secondaryText }]}>{label}</Text>
      </View>
      <View style={[styles.statsIconContainer, { backgroundColor: iconBgColor }]}>
        <CustomSvgIcon name={icon} color={iconColor} size={widthPixel(20)} />
      </View>
    </View>
  );
};

// --- QuickActionButton Component ---
interface QuickActionButtonProps {
  iconName: string;
  label: string;
  color: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ iconName, label, color }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.cardBackground }]}>
      <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
        <CustomSvgIcon name={iconName} color={color} size={widthPixel(24)} />
      </View>
      <Text style={[styles.quickActionLabel, { color: colors.textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

// --- Main DashboardScreen Component ---
const DashboardScreen: React.FC = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = today.toLocaleDateString('en-US', options);

  // Sun/Moon icon animation
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const [currentIcon, setCurrentIcon] = useState(isDarkMode ? 'moon' : 'sun');
  const [iconColor, setIconColor] = useState('#FFFFFF');

  useEffect(() => {
    // Update icon when isDarkMode changes
    setCurrentIcon(isDarkMode ? 'moon' : 'sun');
    setIconColor('#FFFFFF');
  }, [isDarkMode]);

  const handleIconPress = () => {
    // Start rotation animation
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // After rotation, reset value for next rotation and toggle theme
      rotationAnim.setValue(0);
      toggleTheme();
    });
  };

  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedIconStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Welcome back, Advika Singh!</Text>
          <Text style={styles.welcomeSubtitle}>{formattedDate} • Manage your team efficiently</Text>
        </View>
        <TouchableOpacity onPress={handleIconPress}>
          <Animated.View style={animatedIconStyle}>
            <CustomSvgIcon name={currentIcon} color={iconColor} size={widthPixel(24)} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <StatsCard 
          value="51" 
          label="Total Employees" 
          icon="users" 
          iconColor="#3B82F6" 
          iconBgColor="#EFF6FF" 
        />
        <StatsCard 
          value="0" 
          label="Present Today" 
          icon="check-circle" 
          iconColor="#10B981" 
          iconBgColor="#ECFDF5" 
        />
        <StatsCard 
          value="6" 
          label="Departments" 
          icon="briefcase" 
          iconColor="#8B5CF6" 
          iconBgColor="#F3E8FF" 
        />
        <StatsCard 
          value="8" 
          label="Pending Leaves" 
          icon="calendar" 
          iconColor="#F59E0B" 
          iconBgColor="#FFFBEB" 
        />
      </View>

      {/* Recent Activities */}
      <View style={[styles.sectionCard, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Recent Activities</Text>
        <View style={styles.noActivitiesContainer}>
          <CustomSvgIcon name="cloud" color={colors.secondaryText} size={widthPixel(48)} />
          <Text style={[styles.noActivitiesText, { color: colors.secondaryText }]}>No recent activities</Text>
        </View>
      </View>

      {/* Monthly Attendance Overview */}
      <View style={[styles.sectionCard, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Monthly Attendance Overview</Text>
        <View style={styles.attendanceGrid}>
          <View style={styles.attendanceItem}>
            <Text style={[styles.attendanceValue, { color: '#10B981' }]}>0.0%</Text>
            <Text style={[styles.attendanceLabel, { color: colors.secondaryText }]}>Attendance Rate</Text>
          </View>
          <View style={styles.attendanceItem}>
            <Text style={[styles.attendanceValue, { color: '#3B82F6' }]}>0</Text>
            <Text style={[styles.attendanceLabel, { color: colors.secondaryText }]}>Present Days</Text>
          </View>
          <View style={styles.attendanceItem}>
            <Text style={[styles.attendanceValue, { color: '#F59E0B' }]}>0</Text>
            <Text style={[styles.attendanceLabel, { color: colors.secondaryText }]}>Late Arrivals</Text>
          </View>
          <View style={styles.attendanceItem}>
            <Text style={[styles.attendanceValue, { color: '#EF4444' }]}>0</Text>
            <Text style={[styles.attendanceLabel, { color: colors.secondaryText }]}>Absent Days</Text>
          </View>
        </View>
        <View style={styles.attendanceDetails}>
          <View style={styles.attendanceDetailRow}>
            <Text style={[styles.attendanceDetailLabel, { color: colors.secondaryText }]}>Present</Text>
            <Text style={[styles.attendanceDetailValue, { color: colors.textColor }]}>0</Text>
          </View>
          <View style={styles.attendanceDetailRow}>
            <Text style={[styles.attendanceDetailLabel, { color: colors.secondaryText }]}>Absent</Text>
            <Text style={[styles.attendanceDetailValue, { color: colors.textColor }]}>0</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.sectionCard, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickActionButton iconName="user-plus" label="Add Employee" color="#3B82F6" />
          <QuickActionButton iconName="file-text" label="Attendance Report" color="#3B82F6" />
          <QuickActionButton iconName="check" label="Leave Approvals" color="#10B981" />
          <QuickActionButton iconName="dollar-sign" label="Payroll" color="#10B981" />
          <QuickActionButton iconName="clock" label="My Attendance" color="#6B7280" />
          <QuickActionButton iconName="calendar-check" label="Mark Leave" color="#EF4444" />
        </View>
      </View>

      {/* Upcoming Holidays */}
      <View style={[styles.sectionCard, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Upcoming Holidays</Text>
        <View style={styles.holidayItem}>
          <View style={styles.holidayDate}>
            <Text style={styles.holidayDay}>15</Text>
            <Text style={[styles.holidayMonth, { color: colors.secondaryText }]}>Aug</Text>
          </View>
          <View style={styles.holidayInfo}>
            <Text style={[styles.holidayName, { color: colors.textColor }]}>Independence Day</Text>
            <Text style={[styles.holidayDateText, { color: colors.secondaryText }]}>Thursday, August 15</Text>
          </View>
        </View>
      </View>

      {/* Pending Approvals */}
      <View style={[styles.sectionCard, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Pending Approvals</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: '#3B82F6' }]}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.approvalsList}>
          {[
            { name: 'Aavik Singh', type: 'Annual Leave Day 1', date: 'Aug 5 - Aug 7' },
            { name: 'Aditya Bansal', type: 'Paternity Leave Day 1', date: 'Aug 5 - Aug 7' },
            { name: 'Ajay Singh', type: 'Annual Leave Day 1', date: 'Aug 5 - Aug 7' },
            { name: 'Aakriti Prasad', type: 'Annual Leave Day 1', date: 'Aug 5 - Aug 7' },
            { name: 'Kiran Sharma', type: 'Maternity Leave Day 1', date: 'Aug 5 - Aug 7' },
          ].map((approval, index) => (
            <View key={index} style={styles.approvalItem}>
              <View style={styles.approvalInfo}>
                <Text style={[styles.approvalName, { color: colors.textColor }]}>mr {approval.name}</Text>
                <Text style={[styles.approvalType, { color: colors.secondaryText }]}>{approval.type} • {approval.date}</Text>
              </View>
              <TouchableOpacity style={styles.approvalAction}>
                <Text style={styles.approvalActionText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPixel(16),
  },
  welcomeBanner: {
    backgroundColor: '#6366F1',
    borderRadius: widthPixel(12),
    padding: widthPixel(20),
    marginVertical: heightPixel(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: heightPixel(4),
  },
  welcomeSubtitle: {
    fontSize: fontPixel(14),
    color: '#E0E7FF',
  },
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: heightPixel(20),
  },
  statsCard: {
    width: '48%',
    padding: widthPixel(16),
    borderRadius: widthPixel(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsContent: {
    flex: 1,
  },
  statsValue: {
    fontSize: fontPixel(24),
    fontWeight: '700',
    marginBottom: heightPixel(4),
  },
  statsLabel: {
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  statsIconContainer: {
    width: widthPixel(40),
    height: widthPixel(40),
    borderRadius: widthPixel(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionCard: {
    borderRadius: widthPixel(12),
    padding: widthPixel(16),
    marginBottom: heightPixel(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(16),
  },
  sectionTitle: {
    fontSize: fontPixel(16),
    fontWeight: '600',
    marginBottom: heightPixel(16),
  },
  viewAllText: {
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  noActivitiesContainer: {
    alignItems: 'center',
    paddingVertical: heightPixel(40),
  },
  noActivitiesText: {
    fontSize: fontPixel(14),
    marginTop: heightPixel(12),
  },
  attendanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: heightPixel(20),
  },
  attendanceItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: heightPixel(16),
  },
  attendanceValue: {
    fontSize: fontPixel(20),
    fontWeight: '700',
    marginBottom: heightPixel(4),
  },
  attendanceLabel: {
    fontSize: fontPixel(12),
    textAlign: 'center',
  },
  attendanceDetails: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: heightPixel(16),
  },
  attendanceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPixel(8),
  },
  attendanceDetailLabel: {
    fontSize: fontPixel(14),
  },
  attendanceDetailValue: {
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    padding: widthPixel(16),
    borderRadius: widthPixel(8),
    alignItems: 'center',
    marginBottom: heightPixel(12),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickActionIcon: {
    width: widthPixel(48),
    height: widthPixel(48),
    borderRadius: widthPixel(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightPixel(8),
  },
  quickActionLabel: {
    fontSize: fontPixel(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  holidayDate: {
    backgroundColor: '#3B82F6',
    borderRadius: widthPixel(8),
    padding: widthPixel(12),
    alignItems: 'center',
    marginRight: widthPixel(16),
  },
  holidayDay: {
    fontSize: fontPixel(18),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  holidayMonth: {
    fontSize: fontPixel(12),
    color: '#FFFFFF',
  },
  holidayInfo: {
    flex: 1,
  },
  holidayName: {
    fontSize: fontPixel(16),
    fontWeight: '600',
    marginBottom: heightPixel(4),
  },
  holidayDateText: {
    fontSize: fontPixel(14),
  },
  approvalsList: {
    marginTop: heightPixel(-16),
  },
  approvalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: heightPixel(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  approvalInfo: {
    flex: 1,
  },
  approvalName: {
    fontSize: fontPixel(14),
    fontWeight: '600',
    marginBottom: heightPixel(4),
  },
  approvalType: {
    fontSize: fontPixel(12),
  },
  approvalAction: {
    width: widthPixel(32),
    height: widthPixel(32),
    borderRadius: widthPixel(16),
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  approvalActionText: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: '#EF4444',
  },
});

export default DashboardScreen;
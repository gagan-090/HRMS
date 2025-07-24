import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomSvgIcon from '../screens/CustomIcon';
import { colors } from '../context/styles';
import { widthPixel, heightPixel, fontPixel } from '../utils/responsive';

interface SidebarProps {
  activeScreen: string;
  setActiveScreen: (screenName: string) => void;
  closeDrawer?: () => void;
}

interface SidebarItem {
  icon: string;
  label: string;
  children?: SidebarItem[];
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'MAIN',
    items: [{ icon: 'grid', label: 'Dashboard' }],
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
          { icon: 'pie-chart', label: 'Recruitment Dashboard' },
          { icon: 'list', label: 'Job Positions' },
          { icon: 'users-plus', label: 'Candidates' },
          { icon: 'file-text', label: 'Applications' },
          { icon: 'calendar', label: 'Interviews' },
          { icon: 'bar-chart', label: 'Recruitment Analytics' },
        ],
      },
      {
        icon: 'calendar',
        label: 'Attendance',
        children: [
          { icon: 'list', label: 'All Attendance' },
          { icon: 'user', label: 'My Attendance' },
          { icon: 'bar-chart', label: 'Attendance Reports' },
        ],
      },
      {
        icon: 'calendar',
        label: 'Leaves',
        children: [
          { icon: 'list', label: 'All Leaves' },
          { icon: 'file-plus', label: 'Apply for Leave' },
          { icon: 'calendar-check', label: 'Leave Calendar' },
          { icon: 'clock-history', label: 'Pending Approvals' },
        ],
      },
      {
        icon: 'credit-card',
        label: 'Payroll',
        children: [
          { icon: 'pie-chart', label: 'Payroll Dashboard' },
          { icon: 'file-text', label: 'Payslips' },
          { icon: 'layers', label: 'Salary Structures' },
          { icon: 'settings', label: 'Salary Components' },
          { icon: 'users', label: 'Employee Salaries' },
          { icon: 'calendar', label: 'Payroll Periods' },
          { icon: 'credit-card', label: 'Employee Loans' },
          { icon: 'upload', label: 'Bulk Upload' },
          { icon: 'trending-up', label: 'Salary Revision' },
          { icon: 'file-text', label: 'Tax Declarations' },
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

const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  setActiveScreen,
  closeDrawer,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const animatedValues = useRef<{ [key: string]: Animated.Value }>({});

  sidebarSections.forEach(section => {
    section.items.forEach(item => {
      if (item.children && !animatedValues.current[item.label]) {
        animatedValues.current[item.label] = new Animated.Value(0);
      }
    });
  });

  const toggleSection = (label: string) => {
    const isExpanded = expandedSection === label;
    const newExpandedSection = isExpanded ? null : label;

    if (expandedSection && expandedSection !== label) {
      Animated.timing(animatedValues.current[expandedSection], {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }

    setExpandedSection(newExpandedSection);

    Animated.timing(animatedValues.current[label], {
      toValue: isExpanded ? 0 : 1,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleItemPress = (label: string, hasChildren = false) => {
    if (hasChildren) {
      toggleSection(label);
    } else {
      setActiveScreen(label);
      if (closeDrawer) {
        closeDrawer();
      }
    }
  };

  return (
    <View style={styles.sidebarWrapper}>
      <LinearGradient
        colors={['blue', '#b5179e', '#7209b7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <CustomSvgIcon
              name="briefcase"
              color={colors.white}
              size={widthPixel(28)}
            />
            <View style={{ marginLeft: widthPixel(8) }}>
              <Text style={styles.headerText}>HRMS</Text>
              <Text style={styles.subHeaderText}>Tech Innovations Pvt Ltd</Text>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {sidebarSections.map((section, sectionIndex) => (
            <View
              key={section.title || `section-${sectionIndex}`}
              style={styles.sectionContainer}
            >
              {section.title && (
                <Text style={styles.sectionTitle}>{section.title}</Text>
              )}
              {section.items.map(item => {
                const isActive = activeScreen === item.label;
                const isExpanded = expandedSection === item.label;
                const hasChildren = !!item.children;
                const animatedHeight = animatedValues.current[item.label];

                const subItemsHeight = animatedHeight?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    0,
                    (item.children?.length || 0) * heightPixel(40),
                  ],
                });

                return (
                  <View key={item.label}>
                    <TouchableOpacity
                      style={[styles.item, isActive && styles.activeItem]}
                      activeOpacity={0.7}
                      onPress={() => handleItemPress(item.label, hasChildren)}
                    >
                      <CustomSvgIcon
                        name={item.icon}
                        color={colors.white}
                        size={widthPixel(18)}
                      />
                      <Text
                        style={[styles.label, isActive && styles.activeLabel]}
                      >
                        {item.label}
                      </Text>
                      {hasChildren && (
                        <CustomSvgIcon
                          name={isExpanded ? 'chevron-down' : 'chevron-right'}
                          color="rgba(255, 255, 255, 0.7)"
                          size={widthPixel(14)}
                        />
                      )}
                    </TouchableOpacity>

                    {hasChildren && (
                      <Animated.View
                        style={[
                          styles.subItemsContainer,
                          { height: subItemsHeight, opacity: animatedHeight },
                        ]}
                      >
                        {item.children?.map(subItem => {
                          const isSubActive = activeScreen === subItem.label;
                          return (
                            <TouchableOpacity
                              key={subItem.label}
                              style={[
                                styles.subItem,
                                isSubActive && styles.activeSubItem,
                              ]}
                              activeOpacity={0.7}
                              onPress={() => handleItemPress(subItem.label)}
                            >
                              <CustomSvgIcon
                                name={subItem.icon}
                                color="rgba(255, 255, 255, 0.8)"
                                size={widthPixel(14)}
                              />
                              <Text
                                style={[
                                  styles.subItemLabel,
                                  isSubActive && styles.activeSubItemLabel,
                                ]}
                              >
                                {subItem.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </Animated.View>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.footerText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarWrapper: {
    width: widthPixel(280),
    flex: 1,
    paddingTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : heightPixel(20),
    backgroundColor: 'transparent',
    borderTopRightRadius: widthPixel(25),
    borderBottomRightRadius: widthPixel(25),
    overflow: 'hidden',
  },
  gradientBackground: {
    flex: 1,
    borderTopRightRadius: widthPixel(25),
    borderBottomRightRadius: widthPixel(25),
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: widthPixel(16),
  },
  scrollContent: {
    paddingBottom: heightPixel(100),
    paddingTop: heightPixel(12),
  },
  header: {
    paddingHorizontal: widthPixel(20),
    paddingVertical: heightPixel(24),
    marginBottom: heightPixel(16),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: fontPixel(20),
    fontWeight: '700',
    color: colors.white,
  },
  subHeaderText: {
    fontSize: fontPixel(12),
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400',
  },
  sectionContainer: {
    marginBottom: heightPixel(20),
  },
  sectionTitle: {
    fontSize: fontPixel(11),
    color: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: widthPixel(4),
    marginBottom: heightPixel(8),
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: heightPixel(12),
    paddingHorizontal: widthPixel(16),
    marginBottom: heightPixel(2),
    borderRadius: widthPixel(8),
    backgroundColor: 'transparent',
  },
  activeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: widthPixel(12),
    marginHorizontal: widthPixel(4),
  },
  label: {
    flex: 1,
    marginLeft: widthPixel(12),
    fontSize: fontPixel(14),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  activeLabel: {
    fontWeight: '600',
    color: colors.white,
  },
  subItemsContainer: {
    overflow: 'hidden',
    marginLeft: widthPixel(16),
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: heightPixel(10),
    paddingHorizontal: widthPixel(16),
    marginBottom: heightPixel(1),
    borderRadius: widthPixel(6),
    backgroundColor: 'transparent',
  },
  activeSubItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  subItemLabel: {
    marginLeft: widthPixel(10),
    fontSize: fontPixel(13),
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
  },
  activeSubItemLabel: {
    color: colors.white,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: heightPixel(20),
    left: 0,
    right: 0,
    paddingHorizontal: widthPixel(20),
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: fontPixel(12),
    textDecorationLine: 'underline',
    fontWeight: '400',
  },
});

export default Sidebar;

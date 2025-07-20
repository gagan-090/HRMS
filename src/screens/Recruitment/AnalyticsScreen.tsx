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
import Svg, { Path, Circle, LinearGradient, Stop, G, Rect } from 'react-native-svg';

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
  accentPurple: '#7F00FF',
  accentPink: '#E100FF',
  accentRed: '#DC3545',
  accentYellow: '#FFC107',
  whiteText: '#FFFFFF',
  secondaryText: '#6B7280',
  inputBorder: '#E5E7EB',
  buttonBorder: '#E5E7EB',
  statCardBg: '#E0F2F7',
  statYellowBg: '#FFF8E1',
  statGreenBg: '#E6F7ED',
  statRedBg: '#FDE7E7',
  barDarkBlue: '#1D2B64',
  barPurple: '#7F00FF',
  barPink: '#E100FF',
  barGreen: '#00B894',
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

const BarChartIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 3V21H21M7 17V9M11 13V7M15 17V11M19 17V5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BriefcaseIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 6H15V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V6ZM21 9V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9ZM15 13H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FileTextIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM14 2L20 8M9 15H15M9 12H15M9 9H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UsersIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H7C5.93913 15 4.92172 15.4214 4.17157 16.1716C3.42143 16.9217 3 17.9391 3 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 11C9.79086 11 8 12.7909 8 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DollarSignIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FunnelIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 4H21M4 4H20L16 10H8L4 16H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ArrowUpIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 19V5M5 12L12 5L19 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ArrowDownIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12L12 19L19 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PieChartIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.9485 3 17.6115 4.37805 19.318 6.53203M21 12H12M12 3V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BuildingIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 21H21M9 21V3M15 21V10M3 21L8 17M8 17V14C8 13.4696 8.21071 12.9609 8.58579 12.5858C8.96086 12.2107 9.46957 12 10 12H14C14.5304 12 15.0391 12.2107 15.4142 12.5858C15.7893 12.9609 16 13.4696 16 14V17L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const TrendingUpIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 7L12 17L7 12L2 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M7 12L12 7L22 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const StarIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const AwardIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19 6L22 10M2 10L5 6M6.5 21H17.5C18.163 21 18.7989 20.7366 19.2678 20.2678C19.7366 19.7989 20 19.163 20 18.5V13C20 11.3431 18.6569 10 17 10H7C5.34315 10 4 11.3431 4 13V18.5C4 19.163 4.26339 19.7989 4.73223 20.2678C5.20107 20.7366 5.83696 21 6.5 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UserIcon = ({ color, size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    <View style={styles.bannerContainer}>
      <View style={styles.bannerContent}>
        <BarChartIcon color={colors.whiteText} size={32} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Recruitment Analytics</Text>
          <Text style={styles.bannerSubtext}>Comprehensive insights into your recruitment performance</Text>
        </View>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Last 30 Days</Text>
          <ChevronDownIcon color={colors.secondaryText} size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Key Metrics Card Component ---
const KeyMetricsCard = ({ icon, value, label, subtext, bgColor, iconColor }) => {
  return (
    <View style={styles.metricsCard}>
      <View style={[styles.metricsIcon, { backgroundColor: bgColor }]}>
        {icon}
      </View>
      <Text style={styles.metricsValue}>{value}</Text>
      <Text style={styles.metricsLabel}>{label}</Text>
      <Text style={styles.metricsSubtext}>{subtext}</Text>
    </View>
  );
};

// --- Section Component (with Title and Content) ---
const Section = ({ titleIcon, title, children }) => {
  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        {titleIcon}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

// --- Donut Chart Component ---
const DonutChart = () => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const center = 75;
  const total = 100;
  const segments = [
    { percent: 45, color: colors.accentBlue },
    { percent: 25, color: colors.accentGreen },
    { percent: 15, color: colors.accentPurple },
    { percent: 10, color: colors.accentYellow },
    { percent: 5, color: colors.accentRed },
  ];

  let startAngle = 0;
  return (
    <Svg width="150" height="150" viewBox="0 0 150 150">
      {segments.map((segment, index) => {
        const angle = (segment.percent / total) * 360;
        const endAngle = startAngle + angle;
        const largeArc = angle > 180 ? 1 : 0;
        const x1 = center + radius * Math.cos((startAngle - 90) * Math.PI / 180);
        const y1 = center + radius * Math.sin((startAngle - 90) * Math.PI / 180);
        const x2 = center + radius * Math.cos((endAngle - 90) * Math.PI / 180);
        const y2 = center + radius * Math.sin((endAngle - 90) * Math.PI / 180);
        const pathData = [
          `M ${center} ${center}`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
          `Z`,
        ].join(' ');

        startAngle = endAngle;
        return (
          <Path
            key={index}
            d={pathData}
            fill={segment.color}
          />
        );
      })}
      <Circle cx={center} cy={center} r={30} fill={colors.cardBackground} />
    </Svg>
  );
};

// --- AnalyticsScreen Component ---
const AnalyticsScreen = ({ navigation }) => {
  console.log('AnalyticsScreen rendering at', new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  const [activeTab, setActiveTab] = useState('Jobs');

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Banner />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.metricsRow}>
          <KeyMetricsCard
            icon={<BriefcaseIcon color={colors.accentBlue} size={24} />}
            value="10"
            label="Total Jobs Posted"
            subtext="Active: 10"
            bgColor={colors.statCardBg}
            iconColor={colors.accentBlue}
          />
          <KeyMetricsCard
            icon={<FileTextIcon color={colors.accentYellow} size={24} />}
            value="7"
            label="Applications Received"
            subtext="+5%"
            bgColor={colors.statYellowBg}
            iconColor={colors.accentYellow}
          />
          <KeyMetricsCard
            icon={<UsersIcon color={colors.accentGreen} size={24} />}
            value="0"
            label="Interviews Conducted"
            subtext=""
            bgColor={colors.statGreenBg}
            iconColor={colors.accentGreen}
          />
          <KeyMetricsCard
            icon={<DollarSignIcon color={colors.accentRed} size={24} />}
            value="0"
            label="Offers Extended"
            subtext="-1%"
            bgColor={colors.statRedBg}
            iconColor={colors.accentRed}
          />
        </View>
        <View style={styles.twoColumnRow}>
          <Section titleIcon={<FunnelIcon color={colors.accentBlue} size={20} />} title="Recruitment Funnel">
            <View style={styles.funnelBars}>
              <View style={styles.funnelBarContainer}>
                <Svg height="100" width="40">
                  <LinearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
                    <Stop offset="0%" stopColor={colors.barDarkBlue} />
                    <Stop offset="100%" stopColor={colors.barDarkBlue} />
                  </LinearGradient>
                  <Rect x="0" y="0" width="40" height="100" fill="url(#grad1)" />
                </Svg>
                <Text style={styles.funnelValue}>100</Text>
              </View>
              <View style={styles.funnelBarContainer}>
                <Svg height="75" width="40">
                  <LinearGradient id="grad2" x1="0%" y1="100%" x2="0%" y2="0%">
                    <Stop offset="0%" stopColor={colors.barPurple} />
                    <Stop offset="100%" stopColor={colors.barPurple} />
                  </LinearGradient>
                  <Rect x="0" y="0" width="40" height="75" fill="url(#grad2)" />
                </Svg>
                <Text style={styles.funnelValue}>75</Text>
              </View>
              <View style={styles.funnelBarContainer}>
                <Svg height="40" width="40">
                  <LinearGradient id="grad3" x1="0%" y1="100%" x2="0%" y2="0%">
                    <Stop offset="0%" stopColor={colors.barPink} />
                    <Stop offset="100%" stopColor={colors.barPink} />
                  </LinearGradient>
                  <Rect x="0" y="0" width="40" height="40" fill="url(#grad3)" />
                </Svg>
                <Text style={styles.funnelValue}>40</Text>
              </View>
              <View style={styles.funnelBarContainer}>
                <Svg height="15" width="40">
                  <LinearGradient id="grad4" x1="0%" y1="100%" x2="0%" y2="0%">
                    <Stop offset="0%" stopColor={colors.barGreen} />
                    <Stop offset="100%" stopColor={colors.barGreen} />
                  </LinearGradient>
                  <Rect x="0" y="0" width="40" height="15" fill="url(#grad4)" />
                </Svg>
                <Text style={styles.funnelValue}>15</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.toggleButton}>
              <BarChartIcon color={colors.secondaryText} size={16} style={styles.buttonIcon} />
              <Text style={styles.toggleButtonText}>Toggle View</Text>
            </TouchableOpacity>
          </Section>
          <Section titleIcon={<ClockIcon color={colors.accentBlue} size={20} />} title="Time to Hire">
            <View style={styles.timeToHireRow}>
              <View style={styles.timeToHireItem}>
                <ClockIcon color={colors.accentBlue} size={16} />
                <Text style={styles.timeToHireValue}>12 days</Text>
                <Text style={styles.timeToHireLabel}>Average Time</Text>
              </View>
              <View style={styles.timeToHireItem}>
                <ArrowUpIcon color={colors.accentGreen} size={16} />
                <Text style={styles.timeToHireValue}>8 days</Text>
                <Text style={styles.timeToHireLabel}>Shortest Hire</Text>
              </View>
              <View style={styles.timeToHireItem}>
                <ArrowDownIcon color={colors.accentRed} size={16} />
                <Text style={styles.timeToHireValue}>20 days</Text>
                <Text style={styles.timeToHireLabel}>Longest Hire</Text>
              </View>
            </View>
          </Section>
        </View>
        <View style={styles.twoColumnRow}>
          <Section titleIcon={<PieChartIcon color={colors.accentBlue} size={20} />} title="Application Sources">
            <View style={styles.donutContainer}>
              <DonutChart />
            </View>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendBullet, { backgroundColor: colors.accentBlue }]} />
                <Text style={styles.legendText}>Career Site</Text>
                <Text style={styles.legendPercent}>45.0%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBullet, { backgroundColor: colors.accentGreen }]} />
                <Text style={styles.legendText}>Job Portals</Text>
                <Text style={styles.legendPercent}>25.0%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBullet, { backgroundColor: colors.accentPurple }]} />
                <Text style={styles.legendText}>Referrals</Text>
                <Text style={styles.legendPercent}>15.0%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBullet, { backgroundColor: colors.accentYellow }]} />
                <Text style={styles.legendText}>Social Media</Text>
                <Text style={styles.legendPercent}>10.0%</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBullet, { backgroundColor: colors.accentRed }]} />
                <Text style={styles.legendText}>Others</Text>
                <Text style={styles.legendPercent}>5.0%</Text>
              </View>
            </View>
          </Section>
          <Section titleIcon={<BuildingIcon color={colors.accentBlue} size={20} />} title="Department-wise Hiring">
            <View style={styles.chartPlaceholder} />
          </Section>
        </View>
        <View style={styles.twoColumnRow}>
          <Section titleIcon={<TrendingUpIcon color={colors.accentBlue} size={20} />} title="Monthly Trends">
            <View style={styles.tabGroup}>
              <TouchableOpacity style={[styles.tab, activeTab === 'Jobs' && styles.activeTab]} onPress={() => setActiveTab('Jobs')}>
                <Text style={[styles.tabText, activeTab === 'Jobs' && styles.activeTabText]}>Jobs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tab, activeTab === 'Applications' && styles.activeTab]} onPress={() => setActiveTab('Applications')}>
                <Text style={[styles.tabText, activeTab === 'Applications' && styles.activeTabText]}>Applications</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.chartPlaceholder} />
          </Section>
          <Section titleIcon={<StarIcon color={colors.accentBlue} size={20} />} title="Key Performance Indicators">
            <View style={styles.kpiList}>
              <View style={styles.kpiItem}>
                <Text style={styles.kpiLabel}>Application to Interview Rate</Text>
                <Text style={styles.kpiValue}>- %</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={styles.kpiLabel}>Interview to Offer Rate</Text>
                <Text style={styles.kpiValue}>- %</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={styles.kpiLabel}>Offer Acceptance Rate</Text>
                <Text style={styles.kpiValue}>- %</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={styles.kpiLabel}>Overall Conversion Rate</Text>
                <Text style={styles.kpiValue}>- %</Text>
              </View>
            </View>
          </Section>
        </View>
        <Section titleIcon={<AwardIcon color={colors.accentBlue} size={20} />} title="Top Performing Jobs">
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { width: 200 }]}>Job Title</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Applications</Text>
            <Text style={[styles.tableHeader, { width: 100 }]}>Hires</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Success Rate</Text>
          </View>
          <ScrollView horizontal>
            <View>
              {['Row 1', 'Row 2', 'Row 3'].map((row, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: 200 }]}>{row}</Text>
                  <Text style={[styles.tableCell, { width: 120 }]}>-</Text>
                  <Text style={[styles.tableCell, { width: 100 }]}>-</Text>
                  <Text style={[styles.tableCell, { width: 120 }]}>-</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </Section>
        <Section titleIcon={<UserIcon color={colors.accentBlue} size={20} />} title="Recruiter Performance">
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, { width: 200 }]}>Recruiter</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Jobs Managed</Text>
            <Text style={[styles.tableHeader, { width: 100 }]}>Hires</Text>
            <Text style={[styles.tableHeader, { width: 120 }]}>Avg Time to Hire</Text>
          </View>
          <ScrollView horizontal>
            <View>
              {['Row 1', 'Row 2', 'Row 3'].map((row, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: 200 }]}>{row}</Text>
                  <Text style={[styles.tableCell, { width: 120 }]}>-</Text>
                  <Text style={[styles.tableCell, { width: 100 }]}>-</Text>
                  <Text style={[styles.tableCell, { width: 120 }]}>-</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </Section>
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
  bannerContainer: {
    backgroundColor: colors.accentPurple,
    padding: 24,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    flex: 1,
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.secondaryText,
    marginRight: 4,
    fontFamily: typography.fontFamily,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
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
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  metricsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  metricsLabel: {
    fontSize: 13,
    color: colors.secondaryText,
    textTransform: 'uppercase',
    fontFamily: typography.fontFamily,
  },
  metricsSubtext: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  card: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.userNameText,
    marginLeft: 8,
    fontFamily: typography.fontFamily,
  },
  funnelBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  funnelBarContainer: {
    alignItems: 'center',
  },
  funnelValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.userNameText,
    marginTop: 4,
    fontFamily: typography.fontFamily,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-end',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    marginLeft: 4,
    fontFamily: typography.fontFamily,
  },
  buttonIcon: {
    marginRight: 4,
  },
  timeToHireRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeToHireItem: {
    alignItems: 'center',
  },
  timeToHireValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.userNameText,
    marginTop: 8,
    fontFamily: typography.fontFamily,
  },
  timeToHireLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  donutContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legend: {
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: colors.userNameText,
    flex: 1,
    fontFamily: typography.fontFamily,
  },
  legendPercent: {
    fontSize: 12,
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: colors.statCardBg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    borderRadius: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.accentBlue,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
    fontFamily: typography.fontFamily,
  },
  activeTabText: {
    color: colors.whiteText,
  },
  kpiList: {
    marginTop: 16,
  },
  kpiItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  kpiLabel: {
    fontSize: 14,
    color: colors.userNameText,
    fontFamily: typography.fontFamily,
  },
  kpiValue: {
    fontSize: 14,
    color: colors.secondaryText,
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
    color: colors.secondaryText,
    textTransform: 'uppercase',
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
  tableCell: {
    fontSize: 14,
    color: colors.userNameText,
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: 'left',
  },
});

export default AnalyticsScreen;
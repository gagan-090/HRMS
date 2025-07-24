// src/screens/Recruitment/RecruitmentDashboardScreen.tsx
import React from 'react';
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
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
  G,
  Ellipse,
} from 'react-native-svg'; // Re-added Svg import
import LinearGradient from 'react-native-linear-gradient';
// Import responsive utilities
import {
  widthPixel,
  heightPixel,
  fontPixel,
  screenWidth,
} from '../../utils/responsive';
// Import theme context
import { useTheme } from '../../context/ThemeContext';

// --- SVG Icons (Defined Locally in this file) ---
interface IconProps {
  color: string;
  size: number;
  style?: object;
}

const ChevronRightIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M9 18l6-6-6-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PlusIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BarChartIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Line
      x1="12"
      y1="20"
      x2="12"
      y2="10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Line
      x1="18"
      y1="20"
      x2="18"
      y2="4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Line
      x1="6"
      y1="20"
      x2="6"
      y2="16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const ChevronDownIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BriefcaseIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect
      x="2"
      y="7"
      width="20"
      height="14"
      rx="2"
      ry="2"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M16 2a2 2 0 0 0-2 2V7H10V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3h16V4a2 2 0 0 0-2-2h-2z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FileTextIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 2v6h6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="16"
      y1="13"
      x2="8"
      y2="13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Line
      x1="16"
      y1="17"
      x2="8"
      y2="17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Line
      x1="10"
      y1="9"
      x2="8"
      y2="9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const CalendarIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
      stroke={color}
      strokeWidth="2"
    />
    <Line
      x1="16"
      y1="2"
      x2="16"
      y2="6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Line
      x1="8"
      y1="2"
      x2="8"
      y2="6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Line
      x1="3"
      y1="10"
      x2="21"
      y2="10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const DollarSignIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    {/* Corrected Path for Dollar Sign */}
    <Line
      x1="12"
      y1="1"
      x2="12"
      y2="23"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M17 5H9.5C8.57174 5 8 5.57174 8 6.5C8 7.42826 8.57174 8 9.5 8H14C14.5523 8 15 8.44772 15 9C15 9.55228 14.5523 10 14 10H9.5C8.57174 10 8 10.5717 8 11.5C8 12.4283 8.57174 13 9.5 13H17V17H9.5C8.57174 17 8 17.5717 8 18.5C8 19.4283 8.57174 20 9.5 20C10.4283 20 11 19.4283 11 18.5V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H11V7H17V5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const UsersIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" />
    <Path
      d="M23 21v-2a4 4 0 0 0-3-3.87"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.13a4 4 0 0 1 0 7.75"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckCircleIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 4L12 14.01l-3-3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
  </Svg>
);

const EditIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowRightIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Polyline
      points="12 5 19 12 12 19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CircleIcon: React.FC<IconProps> = ({ color, size, style }) => (
  <Svg width={size} height={size} viewBox="0 0 8 8" style={style}>
    <Circle cx="4" cy="4" r="4" fill={color} />
  </Svg>
);

// --- Breadcrumbs Component ---

// --- Title Section Component ---
const TitleSection = () => {
  const { colors } = useTheme(); // Consume theme colors
  return (
    <View style={styles(colors).titleSection}>
      <View style={styles(colors).titleTextContainer}>
        <Text style={[styles(colors).titleText, { color: colors.textColor }]}>
          Recruitment Dashboard
        </Text>
        <Text
          style={[
            styles(colors).descriptionText,
            { color: colors.secondaryText },
          ]}
        >
          Manage your hiring process efficiently
        </Text>
      </View>
      <View style={styles(colors).actionButtons}>
        <TouchableOpacity
          style={[styles(colors).postButton, { backgroundColor: colors.blue }]}
        >
          <PlusIcon
            color={colors.white}
            size={fontPixel(16)}
            style={styles(colors).buttonIcon}
          />
          <Text
            style={[styles(colors).postButtonText, { color: colors.white }]}
          >
            Post new Job
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(colors).pipelineButton,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.blue,
            },
          ]}
        >
          <BarChartIcon
            color={colors.blue}
            size={fontPixel(16)}
            style={styles(colors).buttonIcon}
          />
          <Text
            style={[styles(colors).pipelineButtonText, { color: colors.blue }]}
          >
            Pipeline View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(colors).moreButton,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.borderGray,
            },
          ]}
        >
          <ChevronDownIcon
            color={colors.secondaryText}
            size={fontPixel(16)}
            style={styles(colors).buttonIcon}
          />
          <Text
            style={[
              styles(colors).moreButtonText,
              { color: colors.secondaryText },
            ]}
          >
            More Actions
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Key Metrics Card Component ---
const KeyMetricsCard = ({ title, value, status, icon, iconBg, iconColor }) => {
  const { colors } = useTheme(); // Consume theme colors
  const IconComponent = {
    briefcase: BriefcaseIcon,
    'file-text': FileTextIcon,
    calendar: CalendarIcon,
    'dollar-sign': DollarSignIcon,
  }[icon];

  return (
    <View
      style={[
        styles(colors).metricsCard,
        { backgroundColor: colors.cardBackground, shadowColor: colors.shadow },
      ]}
    >
      <View style={[styles(colors).iconCircle, { backgroundColor: iconBg }]}>
        {IconComponent && (
          <IconComponent color={iconColor} size={fontPixel(24)} />
        )}
      </View>
      <Text style={[styles(colors).metricsValue, { color: colors.textColor }]}>
        {value}
      </Text>
      <Text
        style={[styles(colors).metricsLabel, { color: colors.secondaryText }]}
      >
        {title}
      </Text>
      <Text
        style={[styles(colors).metricsStatus, { color: colors.secondaryText }]}
      >
        {status}
      </Text>
    </View>
  );
};

// --- Recent Job Postings Component ---
const RecentJobPostings = () => {
  const { colors } = useTheme(); // Consume theme colors
  const jobData = [
    {
      title: 'Admin Executive - Administration',
      id: 'JOB010',
      dept: 'Administration',
      apps: 9,
      status: 'Active',
    },
    {
      title: 'Admin Manager - Finance',
      id: 'JOB009',
      dept: 'Finance',
      apps: 9,
      status: 'Active',
    },
    {
      title: 'Admin Manager - Administration',
      id: 'JOB008',
      dept: 'Administration',
      apps: 7,
      status: 'Active',
    },
    {
      title: 'Finance Manager - Finance',
      id: 'JOB007',
      dept: 'Finance',
      apps: 9,
      status: 'Active',
    },
    {
      title: 'Marketing Director - Marketing',
      id: 'JOB006',
      dept: 'Marketing',
      apps: 9,
      status: 'Active',
    },
  ];

  return (
    <View
      style={[
        styles(colors).card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.borderGray,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={styles(colors).sectionHeader}>
        <Text
          style={[styles(colors).sectionTitle, { color: colors.textColor }]}
        >
          Recent Job Postings
        </Text>
        <TouchableOpacity style={styles(colors).viewAllButton}>
          <Text style={[styles(colors).viewAllText, { color: colors.blue }]}>
            View All
          </Text>
          <ArrowRightIcon
            color={colors.blue}
            size={fontPixel(16)}
            style={styles(colors).buttonIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles(colors).tableScrollViewContent}
      >
        <View>
          <View
            style={[
              styles(colors).tableRow,
              { borderBottomColor: colors.borderGray },
            ]}
          >
            <Text
              style={[
                styles(colors).tableHeader,
                { color: colors.tableHeader, minWidth: widthPixel(180) },
              ]}
            >
              Job Title
            </Text>
            <Text
              style={[
                styles(colors).tableHeader,
                { color: colors.tableHeader, minWidth: widthPixel(120) },
              ]}
            >
              Department
            </Text>
            <Text
              style={[
                styles(colors).tableHeader,
                { color: colors.tableHeader, minWidth: widthPixel(100) },
              ]}
            >
              Applications
            </Text>
            <Text
              style={[
                styles(colors).tableHeader,
                { color: colors.tableHeader, minWidth: widthPixel(100) },
              ]}
            >
              Status
            </Text>
            <Text
              style={[
                styles(colors).tableHeader,
                { color: colors.tableHeader, minWidth: widthPixel(180) },
              ]}
            >
              Actions
            </Text>
          </View>
          {jobData.map((job, index) => (
            <View
              key={index}
              style={[
                styles(colors).tableRow,
                { borderBottomColor: colors.borderGray },
              ]}
            >
              <Text
                style={[
                  styles(colors).tableCell,
                  { color: colors.textColor, minWidth: widthPixel(180) },
                ]}
              >
                {job.title} - {job.id}
              </Text>
              <Text
                style={[
                  styles(colors).tableCell,
                  { color: colors.textColor, minWidth: widthPixel(120) },
                ]}
              >
                {job.dept}
              </Text>
              <View
                style={[styles(colors).appsCell, { minWidth: widthPixel(100) }]}
              >
                <UsersIcon color={colors.blue} size={fontPixel(14)} />
                <Text style={[styles(colors).appsText, { color: colors.blue }]}>
                  {job.apps}
                </Text>
              </View>
              <View
                style={[
                  styles(colors).statusPill,
                  {
                    backgroundColor:
                      job.status === 'Active'
                        ? colors.successGreenBg
                        : colors.cardBackground,
                    borderColor: colors.greenAccent,
                    minWidth: widthPixel(100),
                  },
                ]}
              >
                <CheckCircleIcon
                  color={colors.greenAccent}
                  size={fontPixel(14)}
                />
                <Text
                  style={[
                    styles(colors).statusText,
                    { color: colors.greenAccent },
                  ]}
                >
                  {job.status}
                </Text>
              </View>
              <View
                style={[
                  styles(colors).actionsCell,
                  { minWidth: widthPixel(180) },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles(colors).actionButton,
                    {
                      backgroundColor: colors.successGreenBg,
                      borderColor: colors.greenAccent,
                    },
                  ]}
                >
                  <EyeIcon color={colors.greenAccent} size={fontPixel(14)} />
                  <Text
                    style={[
                      styles(colors).actionText,
                      { color: colors.greenAccent },
                    ]}
                  >
                    View
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles(colors).actionButton,
                    {
                      backgroundColor: colors.successGreenBg,
                      borderColor: colors.greenAccent,
                    },
                  ]}
                >
                  <EditIcon color={colors.greenAccent} size={fontPixel(14)} />
                  <Text
                    style={[
                      styles(colors).actionText,
                      { color: colors.greenAccent },
                    ]}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// --- Recent Applications Component ---
const RecentApplications = () => {
  const { colors } = useTheme(); // Consume theme colors
  const appData = [
    {
      name: 'Meera Nair',
      role: 'Admin Manager - Administration',
      time: '2 weeks, 3 days ago',
      status: 'Under Screening',
    },
    {
      name: 'Sanjay Reddy',
      role: 'HR Manager - Human Resources',
      time: '2 weeks, 3 days ago',
      status: 'Selected',
    },
    {
      name: 'Pooja Agarwal',
      role: 'Finance Manager - Finance',
      time: '2 weeks, 3 days ago',
      status: 'Interview Scheduled',
    },
    {
      name: 'Amit Jain',
      role: 'Operations Director - Operations',
      time: '2 weeks, 3 days ago',
      status: 'Rejected',
    },
    {
      name: 'Vikash Kumar',
      role: 'Admin Manager - Administration',
      time: '2 weeks, 3 days ago',
      status: 'Submitted',
    },
    {
      name: 'Priya Gupta',
      role: 'Admin Manager - Administration',
      time: '2 weeks, 3 days ago',
      status: 'Selected',
    },
    {
      name: 'Arjun Sharma',
      role: 'Operations Director - Operations',
      time: '2 weeks, 3 days ago',
      status: 'Submitted',
    },
  ];

  // Define statusColors using the theme's color palette
  const statusColors = {
    'Under Screening': { bg: colors.infoBlueBg, text: colors.infoBlueText },
    Selected: { bg: colors.warningYellow, text: colors.yellow },
    Rejected: { bg: colors.dangerRedBg, text: colors.red },
    'Interview Scheduled': {
      bg: colors.successGreenBg,
      text: colors.greenAccent,
    },
    Submitted: { bg: colors.infoBlueBg, text: colors.infoBlueText },
  };

  return (
    <View
      style={[
        styles(colors).card,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.borderGray,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={styles(colors).sectionHeader}>
        <Text
          style={[styles(colors).sectionTitle, { color: colors.textColor }]}
        >
          Recent Applications
        </Text>
        <TouchableOpacity style={styles(colors).viewAllButton}>
          <Text style={[styles(colors).viewAllText, { color: colors.blue }]}>
            View All
          </Text>
          <ArrowRightIcon
            color={colors.blue}
            size={fontPixel(16)}
            style={styles(colors).buttonIcon}
          />
        </TouchableOpacity>
      </View>
      {appData.map((app, index) => (
        <View
          key={index}
          style={[
            styles(colors).appItem,
            { borderBottomColor: colors.borderGray },
          ]}
        >
          <CircleIcon
            color={colors.blue}
            size={fontPixel(8)}
            style={styles(colors).bullet}
          />
          <View style={styles(colors).appDetails}>
            <Text style={[styles(colors).appName, { color: colors.textColor }]}>
              {app.name}
            </Text>
            <Text
              style={[styles(colors).appInfo, { color: colors.secondaryText }]}
            >
              {app.role}, {app.time}
            </Text>
          </View>
          <View
            style={[
              styles(colors).statusPill,
              {
                backgroundColor: statusColors[app.status].bg,
                borderColor: statusColors[app.status].text,
              },
            ]}
          >
            <Text
              style={[
                styles(colors).statusText,
                { color: statusColors[app.status].text },
              ]}
            >
              {app.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// --- RecruitmentDashboardScreen Component ---
const RecruitmentDashboardScreen = () => {
  const { colors } = useTheme(); // Consume theme colors
  console.log(
    'RecruitmentDashboardScreen rendering at',
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
  );

  return (
    <SafeAreaView
      style={[styles(colors).container, { backgroundColor: colors.background }]}
    >
      <Breadcrumbs />
      <ScrollView contentContainerStyle={styles(colors).scrollContent}>
        <TitleSection />
        <View style={styles(colors).metricsRow}>
          <KeyMetricsCard
            title="TOTAL JOBS"
            value="10"
            status="Active: 10"
            icon="briefcase"
            iconBg={colors.successGreenBg}
            iconColor={colors.greenAccent}
          />
          <KeyMetricsCard
            title="APPLICATIONS"
            value="7"
            status="Pending: 2"
            icon="file-text"
            iconBg={colors.warningYellow}
            iconColor={colors.yellowAccent}
          />
          <KeyMetricsCard
            title="TODAY'S INTERVIEWS"
            value="0"
            status="Scheduled"
            icon="calendar"
            iconBg={colors.infoBlueBg}
            iconColor={colors.blue}
          />
          <KeyMetricsCard
            title="OFFERS PENDING"
            value="5"
            status="Awaiting Response"
            icon="dollar-sign"
            iconBg={colors.dangerRedBg}
            iconColor={colors.redAccent}
          />
        </View>
        <RecentJobPostings />
        <RecentApplications />
      </ScrollView>
    </SafeAreaView>
  );
};

// Modified StyleSheet to accept colors
const styles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    breadcrumbsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: widthPixel(24),
      paddingVertical: heightPixel(8),
      backgroundColor: colors.cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderGray,
    },
    breadcrumbText: {
      fontSize: fontPixel(12),
      fontFamily: 'System',
    },
    breadcrumbIcon: {
      marginHorizontal: widthPixel(4),
    },
    scrollContent: {
      paddingHorizontal: widthPixel(24),
      paddingBottom: heightPixel(32),
    },
    titleSection: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: heightPixel(24),
    },
    titleTextContainer: {
      marginBottom: heightPixel(16),
    },
    titleText: {
      fontSize: fontPixel(22),
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    descriptionText: {
      fontSize: fontPixel(14),
      marginTop: heightPixel(4),
      fontFamily: 'System',
    },
    actionButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      width: '100%',
    },
    postButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: widthPixel(8),
      paddingHorizontal: widthPixel(12),
      paddingVertical: heightPixel(8),
      marginRight: widthPixel(8),
      marginBottom: heightPixel(8),
    },
    pipelineButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: widthPixel(8),
      paddingHorizontal: widthPixel(12),
      paddingVertical: heightPixel(8),
      marginRight: widthPixel(8),
      marginBottom: heightPixel(8),
    },
    moreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: widthPixel(8),
      paddingHorizontal: widthPixel(12),
      paddingVertical: heightPixel(8),
      marginBottom: heightPixel(8),
    },
    buttonIcon: {
      marginRight: widthPixel(4),
    },
    postButtonText: {
      fontSize: fontPixel(14),
      fontWeight: '600',
      fontFamily: 'System',
    },
    pipelineButtonText: {
      fontSize: fontPixel(14),
      fontWeight: '600',
      fontFamily: 'System',
    },
    moreButtonText: {
      fontSize: fontPixel(14),
      fontWeight: '600',
      fontFamily: 'System',
    },
    metricsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: heightPixel(32),
      marginHorizontal: widthPixel(-8),
    },
    metricsCard: {
      width: screenWidth / 2 - widthPixel(32),
      borderRadius: widthPixel(8),
      padding: widthPixel(16),
      marginHorizontal: widthPixel(8),
      marginBottom: heightPixel(16),
      alignItems: 'center',
      shadowOpacity: 0.1,
      shadowRadius: widthPixel(4),
      elevation: 3,
    },
    iconCircle: {
      width: widthPixel(48),
      height: widthPixel(48),
      borderRadius: widthPixel(24),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: heightPixel(12),
    },
    metricsValue: {
      fontSize: fontPixel(28),
      fontWeight: 'bold',
      fontFamily: 'System',
    },
    metricsLabel: {
      fontSize: fontPixel(13),
      textTransform: 'uppercase',
      fontFamily: 'System',
      textAlign: 'center',
    },
    metricsStatus: {
      fontSize: fontPixel(12),
      marginTop: heightPixel(4),
      fontFamily: 'System',
      textAlign: 'center',
    },
    card: {
      borderRadius: widthPixel(8),
      padding: widthPixel(16),
      marginTop: heightPixel(32),
      borderWidth: 1,
      shadowOpacity: 0.1,
      shadowRadius: widthPixel(4),
      elevation: 3,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightPixel(16),
    },
    sectionTitle: {
      fontSize: fontPixel(18),
      fontWeight: '600',
      fontFamily: 'System',
    },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewAllText: {
      fontSize: fontPixel(14),
      fontWeight: '600',
      marginRight: widthPixel(4),
      fontFamily: 'System',
    },
    tableScrollViewContent: {
      // No specific styles needed here, content will define its width
    },
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
    },
    tableHeader: {
      fontSize: fontPixel(12),
      fontWeight: '600',
      textTransform: 'uppercase',
      paddingVertical: heightPixel(12),
      paddingHorizontal: widthPixel(10),
    },
    tableCell: {
      fontSize: fontPixel(14),
      paddingVertical: heightPixel(12),
      paddingHorizontal: widthPixel(10),
    },
    appsCell: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    appsText: {
      fontSize: fontPixel(14),
      marginLeft: widthPixel(4),
      fontFamily: 'System',
    },
    statusPill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: widthPixel(8),
      paddingVertical: heightPixel(4),
      borderRadius: widthPixel(16),
      borderWidth: 1,
    },
    statusText: {
      fontSize: fontPixel(12),
      fontWeight: '600',
      marginLeft: widthPixel(4),
      fontFamily: 'System',
    },
    actionsCell: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: widthPixel(8),
      paddingHorizontal: widthPixel(8),
      paddingVertical: heightPixel(4),
      marginRight: widthPixel(4),
    },
    actionText: {
      fontSize: fontPixel(12),
      fontWeight: '600',
      marginLeft: widthPixel(4),
      fontFamily: 'System',
    },
    appItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: heightPixel(12),
      borderBottomWidth: 1,
    },
    bullet: {
      marginRight: widthPixel(8),
    },
    appDetails: {
      flex: 1,
    },
    appName: {
      fontSize: fontPixel(14),
      fontWeight: '600',
      fontFamily: 'System',
    },
    appInfo: {
      fontSize: fontPixel(12),
      fontFamily: 'System',
    },
  });

export default RecruitmentDashboardScreen;

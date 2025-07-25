import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  DrawerLayoutAndroid,
  Text,
} from 'react-native';

// Import theme context
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
// Import components
import Header from './src/components/Header';
import Sidebar from './src/components/Sidebar';
import LoadingScreen from './src/components/LoadingScreen';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import AllEmployeesScreen from './src/screens/Employees/AllEmployeesScreen';
import AddEmployeeScreen from './src/screens/Employees/AddEmployeeScreen';
import ImportEmployeesScreen from './src/screens/Employees/ImportEmployeesScreen';
import ExportEmployeesScreen from './src/screens/Employees/ExportEmployeesScreen';
import RecruitmentDashboardScreen from './src/screens/Recruitment/RecruitmentDashboardScreen';
import JobPositionsScreen from './src/screens/Recruitment/JobPositionsScreen';
import CandidatesScreen from './src/screens/Recruitment/CandidatesScreen';
import ApplicationsScreen from './src/screens/Recruitment/ApplicationsScreen';
import InterviewsScreen from './src/screens/Recruitment/InterviewsScreen';
import AllLeavesScreen from './src/screens/Leaves/AllLeavesScreen';
import ApplyLeaveScreen from './src/screens/Leaves/ApplyLeaveScreen';
import LeaveCalendarScreen from './src/screens/Leaves/LeaveCalendarScreen';
import PendingApprovalsScreen from './src/screens/Leaves/PendingApprovalsScreen';
import AllAttendanceScreen from './src/screens/Attendance/AllAttendanceScreen';
import MyAttendanceScreen from './src/screens/Attendance/MyAttendanceScreen';
import AttendanceReportsScreen from './src/screens/Attendance/AttendanceReportsScreen';
import MarkAttendanceScreen from './src/screens/Attendance/MarkAttendanceScreen';

// Import Payroll screens
import PayrollDashboardScreen from './src/screens/Payroll/PayrollDashboardScreen';
import PayslipsScreen from './src/screens/Payroll/PayslipsScreen';
import SalaryStructuresScreen from './src/screens/Payroll/SalaryStructuresScreen';
import SalaryComponentsScreen from './src/screens/Payroll/SalaryComponentsScreen';
import EmployeeSalariesScreen from './src/screens/Payroll/EmployeeSalariesScreen';
import PayrollPeriodsScreen from './src/screens/Payroll/PayrollPeriodsScreen';
import EmployeeLoansScreen from './src/screens/Payroll/EmployeeLoansScreen';
import BulkUploadScreen from './src/screens/Payroll/BulkUploadScreen';
import SalaryRevisionScreen from './src/screens/Payroll/SalaryRevisionScreen';
import TaxDeclarationsScreen from './src/screens/Payroll/TaxDeclarationsScreen';
import CreateSalaryStructureScreen from './src/screens/Payroll/CreateSalaryStructureScreen';
import MyProfileScreen from './src/screens/Profile/MyProfileScreen';

// Placeholder screens for items that don't have a file yet
const PlaceholderScreen = ({ routeName }: { routeName: string }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles(colors).placeholderContainer,
        { backgroundColor: colors.background },
      ]}
    >
      <Text
        style={[styles(colors).placeholderText, { color: colors.textColor }]}
      >
        {routeName}
      </Text>
      <Text style={[styles(colors).subText, { color: colors.textColor }]}>
        Coming Soon
      </Text>
    </View>
  );
};

const screenComponents: {
  [key: string]: { component: React.FC<any>; title: string };
} = {
  Dashboard: { component: DashboardScreen, title: 'Dashboard' },
  'All Employees': {
    component: AllEmployeesScreen,
    title: 'Employee Management',
  },
  'Add Employee': { component: AddEmployeeScreen, title: 'Add New Employee' },
  'Import Employees': {
    component: ImportEmployeesScreen,
    title: 'Import Employees',
  },
  'Export Employees': {
    component: ExportEmployeesScreen,
    title: 'Export Employees',
  },
  'Recruitment Dashboard': {
    component: RecruitmentDashboardScreen,
    title: 'Recruitment',
  },
  'Job Positions': { component: JobPositionsScreen, title: 'Job Positions' },
  Candidates: { component: CandidatesScreen, title: 'Candidates' },
  Applications: { component: ApplicationsScreen, title: 'Applications' },
  Interviews: { component: InterviewsScreen, title: 'Interviews' },
  'Recruitment Analytics': {
    component: () => <PlaceholderScreen routeName="Recruitment Analytics" />,
    title: 'Recruitment Analytics',
  },
  'All Attendance': { component: AllAttendanceScreen, title: 'All Attendance' },
  'My Attendance': { component: MyAttendanceScreen, title: 'My Attendance' },
  'Attendance Reports': {
    component: AttendanceReportsScreen,
    title: 'Attendance Reports',
  },
  'Mark Attendance': {
    component: MarkAttendanceScreen,
    title: 'Mark Attendance',
  },
  'All Leaves': { component: AllLeavesScreen, title: 'All Leaves' },
  'Apply for Leave': { component: ApplyLeaveScreen, title: 'Apply for Leave' },
  'Leave Calendar': { component: LeaveCalendarScreen, title: 'Leave Calendar' },
  'Pending Approvals': {
    component: PendingApprovalsScreen,
    title: 'Pending Approvals',
  },
  // Payroll Screens
  'Payroll Dashboard': {
    component: PayrollDashboardScreen,
    title: 'Payroll Dashboard',
  },
  Payslips: { component: PayslipsScreen, title: 'Payslips' },
  'Salary Structures': {
    component: SalaryStructuresScreen,
    title: 'Salary Structures',
  },
  'Salary Components': {
    component: SalaryComponentsScreen,
    title: 'Salary Components',
  },
  'Employee Salaries': {
    component: EmployeeSalariesScreen,
    title: 'Employee Salaries',
  },
  'Payroll Periods': {
    component: PayrollPeriodsScreen,
    title: 'Payroll Periods',
  },
  'Employee Loans': { component: EmployeeLoansScreen, title: 'Employee Loans' },
  'Bulk Upload': { component: BulkUploadScreen, title: 'Bulk Upload' },
  'Salary Revision': {
    component: SalaryRevisionScreen,
    title: 'Salary Revision',
  },
  'Tax Declarations': {
    component: TaxDeclarationsScreen,
    title: 'Tax Declarations',
  },
  'Create Salary Structure': {
    component: CreateSalaryStructureScreen,
    title: 'Create Salary Structure',
  },
  'My Profile': {
    component: MyProfileScreen,
    title: 'My Profile',
  },
  'Security & Sessions': {
    component: () => <PlaceholderScreen routeName="Security & Sessions" />,
    title: 'Security & Sessions',
  },
};

// This component now contains the main application logic
const RootAppContent = () => {
  const { colors } = useTheme();

  const [activeScreen, setActiveScreen] = useState<string>('Dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const drawer = useRef<DrawerLayoutAndroid>(null);

  // Handle loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  const handleSetActiveScreen = (screenName: string) => {
    if (screenComponents[screenName]) {
      setActiveScreen(screenName);
    } else {
      console.warn(`Screen "${screenName}" not found!`);
    }
  };

  const toggleSidebar = () => {
    if (Platform.OS === 'android' && drawer.current) {
      if (isDrawerOpen) {
        drawer.current.closeDrawer();
      } else {
        drawer.current.openDrawer();
      }
    }
  };

  const closeDrawer = () => {
    if (Platform.OS === 'android' && drawer.current) {
      drawer.current.closeDrawer();
    }
  };

  const onDrawerOpen = () => setIsDrawerOpen(true);
  const onDrawerClose = () => setIsDrawerOpen(false);

  const navigationView = () => (
    <Sidebar
      activeScreen={activeScreen}
      setActiveScreen={handleSetActiveScreen}
      closeDrawer={closeDrawer}
    />
  );

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onAnimationFinish={handleLoadingFinish} />;
  }

  const { component: CurrentScreenComponent, title: headerTitle } =
    screenComponents[activeScreen];

  const MainContent = () => (
    <SafeAreaView
      style={[styles(colors).safeArea, { backgroundColor: colors.background }]}
    >
      <Header
        onMenuPress={toggleSidebar}
        title={headerTitle}
        showUserName={activeScreen === 'Dashboard'}
        navigation={{ navigate: handleSetActiveScreen }}
      />
      <View style={styles(colors).content}>
        <CurrentScreenComponent navigate={handleSetActiveScreen} />
      </View>
    </SafeAreaView>
  );

  if (Platform.OS === 'android') {
    return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={280}
        drawerPosition="left"
        renderNavigationView={navigationView}
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={onDrawerClose}
        drawerBackgroundColor="transparent"
      >
        <MainContent />
      </DrawerLayoutAndroid>
    );
  }

  return (
    <SafeAreaView
      style={[styles(colors).safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles(colors).container}>
        <Sidebar
          activeScreen={activeScreen}
          setActiveScreen={handleSetActiveScreen}
        />
        <View style={styles(colors).mainContent}>
          <Header
            onMenuPress={() => {}}
            title={headerTitle}
            showUserName={activeScreen === 'Dashboard'}
            navigation={{ navigate: handleSetActiveScreen }}
          />
          <View style={styles(colors).content}>
            <CurrentScreenComponent navigate={handleSetActiveScreen} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// The main App component now just wraps RootAppContent with ThemeProvider
const App = () => {
  return (
    <ThemeProvider>
      <RootAppContent />
    </ThemeProvider>
  );
};

// Modified StyleSheet to accept colors
const styles = (colors: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    mainContent: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    placeholderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    subText: {
      fontSize: 16,
      opacity: 0.7,
    },
  });

export default App;

import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen';
import AllEmployeesScreen from '../screens/Employees/AllEmployeesScreen';
import AddEmployeeScreen from '../screens/Employees/AddEmployeeScreen';
import ImportEmployeesScreen from '../screens/Employees/ImportEmployeesScreen';
import ExportEmployeesScreen from '../screens/Employees/ExportEmployeesScreen';

// Payroll Screens
import PayrollDashboardScreen from '../screens/Payroll/PayrollDashboardScreen';
import PayslipsScreen from '../screens/Payroll/PayslipsScreen';
import SalaryStructuresScreen from '../screens/Payroll/SalaryStructuresScreen';
import SalaryComponentsScreen from '../screens/Payroll/SalaryComponentsScreen';
import EmployeeSalariesScreen from '../screens/Payroll/EmployeeSalariesScreen';
import PayrollPeriodsScreen from '../screens/Payroll/PayrollPeriodsScreen';
import EmployeeLoansScreen from '../screens/Payroll/EmployeeLoansScreen';
import BulkUploadScreen from '../screens/Payroll/BulkUploadScreen';
import SalaryRevisionScreen from '../screens/Payroll/SalaryRevisionScreen';
import TaxDeclarationsScreen from '../screens/Payroll/TaxDeclarationsScreen';
import RecruitmentDashboardScreen from '../screens/Recruitment/RecruitmentDashboardScreen';
import JobPositionsScreen from '../screens/Recruitment/JobPositionsScreen';
import CandidatesScreen from '../screens/Recruitment/CandidatesScreen';
import ApplicationsScreen from '../screens/Recruitment/ApplicationsScreen';
import InterviewsScreen from '../screens/Recruitment/InterviewsScreen';
import AllLeavesScreen from '../screens/Leaves/AllLeavesScreen';
import ApplyLeaveScreen from '../screens/Leaves/ApplyLeaveScreen';
import LeaveCalendarScreen from '../screens/Leaves/LeaveCalendarScreen';
import PendingApprovalsScreen from '../screens/Leaves/PendingApprovalsScreen';
import AllAttendanceScreen from '../screens/Attendance/AllAttendanceScreen';
import MyAttendanceScreen from '../screens/Attendance/MyAttendanceScreen';
import AttendanceReportsScreen from '../screens/Attendance/AttendanceReportsScreen';
import Sidebar from '../components/Sidebar';

// Create placeholder components for missing screens
import { View, Text, StyleSheet } from 'react-native';

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={placeholderStyles.container}>
    <Text style={placeholderStyles.text}>{title}</Text>
    <Text style={placeholderStyles.subText}>Coming Soon</Text>
  </View>
);

const placeholderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
});

// Import the actual MyProfileScreen
import MyProfileScreen from '../screens/Profile/MyProfileScreen';

// Placeholder screen components
const RecruitmentAnalyticsScreen = () => <PlaceholderScreen title="Recruitment Analytics" />;
const SecuritySessionsScreen = () => <PlaceholderScreen title="Security & Sessions" />;

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      
      {/* Employee Screens */}
      <Drawer.Screen name="All Employees" component={AllEmployeesScreen} />
      <Drawer.Screen name="Add Employee" component={AddEmployeeScreen} />
      <Drawer.Screen name="Import Employees" component={ImportEmployeesScreen} />
      <Drawer.Screen name="Export Employees" component={ExportEmployeesScreen} />
      
      {/* Recruitment Screens */}
      <Drawer.Screen name="Recruitment Dashboard" component={RecruitmentDashboardScreen} />
      <Drawer.Screen name="Job Positions" component={JobPositionsScreen} />
      <Drawer.Screen name="Candidates" component={CandidatesScreen} />
      <Drawer.Screen name="Applications" component={ApplicationsScreen} />
      <Drawer.Screen name="Interviews" component={InterviewsScreen} />
      <Drawer.Screen name="Recruitment Analytics" component={RecruitmentAnalyticsScreen} />
      
      {/* Leave Screens */}
      <Drawer.Screen name="All Leaves" component={AllLeavesScreen} />
      <Drawer.Screen name="Apply for Leave" component={ApplyLeaveScreen} />
      <Drawer.Screen name="Leave Calendar" component={LeaveCalendarScreen} />
      <Drawer.Screen name="Pending Approvals" component={PendingApprovalsScreen} />
      
      {/* Attendance Screens */}
      <Drawer.Screen name="All Attendance" component={AllAttendanceScreen} />
      <Drawer.Screen name="My Attendance" component={MyAttendanceScreen} />
      <Drawer.Screen name="Attendance Reports" component={AttendanceReportsScreen} />
      
      {/* Payroll Screens */}
      <Drawer.Screen name="Payroll Dashboard" component={PayrollDashboardScreen} />
      <Drawer.Screen name="Payslips" component={PayslipsScreen} />
      <Drawer.Screen name="Salary Structures" component={SalaryStructuresScreen} />
      <Drawer.Screen name="Salary Components" component={SalaryComponentsScreen} />
      <Drawer.Screen name="Employee Salaries" component={EmployeeSalariesScreen} />
      <Drawer.Screen name="Payroll Periods" component={PayrollPeriodsScreen} />
      <Drawer.Screen name="Employee Loans" component={EmployeeLoansScreen} />
      <Drawer.Screen name="Bulk Upload" component={BulkUploadScreen} />
      <Drawer.Screen name="Salary Revision" component={SalaryRevisionScreen} />
      <Drawer.Screen name="Tax Declarations" component={TaxDeclarationsScreen} />
      
      {/* Profile Screens */}
      <Drawer.Screen name="My Profile" component={MyProfileScreen} />
      <Drawer.Screen name="Security & Sessions" component={SecuritySessionsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

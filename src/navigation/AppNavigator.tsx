import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';

// Employees Screens
import AllEmployeesScreen from '../screens/Employees/AllEmployeesScreen';
import AddEmployeeScreen from '../screens/Employees/AddEmployeeScreen';
import ImportEmployeesScreen from '../screens/Employees/ImportEmployeesScreen';
import ExportEmployeesScreen from '../screens/Employees/ExportEmployeesScreen';

// Recruitment Screens
import RecruitmentDashboardScreen from '../screens/Recruitment/RecruitmentDashboardScreen';
import JobPositionsScreen from '../screens/Recruitment/JobPositionsScreen';
import CandidatesScreen from '../screens/Recruitment/CandidatesScreen';
import ApplicationsScreen from '../screens/Recruitment/ApplicationsScreen';
import InterviewsScreen from '../screens/Recruitment/InterviewsScreen';
import AnalyticsScreen from '../screens/Recruitment/AnalyticsScreen';

// Attendance Screens
// import AllAttendanceScreen from '../screens/Attendance/AllAttendanceScreen';
// import MyAttendanceScreen from '../screens/Attendance/MyAttendanceScreen';
// import MarkAttendanceScreen from '../screens/Attendance/MarkAttendanceScreen';
// import AttendanceReportsScreen from '../screens/Attendance/AttendanceReportsScreen';

// Leaves Screens
import AllLeavesScreen from '../screens/Leaves/AllLeavesScreen';
import ApplyLeaveScreen from '../screens/Leaves/ApplyLeaveScreen';
import LeaveCalendarScreen from '../screens/Leaves/LeaveCalendarScreen';
import PendingApprovalsScreen from '../screens/Leaves/PendingApprovalsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      id="AppNavigator"
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />

      {/* Employees */}
      <Stack.Screen name="AllEmployees" component={AllEmployeesScreen} />
      <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
      <Stack.Screen name="ImportEmployees" component={ImportEmployeesScreen} />
      <Stack.Screen name="ExportEmployees" component={ExportEmployeesScreen} />

      {/* Recruitment */}
      <Stack.Screen name="RecruitmentDashboard" component={RecruitmentDashboardScreen} />
      <Stack.Screen name="JobPositions" component={JobPositionsScreen} />
      <Stack.Screen name="Candidates" component={CandidatesScreen} />
      <Stack.Screen name="Applications" component={ApplicationsScreen} />
      <Stack.Screen name="Interviews" component={InterviewsScreen} />
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />

      {/* Attendance */}
      {/* <Stack.Screen name="AllAttendance" component={AllAttendanceScreen} />
      <Stack.Screen name="MyAttendance" component={MyAttendanceScreen} />
      <Stack.Screen name="MarkAttendance" component={MarkAttendanceScreen} />
      <Stack.Screen name="AttendanceReports" component={AttendanceReportsScreen} /> */}

      {/* Leaves */}
      <Stack.Screen name="AllLeaves" component={AllLeavesScreen} />
      <Stack.Screen name="ApplyLeave" component={ApplyLeaveScreen} />
      <Stack.Screen name="LeaveCalendar" component={LeaveCalendarScreen} />
      <Stack.Screen name="PendingApprovals" component={PendingApprovalsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

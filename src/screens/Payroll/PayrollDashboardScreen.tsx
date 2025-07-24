import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

const PayrollDashboardScreen: React.FC = () => {
  const { colors } = useTheme();

  // Icon components using emojis for better compatibility
  const CommandIcon = () => <Text style={styles.headerIcon}>⚡</Text>;
  const EmployeesIcon = () => <Text style={styles.metricIcon}>👥</Text>;
  const MoneyIcon = () => <Text style={styles.metricIcon}>💰</Text>;
  const DocumentIcon = () => <Text style={styles.metricIcon}>📄</Text>;
  const BankIcon = () => <Text style={styles.metricIcon}>🏦</Text>;

  // Quick action icons with different colors
  const PayrollIcon = () => <Text style={[styles.actionIcon, { color: '#8B5CF6' }]}>📊</Text>;
  const PayslipIcon = () => <Text style={[styles.actionIcon, { color: '#10B981' }]}>📄</Text>;
  const SalaryIcon = () => <Text style={[styles.actionIcon, { color: '#F59E0B' }]}>💰</Text>;
  const LoanIcon = () => <Text style={[styles.actionIcon, { color: '#EF4444' }]}>💳</Text>;
  const SalariesIcon = () => <Text style={[styles.actionIcon, { color: '#06B6D4' }]}>👥</Text>;
  const ComponentsIcon = () => <Text style={[styles.actionIcon, { color: '#EC4899' }]}>⚙️</Text>;

  const CheckIcon = () => <Text style={styles.activityIcon}>✅</Text>;
  const ProcessIcon = () => <Text style={styles.activityIcon}>⚙️</Text>;
  const ApprovalIcon = () => <Text style={styles.activityIcon}>👍</Text>;

  const renderTopStatCard = (value: string, label: string, index: number) => {
    const colors = ['#8B5CF6', '#10B981', '#3B82F6', '#6366F1'];
    return (
      <View key={index} style={[styles.topStatCard, { backgroundColor: colors[index] }]}>
        <Text style={styles.topStatValue}>{value}</Text>
        <Text style={styles.topStatLabel}>{label}</Text>
      </View>
    );
  };

  const renderMetricCard = (
    icon: React.ReactNode,
    value: string,
    label: string,
    subtitle: string,
    borderColor: string
  ) => (
    <View style={[styles.metricCard, { borderLeftColor: borderColor }]}>
      <View style={styles.metricHeader}>
        <View style={styles.metricIconContainer}>
          {icon}
        </View>
        <View style={styles.metricContent}>
          <Text style={[styles.metricValue, { color: colors.textColor }]}>{value}</Text>
          <Text style={[styles.metricLabel, { color: colors.textColor }]}>{label}</Text>
          <Text style={[styles.metricSubtitle, { color: colors.grayText }]}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );

  const renderActionCard = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    backgroundColor: string
  ) => (
    <TouchableOpacity style={[styles.actionCard, { backgroundColor: colors.cardBackground }]}>
      <View style={[styles.actionIconContainer, { backgroundColor }]}>
        {icon}
      </View>
      <Text style={[styles.actionTitle, { color: colors.textColor }]}>{title}</Text>
      <Text style={[styles.actionSubtitle, { color: colors.grayText }]}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const renderActivityItem = (icon: React.ReactNode, title: string, subtitle: string) => (
    <View style={styles.activityItem}>
      <View style={[styles.activityIconContainer, { backgroundColor: colors.lightGray }]}>
        {icon}
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityTitle, { color: colors.textColor }]}>{title}</Text>
        <Text style={[styles.activitySubtitle, { color: colors.grayText }]}>{subtitle}</Text>
      </View>
    </View>
  );

  const renderInsightItem = (icon: string, title: string, subtitle: string, trend: string) => (
    <View style={styles.insightItem}>
      <Text style={styles.insightIcon}>{icon}</Text>
      <View style={styles.insightContent}>
        <Text style={[styles.insightTitle, { color: colors.textColor }]}>{title}</Text>
        <Text style={[styles.insightSubtitle, { color: colors.grayText }]}>{subtitle}</Text>
      </View>
      <Text style={[styles.insightTrend, { color: colors.accentGreen }]}>{trend}</Text>
    </View>
  );

  const renderProgressItem = (label: string, percentage: number, color: string) => (
    <View style={styles.progressItem}>
      <View style={styles.progressHeader}>
        <Text style={[styles.progressLabel, { color: colors.textColor }]}>{label}</Text>
        <Text style={[styles.progressPercentage, { color: colors.textColor }]}>{percentage}%</Text>
      </View>
      <View style={[styles.progressBar, { backgroundColor: colors.lightGray }]}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header - Payroll Command Center */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <CommandIcon />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Payroll Command Center</Text>
              <Text style={styles.headerSubtitle}>
                Streamline your payroll operations with intelligent automation and real-time insights
              </Text>
            </View>
          </View>
        </View>

        {/* Top Statistics Cards */}
        <View style={styles.topStatsContainer}>
          {renderTopStatCard('₹0', 'Total Payroll', 0)}
          {renderTopStatCard('0', 'Employees', 1)}
          {renderTopStatCard('0', 'Pending', 2)}
          {renderTopStatCard('96%', 'Efficiency', 3)}
        </View>

        {/* Metric Cards */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricsRow}>
            {renderMetricCard(
              <EmployeesIcon />,
              '0',
              'TOTAL EMPLOYEES',
              '0 new hires',
              '#10B981'
            )}
            {renderMetricCard(
              <MoneyIcon />,
              '₹0',
              'MONTHLY PAYROLL',
              '₹0 this month',
              '#10B981'
            )}
          </View>
          <View style={styles.metricsRow}>
            {renderMetricCard(
              <DocumentIcon />,
              '0',
              'PAYSLIPS GENERATED',
              '0% completion',
              '#EF4444'
            )}
            {renderMetricCard(
              <BankIcon />,
              '0',
              'PENDING TASKS',
              '0 outstanding',
              '#F59E0B'
            )}
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionsRow}>
            {renderActionCard(
              <PayrollIcon />,
              'Payroll Periods',
              'Manage and archive payroll cycles',
              '#F3E8FF'
            )}
            {renderActionCard(
              <PayslipIcon />,
              'Payslips',
              'View and manage employee payslips',
              '#ECFDF5'
            )}
            {renderActionCard(
              <SalaryIcon />,
              'Salary Structures',
              'Configure salary structures',
              '#FEF3C7'
            )}
          </View>
          <View style={styles.actionsRow}>
            {renderActionCard(
              <LoanIcon />,
              'Employee Loans',
              'Manage loan applications',
              '#FEE2E2'
            )}
            {renderActionCard(
              <SalariesIcon />,
              'Employee Salaries',
              'Assign and track salaries',
              '#E0F2FE'
            )}
            {renderActionCard(
              <ComponentsIcon />,
              'Salary Components',
              'Manage allowances & deductions',
              '#FCE7F3'
            )}
          </View>
        </View>

        {/* Analytics Chart Section */}
        <View style={[styles.analyticsContainer, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <Text style={[styles.analyticsTitle, { color: colors.textColor }]}>Payroll Analytics</Text>
            <View style={styles.analyticsControls}>
              <TouchableOpacity style={styles.analyticsButton}>
                <Text style={styles.analyticsButtonText}>1M</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Chart Placeholder */}
          <View style={styles.chartContainer}>
            <View style={styles.chartYAxis}>
              <Text style={[styles.chartLabel, { color: colors.grayText }]}>₹50000</Text>
              <Text style={[styles.chartLabel, { color: colors.grayText }]}>₹40000</Text>
              <Text style={[styles.chartLabel, { color: colors.grayText }]}>₹30000</Text>
              <Text style={[styles.chartLabel, { color: colors.grayText }]}>₹20000</Text>
              <Text style={[styles.chartLabel, { color: colors.grayText }]}>₹10000</Text>
              <Text style={[styles.chartLabel, { color: colors.grayText }]}>₹0</Text>
            </View>
            <View style={styles.chartArea}>
              {/* Gradient Chart Area */}
              <View style={styles.chartGradient} />
              {/* Chart Line */}
              <View style={styles.chartLine} />
            </View>
          </View>
          
          <View style={styles.chartXAxis}>
            <Text style={[styles.chartLabel, { color: colors.grayText }]}>Jan</Text>
            <Text style={[styles.chartLabel, { color: colors.grayText }]}>Feb</Text>
            <Text style={[styles.chartLabel, { color: colors.grayText }]}>Mar</Text>
            <Text style={[styles.chartLabel, { color: colors.grayText }]}>Apr</Text>
            <Text style={[styles.chartLabel, { color: colors.grayText }]}>May</Text>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Current Month Progress */}
          <View style={[styles.progressContainer, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Current Month Progress</Text>
            {renderProgressItem('Payroll Processing', 85, '#8B5CF6')}
            {renderProgressItem('Payslip Generation', 72, '#10B981')}
            {renderProgressItem('Salary Payments', 90, '#3B82F6')}
            {renderProgressItem('Compliance Screening', 95, '#6366F1')}
          </View>

          {/* Recent Activities */}
          <View style={[styles.activitiesContainer, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Recent Activities</Text>
            {renderActivityItem(
              <CheckIcon />,
              'Ready for next processing payroll',
              'System ready'
            )}
            {renderActivityItem(
              <ProcessIcon />,
              'All systems operational',
              'Service online'
            )}
            {renderActivityItem(
              <ApprovalIcon />,
              'Tax Processing optimized',
              'Process optimized'
            )}
          </View>

          {/* Smart Insights */}
          <View style={[styles.insightsContainer, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Smart Insights</Text>
            {renderInsightItem(
              '📈',
              'Average salary increased by 5.2%',
              'Compared to last quarter',
              '+5.2%'
            )}
            {renderInsightItem(
              '⚡',
              'Processing time reduced by 25%',
              'Automation efficiency gains',
              '+25%'
            )}
            {renderInsightItem(
              '🎯',
              '3 compliance milestones achieved',
              'Regulatory requirements met',
              '100%'
            )}
            {renderInsightItem(
              '👥',
              '94% employee satisfaction with payroll',
              'Employee feedback survey',
              '+94%'
            )}
          </View>
        </View>
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

  // Header Styles
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 16,
    margin: 16,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },

  // Top Stats Cards
  topStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  topStatCard: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  topStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  topStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },

  // Metrics Cards
  metricsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  metricIcon: {
    fontSize: 20,
  },
  metricContent: {
    flex: 1,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 12,
  },

  // Action Cards
  actionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },

  // Analytics Section
  analyticsContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  analyticsControls: {
    flexDirection: 'row',
  },
  analyticsButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  analyticsButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 12,
  },
  chartYAxis: {
    width: 50,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  chartLabel: {
    fontSize: 10,
    textAlign: 'right',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  chartGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  chartLine: {
    position: 'absolute',
    bottom: '60%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#8B5CF6',
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },

  // Bottom Section
  bottomSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  // Progress Section
  progressContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Activities Section
  activitiesContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
  },

  // Insights Section
  insightsContainer: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  insightIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 32,
    textAlign: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  insightSubtitle: {
    fontSize: 12,
  },
  insightTrend: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PayrollDashboardScreen;
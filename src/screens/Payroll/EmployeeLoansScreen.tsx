import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import LoadingScreen from '../../components/LoadingScreen';
import {
  widthPixel,
  heightPixel,
  fontPixel,
  spacing,
  componentSizes,
  isSmallDevice,
  isTablet,
  responsiveWidth,
} from '../../utils/responsive';

// Icons (you can replace with your actual icon components)
const BankIcon = () => <Text style={{ fontSize: 20, color: '#fff' }}>🏦</Text>;
const PlusIcon = () => <Text style={{ fontSize: 16, color: '#fff' }}>+</Text>;
const SearchIcon = () => (
  <Text style={{ fontSize: 16, color: '#9CA3AF' }}>🔍</Text>
);
const FilterIcon = () => (
  <Text style={{ fontSize: 16, color: '#fff' }}>⚙️</Text>
);
const ExportIcon = () => (
  <Text style={{ fontSize: 16, color: '#6B7280' }}>📊</Text>
);
const EmptyStateIcon = () => (
  <Text style={{ fontSize: 48, color: '#9CA3AF' }}>🏛️</Text>
);

const EmployeeLoansScreen = () => {
  const { colors } = useTheme();
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Sample loan data for responsive table/card view
  const [loans] = useState([
    {
      id: 'EMP001',
      name: 'John Doe',
      type: 'Personal Loan',
      amount: '₹5.0L',
      remaining: '₹2.5L',
      monthly: '₹2500',
      progress: 50,
      status: 'Active',
    },
    {
      id: 'EMP002',
      name: 'Jane Smith',
      type: 'Home Loan',
      amount: '₹10.0L',
      remaining: '₹8.0L',
      monthly: '₹4000',
      progress: 20,
      status: 'Active',
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      type: 'Emergency Loan',
      amount: '₹1.0L',
      remaining: '₹0.0L',
      monthly: '₹0',
      progress: 100,
      status: 'Completed',
    },
  ]);

  const renderHeader = () => (
    <LinearGradient
      colors={['#8B5CF6', '#A855F7', '#C084FC']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <BankIcon />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Employee Loan Management</Text>
              <Text style={styles.headerSubtitle}>
                Streamline employee loan applications, approvals, and repayment
                tracking
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>TOTAL LOANS</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>ACTIVE</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>PENDING</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹0</Text>
          <Text style={styles.statLabel}>TOTAL AMOUNT</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderSearchAndActions = () => (
    <View style={styles.searchActionContainer}>
      <View
        style={[styles.searchContainer, { backgroundColor: colors.lightGray }]}
      >
        <SearchIcon />
        <TextInput
          style={[styles.searchInput, { color: colors.darkGrayText }]}
          placeholder="Search loans by employee"
          placeholderTextColor={colors.grayText}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <TouchableOpacity
        style={[styles.addLoanButton, { backgroundColor: colors.accentGreen }]}
      >
        <PlusIcon />
        <Text style={styles.addLoanButtonText}>Add Loan</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoanCard = (loan: any, index: number) => {
    const getStatusColor = (status: string) => {
      return status === 'Active' ? colors.primaryDarkBlue : colors.accentGreen;
    };

    return (
      <View
        key={loan.id}
        style={[styles.loanCard, { backgroundColor: colors.cardBackground }]}
      >
        <View style={styles.loanCardHeader}>
          <View style={styles.employeeInfo}>
            <Text style={[styles.employeeId, { color: colors.dangerRedText }]}>
              {loan.id}
            </Text>
            <Text style={[styles.employeeName, { color: colors.darkGrayText }]}>
              {loan.name}
            </Text>
            <Text style={[styles.loanType, { color: colors.grayText }]}>
              {loan.type}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(loan.status) },
            ]}
          >
            <Text style={styles.statusText}>{loan.status}</Text>
          </View>
        </View>

        <View style={styles.loanCardContent}>
          <View style={styles.amountRow}>
            <View style={styles.amountItem}>
              <Text
                style={[styles.amountValue, { color: colors.darkGrayText }]}
              >
                {loan.amount}
              </Text>
              <Text style={[styles.amountLabel, { color: colors.grayText }]}>
                Total
              </Text>
            </View>

            <View style={styles.amountItem}>
              <Text
                style={[styles.amountValue, { color: colors.dangerRedText }]}
              >
                {loan.remaining}
              </Text>
              <Text style={[styles.amountLabel, { color: colors.grayText }]}>
                Remaining
              </Text>
            </View>

            <View style={styles.amountItem}>
              <Text style={[styles.amountValue, { color: colors.accentGreen }]}>
                {loan.monthly}
              </Text>
              <Text style={[styles.amountLabel, { color: colors.grayText }]}>
                Monthly
              </Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: colors.borderGray },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${loan.progress}%`,
                    backgroundColor: colors.accentGreen,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.grayText }]}>
              {loan.progress}%
            </Text>
          </View>
        </View>

        <View style={styles.loanCardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text
              style={[styles.actionIcon, { color: colors.primaryDarkBlue }]}
            >
              👁
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text
              style={[styles.actionIcon, { color: colors.primaryDarkBlue }]}
            >
              ✏️
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTableHeader = () => (
    <View style={[styles.tableHeader, { backgroundColor: colors.lightGray }]}>
      <Text
        style={[
          styles.tableHeaderText,
          styles.employeeColumn,
          { color: colors.grayText },
        ]}
      >
        EMPLOYEE
      </Text>
      <Text
        style={[
          styles.tableHeaderText,
          styles.amountColumn,
          { color: colors.grayText },
        ]}
      >
        LOAN AMOUNT
      </Text>
      <Text
        style={[
          styles.tableHeaderText,
          styles.remainingColumn,
          { color: colors.grayText },
        ]}
      >
        REMAINING
      </Text>
      <Text
        style={[
          styles.tableHeaderText,
          styles.monthlyColumn,
          { color: colors.grayText },
        ]}
      >
        MONTHLY EMI
      </Text>
      <Text
        style={[
          styles.tableHeaderText,
          styles.progressColumn,
          { color: colors.grayText },
        ]}
      >
        PROGRESS
      </Text>
      <Text
        style={[
          styles.tableHeaderText,
          styles.statusColumn,
          { color: colors.grayText },
        ]}
      >
        STATUS
      </Text>
      <Text
        style={[
          styles.tableHeaderText,
          styles.actionsColumn,
          { color: colors.grayText },
        ]}
      >
        ACTIONS
      </Text>
    </View>
  );

  const renderLoansContent = () => {
    if (loans.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyStateIcon />
          <Text
            style={[styles.emptyStateTitle, { color: colors.darkGrayText }]}
          >
            🔍 No Loan Applications Found
          </Text>
          <Text style={[styles.emptyStateMessage, { color: colors.grayText }]}>
            No loan applications have been submitted yet.
          </Text>
          <Text
            style={[styles.emptyStateSubMessage, { color: colors.grayText }]}
          >
            Employees can apply for loans through the self-service portal.
          </Text>

          <TouchableOpacity
            style={[
              styles.createFirstLoanButton,
              { backgroundColor: colors.primaryDarkBlue },
            ]}
          >
            <PlusIcon />
            <Text style={styles.createFirstLoanButtonText}>
              Create First Loan
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Show table view on tablets, card view on phones
    if (isTablet()) {
      return (
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          {loans.map((loan, index) => renderLoanCard(loan, index))}
        </View>
      );
    } else {
      return (
        <View style={styles.cardsContainer}>
          {loans.map((loan, index) => renderLoanCard(loan, index))}
        </View>
      );
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.lightGray }]}>
      {renderHeader()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSearchAndActions()}
        {renderLoansContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Responsive Header Styles
  headerContainer: {
    paddingTop: heightPixel(50),
    paddingBottom: heightPixel(24),
    paddingHorizontal: widthPixel(16),
    borderBottomLeftRadius: widthPixel(30),
    borderBottomRightRadius: widthPixel(30),
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: heightPixel(8),
    },
    shadowOpacity: 0.3,
    shadowRadius: widthPixel(12),
    elevation: 15,
  },
  headerContent: {
    marginBottom: heightPixel(16),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(12),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTextContainer: {
    marginLeft: widthPixel(12),
    flex: 1,
  },
  headerTitle: {
    fontSize: fontPixel(isSmallDevice() ? 16 : 18),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: heightPixel(2),
  },
  headerSubtitle: {
    fontSize: fontPixel(isSmallDevice() ? 11 : 12),
    color: '#fff',
    opacity: 0.9,
    lineHeight: heightPixel(16),
  },
  // Responsive Stats Container
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: widthPixel(isSmallDevice() ? 6 : 8),
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: widthPixel(isSmallDevice() ? 10 : 12),
    borderRadius: widthPixel(16),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: heightPixel(isSmallDevice() ? 55 : 60),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(139, 92, 246, 0.3)',
    shadowOffset: {
      width: 0,
      height: heightPixel(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: widthPixel(8),
    elevation: 8,
  },
  statNumber: {
    fontSize: fontPixel(isSmallDevice() ? 16 : 18),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: heightPixel(2),
  },
  statLabel: {
    fontSize: fontPixel(isSmallDevice() ? 9 : 10),
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  // Responsive Content Area
  content: {
    flex: 1,
    padding: widthPixel(16),
  },
  // Search and Actions - Responsive Layout
  searchActionContainer: {
    flexDirection: isSmallDevice() ? 'column' : 'row',
    alignItems: isSmallDevice() ? 'stretch' : 'center',
    marginBottom: heightPixel(20),
    gap: widthPixel(12),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(12),
    borderRadius: widthPixel(8),
    flex: isSmallDevice() ? 0 : 1,
    minHeight: componentSizes.inputHeight,
  },
  searchInput: {
    flex: 1,
    fontSize: fontPixel(14),
    marginLeft: widthPixel(8),
  },
  addLoanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(12),
    borderRadius: widthPixel(20),
    gap: widthPixel(6),
    minHeight: componentSizes.buttonHeight,
    justifyContent: 'center',
  },
  addLoanButtonText: {
    color: '#fff',
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  // Responsive Cards Container
  cardsContainer: {
    gap: heightPixel(16),
  },
  // Responsive Loan Card Styles
  loanCard: {
    borderRadius: widthPixel(12),
    padding: widthPixel(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(4),
    elevation: 3,
    marginBottom: heightPixel(8),
  },
  loanCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: heightPixel(12),
  },
  employeeInfo: {
    flex: 1,
  },
  employeeId: {
    fontSize: fontPixel(12),
    fontWeight: '600',
    marginBottom: heightPixel(2),
  },
  employeeName: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    marginBottom: heightPixel(2),
  },
  loanType: {
    fontSize: fontPixel(12),
  },
  statusBadge: {
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(6),
    borderRadius: widthPixel(16),
  },
  statusText: {
    color: '#fff',
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  loanCardContent: {
    marginBottom: heightPixel(12),
  },
  // Responsive Amount Row
  amountRow: {
    flexDirection: isSmallDevice() ? 'column' : 'row',
    justifyContent: 'space-between',
    marginBottom: heightPixel(12),
    gap: heightPixel(isSmallDevice() ? 8 : 0),
  },
  amountItem: {
    alignItems: isSmallDevice() ? 'flex-start' : 'center',
    flex: isSmallDevice() ? 0 : 1,
  },
  amountValue: {
    fontSize: fontPixel(14),
    fontWeight: '600',
    marginBottom: heightPixel(2),
  },
  amountLabel: {
    fontSize: fontPixel(12),
  },
  // Progress Section
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPixel(12),
  },
  progressBar: {
    flex: 1,
    height: heightPixel(6),
    borderRadius: widthPixel(3),
  },
  progressFill: {
    height: '100%',
    borderRadius: widthPixel(3),
  },
  progressText: {
    fontSize: fontPixel(12),
    minWidth: widthPixel(35),
    textAlign: 'right',
  },
  loanCardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: widthPixel(12),
  },
  actionButton: {
    padding: widthPixel(8),
    minWidth: widthPixel(40),
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: fontPixel(16),
  },
  // Responsive Table Styles (for tablets)
  tableContainer: {
    borderRadius: widthPixel(8),
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: heightPixel(12),
    paddingHorizontal: widthPixel(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableHeaderText: {
    fontSize: fontPixel(11),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  // Responsive Table Columns
  employeeColumn: {
    flex: isTablet() ? 3 : 2.5,
    textAlign: 'left',
  },
  amountColumn: {
    flex: isTablet() ? 2 : 1.5,
    textAlign: 'center',
  },
  remainingColumn: {
    flex: isTablet() ? 2 : 1.5,
    textAlign: 'center',
  },
  monthlyColumn: {
    flex: isTablet() ? 2 : 1.5,
    textAlign: 'center',
  },
  progressColumn: {
    flex: isTablet() ? 2 : 1.5,
    textAlign: 'center',
  },
  statusColumn: {
    flex: isTablet() ? 1.5 : 1,
    textAlign: 'center',
  },
  actionsColumn: {
    flex: isTablet() ? 1.5 : 1,
    textAlign: 'center',
  },
  // Responsive Empty State
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: heightPixel(40),
    paddingHorizontal: widthPixel(20),
  },
  emptyStateTitle: {
    fontSize: fontPixel(16),
    fontWeight: '600',
    marginTop: heightPixel(16),
    marginBottom: heightPixel(8),
    textAlign: 'center',
  },
  emptyStateMessage: {
    fontSize: fontPixel(14),
    textAlign: 'center',
    marginBottom: heightPixel(4),
    lineHeight: heightPixel(20),
  },
  emptyStateSubMessage: {
    fontSize: fontPixel(14),
    textAlign: 'center',
    marginBottom: heightPixel(24),
    lineHeight: heightPixel(20),
  },
  createFirstLoanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(12),
    borderRadius: widthPixel(20),
    gap: widthPixel(6),
    minHeight: componentSizes.buttonHeight,
  },
  createFirstLoanButtonText: {
    color: '#fff',
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
});

export default EmployeeLoansScreen;

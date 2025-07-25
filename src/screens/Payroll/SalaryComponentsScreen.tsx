import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import LoadingScreen from '../../components/LoadingScreen';

// Icons (you can replace with your actual icon components)
const SettingsIcon = () => (
  <Text style={{ fontSize: 20, color: '#fff' }}>⚙️</Text>
);
const PlusIcon = () => <Text style={{ fontSize: 16, color: '#fff' }}>+</Text>;

interface SalaryComponent {
  id: string;
  name: string;
  type: string;
  calculation: string;
  order: number;
  isActive: boolean;
  category: 'earning' | 'deduction';
}

const SalaryComponentsScreen = () => {
  const { colors } = useTheme();
  const [loading] = useState(false);

  // Sample data matching the reference image
  const [components, setComponents] = useState<SalaryComponent[]>([
    {
      id: '1',
      name: 'Basic Salary',
      type: 'Earning',
      calculation: 'Fixed Amount',
      order: 1,
      isActive: true,
      category: 'earning',
    },
    {
      id: '2',
      name: 'House Rent Allowance',
      type: 'Earning',
      calculation: 'Percentage of Basic',
      order: 2,
      isActive: true,
      category: 'earning',
    },
    {
      id: '3',
      name: 'Conveyance Allowance',
      type: 'Earning',
      calculation: 'Fixed Amount',
      order: 3,
      isActive: true,
      category: 'earning',
    },
    {
      id: '4',
      name: 'Medical Allowance',
      type: 'Earning',
      calculation: 'Fixed Amount',
      order: 4,
      isActive: true,
      category: 'earning',
    },
    {
      id: '5',
      name: 'Special Allowance',
      type: 'Earning',
      calculation: 'Fixed Amount',
      order: 5,
      isActive: true,
      category: 'earning',
    },
    {
      id: '6',
      name: 'Overtime',
      type: 'Earning',
      calculation: 'Hourly Rate',
      order: 6,
      isActive: true,
      category: 'earning',
    },
    {
      id: '7',
      name: 'Provident Fund',
      type: 'Deduction',
      calculation: 'Percentage of Basic',
      order: 7,
      isActive: false,
      category: 'deduction',
    },
    {
      id: '8',
      name: 'Employee State Insurance',
      type: 'Deduction',
      calculation: 'Percentage of Gross',
      order: 8,
      isActive: false,
      category: 'deduction',
    },
    {
      id: '9',
      name: 'Professional Tax',
      type: 'Deduction',
      calculation: 'Fixed Amount',
      order: 9,
      isActive: false,
      category: 'deduction',
    },
    {
      id: '10',
      name: 'Tax Deducted at Source',
      type: 'Deduction',
      calculation: 'Calculated Monthly',
      order: 10,
      isActive: false,
      category: 'deduction',
    },
    {
      id: '11',
      name: 'Loss of Pay',
      type: 'Deduction',
      calculation: 'Calculated Daily',
      order: 11,
      isActive: false,
      category: 'deduction',
    },
  ]);

  const toggleComponentStatus = (id: string) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, isActive: !comp.isActive } : comp,
      ),
    );
  };

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
            <SettingsIcon />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Salary Components</Text>
              <Text style={styles.headerSubtitle}>
                Configure and manage salary components including allowances,
                deductions, and employer contributions
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <PlusIcon />
            <Text style={styles.addButtonText}>Add Component</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Active Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Active Deductions</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>11</Text>
          <Text style={styles.statLabel}>Total Components</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Inactive Components</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderComponentCard = (component: SalaryComponent) => {
    const isEarning = component.category === 'earning';
    const borderColor = isEarning ? '#10B981' : '#EF4444';
    const statusColor = component.isActive ? '#10B981' : '#EF4444';

    return (
      <View
        key={component.id}
        style={[
          styles.componentCard,
          { borderLeftColor: borderColor, backgroundColor: colors.white },
        ]}
      >
        <View style={styles.componentHeader}>
          <View style={styles.componentTitleRow}>
            <Text style={[styles.componentName, { color: colors.darkGrayText }]}>
              {component.name}
            </Text>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: statusColor }]}
              onPress={() => toggleComponentStatus(component.id)}
            >
              <Text style={styles.statusButtonText}>
                {component.isActive ? 'Active' : 'Inactive'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.componentDetailsRow}>
            <View style={styles.componentDetails}>
              <Text style={[styles.componentMeta, { color: colors.grayText }]}>
                Type: {component.type}
              </Text>
              <Text style={[styles.componentMeta, { color: colors.grayText }]}>
                Calculation: {component.calculation}
              </Text>
              <Text style={[styles.componentMeta, { color: colors.grayText }]}>
                Order: {component.order}
              </Text>
            </View>
            <Switch
              value={component.isActive}
              onValueChange={() => toggleComponentStatus(component.id)}
              trackColor={{ false: '#E5E7EB', true: '#10B981' }}
              thumbColor={component.isActive ? '#fff' : '#fff'}
              style={styles.componentSwitch}
            />
          </View>
        </View>

        <View style={styles.componentFooter}>
          <View style={styles.footerRow}>
            <View style={styles.footerItem}>
              <Text style={[styles.footerValue, { color: colors.grayText }]}>
                Yes
              </Text>
              <Text style={[styles.footerLabel, { color: colors.grayText }]}>
                In Payslip
              </Text>
            </View>
            <View style={styles.footerItem}>
              <Text style={[styles.footerValue, { color: colors.grayText }]}>
                No
              </Text>
              <Text style={[styles.footerLabel, { color: colors.grayText }]}>
                In CTC
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.lightGray }]}>
      {renderHeader()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={styles.filterButtonText}>All Components</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={[styles.filterButtonText, { color: colors.grayText }]}>
              All Earnings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={[styles.filterButtonText, { color: colors.grayText }]}>
              All Deductions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={[styles.filterButtonText, { color: colors.grayText }]}>
              All Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, styles.activeFilterButton]}
          >
            <Text style={styles.activeFilterText}>Active</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.componentsContainer}>
          {components.map(component => renderComponentCard(component))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
  },
  headerContent: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(139, 92, 246, 0.3)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeFilter: {
    backgroundColor: '#E5E7EB',
  },
  activeFilterButton: {
    backgroundColor: '#3B82F6',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  activeFilterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  componentsContainer: {
    gap: 16,
  },
  componentCard: {
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  componentHeader: {
    marginBottom: 12,
  },
  componentTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  componentName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  componentDetailsRow: {
    flexDirection: 'column',
    gap: 8,
  },
  componentDetails: {
    flexDirection: 'column',
    gap: 4,
  },
  componentMeta: {
    fontSize: 12,
  },
  componentSwitch: {
    alignSelf: 'flex-end',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  componentFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  footerLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default SalaryComponentsScreen;

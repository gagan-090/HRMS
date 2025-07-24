import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

interface SalaryStructure {
  id: string;
  name: string;
  description: string;
  grade: string;
  employeeCount: number;
  minSalary: number;
  maxSalary: number;
  components: number;
  status: 'Active' | 'Inactive';
  createdDate: string;
}

interface SalaryComponent {
  id: string;
  name: string;
  type: 'Allowance' | 'Deduction';
  amount?: number;
  percentage?: number;
}

const sampleStructures: SalaryStructure[] = [
  {
    id: '1',
    name: 'Standard Salary Structure',
    description: 'Standard salary structure for all employees',
    grade: 'No Grade',
    employeeCount: 8,
    minSalary: 25000,
    maxSalary: 300000,
    components: 8,
    status: 'Active',
    createdDate: '2024-01-15',
  },
];

const salaryComponents: SalaryComponent[] = [
  { id: '1', name: 'Basic Salary', type: 'Allowance' },
  { id: '2', name: 'House Rent Allowance', type: 'Allowance' },
  { id: '3', name: 'Conveyance Allowance', type: 'Allowance' },
  { id: '4', name: 'Medical Allowance', type: 'Allowance' },
  { id: '5', name: 'Special Allowance', type: 'Allowance' },
  { id: '6', name: 'PF Deduction', type: 'Deduction' },
  { id: '7', name: 'ESI Deduction', type: 'Deduction' },
  { id: '8', name: 'Professional Tax', type: 'Deduction' },
];

interface SalaryStructuresScreenProps {
  navigate?: (screenName: string) => void;
}

const SalaryStructuresScreen: React.FC<SalaryStructuresScreenProps> = ({ navigate }) => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedRange, setSelectedRange] = useState('All Ranges');

  // Icon components
  const StructureIcon = () => <Text style={styles.headerIcon}>🏗️</Text>;
  const SearchIcon = () => <Text style={styles.searchIcon}>🔍</Text>;
  const FilterIcon = () => <Text style={styles.filterIcon}>🔽</Text>;
  const CreateIcon = () => <Text style={styles.buttonIcon}>+</Text>;
  const ManageIcon = () => <Text style={styles.buttonIcon}>⚙️</Text>;

  const renderTopStatCard = (value: string, label: string, index: number) => {
    const gradientColors = [
      ['#10B981', '#059669'], // Emerald gradient
      ['#059669', '#047857'], // Darker emerald gradient
      ['#047857', '#065F46'], // Deep emerald gradient
      ['#065F46', '#064E3B'], // Darkest emerald gradient
    ];

    return (
      <LinearGradient
        key={index}
        colors={gradientColors[index]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topStatCard}
      >
        <Text style={styles.topStatValue}>{value}</Text>
        <Text style={styles.topStatLabel}>{label}</Text>
      </LinearGradient>
    );
  };

  const renderStructureCard = ({ item }: { item: SalaryStructure }) => (
    <View
      style={[styles.structureCard, { backgroundColor: colors.cardBackground }]}
    >
      {/* Structure Header */}
      <View style={styles.structureHeader}>
        <View style={styles.structureIconContainer}>
          <Text style={styles.structureNumber}>S</Text>
        </View>
        <View style={styles.structureInfo}>
          <Text style={[styles.structureName, { color: colors.textColor }]}>
            {item.name}
          </Text>
          <View style={styles.structureDetails}>
            <Text style={[styles.structureGrade, { color: colors.grayText }]}>
              👤 {item.grade} • 👥 {item.employeeCount} Employees
            </Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusPill, { backgroundColor: '#D1FAE5' }]}>
            <Text style={[styles.statusText, { color: '#065F46' }]}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>

      {/* Salary Range Cards */}
      <View style={styles.salaryRangeContainer}>
        <View style={styles.salaryRangeCard}>
          <Text style={[styles.salaryAmount, { color: colors.textColor }]}>
            ₹{item.minSalary.toLocaleString()}
          </Text>
          <Text style={[styles.salaryLabel, { color: colors.grayText }]}>
            🔻 MIN SALARY
          </Text>
        </View>
        <View style={styles.salaryRangeCard}>
          <Text style={[styles.salaryAmount, { color: colors.textColor }]}>
            ₹{item.maxSalary.toLocaleString()}
          </Text>
          <Text style={[styles.salaryLabel, { color: colors.grayText }]}>
            🔺 MAX SALARY
          </Text>
        </View>
        <View style={styles.salaryRangeCard}>
          <Text style={[styles.salaryAmount, { color: colors.textColor }]}>
            {item.components}
          </Text>
          <Text style={[styles.salaryLabel, { color: colors.grayText }]}>
            ⚙️ COMPONENTS
          </Text>
        </View>
      </View>

      {/* Salary Components Section */}
      <View style={styles.componentsSection}>
        <Text style={[styles.componentsTitle, { color: colors.textColor }]}>
          ⚙️ Salary Components
        </Text>
        <View style={styles.componentsList}>
          {salaryComponents.map((component, index) => (
            <View key={component.id} style={styles.componentItem}>
              <Text style={[styles.componentName, { color: colors.grayText }]}>
                {component.name}
              </Text>
              {index < salaryComponents.length - 1 && (
                <Text
                  style={[
                    styles.componentSeparator,
                    { color: colors.grayText },
                  ]}
                >
                  •
                </Text>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.moreComponents}>
            <Text style={[styles.moreText, { color: colors.blue }]}>
              +3 more
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Salary Structure Management */}
        <LinearGradient
          colors={['#10B981', '#059669', '#047857']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerLeft}>
            <StructureIcon />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>
                Salary Structure Management
              </Text>
              <Text style={styles.headerSubtitle}>
                Create and manage comprehensive salary structures for different
                employee grades
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Top Statistics Cards */}
        <View style={styles.topStatsContainer}>
          {renderTopStatCard('1', 'TOTAL STRUCTURES', 0)}
          {renderTopStatCard('0', 'ACTIVE', 1)}
          {renderTopStatCard('0', 'EMPLOYEES ASSIGNED', 2)}
          {renderTopStatCard('0', 'AVG SALARY', 3)}
        </View>

        {/* Salary Structures Section */}
        <View
          style={[
            styles.structuresSection,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.structuresHeader}>
            <View style={styles.structuresTitle}>
              <Text style={styles.structuresIcon}>🏗️</Text>
              <View>
                <Text
                  style={[
                    styles.structuresTitleText,
                    { color: colors.textColor },
                  ]}
                >
                  Salary Structures
                </Text>
                <Text
                  style={[
                    styles.structuresSubtitle,
                    { color: colors.grayText },
                  ]}
                >
                  Define salary components and structure hierarchy
                </Text>
              </View>
            </View>
            <View style={styles.structuresActions}>
              <TouchableOpacity
                style={[
                  styles.createButton,
                  { backgroundColor: colors.accentGreen },
                ]}
              >
                <CreateIcon />
                <Text
                  style={[styles.createButtonText, { color: colors.white }]}
                >
                  Create Structure
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.manageButton,
                  {
                    backgroundColor: colors.lightGray,
                    borderColor: colors.borderGray,
                  },
                ]}
              >
                <ManageIcon />
                <Text
                  style={[styles.manageButtonText, { color: colors.textColor }]}
                >
                  Manage Components
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Advanced Filters */}
          <View style={styles.filtersSection}>
            <Text style={[styles.filtersTitle, { color: colors.textColor }]}>
              🔽 Advanced Filters
            </Text>

            <View style={styles.filtersRow}>
              <View
                style={[
                  styles.searchContainer,
                  { backgroundColor: colors.lightGray },
                ]}
              >
                <SearchIcon />
                <TextInput
                  style={[styles.searchInput, { color: colors.textColor }]}
                  placeholder="Search structures..."
                  placeholderTextColor={colors.grayText}
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.filterDropdown,
                  { backgroundColor: colors.lightGray },
                ]}
              >
                <Text style={[styles.filterText, { color: colors.textColor }]}>
                  {selectedGrade}
                </Text>
                <FilterIcon />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterDropdown,
                  { backgroundColor: colors.lightGray },
                ]}
              >
                <Text style={[styles.filterText, { color: colors.textColor }]}>
                  {selectedRange}
                </Text>
                <FilterIcon />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.searchButton,
                  { backgroundColor: colors.accentGreen },
                ]}
              >
                <Text
                  style={[styles.searchButtonText, { color: colors.white }]}
                >
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Structure Cards */}
          <FlatList
            data={sampleStructures}
            renderItem={renderStructureCard}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.structuresList}
          />
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
    backgroundColor: '#10B981',
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
    backgroundColor: '#10B981',
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
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },

  // Structures Section
  structuresSection: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  structuresHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  structuresTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  structuresIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  structuresTitleText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  structuresSubtitle: {
    fontSize: 12,
  },
  structuresActions: {
    flexDirection: 'row',
    gap: 8,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  createButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  manageButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  buttonIcon: {
    fontSize: 12,
  },

  // Filters Section
  filtersSection: {
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    minWidth: 200,
  },
  searchIcon: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  filterText: {
    fontSize: 14,
    marginRight: 6,
  },
  filterIcon: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Structure Cards
  structuresList: {
    gap: 16,
  },
  structureCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  structureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  structureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  structureNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  structureInfo: {
    flex: 1,
  },
  structureName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  structureDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  structureGrade: {
    fontSize: 12,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Salary Range Cards
  salaryRangeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  salaryRangeCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  salaryAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  salaryLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Components Section
  componentsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  componentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  componentsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  componentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  componentName: {
    fontSize: 12,
  },
  componentSeparator: {
    fontSize: 12,
    marginLeft: 8,
  },
  moreComponents: {
    marginLeft: 8,
  },
  moreText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SalaryStructuresScreen;

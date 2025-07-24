import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const CreateSalaryStructureScreen: React.FC = () => {
  const { colors } = useTheme();
  
  // Form state
  const [formData, setFormData] = useState({
    structureName: '',
    structureCode: '',
    description: '',
    structureType: 'Monthly',
    minimumSalary: '',
    maximumSalary: '',
    effectiveFrom: '',
    effectiveTo: '',
  });

  // Selected items state
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedDesignations, setSelectedDesignations] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (item: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Data arrays
  const departments = [
    'Human Resources (Tech Innovations Pvt Ltd)',
    'Information Technology (Tech Innovations Pvt Ltd)',
    'Finance (Tech Innovations Pvt Ltd)',
    'Marketing (Tech Innovations Pvt Ltd)',
    'Operations (Tech Innovations Pvt Ltd)',
    'Administration (Tech Innovations Pvt Ltd)',
  ];

  const designations = [
    'HR Executive - Human Resources',
    'HR Service Executive - Human Resources',
    'HR Manager - Human Resources',
    'HR Director - Human Resources',
    'Software Developer - Information Technology',
    'Senior Developer - Information Technology',
    'Tech Lead - Information Technology',
    'Project Manager - Information Technology',
    'Development Manager - Information Technology',
    'CTO - Information Technology',
    'Accounts Executive - Finance',
    'Financial Analyst - Finance',
    'Senior Analyst - Finance',
    'Finance Manager - Finance',
    'Marketing Director - Marketing',
    'Operations Executive - Operations',
    'Quality Analyst - Operations',
    'Operations Manager - Operations',
    'Operations Director - Operations',
    'Admin Executive - Administration',
    'Admin Manager - Administration',
  ];

  const grades = [
    'Executive Level 1 (Level 1)',
    'Executive Level 2 (Level 2)',
    'Senior Executive Level 1 (Level 3)',
    'Senior Executive Level 2 (Level 4)',
    'Manager Level 1 (Level 5)',
    'Manager Level 2 (Level 6)',
    'Senior Manager (Level 7)',
    'Deputy General Manager (Level 8)',
    'General Manager (Level 9)',
    'Vice President (Level 10)',
  ];

  const renderSection = (
    number: string,
    title: string,
    subtitle: string,
    children: React.ReactNode
  ) => (
    <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionNumber}>
          <Text style={styles.sectionNumberText}>{number}</Text>
        </View>
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textColor }]}>{title}</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.grayText }]}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const renderInput = (
    label: string,
    field: string,
    placeholder: string,
    width: 'full' | 'half' = 'half',
    type: 'text' | 'dropdown' | 'date' = 'text'
  ) => (
    <View style={[
      styles.inputContainer,
      width === 'full' && styles.fullWidthInput,
    ]}>
      <Text style={[styles.inputLabel, { color: colors.textColor }]}>{label}</Text>
      <View style={[styles.inputWrapper, { borderColor: colors.borderGray, backgroundColor: colors.cardBackground }]}>
        <TextInput
          style={[styles.textInput, { color: colors.textColor }]}
          placeholder={placeholder}
          placeholderTextColor={colors.grayText}
          value={formData[field as keyof typeof formData]}
          onChangeText={(value) => updateFormData(field, value)}
        />
        {type === 'dropdown' && <Text style={[styles.dropdownIcon, { color: colors.grayText }]}>▼</Text>}
        {type === 'date' && <Text style={[styles.dateIcon, { color: colors.grayText }]}>📅</Text>}
      </View>
    </View>
  );

  const renderSelectionGrid = (
    items: string[],
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void
  ) => (
    <View style={styles.selectionGrid}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.selectionItem,
            { 
              backgroundColor: selectedItems.includes(item) ? colors.blue : colors.lightGray,
              borderColor: selectedItems.includes(item) ? colors.blue : colors.borderGray,
            }
          ]}
          onPress={() => toggleSelection(item, selectedItems, setSelectedItems)}
        >
          <Text style={[
            styles.selectionText,
            { color: selectedItems.includes(item) ? colors.white : colors.textColor }
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.headerTitle, { color: colors.textColor }]}>⚙️ Create New Salary Structure</Text>
          <Text style={[styles.headerSubtitle, { color: colors.grayText }]}>
            Define a new salary structure template for different employee categories
          </Text>
        </View>

        {/* Basic Information Section */}
        {renderSection(
          '1',
          'Basic Information',
          'Enter the structure name, code and description',
          <>
            <View style={styles.inputRow}>
              {renderInput('Structure Name *', 'structureName', 'Enter structure name', 'half')}
              {renderInput('Structure Code *', 'structureCode', 'Please Specify (e.g. SS_STR_MGR_270)', 'half')}
            </View>
            {renderInput('Description', 'description', 'Enter description', 'full')}
            {renderInput('Structure Type *', 'structureType', 'Monthly', 'half', 'dropdown')}
          </>
        )}

        {/* Salary Range Section */}
        {renderSection(
          '2',
          'Salary Range',
          'Define the minimum and maximum salary limits for this structure',
          <View style={styles.inputRow}>
            {renderInput('Minimum Salary', 'minimumSalary', '₹ 0', 'half')}
            {renderInput('Maximum Salary', 'maximumSalary', '₹ 0', 'half')}
          </View>
        )}

        {/* Applicability Section */}
        {renderSection(
          '3',
          'Applicability',
          'Select which departments, designations, and grades this structure applies to',
          <>
            <View style={styles.applicabilitySection}>
              <Text style={[styles.applicabilityTitle, { color: colors.textColor }]}>Departments</Text>
              {renderSelectionGrid(departments, selectedDepartments, setSelectedDepartments)}
            </View>

            <View style={styles.applicabilitySection}>
              <Text style={[styles.applicabilityTitle, { color: colors.textColor }]}>Designations</Text>
              {renderSelectionGrid(designations, selectedDesignations, setSelectedDesignations)}
            </View>

            <View style={styles.applicabilitySection}>
              <Text style={[styles.applicabilityTitle, { color: colors.textColor }]}>Grades</Text>
              {renderSelectionGrid(grades, selectedGrades, setSelectedGrades)}
            </View>
          </>
        )}

        {/* Effective Period Section */}
        {renderSection(
          '4',
          'Effective Period',
          'Specify how long this salary structure remains effective',
          <>
            <View style={styles.inputRow}>
              {renderInput('Effective From *', 'effectiveFrom', 'DD-MM-YYYY', 'half', 'date')}
              {renderInput('Effective To', 'effectiveTo', 'DD-MM-YYYY', 'half', 'date')}
            </View>
            <Text style={[styles.periodNote, { color: colors.grayText }]}>
              Leave blank for no expiring period
            </Text>
          </>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.cancelButton, { borderColor: colors.borderGray, backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.cancelButtonText, { color: colors.grayText }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.createButton, { backgroundColor: colors.blue }]}>
            <Text style={[styles.createButtonText, { color: colors.white }]}>Create Structure</Text>
          </TouchableOpacity>
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
    padding: 24,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Section Styles
  section: {
    margin: 16,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  sectionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionContent: {
    marginLeft: 48,
  },

  // Input Styles
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  inputContainer: {
    flex: 1,
  },
  fullWidthInput: {
    flex: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  dropdownIcon: {
    fontSize: 12,
    marginLeft: 8,
  },
  dateIcon: {
    fontSize: 16,
    marginLeft: 8,
  },

  // Applicability Styles
  applicabilitySection: {
    marginBottom: 32,
  },
  applicabilityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  selectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  selectionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  selectionText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Period Note
  periodNote: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  createButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CreateSalaryStructureScreen;
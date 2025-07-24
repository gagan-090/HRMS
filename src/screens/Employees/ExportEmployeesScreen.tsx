import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { 
  widthPixel, 
  heightPixel, 
  fontPixel, 
  spacing, 
  componentSizes,
  isSmallDevice 
} from '../../utils/responsive';

const ExportEmployeesScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={[styles.headerCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.title, { color: colors.textColor }]}>Export Employees</Text>
            <Text style={[styles.subtitle, { color: colors.subtitleColor }]}>
              Export employee data in various formats for reporting and analysis
            </Text>
          </View>
          
          <View style={[styles.optionsCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Export Options</Text>
            
            <View style={styles.exportOptions}>
              <TouchableOpacity style={[styles.exportOption, { backgroundColor: colors.background }]}>
                <Text style={[styles.optionTitle, { color: colors.textColor }]}>📊 Excel Format</Text>
                <Text style={[styles.optionDescription, { color: colors.subtitleColor }]}>
                  Export as .xlsx file with formatting
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.exportOption, { backgroundColor: colors.background }]}>
                <Text style={[styles.optionTitle, { color: colors.textColor }]}>📄 CSV Format</Text>
                <Text style={[styles.optionDescription, { color: colors.subtitleColor }]}>
                  Export as comma-separated values
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.exportOption, { backgroundColor: colors.background }]}>
                <Text style={[styles.optionTitle, { color: colors.textColor }]}>📋 PDF Report</Text>
                <Text style={[styles.optionDescription, { color: colors.subtitleColor }]}>
                  Generate formatted PDF report
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.filtersCard, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Export Filters</Text>
            
            <View style={styles.filterOptions}>
              <View style={[styles.filterItem, { backgroundColor: colors.background }]}>
                <Text style={[styles.filterLabel, { color: colors.textColor }]}>Department</Text>
                <Text style={[styles.filterValue, { color: colors.subtitleColor }]}>All Departments</Text>
              </View>
              
              <View style={[styles.filterItem, { backgroundColor: colors.background }]}>
                <Text style={[styles.filterLabel, { color: colors.textColor }]}>Status</Text>
                <Text style={[styles.filterValue, { color: colors.subtitleColor }]}>Active Employees</Text>
              </View>
              
              <View style={[styles.filterItem, { backgroundColor: colors.background }]}>
                <Text style={[styles.filterLabel, { color: colors.textColor }]}>Date Range</Text>
                <Text style={[styles.filterValue, { color: colors.subtitleColor }]}>All Time</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.previewButton, { borderColor: colors.borderGray }]}>
              <Text style={[styles.buttonText, { color: colors.subtitleColor }]}>Preview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.exportButton, { backgroundColor: colors.green }]}>
              <Text style={[styles.buttonText, { color: colors.white }]}>Export Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  container: {
    flex: 1,
    padding: componentSizes.screenPadding,
  },
  headerCard: {
    borderRadius: widthPixel(12),
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(4),
    elevation: 3,
  },
  title: {
    fontSize: isSmallDevice() ? fontPixel(22) : fontPixel(28),
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontPixel(16),
    textAlign: 'center',
    lineHeight: fontPixel(22),
  },
  optionsCard: {
    borderRadius: widthPixel(12),
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(4),
    elevation: 3,
  },
  filtersCard: {
    borderRadius: widthPixel(12),
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: heightPixel(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: widthPixel(4),
    elevation: 3,
  },
  sectionTitle: {
    fontSize: fontPixel(20),
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  exportOptions: {
    gap: spacing.md,
  },
  exportOption: {
    padding: spacing.md,
    borderRadius: widthPixel(8),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  optionTitle: {
    fontSize: fontPixel(16),
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: fontPixel(14),
    lineHeight: fontPixel(20),
  },
  filterOptions: {
    gap: spacing.md,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: widthPixel(8),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  filterLabel: {
    fontSize: fontPixel(16),
    fontWeight: '500',
  },
  filterValue: {
    fontSize: fontPixel(14),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
    height: componentSizes.buttonHeight,
    borderRadius: widthPixel(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewButton: {
    borderWidth: 1,
  },
  exportButton: {
    // backgroundColor will be set dynamically
  },
  buttonText: {
    fontSize: fontPixel(16),
    fontWeight: '600',
  },
});

export default ExportEmployeesScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const BulkUploadScreen: React.FC = () => {
  const { colors } = useTheme();
  const [uploadType, setUploadType] = useState<'salary' | 'attendance' | 'employees'>('salary');

  const UploadIcon = () => <Text style={styles.headerIcon}>📤</Text>;
  const FileIcon = () => <Text style={styles.fileIcon}>📄</Text>;
  const DownloadIcon = () => <Text style={styles.downloadIcon}>⬇️</Text>;

  const uploadOptions = [
    {
      id: 'salary',
      title: 'Salary Data',
      description: 'Upload employee salary information in bulk',
      template: 'salary_template.xlsx',
    },
    {
      id: 'attendance',
      title: 'Attendance Data',
      description: 'Upload employee attendance records',
      template: 'attendance_template.xlsx',
    },
    {
      id: 'employees',
      title: 'Employee Data',
      description: 'Upload new employee information',
      template: 'employee_template.xlsx',
    },
  ];

  const renderUploadOption = (option: any) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.uploadOption,
        uploadType === option.id && styles.selectedUploadOption,
      ]}
      onPress={() => setUploadType(option.id)}
    >
      <View style={styles.optionContent}>
        <Text style={[
          styles.optionTitle,
          uploadType === option.id && styles.selectedOptionTitle,
        ]}>
          {option.title}
        </Text>
        <Text style={[
          styles.optionDescription,
          uploadType === option.id && styles.selectedOptionDescription,
        ]}>
          {option.description}
        </Text>
      </View>
      <View style={[
        styles.radioButton,
        uploadType === option.id && styles.selectedRadioButton,
      ]}>
        {uploadType === option.id && <View style={styles.radioButtonInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.primaryDarkBlue }]}>
          <View style={styles.headerLeft}>
            <UploadIcon />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, { color: colors.white }]}>Bulk Upload</Text>
              <Text style={[styles.headerSubtitle, { color: colors.white }]}>Upload employee data in bulk using Excel files</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={[styles.mainCard, { backgroundColor: colors.cardBackground }]}>
          {/* Upload Type Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Select Upload Type</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.grayText }]}>Choose the type of data you want to upload</Text>
            
            <View style={styles.uploadOptions}>
              {uploadOptions.map(renderUploadOption)}
            </View>
          </View>

          {/* Template Download */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Download Template</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.grayText }]}>
              Download the Excel template for {uploadOptions.find(opt => opt.id === uploadType)?.title.toLowerCase()}
            </Text>
            
            <TouchableOpacity style={[styles.templateButton, { borderColor: colors.borderGray, backgroundColor: colors.lightGray }]}>
              <FileIcon />
              <View style={styles.templateInfo}>
                <Text style={[styles.templateName, { color: colors.textColor }]}>
                  {uploadOptions.find(opt => opt.id === uploadType)?.template}
                </Text>
                <Text style={[styles.templateDescription, { color: colors.grayText }]}>Excel template with required columns</Text>
              </View>
              <TouchableOpacity style={[styles.downloadButton, { backgroundColor: colors.blue }]}>
                <DownloadIcon />
                <Text style={[styles.downloadButtonText, { color: colors.white }]}>Download</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* File Upload */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Upload File</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.grayText }]}>
              Select the Excel file with your data to upload
            </Text>
            
            <View style={[styles.uploadArea, { borderColor: colors.borderGray, backgroundColor: colors.lightGray }]}>
              <View style={styles.uploadIcon}>
                <Text style={[styles.uploadIconText, { color: colors.grayText }]}>📁</Text>
              </View>
              <Text style={[styles.uploadTitle, { color: colors.textColor }]}>Drag and drop your file here</Text>
              <Text style={[styles.uploadSubtitle, { color: colors.grayText }]}>or click to browse</Text>
              <TouchableOpacity style={[styles.browseButton, { backgroundColor: colors.blue }]}>
                <Text style={[styles.browseButtonText, { color: colors.white }]}>Choose File</Text>
              </TouchableOpacity>
              <Text style={[styles.uploadNote, { color: colors.grayText }]}>
                Supported formats: .xlsx, .xls (Max size: 10MB)
              </Text>
            </View>
          </View>

          {/* Upload Instructions */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textColor }]}>Upload Instructions</Text>
            <View style={styles.instructionsList}>
              <View style={styles.instructionItem}>
                <Text style={[styles.instructionNumber, { backgroundColor: colors.blue, color: colors.white }]}>1</Text>
                <Text style={[styles.instructionText, { color: colors.textColor }]}>
                  Download the template file for the selected data type
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Text style={[styles.instructionNumber, { backgroundColor: colors.blue, color: colors.white }]}>2</Text>
                <Text style={[styles.instructionText, { color: colors.textColor }]}>
                  Fill in the data according to the template format
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Text style={[styles.instructionNumber, { backgroundColor: colors.blue, color: colors.white }]}>3</Text>
                <Text style={[styles.instructionText, { color: colors.textColor }]}>
                  Save the file and upload it using the upload area above
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Text style={[styles.instructionNumber, { backgroundColor: colors.blue, color: colors.white }]}>4</Text>
                <Text style={[styles.instructionText, { color: colors.textColor }]}>
                  Review the data preview and confirm the upload
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.cancelButton, { borderColor: colors.borderGray, backgroundColor: colors.cardBackground }]}>
              <Text style={[styles.cancelButtonText, { color: colors.grayText }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: colors.accentGreen }]}>
              <Text style={[styles.uploadButtonText, { color: colors.white }]}>Upload Data</Text>
            </TouchableOpacity>
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
  header: {
    backgroundColor: '#475569',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 12,
    margin: 16,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  uploadOptions: {
    gap: 12,
  },
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedUploadOption: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  selectedOptionTitle: {
    color: '#1E40AF',
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedOptionDescription: {
    color: '#3B82F6',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: '#3B82F6',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3B82F6',
  },
  templateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  fileIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  downloadIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  uploadIcon: {
    marginBottom: 16,
  },
  uploadIconText: {
    fontSize: 48,
    color: '#9CA3AF',
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  uploadNote: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  uploadButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#10B981',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default BulkUploadScreen;
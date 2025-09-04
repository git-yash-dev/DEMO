import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>Stay updated on your reports</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderIcon}>🔔</Text>
          <Text style={styles.placeholderTitle}>Notifications Coming Soon</Text>
          <Text style={styles.placeholderText}>
            Real-time notifications about your report status updates will be available here.
            You'll receive notifications when:
          </Text>
          
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Your report is acknowledged by authorities</Text>
            <Text style={styles.featureItem}>• Status changes (pending → in progress → resolved)</Text>
            <Text style={styles.featureItem}>• Updates or comments are added to your reports</Text>
            <Text style={styles.featureItem}>• New reports are submitted in your area</Text>
          </View>

          <Text style={styles.comingSoonText}>
            This feature is currently in development and will be available in a future update.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  placeholderContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  featureList: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
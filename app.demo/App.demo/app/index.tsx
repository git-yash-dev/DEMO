import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import ApiService from '../services/apiService';

export default function IndexScreen() {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuthenticated = await ApiService.isAuthenticated();
      if (isAuthenticated) {
        // Try to fetch user profile to verify token is still valid
        await ApiService.getCurrentUser();
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    } catch (error) {
      // Token might be invalid, redirect to login
      await ApiService.logout();
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});
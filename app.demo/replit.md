# Overview

This is a Civic Reports mobile application built with React Native and Expo. The app allows citizens to submit reports about civic issues (potholes, broken streetlights, etc.) and track their status. It features user authentication, report submission, and a report tracking system. The main React Native app is located in the App.demo directory and includes complete screens for login, registration, report listing, report submission, notifications, and user profile.

## Recent Changes (September 2025)

### Complete React Native Mobile App Implementation
- **Authentication System**: Complete login and registration screens with JWT token management
- **API Service Layer**: Full API service implementation with mock data for development
- **Main App Screens**: 
  - Report List screen with real-time data fetching and refresh capability
  - Submit Report screen with form validation and department selection
  - Notifications screen (placeholder for future real-time features)
  - Profile screen with user information and logout functionality
- **React Navigation**: Properly configured stack and tab navigation
- **Styling**: Clean, modern UI with consistent styling across all screens
- **Error Handling**: Comprehensive error handling with user-friendly alerts

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router with file-based routing system
- **State Management**: React hooks and local component state
- **UI Components**: Custom themed components with light/dark mode support
- **Platform Support**: iOS, Android, and web with platform-specific optimizations

## Authentication Flow
- **Storage**: AsyncStorage for JWT token persistence
- **Flow**: Index screen checks authentication status and redirects to login/tabs accordingly
- **Mock Implementation**: Currently uses mock authentication data for development

## App Structure
- **Tab Navigation**: Four main tabs (Reports, Submit, Notifications, Profile)
- **Authentication Screens**: Separate auth folder with login/register screens
- **Route Protection**: Automatic redirection based on authentication status

## Data Management
- **API Service**: Centralized service layer with mock data implementation
- **Local Storage**: AsyncStorage for token and user data persistence
- **Mock Data**: Development-ready mock responses for all API endpoints

## UI/UX Design
- **Theme System**: Light/dark mode support with system preference detection
- **Responsive Design**: Platform-specific styling for iOS, Android, and web
- **Haptic Feedback**: iOS-specific haptic feedback for enhanced user experience
- **Icons**: SF Symbols on iOS with Material Icons fallback for Android/web

# External Dependencies

## Core Framework
- **Expo**: Development platform and SDK for React Native
- **React Native**: Cross-platform mobile app framework

## Navigation & Routing
- **@react-navigation**: Navigation library with bottom tabs and stack navigation
- **expo-router**: File-based routing system

## Storage & Data
- **@react-native-async-storage/async-storage**: Local data persistence
- **react-native-webview**: Web content display capabilities

## UI Components & Styling
- **@expo/vector-icons**: Icon library
- **expo-symbols**: iOS SF Symbols support
- **react-native-reanimated**: Animation library
- **expo-blur**: iOS blur effects

## Platform Features
- **expo-haptics**: iOS haptic feedback
- **expo-status-bar**: Status bar styling
- **react-native-safe-area-context**: Safe area handling

## Development Tools
- **TypeScript**: Type safety and development experience
- **ESLint**: Code quality and consistency
- **Metro**: JavaScript bundler for React Native

## Backend Foundation
- **Node.js**: Runtime environment (minimal setup in root directory)
- **@types/node**: TypeScript definitions for Node.js

## Planned Integrations
- REST API backend for user authentication and report management
- Real-time notifications system
- Location services for automatic location detection
- Image upload capabilities for report attachments
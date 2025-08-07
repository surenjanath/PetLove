# PetLove - Pet Adoption App

A beautiful and modern React Native Expo app for pet adoption, built with TypeScript and featuring a delightful user experience.

## 🐾 Overview

PetLove is a comprehensive pet adoption platform that connects loving families with pets in need of homes. The app features a modern, intuitive interface with advanced filtering, favorites system, and detailed pet profiles.

## ✨ Features

- **Discover Pets**: Browse through a curated collection of pets available for adoption
- **Advanced Filtering**: Filter by pet type, age, and location
- **Favorites System**: Save pets you're interested in for easy access
- **Detailed Profiles**: Comprehensive pet information including stories, traits, and shelter details
- **Inquiry System**: Contact shelters directly through the app
- **Care Resources**: Educational content and tips for pet care
- **User Profiles**: Track your adoption journey and saved pets

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **UI Components**: Custom components with React Native StyleSheet
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage for local data persistence
- **Fonts**: Google Fonts (Inter & Playfair Display)
- **Gradients**: Expo Linear Gradient
- **Blur Effects**: Expo Blur

## 📱 Screenshots

The app features a modern design with:
- Beautiful gradient headers
- Card-based pet listings
- Smooth animations and transitions
- Intuitive navigation
- Responsive design for all screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PetLove
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run on your device/simulator**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 📁 Project Structure

```
PetLove/
├── app/                    # Expo Router app directory
│   ├── _layout.tsx        # Root layout with font loading
│   ├── (tabs)/            # Tab navigation
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Discover screen
│   │   ├── favorites.tsx  # Favorites screen
│   │   ├── care.tsx       # Care resources screen
│   │   └── profile.tsx    # User profile screen
│   ├── pet/               # Pet detail routes
│   │   └── [id].tsx      # Dynamic pet detail screen
│   └── +not-found.tsx    # 404 error page
├── components/            # Reusable UI components
│   ├── PetCard.tsx       # Pet listing card component
│   ├── FilterModal.tsx   # Filter modal component
│   └── InquiryModal.tsx  # Contact form modal
├── data/                 # Mock data and types
│   └── mockPets.ts      # Sample pet data
├── hooks/               # Custom React hooks
│   └── useFrameworkReady.ts
├── utils/               # Utility functions
│   └── favorites.ts     # Favorites management
├── assets/              # Static assets
│   └── images/         # App icons and images
└── docs/               # Documentation
    ├── ARCHITECTURE.md  # Architecture documentation
    ├── API.md          # API documentation
    └── DEPLOYMENT.md   # Deployment guide
```

## 🎨 Design System

### Colors
- **Primary**: `#FF6B6B` (Coral Red)
- **Secondary**: `#4ECDC4` (Turquoise)
- **Accent**: `#667eea` (Purple)
- **Background**: `#FAFAFA` (Light Gray)
- **Text**: `#1F2937` (Dark Gray)

### Typography
- **Primary Font**: Inter (Regular, Medium, SemiBold, Bold)
- **Display Font**: Playfair Display (Regular, Bold)

### Components
- **Cards**: Rounded corners (20px), subtle shadows
- **Buttons**: Gradient backgrounds, rounded corners
- **Modals**: Blur effects, smooth animations

## 🔧 Development

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Write clean, readable code with comments

### File Naming
- Components: PascalCase (e.g., `PetCard.tsx`)
- Screens: camelCase (e.g., `index.tsx`)
- Utilities: camelCase (e.g., `favorites.ts`)

### State Management
- Use React hooks for local state
- AsyncStorage for persistent data
- No external state management libraries needed

## 📊 Data Flow

1. **App Initialization**: Load fonts and setup navigation
2. **Discover Screen**: Fetch and display pets with filtering
3. **Favorites**: Local storage management with AsyncStorage
4. **Pet Details**: Dynamic routing with pet ID
5. **Inquiries**: Form submission with validation

## 🧪 Testing

The app includes:
- TypeScript for compile-time error checking
- Proper error boundaries and validation
- Responsive design testing
- Cross-platform compatibility

## 📦 Building

### Development Build
```bash
npm run dev
```

### Production Build
```bash
# For iOS
expo build:ios

# For Android
expo build:android

# For Web
npm run build:web
```

## 🚀 Deployment

### Expo Application Services (EAS)
1. Install EAS CLI: `npm install -g @expo/eas-cli`
2. Configure project: `eas build:configure`
3. Build for platforms: `eas build --platform all`

### Manual Deployment
1. Build the app using Expo CLI
2. Upload to App Store Connect (iOS)
3. Upload to Google Play Console (Android)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the code comments for implementation details

## 🔄 Updates

This documentation is automatically updated with each significant change to the project structure or functionality.

---

**Built with ❤️ using React Native and Expo**

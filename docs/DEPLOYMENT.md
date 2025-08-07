# PetLove Deployment Guide

## 🚀 Overview

This guide covers the complete deployment process for the PetLove app, including development builds, production releases, and platform-specific configurations.

## 📋 Prerequisites

### Development Environment
- **Node.js** (v18 or higher)
- **Expo CLI** (`npm install -g @expo/cli`)
- **EAS CLI** (`npm install -g @expo/eas-cli`)
- **Git** for version control

### Platform-Specific Requirements

#### iOS
- **Xcode** (latest version)
- **iOS Simulator** or physical device
- **Apple Developer Account** (for App Store deployment)

#### Android
- **Android Studio**
- **Android SDK**
- **Google Play Console** account (for Play Store deployment)

#### Web
- **Modern web browser** for testing
- **Web hosting service** for production deployment

## 🔧 Environment Configuration

### Environment Variables

Create `.env` file in the root directory:

```env
# API Configuration
API_BASE_URL=https://api.petlove.com
API_KEY=your_api_key_here

# Feature Flags
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_ANALYTICS=true
ENABLE_CRASH_REPORTING=true

# Development Settings
DEBUG_MODE=true
MOCK_DATA_ENABLED=true

# Build Configuration
EXPO_PUBLIC_APP_ENV=development
```

### App Configuration

Update `app.json` for different environments:

```json
{
  "expo": {
    "name": "PetLove",
    "slug": "petlove",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF6B6B"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.petlove.app",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "This app uses the camera to take photos of pets",
        "NSPhotoLibraryUsageDescription": "This app accesses your photo library to select pet images"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF6B6B"
      },
      "package": "com.petlove.app",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "expo-linear-gradient",
      "expo-blur"
    ],
    "scheme": "petlove",
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

## 🏗 Build Configuration

### EAS Build Setup

Create `eas.json` configuration:

```json
{
  "cli": {
    "version": ">= 5.9.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "aab"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "your-apple-team-id"
      },
      "android": {
        "serviceAccountKeyPath": "./path-to-service-account.json",
        "track": "production"
      }
    }
  }
}
```

### Metro Configuration

Create `metro.config.js`:

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable CSS support for web
config.resolver.assetExts.push('css');

// Configure source maps for better debugging
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;
```

## 🔄 Development Workflow

### Local Development

1. **Start development server**
   ```bash
   npm start
   ```

2. **Run on specific platform**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web Browser
   npm run web
   ```

3. **Development build for testing**
   ```bash
   # Create development build
   eas build --profile development --platform ios
   eas build --profile development --platform android
   ```

### Testing Process

1. **Unit tests**
   ```bash
   npm test
   ```

2. **Type checking**
   ```bash
   npx tsc --noEmit
   ```

3. **Linting**
   ```bash
   npm run lint
   ```

4. **E2E testing**
   ```bash
   npm run test:e2e
   ```

## 🚀 Production Deployment

### Pre-deployment Checklist

- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] Linting passes
- [ ] Environment variables configured
- [ ] App version updated
- [ ] Release notes prepared
- [ ] Assets optimized

### Build Process

1. **Update version numbers**
   ```bash
   # Update app.json version
   # Update package.json version
   ```

2. **Create production build**
   ```bash
   # Build for all platforms
   eas build --profile production --platform all
   
   # Or build for specific platform
   eas build --profile production --platform ios
   eas build --profile production --platform android
   ```

3. **Submit to app stores**
   ```bash
   # Submit to App Store
   eas submit --profile production --platform ios
   
   # Submit to Play Store
   eas submit --profile production --platform android
   ```

### Platform-Specific Deployment

#### iOS App Store

1. **App Store Connect Setup**
   ```bash
   # Configure app in App Store Connect
   # Set up app metadata, screenshots, and descriptions
   ```

2. **Build and Submit**
   ```bash
   # Build for App Store
   eas build --profile production --platform ios
   
   # Submit to App Store
   eas submit --profile production --platform ios
   ```

3. **App Store Review Process**
   - Submit for review
   - Address any review feedback
   - Release to users

#### Google Play Store

1. **Play Console Setup**
   ```bash
   # Configure app in Google Play Console
   # Set up app metadata, screenshots, and descriptions
   ```

2. **Build and Submit**
   ```bash
   # Build for Play Store
   eas build --profile production --platform android
   
   # Submit to Play Store
   eas submit --profile production --platform android
   ```

3. **Play Store Review Process**
   - Submit for review
   - Address any review feedback
   - Release to users

#### Web Deployment

1. **Build for web**
   ```bash
   npm run build:web
   ```

2. **Deploy to hosting service**
   ```bash
   # Example: Deploy to Vercel
   npx vercel --prod
   
   # Example: Deploy to Netlify
   npx netlify deploy --prod --dir=web-build
   ```

## 🔧 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run TypeScript check
      run: npx tsc --noEmit
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build for web
      run: npm run build:web

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Setup EAS
      uses: expo/expo-github-action@v8
      with:
        eas-version: latest
        token: ${{ secrets.EXPO_TOKEN }}
    
    - name: Build for iOS
      run: eas build --platform ios --non-interactive
    
    - name: Build for Android
      run: eas build --platform android --non-interactive
```

### Environment Secrets

Configure GitHub repository secrets:

- `EXPO_TOKEN`: Expo access token
- `APPLE_ID`: Apple Developer account email
- `APPLE_APP_SPECIFIC_PASSWORD`: App-specific password
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Google Play service account JSON

## 📊 Monitoring and Analytics

### Crash Reporting

Configure crash reporting in `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-crashlytics",
        {
          "enabled": true
        }
      ]
    ]
  }
}
```

### Analytics Setup

```typescript
// utils/analytics.ts
import { Analytics } from 'expo-analytics';

export const analytics = new Analytics({
  // Configure analytics service
});

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  analytics.track(event, properties);
};
```

### Performance Monitoring

```typescript
// utils/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  const startTime = performance.now();
  fn();
  const endTime = performance.now();
  
  console.log(`${name} took ${endTime - startTime} milliseconds`);
};
```

## 🔒 Security Considerations

### Code Signing

1. **iOS Code Signing**
   ```bash
   # Configure in EAS Build
   # Automatic code signing with Expo
   ```

2. **Android Code Signing**
   ```bash
   # Generate keystore
   keytool -genkey -v -keystore petlove.keystore -alias petlove -keyalg RSA -keysize 2048 -validity 10000
   
   # Configure in eas.json
   ```

### Environment Security

1. **Secrets Management**
   ```bash
   # Use environment variables for sensitive data
   # Never commit secrets to version control
   ```

2. **API Security**
   ```typescript
   // Use HTTPS for all API calls
   // Implement proper authentication
   // Validate all user inputs
   ```

## 🐛 Troubleshooting

### Common Build Issues

#### Metro Bundler Issues
```bash
# Clear Metro cache
npx expo start --clear

# Reset cache
rm -rf node_modules && npm install
```

#### EAS Build Issues
```bash
# Check build status
eas build:list

# View build logs
eas build:view

# Retry failed build
eas build --platform ios --clear-cache
```

#### App Store Issues
```bash
# Check app status
eas submit:list

# View submission logs
eas submit:view
```

### Performance Optimization

1. **Bundle Size Optimization**
   ```bash
   # Analyze bundle size
   npx expo export --platform web
   
   # Use tree shaking
   # Remove unused dependencies
   ```

2. **Image Optimization**
   ```bash
   # Compress images
   # Use appropriate formats (WebP for web)
   # Implement lazy loading
   ```

## 📈 Release Management

### Version Control

1. **Semantic Versioning**
   ```bash
   # Major.Minor.Patch
   # 1.0.0 - Initial release
   # 1.1.0 - New features
   # 1.1.1 - Bug fixes
   ```

2. **Release Tags**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

### Release Notes

Create `CHANGELOG.md`:

```markdown
# Changelog

## [1.0.0] - 2024-01-01
### Added
- Pet discovery feature
- Favorites system
- Care resources
- User profiles

### Changed
- Updated navigation design
- Improved performance

### Fixed
- Navigation back button issue
- Image loading problems
```

## 🔄 Rollback Procedures

### Emergency Rollback

1. **Revert to previous version**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Redeploy previous build**
   ```bash
   # Use previous successful build
   eas build --profile production --platform all
   ```

3. **Notify users**
   - Send push notification
   - Update app store listing
   - Communicate on social media

## 📞 Support and Maintenance

### Monitoring

1. **App Performance**
   - Monitor crash rates
   - Track user engagement
   - Analyze performance metrics

2. **User Feedback**
   - App store reviews
   - User support tickets
   - Social media mentions

### Maintenance Schedule

- **Weekly**: Review crash reports and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Major feature releases and updates

---

This deployment guide ensures a smooth, reliable deployment process for the PetLove app across all platforms.

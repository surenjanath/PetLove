# PetLove Development Guide

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**
- **iOS Simulator** (for iOS development)
- **Android Studio** (for Android development)

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
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web Browser
   npm run web
   ```

## 🛠 Development Environment

### IDE Setup

We recommend using **Visual Studio Code** with the following extensions:

- **TypeScript and JavaScript Language Features**
- **React Native Tools**
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.associations": {
    "*.tsx": "typescriptreact"
  }
}
```

### Environment Variables

Create `.env` file for environment-specific configuration:

```env
# API Configuration
API_BASE_URL=https://api.petlove.com
API_KEY=your_api_key_here

# Feature Flags
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_ANALYTICS=true

# Development Settings
DEBUG_MODE=true
MOCK_DATA_ENABLED=true
```

## 📝 Coding Standards

### TypeScript Guidelines

#### Type Definitions

```typescript
// Always define interfaces for props
interface PetCardProps {
  pet: Pet;
  onPress: () => void;
  isFavorite?: boolean;
}

// Use type aliases for complex types
type FilterState = {
  type: 'all' | 'dog' | 'cat';
  age: 'all' | 'young' | 'adult' | 'senior';
  location: string;
};

// Prefer interfaces over types for object shapes
interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  age: string;
  location: string;
  image: string;
  story: string;
  traits: PetTraits;
  shelter: ShelterInfo;
}
```

#### Component Structure

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ComponentProps {
  // Define props interface
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // State declarations
  const [state, setState] = useState(initialState);

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handlePress = () => {
    // Handler logic
  };

  // Render
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Styles
  },
});
```

### Naming Conventions

#### Files and Directories
- **Components**: PascalCase (`PetCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useFavorites.ts`)
- **Utilities**: camelCase (`favorites.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

#### Variables and Functions
```typescript
// Variables: camelCase
const petName = 'Luna';
const isFavorite = true;

// Functions: camelCase
const handlePetPress = () => {};
const toggleFavorite = async () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.petlove.com';
const FAVORITES_STORAGE_KEY = 'user_favorites';

// Components: PascalCase
const PetCard = ({ pet }: PetCardProps) => {};
```

### Styling Guidelines

#### StyleSheet Organization

```typescript
const styles = StyleSheet.create({
  // Container styles first
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  
  // Header styles
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  
  // Content styles
  content: {
    flex: 1,
  },
  
  // Component-specific styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Text styles
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  
  // Button styles
  button: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
});
```

#### Responsive Design

```typescript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Math.max(16, width * 0.04),
    paddingVertical: Math.max(12, height * 0.015),
  },
  
  title: {
    fontSize: Math.max(20, width * 0.05),
    lineHeight: Math.max(24, width * 0.06),
  },
});
```

### Error Handling

#### Async Operations

```typescript
const loadFavorites = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};
```

#### Component Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## 🔧 Development Workflow

### Git Workflow

#### Branch Naming
- **Feature branches**: `feature/component-name`
- **Bug fixes**: `fix/issue-description`
- **Hotfixes**: `hotfix/critical-fix`

#### Commit Messages
```
feat: add pet filtering functionality
fix: resolve navigation back button issue
docs: update API documentation
style: improve button styling
refactor: optimize image loading
test: add unit tests for PetCard component
```

### Code Review Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/new-feature
   ```

4. **Code review checklist**:
   - [ ] Code follows TypeScript guidelines
   - [ ] Components are properly typed
   - [ ] Styling follows design system
   - [ ] Error handling is implemented
   - [ ] Performance considerations addressed
   - [ ] Tests are included (if applicable)

### Testing Strategy

#### Unit Testing

```typescript
// __tests__/components/PetCard.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PetCard } from '../../components/PetCard';

describe('PetCard', () => {
  const mockPet = {
    id: '1',
    name: 'Luna',
    type: 'dog',
    breed: 'Golden Retriever',
    age: '2 years old',
    location: 'San Francisco, CA',
    image: 'https://example.com/image.jpg',
    story: 'Luna is a gentle soul...',
    traits: { goodWithKids: true, houseTrained: true, vaccinated: true },
    shelter: { name: 'Test Shelter', address: '123 Test St', phone: '555-0123' },
  };

  it('renders pet information correctly', () => {
    const { getByText } = render(<PetCard pet={mockPet} onPress={() => {}} />);
    
    expect(getByText('Luna')).toBeTruthy();
    expect(getByText('Golden Retriever')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<PetCard pet={mockPet} onPress={onPress} />);
    
    fireEvent.press(getByTestId('pet-card'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

#### Integration Testing

```typescript
// __tests__/screens/DiscoverScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DiscoverScreen from '../../app/(tabs)/index';

describe('DiscoverScreen', () => {
  it('filters pets correctly', async () => {
    const { getByText, getByTestId } = render(<DiscoverScreen />);
    
    // Open filter modal
    fireEvent.press(getByTestId('filter-button'));
    
    // Select dog filter
    fireEvent.press(getByText('Dogs'));
    
    // Apply filters
    fireEvent.press(getByText('Apply'));
    
    await waitFor(() => {
      expect(getByText('Luna')).toBeTruthy(); // Dog
      expect(queryByText('Whiskers')).toBeFalsy(); // Cat
    });
  });
});
```

### Performance Guidelines

#### Component Optimization

```typescript
// Use React.memo for expensive components
const PetCard = React.memo(({ pet, onPress }: PetCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* Component content */}
    </TouchableOpacity>
  );
});

// Use useCallback for event handlers
const handlePress = useCallback(() => {
  onPress(pet.id);
}, [pet.id, onPress]);

// Use useMemo for expensive calculations
const filteredPets = useMemo(() => {
  return pets.filter(pet => 
    pet.type === filters.type || filters.type === 'all'
  );
}, [pets, filters.type]);
```

#### Image Optimization

```typescript
// Use proper image sizing
<Image 
  source={{ uri: pet.image }} 
  style={styles.image}
  resizeMode="cover"
  // Add loading and error states
  onLoadStart={() => setLoading(true)}
  onLoadEnd={() => setLoading(false)}
  onError={() => setError(true)}
/>
```

## 🐛 Debugging

### Development Tools

#### React Native Debugger
```bash
# Install React Native Debugger
npm install -g react-native-debugger

# Start debugger
react-native-debugger
```

#### Flipper (Alternative)
```bash
# Install Flipper
# Download from https://fbflipper.com/

# Enable in your app
import { addPlugin } from 'react-native-flipper';
```

### Common Issues

#### Navigation Issues
```typescript
// Ensure proper navigation setup
import { useFocusEffect } from '@react-navigation/native';

useFocusEffect(
  React.useCallback(() => {
    // Refresh data when screen comes into focus
    loadFavorites();
  }, [])
);
```

#### AsyncStorage Issues
```typescript
// Always handle AsyncStorage errors
const saveData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data:', error);
    // Handle error appropriately
  }
};
```

#### Performance Issues
```typescript
// Use FlatList for large lists
<FlatList
  data={pets}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <PetCard pet={item} />}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
  initialNumToRender={5}
/>
```

## 📦 Build and Deployment

### Development Build

```bash
# Start development server
npm start

# Run on specific platform
npm run ios
npm run android
npm run web
```

### Production Build

```bash
# Build for production
eas build --platform all

# Build for specific platform
eas build --platform ios
eas build --platform android
```

### Environment Configuration

```json
// app.json
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
      "bundleIdentifier": "com.petlove.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF6B6B"
      },
      "package": "com.petlove.app"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## 📚 Resources

### Documentation
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

### Community
- [React Native Community](https://github.com/react-native-community)
- [Expo Discord](https://discord.gg/expo)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

---

This development guide ensures consistent code quality, efficient development workflow, and maintainable codebase for the PetLove app.

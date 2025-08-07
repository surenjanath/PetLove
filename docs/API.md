# PetLove API Documentation

## 📋 Overview

This document outlines the data structures, interfaces, and API specifications for the PetLove application. The current implementation uses mock data, but the structure is designed for seamless backend integration.

## 🏗 Data Models

### Core Interfaces

#### Pet Interface
```typescript
interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat';
  breed: string;
  age: string;
  ageCategory: 'young' | 'adult' | 'senior';
  location: string;
  image: string;
  story: string;
  traits: PetTraits;
  shelter: ShelterInfo;
}
```

#### Pet Traits Interface
```typescript
interface PetTraits {
  goodWithKids: boolean;
  houseTrained: boolean;
  vaccinated: boolean;
  spayedNeutered?: boolean;
  specialNeeds?: boolean;
  microchipped?: boolean;
}
```

#### Shelter Information Interface
```typescript
interface ShelterInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  hours?: string;
}
```

#### Filter State Interface
```typescript
interface FilterState {
  type: 'all' | 'dog' | 'cat';
  age: 'all' | 'young' | 'adult' | 'senior';
  location: string;
  breed?: string;
  traits?: Partial<PetTraits>;
}
```

#### User Profile Interface
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferences: UserPreferences;
  favorites: string[]; // Pet IDs
  adoptionHistory: AdoptionRecord[];
}
```

#### User Preferences Interface
```typescript
interface UserPreferences {
  preferredTypes: ('dog' | 'cat')[];
  preferredAges: ('young' | 'adult' | 'senior')[];
  location: string;
  maxDistance: number; // in miles
  notifications: NotificationSettings;
}
```

#### Notification Settings Interface
```typescript
interface NotificationSettings {
  newPets: boolean;
  adoptionUpdates: boolean;
  careTips: boolean;
  reminders: boolean;
}
```

#### Adoption Record Interface
```typescript
interface AdoptionRecord {
  id: string;
  petId: string;
  status: 'inquiry' | 'meeting' | 'approved' | 'completed' | 'cancelled';
  inquiryDate: string;
  meetingDate?: string;
  adoptionDate?: string;
  notes?: string;
}
```

## 🔄 State Management

### Local Storage Keys

```typescript
const STORAGE_KEYS = {
  FAVORITES: 'user_favorites',
  USER_PREFERENCES: 'user_preferences',
  ADOPTION_HISTORY: 'adoption_history',
  NOTIFICATION_SETTINGS: 'notification_settings',
  SEARCH_HISTORY: 'search_history',
} as const;
```

### AsyncStorage Utilities

#### Favorites Management
```typescript
export const saveFavorites = async (favorites: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
    throw new Error('Failed to save favorites');
  }
};

export const loadFavorites = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const toggleFavorite = async (petId: string): Promise<void> => {
  try {
    const favorites = await loadFavorites();
    const newFavorites = favorites.includes(petId)
      ? favorites.filter(id => id !== petId)
      : [...favorites, petId];
    await saveFavorites(newFavorites);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw new Error('Failed to toggle favorite');
  }
};

export const isFavorite = async (petId: string): Promise<boolean> => {
  try {
    const favorites = await loadFavorites();
    return favorites.includes(petId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};
```

#### User Preferences Management
```typescript
export const saveUserPreferences = async (preferences: UserPreferences): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw new Error('Failed to save user preferences');
  }
};

export const loadUserPreferences = async (): Promise<UserPreferences | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user preferences:', error);
    return null;
  }
};
```

## 📊 Mock Data Structure

### Current Mock Data Implementation

```typescript
// data/mockPets.ts
export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    type: 'dog',
    breed: 'Golden Retriever Mix',
    age: '2 years old',
    ageCategory: 'adult',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    story: 'Luna is a gentle soul who loves nothing more than curling up next to her favorite humans...',
    traits: {
      goodWithKids: true,
      houseTrained: true,
      vaccinated: true,
    },
    shelter: {
      name: 'Golden Gate Animal Rescue',
      address: '123 Mission St, San Francisco, CA 94103',
      phone: '(415) 555-0123',
    },
  },
  // ... more pets
];
```

### Data Validation

```typescript
export const validatePet = (pet: any): Pet => {
  const requiredFields = ['id', 'name', 'type', 'breed', 'age', 'location', 'image', 'story'];
  
  for (const field of requiredFields) {
    if (!pet[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  if (!['dog', 'cat'].includes(pet.type)) {
    throw new Error('Invalid pet type');
  }
  
  return pet as Pet;
};
```

## 🔮 Future API Integration

### RESTful API Endpoints

#### Base Configuration
```typescript
const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'https://api.petlove.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
```

#### Authentication
```typescript
interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserProfile;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}
```

#### Pet Endpoints
```typescript
// GET /api/pets
interface GetPetsRequest {
  page?: number;
  limit?: number;
  filters?: FilterState;
  sortBy?: 'name' | 'age' | 'dateAdded';
  sortOrder?: 'asc' | 'desc';
}

interface GetPetsResponse {
  pets: Pet[];
  total: number;
  page: number;
  totalPages: number;
}

// GET /api/pets/:id
interface GetPetResponse {
  pet: Pet;
  relatedPets: Pet[];
  adoptionStatus?: 'available' | 'pending' | 'adopted';
}

// POST /api/pets/:id/favorite
interface ToggleFavoriteRequest {
  petId: string;
  action: 'add' | 'remove';
}

// GET /api/pets/favorites
interface GetFavoritesResponse {
  pets: Pet[];
  total: number;
}
```

#### User Endpoints
```typescript
// GET /api/user/profile
interface GetUserProfileResponse {
  profile: UserProfile;
  stats: UserStats;
}

// PUT /api/user/profile
interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  preferences?: Partial<UserPreferences>;
}

// GET /api/user/adoptions
interface GetAdoptionHistoryResponse {
  adoptions: AdoptionRecord[];
  total: number;
}

// POST /api/user/adoptions
interface CreateAdoptionInquiryRequest {
  petId: string;
  message?: string;
  preferredContact: 'email' | 'phone';
}
```

#### Search and Filter Endpoints
```typescript
// GET /api/search
interface SearchRequest {
  query: string;
  filters?: FilterState;
  location?: string;
  radius?: number;
}

interface SearchResponse {
  pets: Pet[];
  suggestions: string[];
  total: number;
}

// GET /api/breeds
interface GetBreedsResponse {
  breeds: {
    type: 'dog' | 'cat';
    breeds: string[];
  }[];
}

// GET /api/locations
interface GetLocationsResponse {
  locations: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }[];
}
```

### API Client Implementation

```typescript
class PetLoveAPI {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    this.token = response.token;
    return response;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Pet methods
  async getPets(params: GetPetsRequest = {}): Promise<GetPetsResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    return this.request<GetPetsResponse>(`/pets?${queryParams}`);
  }

  async getPet(id: string): Promise<GetPetResponse> {
    return this.request<GetPetResponse>(`/pets/${id}`);
  }

  async toggleFavorite(petId: string, action: 'add' | 'remove'): Promise<void> {
    await this.request(`/pets/${petId}/favorite`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  }

  // User methods
  async getUserProfile(): Promise<GetUserProfileResponse> {
    return this.request<GetUserProfileResponse>('/user/profile');
  }

  async updateProfile(updates: UpdateProfileRequest): Promise<UserProfile> {
    return this.request<UserProfile>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async createAdoptionInquiry(data: CreateAdoptionInquiryRequest): Promise<AdoptionRecord> {
    return this.request<AdoptionRecord>('/user/adoptions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Export singleton instance
export const api = new PetLoveAPI(API_CONFIG.BASE_URL);
```

### Error Handling

```typescript
interface APIError {
  code: string;
  message: string;
  details?: any;
}

class APIErrorHandler {
  static handle(error: any): APIError {
    if (error instanceof TypeError) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network connection failed',
      };
    }

    if (error.status === 401) {
      return {
        code: 'UNAUTHORIZED',
        message: 'Please log in to continue',
      };
    }

    if (error.status === 404) {
      return {
        code: 'NOT_FOUND',
        message: 'Resource not found',
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      details: error,
    };
  }
}
```

### Caching Strategy

```typescript
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class APICache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new APICache();
```

## 🔒 Security Considerations

### Data Protection
- All API requests use HTTPS
- Sensitive data is encrypted in transit
- User tokens are stored securely
- Input validation on all endpoints

### Privacy Compliance
- GDPR-compliant data handling
- User consent for data collection
- Right to data deletion
- Transparent privacy policy

## 📊 Analytics and Monitoring

### Event Tracking
```typescript
interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
}

const trackEvent = (event: string, properties: Record<string, any> = {}) => {
  const analyticsEvent: AnalyticsEvent = {
    event,
    properties,
    timestamp: new Date().toISOString(),
  };
  
  // Send to analytics service
  console.log('Analytics Event:', analyticsEvent);
};
```

### Performance Monitoring
```typescript
const measureAPICall = async <T>(
  name: string,
  apiCall: () => Promise<T>
): Promise<T> => {
  const startTime = Date.now();
  
  try {
    const result = await apiCall();
    const duration = Date.now() - startTime;
    
    console.log(`API Call ${name}: ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`API Call ${name} failed after ${duration}ms:`, error);
    throw error;
  }
};
```

---

This API documentation provides a comprehensive foundation for both current mock data implementation and future backend integration, ensuring type safety, error handling, and scalability.

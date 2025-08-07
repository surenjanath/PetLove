import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, SlidersHorizontal, MapPin, Heart, Sparkles, Filter } from 'lucide-react-native';
import { router } from 'expo-router';
import { PetCard } from '@/components/PetCard';
import { FilterModal } from '@/components/FilterModal';
import { mockPets } from '@/data/mockPets';

const { width, height } = Dimensions.get('window');

export default function DiscoverScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPets, setFilteredPets] = useState(mockPets);
  const [filters, setFilters] = useState({
    type: 'all',
    age: 'all',
    location: '',
  });

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    let filtered = mockPets;

    if (newFilters.type !== 'all') {
      filtered = filtered.filter(pet => pet.type.toLowerCase() === newFilters.type);
    }

    if (newFilters.age !== 'all') {
      filtered = filtered.filter(pet => pet.ageCategory === newFilters.age);
    }

    if (newFilters.location) {
      filtered = filtered.filter(pet => 
        pet.location.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }

    setFilteredPets(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E', '#FFB4B4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.brandContainer}>
            <View style={styles.brandIconContainer}>
              <Sparkles size={24} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={styles.brandText}>PetLove</Text>
          </View>
          <Text style={styles.headerTitle}>Find Your</Text>
          <Text style={styles.headerSubtitle}>Perfect Match</Text>
          <Text style={styles.headerDescription}>
            Every pet has a unique story waiting to unfold
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.searchSection}>
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => setShowFilters(true)}
          activeOpacity={0.8}
        >
          <View style={styles.searchIconContainer}>
            <Search size={18} color="#94A3B8" strokeWidth={2} />
          </View>
          <Text style={styles.searchPlaceholder}>Search by location, breed...</Text>
          <View style={styles.searchArrow}>
            <Text style={styles.searchArrowText}>→</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
          activeOpacity={0.8}
        >
          <Filter size={18} color="#FF6B6B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsNumber}>{filteredPets.length}</Text>
            <Text style={styles.statsText}>
              loving pets waiting for homes
            </Text>
          </View>
        </View>

        <View style={styles.petsGrid}>
          {filteredPets.map((pet, index) => (
            <PetCard 
              key={pet.id} 
              pet={pet}
              onPress={() => router.push(`/pet/${pet.id}`)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={applyFilters}
        currentFilters={filters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: Math.max(20, height * 0.04),
    paddingBottom: Math.max(24, height * 0.03),
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Math.max(12, height * 0.015),
  },
  brandIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  brandText: {
    fontFamily: 'Playfair-Bold',
    fontSize: Math.max(24, width * 0.06),
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: Math.max(32, width * 0.08),
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: Math.max(36, width * 0.08),
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: Math.max(32, width * 0.08),
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: -8,
    lineHeight: Math.max(36, width * 0.08),
    letterSpacing: -0.5,
  },
  headerDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: Math.max(14, width * 0.035),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: Math.max(12, height * 0.015),
    lineHeight: Math.max(20, width * 0.05),
    maxWidth: 280,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: Math.max(16, height * 0.02),
    backgroundColor: '#FFFFFF',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIconContainer: {
    marginRight: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94A3B8',
  },
  searchArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchArrowText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  filterButton: {
    width: 52,
    height: 52,
    backgroundColor: '#FFF5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  statsContainer: {
    paddingHorizontal: 24,
    paddingVertical: Math.max(16, height * 0.02),
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statsNumber: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    color: '#FF6B6B',
    marginBottom: 4,
  },
  statsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  petsGrid: {
    paddingHorizontal: 16,
    gap: 24,
  },
  bottomSpacing: {
    height: 40,
  },
});
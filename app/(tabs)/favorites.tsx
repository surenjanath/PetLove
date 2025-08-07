import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Heart, Sparkles, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PetCard } from '@/components/PetCard';
import { getFavorites } from '@/utils/favorites';
import { mockPets } from '@/data/mockPets';
import { router, useFocusEffect } from 'expo-router';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritePets, setFavoritePets] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    const favoriteIds = await getFavorites();
    setFavorites(favoriteIds);
    
    const pets = mockPets.filter(pet => favoriteIds.includes(pet.id));
    setFavoritePets(pets);
  };

  if (favoritePets.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerIconContainer}>
              <Heart size={28} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={styles.title}>Your Saved Pets</Text>
          </View>
        </LinearGradient>
        
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <View style={styles.emptyIconBackground}>
              <Heart size={80} color="#FFB4B4" strokeWidth={1.5} />
            </View>
          </View>
          <Text style={styles.emptyTitle}>No saved pets yet</Text>
          <Text style={styles.emptyDescription}>
            Start exploring and tap the heart icon on pets that catch your eye. 
            They'll appear here for easy access later.
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.8}
          >
            <Sparkles size={18} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.exploreButtonText}>Start Exploring</Text>
            <ArrowRight size={16} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Heart size={28} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={styles.title}>Your Saved Pets</Text>
          <Text style={styles.subtitle}>
            {favoritePets.length} special {favoritePets.length === 1 ? 'friend' : 'friends'} waiting
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.petsGrid}>
          {favoritePets.map((pet) => (
            <PetCard 
              key={pet.id} 
              pet={pet}
              onPress={() => router.push(`/pet/${pet.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  petsGrid: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    marginBottom: 32,
  },
  emptyIconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 180, 180, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 26,
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    maxWidth: 280,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 28,
    gap: 12,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  exploreButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
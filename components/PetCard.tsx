import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Heart, MapPin, Clock, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { toggleFavorite, isFavorite } from '@/utils/favorites';

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  location: string;
  image: string;
  story: string;
}

interface PetCardProps {
  pet: Pet;
  onPress: () => void;
}

export function PetCard({ pet, onPress }: PetCardProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    const favStatus = await isFavorite(pet.id);
    setIsFav(favStatus);
  };

  const handleFavoritePress = async (e: any) => {
    e.stopPropagation();
    await toggleFavorite(pet.id);
    setIsFav(!isFav);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: pet.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.8}
        >
          <Heart 
            size={20} 
            color={isFav ? "#FF6B6B" : "#FFFFFF"} 
            fill={isFav ? "#FF6B6B" : "transparent"}
            strokeWidth={2} 
          />
        </TouchableOpacity>

        <View style={styles.cardContent}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{pet.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" strokeWidth={1.5} />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>
          <Text style={styles.breed}>{pet.breed}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={12} color="rgba(255,255,255,0.8)" strokeWidth={2} />
              <Text style={styles.metaText}>{pet.age}</Text>
            </View>
            <View style={styles.metaItem}>
              <MapPin size={12} color="rgba(255,255,255,0.8)" strokeWidth={2} />
              <Text style={styles.metaText}>{pet.location.split(',')[0]}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 300,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Playfair-Bold',
    fontSize: 26,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  breed: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  metaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 6,
  },
});
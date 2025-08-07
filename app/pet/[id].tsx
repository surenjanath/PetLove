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
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Heart, MapPin, Calendar, Users, Chrome as Home, Award, MessageCircle, Star, Phone } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { mockPets } from '@/data/mockPets';
import { toggleFavorite, isFavorite } from '@/utils/favorites';
import { InquiryModal } from '@/components/InquiryModal';

const { width, height } = Dimensions.get('window');

export default function PetDetailScreen() {
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState<any>(null);
  const [isFav, setIsFav] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const foundPet = mockPets.find(p => p.id === id);
    if (foundPet) {
      setPet(foundPet);
      checkFavoriteStatus(foundPet.id);
    }
  }, [id]);

  const checkFavoriteStatus = async (petId: string) => {
    const favStatus = await isFavorite(petId);
    setIsFav(favStatus);
  };

  const handleFavoritePress = async () => {
    if (pet) {
      await toggleFavorite(pet.id);
      setIsFav(!isFav);
    }
  };

  if (!pet) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Pet not found</Text>
      </SafeAreaView>
    );
  }

  const traits = [
    { icon: Users, label: 'Great with kids', active: pet.traits?.goodWithKids, color: '#10B981' },
    { icon: Home, label: 'House trained', active: pet.traits?.houseTrained, color: '#3B82F6' },
    { icon: Award, label: 'Fully vaccinated', active: pet.traits?.vaccinated, color: '#8B5CF6' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Image source={{ uri: pet.image }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroOverlay}
          />
          
          <View style={styles.heroControls}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <BlurView intensity={20} style={styles.blurButton}>
                <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
              </BlurView>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={handleFavoritePress}
              activeOpacity={0.8}
            >
              <BlurView intensity={20} style={styles.blurButton}>
                <Heart 
                  size={24} 
                  color={isFav ? "#FF6B6B" : "#FFFFFF"} 
                  fill={isFav ? "#FF6B6B" : "transparent"}
                  strokeWidth={2.5} 
                />
              </BlurView>
            </TouchableOpacity>
          </View>

          <View style={styles.heroContent}>
            <View style={styles.heroHeader}>
              <Text style={styles.petName}>{pet.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" strokeWidth={1.5} />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
            <Text style={styles.petBreed}>{pet.breed}</Text>
            <View style={styles.heroMeta}>
              <View style={styles.metaChip}>
                <Calendar size={14} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.metaChipText}>{pet.age}</Text>
              </View>
              <View style={styles.metaChip}>
                <MapPin size={14} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.metaChipText}>{pet.location.split(',')[0]}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.storySection}>
            <View style={styles.sectionHeader}>
              <Star size={20} color="#FF6B6B" strokeWidth={2} />
              <Text style={styles.sectionTitle}>My Story</Text>
            </View>
            <Text style={styles.storyText}>{pet.story}</Text>
          </View>

          <View style={styles.traitsSection}>
            <Text style={styles.sectionTitle}>What Makes Me Special</Text>
            <View style={styles.traitsGrid}>
              {traits.map((trait, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.traitCard,
                    trait.active ? styles.traitActive : styles.traitInactive
                  ]}
                >
                  <View style={[
                    styles.traitIcon,
                    { backgroundColor: trait.active ? `${trait.color}20` : '#F1F5F9' }
                  ]}>
                    <trait.icon 
                      size={20} 
                      color={trait.active ? trait.color : '#94A3B8'} 
                      strokeWidth={2} 
                    />
                  </View>
                  <Text style={[
                    styles.traitLabel,
                    trait.active ? styles.traitLabelActive : styles.traitLabelInactive
                  ]}>
                    {trait.label}
                  </Text>
                  {trait.active && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.shelterSection}>
            <Text style={styles.sectionTitle}>Meet Me At</Text>
            <View style={styles.shelterCard}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.shelterGradient}
              >
                <Text style={styles.shelterName}>{pet.shelter.name}</Text>
                <Text style={styles.shelterAddress}>{pet.shelter.address}</Text>
                <TouchableOpacity style={styles.callButton} activeOpacity={0.8}>
                  <Phone size={16} color="#FFFFFF" strokeWidth={2} />
                  <Text style={styles.callButtonText}>Call {pet.shelter.phone}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>

      <BlurView intensity={95} style={styles.footer}>
        <TouchableOpacity 
          style={styles.inquireButton}
          onPress={() => setShowInquiry(true)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.inquireGradient}
          >
            <MessageCircle size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.inquireButtonText}>Meet {pet.name}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </BlurView>

      <InquiryModal
        visible={showInquiry}
        onClose={() => setShowInquiry(false)}
        pet={pet}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: height * 0.6,
  },
  heroImage: {
    width: width,
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  heroControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  controlButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  blurButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  petName: {
    fontFamily: 'Playfair-Bold',
    fontSize: 42,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  petBreed: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  metaChipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  storySection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#1F2937',
    marginLeft: 8,
  },
  storyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    color: '#374151',
    lineHeight: 28,
  },
  traitsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 32,
  },
  traitsGrid: {
    gap: 16,
  },
  traitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
  },
  traitActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  traitInactive: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  traitIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  traitLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    flex: 1,
  },
  traitLabelActive: {
    color: '#1F2937',
  },
  traitLabelInactive: {
    color: '#94A3B8',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  shelterSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 32,
  },
  shelterCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  shelterGradient: {
    padding: 24,
  },
  shelterName: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  shelterAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 22,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    gap: 8,
  },
  callButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 34,
  },
  inquireButton: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  inquireGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  inquireButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
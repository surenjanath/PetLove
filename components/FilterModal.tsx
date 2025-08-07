import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { X, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  currentFilters: {
    type: string;
    age: string;
    location: string;
  };
}

export function FilterModal({ visible, onClose, onApply, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState(currentFilters);

  const animalTypes = [
    { value: 'all', label: 'All Animals', emoji: '🐾' },
    { value: 'dog', label: 'Dogs', emoji: '🐕' },
    { value: 'cat', label: 'Cats', emoji: '🐱' },
  ];

  const ageCategories = [
    { value: 'all', label: 'All Ages', emoji: '⭐' },
    { value: 'young', label: 'Puppy/Kitten', emoji: '🐣' },
    { value: 'adult', label: 'Adult', emoji: '🦴' },
    { value: 'senior', label: 'Senior', emoji: '👑' },
  ];

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = { type: 'all', age: 'all', location: '' };
    setFilters(resetFilters);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E']}
          style={styles.header}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <BlurView intensity={20} style={styles.closeBlur}>
              <X size={24} color="#FFFFFF" strokeWidth={2.5} />
            </BlurView>
          </TouchableOpacity>
          <Text style={styles.title}>Find Your Match</Text>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What kind of friend?</Text>
            <View style={styles.optionsGrid}>
              {animalTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.optionCard,
                    filters.type === type.value && styles.optionSelected
                  ]}
                  onPress={() => setFilters({ ...filters, type: type.value })}
                >
                  <Text style={styles.optionEmoji}>{type.emoji}</Text>
                  <Text style={[
                    styles.optionText,
                    filters.type === type.value && styles.optionTextSelected
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What age range?</Text>
            <View style={styles.optionsGrid}>
              {ageCategories.map((age) => (
                <TouchableOpacity
                  key={age.value}
                  style={[
                    styles.optionCard,
                    filters.age === age.value && styles.optionSelected
                  ]}
                  onPress={() => setFilters({ ...filters, age: age.value })}
                >
                  <Text style={styles.optionEmoji}>{age.emoji}</Text>
                  <Text style={[
                    styles.optionText,
                    filters.age === age.value && styles.optionTextSelected
                  ]}>
                    {age.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Where are you looking?</Text>
            <View style={styles.searchContainer}>
              <Search size={20} color="#94A3B8" strokeWidth={2} />
              <TextInput
                style={styles.locationInput}
                placeholder="City, state, or ZIP code"
                value={filters.location}
                onChangeText={(text) => setFilters({ ...filters, location: text })}
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E8E']}
              style={styles.applyGradient}
            >
              <Text style={styles.applyButtonText}>Show Results</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  closeButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeBlur: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  resetText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    minWidth: 120,
  },
  optionSelected: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  optionEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  optionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#64748B',
  },
  optionTextSelected: {
    color: '#FF6B6B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  locationInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  applyButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  applyGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
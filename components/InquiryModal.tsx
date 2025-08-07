import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { X, Send, MapPin, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface InquiryModalProps {
  visible: boolean;
  onClose: () => void;
  pet: any;
}

export function InquiryModal({ visible, onClose, pet }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Almost there!', 'Please fill in all required fields to continue');
      return;
    }

    Alert.alert(
      '💌 Message Sent!',
      `Your heartfelt message about ${pet.name} has been sent to ${pet.shelter.name}. They'll reach out to you soon to discuss the next steps in your adoption journey!`,
      [
        {
          text: 'Perfect!',
          onPress: () => {
            setFormData({ name: '', email: '', phone: '', message: '' });
            onClose();
          }
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.header}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <BlurView intensity={20} style={styles.closeBlur}>
                <X size={24} color="#FFFFFF" strokeWidth={2.5} />
              </BlurView>
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Heart size={24} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.title}>Connect with {pet.name}</Text>
            </View>
          </LinearGradient>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.petPreview}>
              <Image source={{ uri: pet.image }} style={styles.petImage} />
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petDetails}>{pet.breed} • {pet.age}</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.locationText}>{pet.location}</Text>
                </View>
              </View>
            </View>

            <View style={styles.form}>
              <Text style={styles.formTitle}>Tell us about yourself</Text>
              <Text style={styles.formSubtitle}>
                Help {pet.shelter.name} understand why you'd be perfect for {pet.name}
              </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Your Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  keyboardType="phone-pad"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Your Message *</Text>
                <TextInput
                  style={[styles.input, styles.messageInput]}
                  placeholder={`Hi! I'm interested in learning more about ${pet.name}. I think we'd be a great match because...`}
                  value={formData.message}
                  onChangeText={(text) => setFormData({ ...formData, message: text })}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          </ScrollView>

          <BlurView intensity={95} style={styles.footer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <LinearGradient
                colors={['#FF6B6B', '#FF8E8E']}
                style={styles.submitGradient}
              >
                <Send size={20} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.submitButtonText}>Send Message</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -40,
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  petPreview: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 24,
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  petInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  petName: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 4,
  },
  petDetails: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  formTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 8,
  },
  formSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  messageInput: {
    height: 120,
    paddingTop: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 34,
  },
  submitButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
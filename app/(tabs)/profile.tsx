import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { User, Settings, Bell, CircleHelp as HelpCircle, Heart, MessageSquare, ChevronRight, Award, MapPin, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const stats = [
  { label: 'Pets Saved', value: '12', icon: Heart, color: '#FF6B6B' },
  { label: 'Inquiries Sent', value: '3', icon: MessageSquare, color: '#4ECDC4' },
  { label: 'Articles Read', value: '8', icon: Award, color: '#FFD93D' },
];

const menuItems = [
  {
    id: '1',
    title: 'My Adoption Journey',
    description: 'Track your inquiries and applications',
    icon: MapPin,
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'Saved Pets',
    description: 'Your favorite furry friends',
    icon: Heart,
    color: '#FF6B6B',
  },
  {
    id: '3',
    title: 'Notifications',
    description: 'Stay updated on new matches',
    icon: Bell,
    color: '#FFD93D',
  },
  {
    id: '4',
    title: 'Account Settings',
    description: 'Manage your preferences',
    icon: Settings,
    color: '#6B7280',
  },
  {
    id: '5',
    title: 'Help & Support',
    description: 'Get assistance or share feedback',
    icon: HelpCircle,
    color: '#4ECDC4',
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
              style={styles.avatar}
            />
            <View style={styles.statusIndicator} />
          </View>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userTitle}>Pet Lover & Future Parent</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <stat.icon size={20} color={stat.color} strokeWidth={2} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.menuItemLast
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                    <item.icon size={20} color={item.color} strokeWidth={2} />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemDescription}>{item.description}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#CBD5E1" strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.aboutSection}>
          <View style={styles.aboutCard}>
            <View style={styles.aboutIconContainer}>
              <Sparkles size={24} color="#FF6B6B" strokeWidth={2} />
            </View>
            <Text style={styles.aboutTitle}>About PetLove</Text>
            <Text style={styles.aboutDescription}>
              Connecting hearts, one story at a time. Every pet deserves a loving home, 
              and every family deserves the perfect companion.
            </Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
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
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Playfair-Bold',
    fontSize: 26,
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  userTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  statsSection: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#1F2937',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  aboutSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  aboutIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 12,
  },
  aboutDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
});
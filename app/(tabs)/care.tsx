import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { BookOpen, Clock, Star, TrendingUp, Users, Shield, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const careCategories = [
  {
    id: '1',
    title: 'Getting Started',
    icon: Star,
    color: '#FF6B6B',
    articles: 3,
  },
  {
    id: '2',
    title: 'Training & Behavior',
    icon: TrendingUp,
    color: '#4ECDC4',
    articles: 5,
  },
  {
    id: '3',
    title: 'Health & Wellness',
    icon: Shield,
    color: '#45B7D1',
    articles: 4,
  },
  {
    id: '4',
    title: 'Community Tips',
    icon: Users,
    color: '#96CEB4',
    articles: 6,
  },
];

const featuredArticles = [
  {
    id: '1',
    title: 'First 48 Hours: Setting Up for Success',
    description: 'Everything you need to know about bringing your new companion home',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    readTime: '8 min read',
    category: 'Getting Started',
  },
  {
    id: '2',
    title: 'Building Trust Through Positive Training',
    description: 'Gentle techniques that strengthen your bond while teaching good habits',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
    readTime: '6 min read',
    category: 'Training',
  },
];

export default function CareScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <BookOpen size={28} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text style={styles.title}>Care & Wisdom</Text>
          <Text style={styles.subtitle}>
            Expert guidance for every step of your journey
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Explore by Topic</Text>
          <View style={styles.categoriesGrid}>
            {careCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard} activeOpacity={0.8}>
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <category.icon size={24} color={category.color} strokeWidth={2} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryCount}>{category.articles} articles</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Guides</Text>
          {featuredArticles.map((article) => (
            <TouchableOpacity key={article.id} style={styles.featuredCard} activeOpacity={0.9}>
              <Image source={{ uri: article.image }} style={styles.featuredImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)']}
                style={styles.imageOverlay}
              />
              <View style={styles.featuredContent}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{article.category}</Text>
                </View>
                <Text style={styles.featuredTitle}>{article.title}</Text>
                <Text style={styles.featuredDescription}>{article.description}</Text>
                <View style={styles.readTimeContainer}>
                  <Clock size={14} color="#6B7280" strokeWidth={2} />
                  <Text style={styles.readTime}>{article.readTime}</Text>
                  <ArrowRight size={14} color="#6B7280" strokeWidth={2} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickTipsSection}>
          <Text style={styles.sectionTitle}>Quick Tips</Text>
          <View style={styles.tipsList}>
            {[
              'Create a consistent daily routine',
              'Use positive reinforcement for training',
              'Provide mental stimulation with puzzle toys',
              'Schedule regular vet checkups',
              'Socialize gradually and safely',
            ].map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipNumber}>
                  <Text style={styles.tipNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
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
  categoriesSection: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#1F2937',
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: (width - 64) / 2,
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
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  featuredSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  featuredContent: {
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  featuredTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 26,
  },
  featuredDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
  },
  quickTipsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  tipsList: {
    gap: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  tipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
});
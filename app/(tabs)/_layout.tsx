import { Tabs } from 'expo-router';
import { Heart, Chrome as Home, BookOpen, User, Compass, PawPrint } from 'lucide-react-native';
import { StyleSheet, Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarBackground: () => (
          <View style={styles.tabBarBackground} />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Compass 
                size={focused ? 20 : 20} 
                color={focused ? '#FFFFFF' : '#374151'} 
                strokeWidth={focused ? 2.5 : 2} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Saved',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Heart 
                size={focused ? 20 : 20} 
                color={focused ? '#FFFFFF' : '#374151'} 
                strokeWidth={focused ? 2.5 : 2} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="care"
        options={{
          title: 'Care',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <BookOpen 
                size={focused ? 20 : 20} 
                color={focused ? '#FFFFFF' : '#374151'} 
                strokeWidth={focused ? 2.5 : 2} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <User 
                size={focused ? 20 : 20} 
                color={focused ? '#FFFFFF' : '#374151'} 
                strokeWidth={focused ? 2.5 : 2} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    height: Platform.OS === 'ios' ? 100 : 88,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    bottom: 12,
    borderRadius: 24,
    backgroundColor: 'transparent',
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    marginTop: 6,
    color: '#374151',
  },
  tabBarItem: {
    paddingTop: 8,
    paddingBottom: 2,
    flex: 1,
    alignItems: 'center',
  },
  tabBarIcon: {
    marginBottom: 4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activeIconContainer: {
    backgroundColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
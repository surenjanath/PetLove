import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'bolt_favorites';

export async function getFavorites(): Promise<string[]> {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
}

export async function addFavorite(petId: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(petId)) {
      const updatedFavorites = [...favorites, petId];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
}

export async function removeFavorite(petId: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(id => id !== petId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
}

export async function toggleFavorite(petId: string): Promise<void> {
  const favorites = await getFavorites();
  if (favorites.includes(petId)) {
    await removeFavorite(petId);
  } else {
    await addFavorite(petId);
  }
}

export async function isFavorite(petId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(petId);
}
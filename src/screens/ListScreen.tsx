import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, useWindowDimensions, Alert, ScrollView } from 'react-native';
import { PlantContext } from '../context/PlantContext';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';

const ListScreen = () => {
  const { plants, setPlants } = useContext(PlantContext);
  const { theme } = useContext(ThemeContext); 
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlants, setFilteredPlants] = useState(plants);
  const [numColumns, setNumColumns] = useState(2);
  const [cardWidth, setCardWidth] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState([]);

  const maxCardWidth = 150;

  useEffect(() => {
    ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.ALL);
    
    if (width > height) {
      if (width >= 1024) {
        setNumColumns(6);
      } else if (width >= 768) {
        setNumColumns(5);
      } else if (width >= 480) {
        setNumColumns(4);
      
      } else {
        setNumColumns(3);
      }
      setCardWidth(Math.min(width / numColumns - 20, maxCardWidth));
    } else {
      setNumColumns(2);
      setCardWidth(Math.min(width / 2 - 20, maxCardWidth));
    }
  }, [width, height]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredPlants(plants);
    } else {
      setFilteredPlants(plants.filter(plant => 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, plants]);

  const handlePlantPress = (plantId) => {
    navigation.navigate('Detail', { plantId });
  };

  const toggleSelectionMode = () => {
    setIsSelecting(!isSelecting);
    setSelectedPlants([]);
  };

  const toggleSelectPlant = (plantId) => {
    setSelectedPlants(prev => 
      prev.includes(plantId) ? prev.filter(id => id !== plantId) : [...prev, plantId]
    );
  };

  const handleDeleteSelected = () => {
    Alert.alert("Delete Selected", "Are you sure you want to delete the selected plants?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive", 
        onPress: () => {
          setPlants(prev => prev.filter(plant => !selectedPlants.includes(plant.id)));
          setIsSelecting(false);
          setSelectedPlants([]);
        }
      }
    ]);
  };

  if (!theme) {
    return null; 
  }
  
  return (
    <FlatList
      data={filteredPlants}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      style={[styles.container, { backgroundColor: theme.background, flex: 1  }]}
      key={`numColumns-${numColumns}`}
      
      ListHeaderComponent={
        <>
          <View style={[styles.searchContainer]}>
            <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: theme.placeholderTex }]}
              placeholder="Search plants..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
  
          {isSelecting && (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSelected}>
              <Ionicons name="trash-outline" size={22} color="white" />
              <Text style={styles.deleteText}>Delete Selected</Text>
            </TouchableOpacity>
          )}
        </>
      }

      ListEmptyComponent={
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>No plants added yet.</Text>
      <Text style={styles.emptyStateSubText}>Tap the button below to add your first plant!</Text>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.buttonBackground }]}
        onPress={() => navigation.navigate('Scan')}
      >
        <Text style={[styles.addButtonText, { color: theme.buttonText }]}>Add New Plant</Text>
      </TouchableOpacity>
    </View>
  }
       
      ListFooterComponent={
        <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.buttonBackground }]} onPress={() => navigation.navigate('Scan')}>
          <Text style={[styles.addButtonText, { color: theme.buttonText }]}>Add New Plant</Text>
        </TouchableOpacity>
      }
      
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: theme.cardBackground },
            { width: cardWidth, marginLeft: 1 },
            isSelecting && selectedPlants.includes(item.id) ? styles.selectedCard : null,
          ]}
          activeOpacity={0.7}
          onPress={() => (isSelecting ? toggleSelectPlant(item.id) : handlePlantPress(item.id))}
          onLongPress={toggleSelectionMode}
        >
          {item.imageUri ? (
            <Image source={{ uri: item.imageUri }} style={styles.image} />
          ) : (
            <View style={[styles.placeholderImage, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.placeholderText, { color: theme.placeholderText }]}>No Image</Text>
            </View>
          )}
          <View style={styles.cardContent}>
            <View style={styles.cardTextContainer}>
              <View>
                <Text style={[styles.name, { color: theme.cardText }]}>{item.name}</Text>
                <Text style={[styles.date, { color: theme.cardText }]}>{item.dateAdded}</Text>
              </View>
            </View>
          </View>
          {isSelecting && (
            <View style={styles.checkbox}>
              {selectedPlants.includes(item.id) && <Ionicons name="checkmark-circle" size={24} color="green" />}
            </View>
          )}
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  placeholderImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
  cardContent: {
    padding: 10,
  },
  cardTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  deleteButton: { flexDirection: 'row', backgroundColor: 'red', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginVertical: 10 },

  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: { padding: 10 },
  deleteText: { color: 'white', marginLeft: 5, fontWeight: 'bold' },
  selectedCard: {
    borderColor: 'green',
    borderWidth: 2,
  },
  
  checkbox: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ListScreen;





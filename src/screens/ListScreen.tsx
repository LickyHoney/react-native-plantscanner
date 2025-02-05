import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, useWindowDimensions, Alert } from 'react-native';
import { PlantContext } from '../context/PlantContext';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListScreen = () => {
  const { plants, setPlants } = useContext(PlantContext); // Make sure your PlantContext supports setPlants
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlants, setFilteredPlants] = useState(plants);
  const [numColumns, setNumColumns] = useState(2);
  const [cardWidth, setCardWidth] = useState(0);

  const maxCardWidth = 150;

  useEffect(() => {
    ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.ALL);
    
    if (width > height) {
      if (width >= 1024) {
        setNumColumns(5);
      } else if (width >= 768) {
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

  const handleDeletePlant = (plantId) => {
    Alert.alert(
      "Delete Plant",
      "Are you sure you want to delete this plant?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            setPlants(plants.filter(plant => plant.id !== plantId));
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search plants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredPlants.length === 0 ? (
        <Text style={styles.emptyText}>No plants found. Try a different search term.</Text>
      ) : (
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          key={`numColumns-${numColumns}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { width: cardWidth, marginLeft: 1 }]}
              activeOpacity={0.7}
              onPress={() => handlePlantPress(item.id)}
            >
              {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={styles.image} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
              <View style={styles.cardContent}>
                <View style={styles.cardTextContainer}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.date}>Date Added: {item.dateAdded}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeletePlant(item.id)} style={styles.deleteButton}>
                    <Ionicons name="trash-outline" size={22} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Scan')}>
        <Text style={styles.addButtonText}>Add New Plant</Text>
      </TouchableOpacity>
    </View>
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
  deleteButton: {
    padding: 5,
  },
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
});

export default ListScreen;


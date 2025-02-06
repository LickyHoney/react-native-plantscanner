import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { PlantContext } from '../context/PlantContext';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';

const DetailScreen = ({ route, navigation }) => {
  const { plantId } = route.params;
  const { plants, updatePlant } = useContext(PlantContext);
  const { theme } = useContext(ThemeContext); 
  
// Find the selected plant based on its ID
  const plant = plants.find((item) => item.id === plantId);

  // State to manage plant details
  const [name, setName] = useState(plant?.name || '');
  const [notes, setNotes] = useState(plant?.notes || '');
  const [imageUri, setImageUri] = useState(plant?.imageUri || '');

  // Function to request camera permission
  const requestCameraPermission = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera access is required to take pictures.');
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while requesting permissions.');
      return false;
    }
  };

 // Function to pick an image from the gallery
  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image from gallery.');
    }
  };

  // Function to take a new photo using the camera
  const takePhoto = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image.');
    }
  };

// Function to handle saving the updated plant details
  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Plant name cannot be empty.');
      return;
    }

    try {
      const updatedPlant = {
        ...plant,
        name,
        notes,
        imageUri,
      };
      updatePlant(updatedPlant);
      Alert.alert('Success', 'Plant details updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update plant details.');
    }
  };

  // If theme is not available, return null to avoid rendering issues
  if (!theme) {
    return null; 
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={[styles.label,  {color: theme.placeholderText}]}>Plant Name</Text>
      <TextInput
        style={[styles.input ]}
        value={name}
        onChangeText={setName}
        placeholder="Enter plant name"
      />

      <Text style={[styles.label, {color: theme.placeholderText}]}>Notes</Text>
      <TextInput
        style={[styles.input]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Enter notes"
        multiline
      />

      <Text style={[styles.label, {color: theme.placeholderText}]}>Plant Image</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={[styles.placeholderImage ]}>
          <Ionicons name="image-outline" size={50} color="#666" />
          <Text style={[styles.placeholderText ]}>No Image</Text>
        </View>
      )}

      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={[styles.imageButton,{ backgroundColor: theme.background }]} onPress={pickImageFromGallery}>
          <Ionicons name="image-outline" size={40} color="#007BFF" />
          <Text style={[styles.imageButtonText, {color: theme.placeholderText}]}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.imageButton,{ backgroundColor: theme.background }]} onPress={takePhoto}>
          <Ionicons name="camera-outline" size={40} color="#007BFF" />
          <Text style={[styles.imageButtonText, {color: theme.placeholderText}]}>Camera</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonRow, { backgroundColor: theme.background }]}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={[styles.buttonText]}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
          <Ionicons name="close-circle-outline" size={20} color="#fff" />
          <Text style={[styles.buttonText]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles for the DetailScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
    alignSelf: 'center',
  },
  placeholderImage: {
    width:150,
    height: 150,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  placeholderText: {
    color: '#666',
    marginTop: 5,
  },
  imagePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  imageButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    elevation: 2,
    width: 80,
  },
  imageButtonText: {
    marginTop: 5,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
   
  },
  saveButton: {
    backgroundColor: '#2E8B57',
  },
  cancelButton: {
    backgroundColor: '#D9534F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default DetailScreen;



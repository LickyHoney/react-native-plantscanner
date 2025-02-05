import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PlantContext } from '../context/PlantContext';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';


const ScanScreen = () => {
  const { addPlant } = useContext(PlantContext);
  const navigation = useNavigation();
  
  const [plantName, setPlantName] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; image?: string }>({});
  const { theme } = useContext(ThemeContext);

  // Handle picking image
  const handlePickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setErrors((prev) => ({ ...prev, image: undefined })); 
    }
  };

  const validateInputs = () => {
    let isValid = true;
    let newErrors: { name?: string; image?: string } = {};

    if (!plantName.trim()) {
      newErrors.name = 'Plant name is required.';
      isValid = false;
    }

    if (!imageUri) {
      newErrors.image = 'An image is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSavePlant = () => {
    if (!validateInputs()) return; 

    const newPlant = {
      id: uuid.v4() as string,
      name: plantName,
      dateAdded: new Date().toLocaleDateString(),
      imageUri: imageUri,
      notes: notes,
    };

    addPlant(newPlant);

    setPlantName('');
    setNotes('');
    setImageUri(null);
    setErrors({}); 

    navigation.navigate('List');
  };

  return (
    <ScrollView style={[styles.container,,{ backgroundColor: theme.background }]} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text style={[styles.title,{color: theme.placeholderText}]}>Add a New Plant</Text>

     
      <View style={styles.inputContainer}>
        <Ionicons name="leaf-outline" size={20} color="#4CAF50" style={styles.icon} />
        <TextInput
          placeholder="Enter plant name"
          value={plantName}
          onChangeText={(text) => {
            setPlantName(text);
            setErrors((prev) => ({ ...prev, name: undefined })); 
          }}
          style={styles.input}
        />
      </View>
      {errors.name && <Text style={[styles.errorText,{color: theme.placeholderText}]}>{errors.name}</Text>}

      
      <TouchableOpacity style={styles.button} onPress={handlePickImage}>
        <Ionicons name="camera-outline" size={24} color="#fff" />
        <Text style={[styles.buttonText,{color: theme.placeholderText}]}>Take Photo</Text>
      </TouchableOpacity>
      {errors.image && <Text style={[styles.errorText,{color: theme.placeholderText}]}>{errors.image}</Text>}

    
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      
      <View style={styles.inputContainer}>
        <Ionicons name="create-outline" size={20} color="#4CAF50" style={styles.icon} />
        <TextInput
          placeholder="Enter notes (optional)"
          value={notes}
          onChangeText={setNotes}
          style={styles.input}
          multiline
        />
      </View>

   
      <TouchableOpacity style={styles.button} onPress={handleSavePlant}>
        <Ionicons name="save-outline" size={24} color="#fff" />
        <Text style={[styles.buttonText,{color: theme.placeholderText}]}>Save Plant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default ScanScreen;


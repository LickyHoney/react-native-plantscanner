import React, { createContext, useState, ReactNode } from 'react';

// Define the structure of a plant object
interface Plant {
  id: string;
  name: string;
  dateAdded: string;
  imageUri?: string;
  notes?: string;
}

// Define the structure of the PlantContext
interface PlantContextType {
  plants: Plant[];
  addPlant: (newPlant: Plant) => void;
  updatePlant: (updatedPlant: Plant) => void;
  deletePlant: (plantId: string) => void;
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}

// Create the PlantContext with an initial undefined value
export const PlantContext = createContext<PlantContextType | undefined>(undefined);

// Define the props type for the PlantProvider component
interface PlantProviderProps {
  children: ReactNode;
}

// PlantProvider component manages plant-related state and provides it to the app
export const PlantProvider = ({ children }: PlantProviderProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  // Function to add a new plant to the list
  const addPlant = (newPlant: Plant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  // Function to update an existing plant's details
  const updatePlant = (updatedPlant: Plant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === updatedPlant.id ? { ...plant, ...updatedPlant } : plant
          )
        );
      };
      
// Function to delete a plant from the list
  const deletePlant = (plantId: string) => {
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
      };

  return (
    <PlantContext.Provider value={{ plants, addPlant, updatePlant, deletePlant, setPlants }}>
      {children}  
    </PlantContext.Provider>
  );
};


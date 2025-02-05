import React, { createContext, useState, ReactNode } from 'react';

// Define the structure of a Plant object
interface Plant {
  id: string;
  name: string;
  dateAdded: string;
  imageUri?: string;
  notes?: string;
}

// Define the shape of the context
interface PlantContextType {
  plants: Plant[];
  addPlant: (newPlant: Plant) => void;
  updatePlant: (updatedPlant: Plant) => void;
  deletePlant: (plantId: string) => void;
}

// Create the context with an initial undefined value
export const PlantContext = createContext<PlantContextType | undefined>(undefined);

// Define props for PlantProvider
interface PlantProviderProps {
  children: ReactNode;
}

// ✅ Fix: Ensure PlantProvider does NOT wrap a NavigationContainer
export const PlantProvider = ({ children }: PlantProviderProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  const addPlant = (newPlant: Plant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

    // Update an existing plant
  const updatePlant = (updatedPlant: Plant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === updatedPlant.id ? { ...plant, ...updatedPlant } : plant
          )
        );
      };

  const deletePlant = (plantId: string) => {
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
      };

  return (
    <PlantContext.Provider value={{ plants, addPlant, updatePlant, deletePlant }}>
      {children}  {/* ✅ This must not contain a NavigationContainer */}
    </PlantContext.Provider>
  );
};

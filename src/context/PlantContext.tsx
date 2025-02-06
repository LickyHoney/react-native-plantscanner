import React, { createContext, useState, ReactNode } from 'react';

interface Plant {
  id: string;
  name: string;
  dateAdded: string;
  imageUri?: string;
  notes?: string;
}

interface PlantContextType {
  plants: Plant[];
  addPlant: (newPlant: Plant) => void;
  updatePlant: (updatedPlant: Plant) => void;
  deletePlant: (plantId: string) => void;
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}


export const PlantContext = createContext<PlantContextType | undefined>(undefined);


interface PlantProviderProps {
  children: ReactNode;
}


export const PlantProvider = ({ children }: PlantProviderProps) => {
  const [plants, setPlants] = useState<Plant[]>([]);

  const addPlant = (newPlant: Plant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

   
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
    <PlantContext.Provider value={{ plants, addPlant, updatePlant, deletePlant, setPlants }}>
      {children}  
    </PlantContext.Provider>
  );
};


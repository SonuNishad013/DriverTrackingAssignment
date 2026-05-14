import { useMemo } from 'react';
import { AnimatedRegion } from 'react-native-maps';
import { generateDriverId, generateNearbyCoordinate, generateVehicleNumber, randomFloat, randomInt } from '../utils/helper';

export type Driver = {
  id: string;
  name: string;
  vehicleNumber: string;
  vehicle: string;
  trustedBy: number;
  rating: number;
  coordinate: AnimatedRegion;
  image?: string;
};

export const CENTER = {
  latitude: 30.6916258,
  longitude: 76.8200111,
};

const DRIVER_IMAGE =
  require('../assets/Driverimage.png');


//generateDrivers creates an array of Driver objects with random data and nearby coordinates based on the CENTER location.
const generateDrivers = (
  count: number = 12,
): Driver[] => {
  return Array.from(
    { length: count },
    (_, index) => {
      const location =
        generateNearbyCoordinate(
          CENTER.latitude,
          CENTER.longitude,
          2,
        );

      return {
        id: generateDriverId(index),

        name: `Driver ${index + 1}`,

        vehicleNumber:
          generateVehicleNumber(),
          vehicle: `Swift Dzire`,

        trustedBy: randomInt(
          50,
          5000,
        ),

        image: DRIVER_IMAGE,

        rating: randomFloat(
          3.5,
          5,
          1,
        ),

        coordinate:
          new AnimatedRegion({
            latitude:
              location.latitude,

            longitude:
              location.longitude,

            latitudeDelta: 0.04,

            longitudeDelta: 0.04,
          }),
      };
    },
  );
};

//Provides a memoized list of drivers that is generated once and reused across renders.
export const useDrivers = () => {
  const drivers = useMemo(() => {
    return generateDrivers(12);
  }, []);

  return drivers;
};
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { useDrivers, Driver as DriverType, CENTER } from '../data/drivers';
import DriverCard from '../components/DriverCard';

type Driver = DriverType & {
  coordinate: AnimatedRegion;
};

const INITIAL_REGION: Region = {
  latitude: CENTER.latitude,
  longitude: CENTER.longitude,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

const MapScreen = () => {
  const drivers = useDrivers() as Driver[];
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      moveDrivers();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const moveDrivers = () => {
    drivers.forEach(driver => {
      const currentPosition = (driver.coordinate as any).__getValue();

      const newLatitude =
        currentPosition.latitude + (Math.random() - 0.5) * 0.002;

      const newLongitude =
        currentPosition.longitude + (Math.random() - 0.5) * 0.002;

      (driver.coordinate as any)
        .timing({
          latitude: newLatitude,
          longitude: newLongitude,
          duration: 1500,
          useNativeDriver: false,
        })
        .start();
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} //shows google map
        style={styles.map}
        initialRegion={INITIAL_REGION}
      >
        {drivers.map(driver => (
          <Marker.Animated //Markers that can be animated to new positions
            key={driver.id}
            coordinate={driver.coordinate as any}
            title={driver.name}
            tracksViewChanges={false}
            image={require('../assets/Texi.png')}
            onPress={() => {
              setSelectedDriver(driver);
            }}
          />
        ))}
      </MapView>
      {selectedDriver && (
        <DriverCard //Component that shows driver details if a driver is selected
          selectedDriver={selectedDriver}
          setSelectedDriver={setSelectedDriver}
        />
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});

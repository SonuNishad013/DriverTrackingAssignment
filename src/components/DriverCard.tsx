import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Driver as DriverType } from '../data/drivers';

interface DriverCardProps {
  selectedDriver: DriverType;
  setSelectedDriver: (driver: DriverType | null) => void;
}
const DriverCard: React.FC<DriverCardProps> = ({
  selectedDriver,
  setSelectedDriver,
}) => {
  const slideAnim = useState(new Animated.Value(200))[0];
  useEffect(() => {
    if (selectedDriver) {
      Animated.spring(slideAnim, {
        toValue: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedDriver]);

  return (
    <Animated.View
      style={[
        styles.driverCard,
        {
          transform: [
            {
              translateY: slideAnim,
            },
          ],
        },
      ]}
    >
      {/* TOP SECTION */}
      <View style={styles.topContainer}>
        {/* IMAGE + VERIFIED */}
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../assets/Driverimage.png')}
              style={styles.driverImage}
            />
          </View>

          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        {/* TRUST + RATING */}
        <View style={styles.ratingSection}>
          <Text style={styles.trustedText}>Trusted By</Text>

          <Text style={styles.trustedCount}>{selectedDriver.trustedBy}+</Text>

          <Text style={styles.ratingText}>⭐ {selectedDriver.rating}/5</Text>
        </View>
      </View>

      {/* DRIVER DETAILS */}
      <View style={styles.detailsSection}>
        <Text style={styles.driverName}>{selectedDriver.name}</Text>

        <Text style={styles.detailText}>Vehicle: {selectedDriver.vehicle}</Text>

        <Text style={styles.detailText}>
          Vehicle No: {selectedDriver.vehicleNumber}
        </Text>
      </View>

      {/* CLOSE BUTTON */}
      <Pressable
        style={styles.closeButton}
        onPress={() => {
          Animated.timing(slideAnim, {
            toValue: 200,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            setSelectedDriver(null);
          });
        }}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </Pressable>
    </Animated.View>
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  driverCard: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 16,

    elevation: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imageSection: {
    alignItems: 'center',
  },

  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,

    borderWidth: 4,
    borderColor: '#22C55E',

    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
  },

  driverImage: {
    width: '100%',
    height: '100%',
  },

  verifiedBadge: {
    marginTop: 6,

    backgroundColor: '#22C55E',

    paddingHorizontal: 10,
    paddingVertical: 4,

    borderRadius: 20,
  },

  verifiedText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },

  ratingSection: {
    alignItems: 'flex-end',
  },

  trustedText: {
    fontSize: 13,
    color: '#666',
  },

  trustedCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },

  ratingText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
  },

  detailsSection: {
    marginTop: 18,
  },

  driverName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',

    marginBottom: 10,
  },

  detailText: {
    fontSize: 15,
    color: '#444',

    marginBottom: 6,
  },

  closeButton: {
    marginTop: 18,

    backgroundColor: '#111',

    paddingVertical: 12,

    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

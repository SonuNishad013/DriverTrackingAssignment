export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
//randomFloat generates a random float between min and max with specified decimals.
export const randomFloat = (min: number, max: number, decimals = 1): number => {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
};

//generateVehicleNumber function generates a random vehicle number in the format "CH01XX1234" where XX are random letters and 1234 are random numbers.
export const generateVehicleNumber = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const randomLetters = letters[randomInt(0, 25)] + letters[randomInt(0, 25)];

  const randomNumbers = randomInt(1000, 9999);

  return `CH01${randomLetters}${randomNumbers}`;
};

//generateDriverId creates a unique driver ID using the index and a random number.
export const generateDriverId = (index: number): string => {
  const random = randomInt(1000, 9999);

  return `DRV-${index + 1}-${random}`;
};

//generateNearbyCoordinate generates a random coordinate within a specified radius (in kilometers) from a given center latitude and longitude.
export const generateNearbyCoordinate = (
  centerLat: number,
  centerLng: number,
  radiusInKm: number = 2,
) => {
  const radiusInDegrees = radiusInKm / 111;

  const u = Math.random();
  const v = Math.random();

  const w = radiusInDegrees * Math.sqrt(u);

  const t = 2 * Math.PI * v;

  const latOffset = w * Math.cos(t);

  const lngOffset = (w * Math.sin(t)) / Math.cos(centerLat * (Math.PI / 180));

  return {
    latitude: centerLat + latOffset,
    longitude: centerLng + lngOffset,
  };
};

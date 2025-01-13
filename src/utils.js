// Get random numbers between two numbers
export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate unique angle for same track id in order to avoid overlap
export const generateUniqueAngle = (
  usedAngles,
  minAngle,
  maxAngle,
  minDistance
) => {
  let angle = getRandomInt(minAngle, maxAngle);
  while (
    usedAngles.some((usedAngle) => Math.abs(usedAngle - angle) < minDistance)
  ) {
    angle = getRandomInt(minAngle, maxAngle);
  }
  return angle;
};

export const TRACK_RANGES = [
  { max: 20, trackId: 1 },
  { max: 40, trackId: 2 },
  { max: 60, trackId: 3 },
  { max: 80, trackId: 4 },
  { max: 100, trackId: 5 },
];

export const NUMBER_OF_TRIANGLES = 20;

export const MIN_DISTANCE_IN_ANGLES = 360 / 20; // Minimum angular distance to avoid overlap -> 360/20

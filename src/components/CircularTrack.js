import React, { useEffect, useState } from "react";
import {
  MIN_DISTANCE_IN_ANGLES,
  NUMBER_OF_TRIANGLES,
  TRACK_RANGES,
  generateUniqueAngle,
  getRandomInt,
} from "../utils";
import "./CircularTrack.css";

const CircularTrack = () => {
  const [triangles, setTriangles] = useState([]);

  useEffect(() => {
    const generateTriangles = () => {
      const newTriangles = [];
      const usedAnglesPerTrack = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      };

      for (let i = 0; i < NUMBER_OF_TRIANGLES; i++) {
        const value = getRandomInt(0, 100);

        // Determine the track based on value range
        const trackId = TRACK_RANGES.find(
          (range) => value <= range.max
        )?.trackId;
        // Get unique angle for same track id in order to avoid overlap
        const angle = generateUniqueAngle(
          usedAnglesPerTrack[trackId],
          0,
          360,
          MIN_DISTANCE_IN_ANGLES
        );
        usedAnglesPerTrack[trackId].push(angle);

        newTriangles.push({ value, trackId, angle });
      }
      setTriangles(newTriangles);
    };

    generateTriangles();
  }, []);

  return (
    <div className="trackContainer">
      {[5, 4, 3, 2, 1].map((trackId) => (
        <div
          key={`track${trackId}`}
          className={`circularTrack track${trackId}`}
        >
          {triangles
            .filter((triangle) => triangle.trackId === trackId)
            .map((triangle) => {
              let leftStyle = 40;
              if (trackId === 4 || trackId === 5) {
                leftStyle = 45;
              }
              return (
                <div
                  key={`${trackId}_${triangle.value}`}
                  className="triangle"
                  style={{
                    left: `${
                      50 +
                      leftStyle * Math.cos((triangle.angle * Math.PI) / 180)
                    }%`,
                    top: `${
                      50 +
                      leftStyle * Math.sin((triangle.angle * Math.PI) / 180)
                    }%`,
                  }}
                ></div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default CircularTrack;

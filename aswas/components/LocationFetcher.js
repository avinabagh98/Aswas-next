"use client";

import { useState, useEffect } from "react";

export default function LocationFetcher() {
  const [location, setLocation] = useState(null);
  // Location Fetching
  useEffect(() => {
    const geolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        // alert("Geolocation not available")
        setLocation(null);
      }
    };

    geolocation();
  }, []);

  return location;
}

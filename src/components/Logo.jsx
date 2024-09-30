import React, { useEffect, useState } from 'react';
import { getLodgeSettings } from '../utils/firebaseClient';

const Logo = ({ className = "" }) => {
  const [lodgeName, setLodgeName] = useState('Urban Lodge');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getLodgeSettings();
        if (settings && settings.lodgeName) {
          setLodgeName(settings.lodgeName);
        }
      } catch (error) {
        console.error('Error fetching lodge settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className={`text-2xl font-bold text-blue-600 ${className}`}>
      {lodgeName}
    </div>
  );
};

export default Logo;
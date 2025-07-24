import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import LoadingScreen from './src/components/LoadingScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Handle loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onAnimationFinish={handleLoadingFinish} />;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
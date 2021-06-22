// Libraries
import React from "react";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { Rajdhani_500Medium, Rajdhani_700Bold } from "@expo-google-fonts/rajdhani"; 
import AppLoading from "expo-app-loading";

// My screens and components
import { SignIn } from "./src/screens/SignIn";
import { Home } from "./src/screens/Home";
import { Background } from "./src/components/Background";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  // Only go to my screens (SignIn) when all fonts needed are loaded
  if (!fontsLoaded){
    return <AppLoading/>  // Keeps showing the splash screen
  }

  return(
    <Background>
      <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      <Home />
    </Background>  
  );
}
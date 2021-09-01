import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform} from 'react-native';
import { Provider } from "react-redux";
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Screens */
import HomeScreen from './screens/HomeScreen';
import RiderScreen from './screens/RiderScreen';
// import new screens here


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen 
                name='HomeScreen'
                component={HomeScreen}
                options={{headerShown:false}}
              />
              <Stack.Screen 
                name='RiderScreen'
                component={RiderScreen}
                options={{headerShown:false}}
              />
              {/*You need to add new screens here */}
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

//
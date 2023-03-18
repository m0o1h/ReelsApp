import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UploadPage from "./screens/uploadPage";
import MainPage from "./screens/mainPage";
import CommentsModal from "./screens/CommentsModal";
import { RecoilRoot } from "recoil";

const Stack = createStackNavigator();

const App =() => {

  return (
    <RecoilRoot>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage" >
        <Stack.Screen name="MainPage" component={MainPage}
        options={{
          headerShown:false
        }} 
        ></Stack.Screen>
        <Stack.Screen name="UploadPage" component={UploadPage} 
        options={{
          headerShown:false
        }} 
        ></Stack.Screen>
        <Stack.Screen name="CommentsModal" component={CommentsModal} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;


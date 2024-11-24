import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";

import { useGetProfilePictureQuery } from "../services/userService";
import { setProfilePicture } from "../features/auth/authSlice";

import { setUser } from "../features/auth/authSlice";

const MainNavigator = () => {
//   const [user, setUser] = useState("");
  const Stack = createNativeStackNavigator();

  const user = useSelector((state) => state.authReducer.value.email);
  const localId = useSelector((state) => state.authReducer.value.localId);

  //console.log(localId)

  const dispatch = useDispatch();

  const {
    data: profilePicture,
    isLoading,
    error,
  } = useGetProfilePictureQuery(localId);

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;

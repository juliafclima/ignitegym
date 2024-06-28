import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import { AuthContext } from "src/context/AuthContext";
import { Loading } from "@components/Loading";
import { NativeBaseProvider } from "native-base";
import { Routes } from "@routes/index";
import { StatusBar } from "react-native";
import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthContext.Provider
        value={{
          user: {
            id: "1",
            name: "Rodrigo Gonçalves",
            email: "rodrigo@email.com",
            avatar: "rodrigo.png",
          },
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

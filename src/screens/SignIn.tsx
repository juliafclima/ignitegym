import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import BackgroundImg from "@assets/background.png";
import { Button } from "@components/Button";
import { ImageBackground } from "react-native";
import { Input } from "@components/Input";
import Logo from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <ImageBackground
      source={BackgroundImg}
      resizeMode="cover"
      style={{ flex: 1 }}
      defaultSource={BackgroundImg}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1} px={10} pb={16}>
          <Center my={16}>
            <Image source={Logo} alt="Logo Ignite Gym" resizeMode="contain" />

            <Text color="gray.100" fontSize="sm">
              Treine sua mente e o seu corpo.
            </Text>
          </Center>

          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Acesse a conta
            </Heading>

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input placeholder="Senha" secureTextEntry />

            <Button title="Criar Conta" />
          </Center>

          <Center mt={24}>
            <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
              Ainda não tem acesso?
            </Text>
          </Center>

          <Button
            title="Criar Conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </VStack>
      </ScrollView>
    </ImageBackground>
  );
}

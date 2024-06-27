import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import BackgroundImg from "@assets/background.png";
import { Button } from "@components/Button";
import { ImageBackground } from "react-native";
import { Input } from "@components/Input";
import Logo from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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
          <Center my={20}>
            <Image source={Logo} alt="Logo Ignite Gym" resizeMode="contain" />

            <Text color="gray.100" fontSize="sm">
              Treine sua mente e o seu corpo.
            </Text>
          </Center>

          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Crie sua conta
            </Heading>

            <Input placeholder="Nome" />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input placeholder="Senha" secureTextEntry />

            <Button title="Criar e acessar" />
          </Center>

          <Button
            title="Voltar para o login"
            variant="outline"
            mt={14}
            onPress={handleGoBack}
          />
        </VStack>
      </ScrollView>
    </ImageBackground>
  );
}

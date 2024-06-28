import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";

import BackgroundImg from "@assets/background.png";
import { Button } from "@components/Button";
import { ImageBackground } from "react-native";
import { Input } from "@components/Input";
import Logo from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps) {
    console.log(data);
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
          <Center my={10}>
            <Image source={Logo} alt="Logo Ignite Gym" resizeMode="contain" />

            <Text color="gray.100" fontSize="sm">
              Treine sua mente e o seu corpo.
            </Text>
          </Center>

          <Center>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Crie sua conta
            </Heading>

            <Controller
              control={control}
              name="name"
              rules={{
                required: "Informe o nome.",
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Informe o email.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "E-mail inválido",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
  
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar a Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
            />
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

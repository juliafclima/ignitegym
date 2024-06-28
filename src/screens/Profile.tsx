import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import {
  Center,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );

  const toast = useToast();

  async function handleUserPhotoSelected() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
      
      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets.length > 0 && photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.exists) {
          const fileSizeInBytes = photoInfo.size;

          if (fileSizeInBytes && fileSizeInBytes > 3 * 1024 * 1024) {
            return toast.show({
              title: "Essa imagem é muito grande. Escolha uma de até 3MB.",
              placement: "top",
              bgColor: "red.500",
            });
          }

          setUserPhoto(photoSelected.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input bg="gray.600" placeholder="Nome" />

          <Input bg="gray.600" placeholder="E-mail" isDisabled />

          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />

          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />

          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}

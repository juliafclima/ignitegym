import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";

import {
  Center,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";

import { AppError } from "@utils/AppError";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "@components/UserPhoto";
import { api } from "@services/api";
import defaulUserPhotoImg from "@assets/userPhotoDefault.png";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object().shape({
  name: yup.string().required("Informe o nome"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .when("password", {
      is: (password: any) => !!password,
      then: yup
        .string()
        .nullable()
        .required("Informe a confirmação da senha.")
        .oneOf([yup.ref("password")], "A confirmação de senha não confere."),
    }),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = { ...user, name: data.name };

      await api.put("/users", data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os dados. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsUpdating(false);
    }
  }

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

          const fileExtension = photoSelected.assets[0].uri.split(".").pop();

          const photoFile = {
            name: `${user.name}.${fileExtension}`.toLowerCase(),
            uri: photoSelected.assets[0].uri,
            type: `${photoSelected.assets[0].type}/${fileExtension}`,
          } as any;

          const userPhotoUploadForm = new FormData();

          userPhotoUploadForm.append("avatar", photoFile);

          const avatarUpdtedResponse = await api.patch(
            "/users/avatar",
            userPhotoUploadForm,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          const userUpdated = user;

          userUpdated.avatar = avatarUpdtedResponse.data.avatar;

          await updateUserProfile(userUpdated);

          toast.show({
            title: "Foto atualizada!",
            placement: "top",
            bgColor: "green.500",
          });
        }
      }
    } catch (error) {
      console.error("Error selecting photo:", error);

      toast.show({
        title: "Failed to select photo",
        placement: "top",
        bgColor: "red.500",
      });
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
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaulUserPhotoImg
              }
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
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
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}

import { HStack, Heading, Icon, Text, VStack } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";

interface HomeHeaderProps {
  name: string;
  photoUserGithub: string;
}

export function HomeHeader({ name, photoUserGithub }: HomeHeaderProps) {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{ uri: `https://github.com/${photoUserGithub}.png` }}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md">
          {name}
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}

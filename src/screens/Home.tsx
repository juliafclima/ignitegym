import { HStack, VStack } from "native-base";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useState } from "react";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("Costas");

  return (
    <VStack flex={1}>
      <HomeHeader name="Júlia" photoUserGithub="juliafclima" />

      <HStack>
        <Group
          name="Costas"
          isActive={groupSelected === "costa"}
          onPress={() => setGroupSelected("costa")}
        />
        <Group
          name="Ombros"
          isActive={groupSelected === "ombro"}
          onPress={() => setGroupSelected("ombro")}
        />
        <Group
          name="Pernas"
          isActive={groupSelected === "perna"}
          onPress={() => setGroupSelected("perna")}
        />
      </HStack>
    </VStack>
  );
}

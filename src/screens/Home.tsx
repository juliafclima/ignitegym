import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack } from "native-base";

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader name="Júlia" photoUserGithub="juliafclima" />

      <Group name="Costas" />
      <Group name="Posterior" />
      <Group name="Pernas" />
    </VStack>
  );
}

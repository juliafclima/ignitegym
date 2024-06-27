import { Heading, SectionList, VStack } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ListEmpty } from "@components/ListEmpty";
import { ScreenHeader } from "@components/ScreenHeader";
import { useState } from "react";

export function History() {
  const [exercises] = useState([
    {
      title: "26.06.24",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "27.06.24",
      data: ["Puxada frontal"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard name={item} />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => <ListEmpty />}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}

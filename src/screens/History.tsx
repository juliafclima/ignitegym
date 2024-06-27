import { FlatList, VStack } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { useState } from "react";

export function History() {
  const [history] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Supino reto",
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <FlatList
        data={history}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard name={item} />}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
    </VStack>
  );
}

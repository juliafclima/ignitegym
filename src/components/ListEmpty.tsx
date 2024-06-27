import { Text } from "native-base";

export function ListEmpty() {
  return (
    <Text color="gray.100" textAlign="center">
      Não há exercícios registrados ainda. {"\n"}
      Vamos fazer exercícios hoje?
    </Text>
  );
}

import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { Header, Text } from "../../components";
import theme from "../../theme/theme";
import { stocks } from "./mockData";
import Stock from "../../types/Stock";
import { spacing } from "../../theme/spacing";

const HomeScreenComponent = () => {
  const renderStock = useCallback(
    ({ item }: ListRenderItemInfo<Stock>) => (
      <View style={styles.stockContainer}>
        <Text variant="title" style={styles.title}>
          {item.ticker}
        </Text>
        <Text variant="subtitle" style={styles.subtitle}>
          {item.name}
        </Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={stocks}
        renderItem={renderStock}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  list: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.smaller,
  },
  stockContainer: {
    padding: spacing.base,
    backgroundColor: theme.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    marginHorizontal: spacing.smaller,
    flex: 1,
    marginBottom: spacing.base,
    justifyContent: 'space-evenly'
  },
  title: {
    marginBottom: spacing.smaller,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
});

const HomeScreen = React.memo(HomeScreenComponent);
export default HomeScreen;

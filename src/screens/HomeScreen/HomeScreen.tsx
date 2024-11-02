import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import theme from "../../theme/theme";
import Stock from "../../types/Stock";
import { spacing } from "../../theme/spacing";
import { Header, Text } from "../../components";
import SearchBar from "../../components/SearchBar";
import useStocksByExchange from "../../hooks/useStocksByExchange";

const HomeScreenComponent = () => {
  const { loadStocks, data, loading, loadMore, loadingMore } =
    useStocksByExchange("XNAS");

  useEffect(() => {
    loadStocks().catch((error) => {
      if (error.status === "ERROR") {
        Alert.alert("Error", error.error);
      } else {
        Alert.alert("Error", String(error.message));
      }
    });
  }, []);

  const handleEndReached = useCallback(() => {
    loadMore()?.catch((error) => {
      if (error.status === "ERROR") {
        Alert.alert("Error", error.error);
      } else {
        Alert.alert("Error", String(error.message));
      }
    });
  }, [loadMore]);

  const renderStock = useCallback(
    ({ item }: ListRenderItemInfo<Stock>) => (
      <View style={styles.stockContainer}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${item.name}&background=191926&color=fff`,
          }}
          style={styles.stockIcon}
        />
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

  const handleSearch = useCallback((searchTerm: string) => {
    loadStocks(searchTerm);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.primary} size={"large"} />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderStock}
          numColumns={2}
          contentContainerStyle={styles.list}
          onEndReached={handleEndReached}
          ListFooterComponent={
            <ActivityIndicator color={theme.primary} animating={loadingMore} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  list: {
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    marginBottom: spacing.smaller,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stockIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: spacing.smaller,
  },
});

const HomeScreen = React.memo(HomeScreenComponent);
export default HomeScreen;

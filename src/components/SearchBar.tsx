import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import theme from "../theme/theme";
import { spacing } from "../theme/spacing";

interface Props {
  onSearch: (value: string) => void;
}

const SearchBarComponent = ({ onSearch }: Props) => {
  const [search, setSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleChangeText = useCallback((value: string) => {
    setSearch(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  }, [search]);


  const handleSubmit = useCallback(() => {
    onSearch(search);
  }, [search]);

  return (
    <TextInput
      style={styles.search}
      placeholder="Search for stocks"
      placeholderTextColor={theme.border}
      returnKeyType="search"
      onChangeText={handleChangeText}
      value={search}
      onSubmitEditing={handleSubmit}
    />
  );
};

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 30,
    marginHorizontal: spacing.base,
    marginVertical: spacing.base,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.small,
    color: theme.font,
  },
});

const SearchBar = React.memo(SearchBarComponent);
export default SearchBar;

import React from "react";
import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import theme from "../theme/theme";
import { spacing } from "../theme/spacing";

interface Props {
  handleSafeArea?: boolean;
}

const HeaderComponent = ({ handleSafeArea }: Props) => {
  return (
    <SafeAreaView
      edges={handleSafeArea ? ["top"] : []}
      style={styles.container}
    >
      <Image source={require("../assets/NASDAQ_Logo.png")} style={styles.logo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.small,
    backgroundColor: theme.primary,
    flexDirection: "row",
  },
  logo: {
    width: 100,
    resizeMode: 'contain',
    tintColor: theme.font,
    aspectRatio: 3.5
  }
});

const Header = React.memo(HeaderComponent);
export default Header;

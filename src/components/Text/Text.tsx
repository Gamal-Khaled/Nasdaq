import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";

import theme from "../../theme/theme";
import variants from "./TextVariants";

export interface Props extends TextProps {
  variant?: keyof typeof variants;
  secondary?: boolean;
}

const TextComponent = ({ variant, secondary, style, ...props }: Props) => {
  const _style = StyleSheet.flatten([
    !!variant && variants[variant],
    secondary ? styles.secondaryStyle : styles.defaultStyle,
    style,
  ]);

  return <RNText {...props} style={_style} />;
};

export const styles = StyleSheet.create({
  defaultStyle: {
    color: theme.font,
  },
  secondaryStyle: {
    color: theme.fontSecondary,
  },
});

const Text = React.memo(TextComponent);
export default Text;

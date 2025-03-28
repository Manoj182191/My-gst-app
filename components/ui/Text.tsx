import React, { ReactNode } from 'react';
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface TextProps extends RNTextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button';
  style?: TextStyle;
  color?: string;
}

export default function Text({
  children,
  variant = 'body1',
  style,
  color,
  ...rest
}: TextProps) {
  const { theme } = useTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: 32,
          fontWeight: '700',
          lineHeight: 40,
        };
      case 'h2':
        return {
          fontSize: 28,
          fontWeight: '700',
          lineHeight: 36,
        };
      case 'h3':
        return {
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 32,
        };
      case 'h4':
        return {
          fontSize: 20,
          fontWeight: '600',
          lineHeight: 28,
        };
      case 'h5':
        return {
          fontSize: 18,
          fontWeight: '600',
          lineHeight: 24,
        };
      case 'h6':
        return {
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 22,
        };
      case 'body1':
        return {
          fontSize: 16,
          fontWeight: '400',
          lineHeight: 24,
        };
      case 'body2':
        return {
          fontSize: 14,
          fontWeight: '400',
          lineHeight: 20,
        };
      case 'caption':
        return {
          fontSize: 12,
          fontWeight: '400',
          lineHeight: 16,
        };
      case 'button':
        return {
          fontSize: 16,
          fontWeight: '600',
          lineHeight: 24,
        };
      default:
        return {
          fontSize: 16,
          fontWeight: '400',
          lineHeight: 24,
        };
    }
  };

  return (
    <RNText
      style={[
        styles.text,
        getVariantStyle(),
        { color: color || theme.colors.text },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular',
  },
});
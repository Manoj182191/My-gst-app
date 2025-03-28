import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Card from '../ui/Card';
import Text from '../ui/Text';
import { useTheme } from '../../context/ThemeContext';

interface SalesChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
  title?: string;
}

export default function SalesChart({ data, title = 'Sales Overview' }: SalesChartProps) {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get('window').width - 40;

  const chartConfig = {
    backgroundGradientFrom: theme.colors.cardBackground,
    backgroundGradientTo: theme.colors.cardBackground,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.colors.primary,
    labelColor: (opacity = 1) => theme.colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  return (
    <Card style={styles.card}>
      <Text variant="h6" style={styles.title}>
        {title}
      </Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
  },
  title: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
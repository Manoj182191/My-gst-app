import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import Card from '../ui/Card';
import Text from '../ui/Text';
import { useTheme } from '../../context/ThemeContext';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, change, icon }: StatCardProps) {
  const { theme } = useTheme();
  
  const isPositive = change && change > 0;
  
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text variant="body2" color={theme.colors.textSecondary}>
          {title}
        </Text>
        <View style={styles.iconContainer}>
          {icon}
        </View>
      </View>
      <Text variant="h4" style={styles.value}>
        {value}
      </Text>
      {change !== undefined && (
        <View style={styles.footer}>
          <View style={styles.changeContainer}>
            {isPositive ? (
              <ArrowUpRight size={16} color={theme.colors.success} />
            ) : (
              <ArrowDownRight size={16} color={theme.colors.error} />
            )}
            <Text 
              variant="caption" 
              color={isPositive ? theme.colors.success : theme.colors.error}
              style={styles.changeText}
            >
              {Math.abs(change)}%
            </Text>
          </View>
          <Text variant="caption" color={theme.colors.textSecondary}>
            vs last month
          </Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '48%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    opacity: 0.8,
  },
  value: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    marginLeft: 4,
  },
});
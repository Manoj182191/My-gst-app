import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import Card from '../ui/Card';
import Text from '../ui/Text';
import { useTheme } from '../../context/ThemeContext';

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: string;
  type: 'income' | 'expense';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const { theme } = useTheme();

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        {item.type === 'income' ? (
          <ArrowUpRight size={20} color={theme.colors.success} />
        ) : (
          <ArrowDownLeft size={20} color={theme.colors.error} />
        )}
      </View>
      <View style={styles.transactionDetails}>
        <Text variant="body2">{item.name}</Text>
        <Text variant="caption" color={theme.colors.textSecondary}>
          {item.date}
        </Text>
      </View>
      <Text
        variant="body2"
        color={item.type === 'income' ? theme.colors.success : theme.colors.error}
      >
        {item.type === 'income' ? '+' : '-'}{item.amount}
      </Text>
    </View>
  );

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text variant="h6">Recent Transactions</Text>
        <Text
          variant="body2"
          color={theme.colors.primary}
          style={styles.viewAll}
        >
          View All
        </Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    fontWeight: '500',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
});
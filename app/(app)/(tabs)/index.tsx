import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { IndianRupee, CreditCard, FileText, Calendar } from 'lucide-react-native';
import Text from '../../../components/ui/Text';
import StatCard from '../../../components/dashboard/StatCard';
import SalesChart from '../../../components/dashboard/SalesChart';
import RecentTransactions from '../../../components/dashboard/RecentTransactions';

export default function DashboardScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  
  // Mock data for dashboard
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  
  const transactions = [
    {
      id: '1',
      name: 'Sharma Enterprises',
      date: '15 Jun 2025',
      amount: '₹12,500',
      type: 'income',
    },
    {
      id: '2',
      name: 'Office Supplies',
      date: '12 Jun 2025',
      amount: '₹2,340',
      type: 'expense',
    },
    {
      id: '3',
      name: 'Patel Trading Co.',
      date: '10 Jun 2025',
      amount: '₹8,750',
      type: 'income',
    },
    {
      id: '4',
      name: 'Internet Bill',
      date: '05 Jun 2025',
      amount: '₹1,499',
      type: 'expense',
    },
  ];
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text variant="body2" color={theme.colors.textSecondary}>
              {t('welcome')}
            </Text>
            <Text variant="h4" style={styles.userName}>
              {user?.name}
            </Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard
            title={t('totalSales')}
            value="₹1,24,500"
            change={12.5}
            icon={<IndianRupee size={20} color={theme.colors.primary} />}
          />
          <StatCard
            title={t('totalExpenses')}
            value="₹45,280"
            change={-8.3}
            icon={<CreditCard size={20} color={theme.colors.secondary} />}
          />
        </View>
        
        <View style={styles.statsContainer}>
          <StatCard
            title={t('pendingInvoices')}
            value="12"
            icon={<FileText size={20} color={theme.colors.warning} />}
          />
          <StatCard
            title="Due Today"
            value="3"
            icon={<Calendar size={20} color={theme.colors.info} />}
          />
        </View>
        
        <SalesChart data={salesData} title={t('salesOverview')} />
        
        <RecentTransactions transactions={transactions} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
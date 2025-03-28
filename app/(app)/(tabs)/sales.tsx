import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { FileUp, Calculator, ArrowUpDown, Filter } from 'lucide-react-native';
import Text from '../../../components/ui/Text';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function SalesScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState('invoices');
  
  // Mock data for invoices
  const invoices = [
    {
      id: 'INV-001',
      customer: 'Sharma Enterprises',
      date: '15 Jun 2025',
      amount: '₹12,500',
      status: 'paid',
    },
    {
      id: 'INV-002',
      customer: 'Patel Trading Co.',
      date: '10 Jun 2025',
      amount: '₹8,750',
      status: 'pending',
    },
    {
      id: 'INV-003',
      customer: 'Global Tech Solutions',
      date: '05 Jun 2025',
      amount: '₹24,800',
      status: 'overdue',
    },
    {
      id: 'INV-004',
      customer: 'Mehta & Sons',
      date: '01 Jun 2025',
      amount: '₹15,200',
      status: 'paid',
    },
  ];
  
  const renderStatusBadge = (status: string) => {
    let backgroundColor;
    let textColor;
    
    switch (status) {
      case 'paid':
        backgroundColor = 'rgba(16, 185, 129, 0.1)';
        textColor = theme.colors.success;
        break;
      case 'pending':
        backgroundColor = 'rgba(245, 158, 11, 0.1)';
        textColor = theme.colors.warning;
        break;
      case 'overdue':
        backgroundColor = 'rgba(239, 68, 68, 0.1)';
        textColor = theme.colors.error;
        break;
      default:
        backgroundColor = 'rgba(107, 114, 128, 0.1)';
        textColor = theme.colors.textSecondary;
    }
    
    return (
      <View style={[styles.statusBadge, { backgroundColor }]}>
        <Text variant="caption" color={textColor} style={styles.statusText}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="h4" style={styles.title}>
          {t('sales')}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.cardBackgroundAlt }]}>
            <Filter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.cardBackgroundAlt }]}>
            <ArrowUpDown size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'invoices' && { borderBottomColor: theme.colors.primary },
          ]}
          onPress={() => setActiveTab('invoices')}
        >
          <Text
            variant="body2"
            color={activeTab === 'invoices' ? theme.colors.primary : theme.colors.textSecondary}
          >
            Invoices
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'purchases' && { borderBottomColor: theme.colors.primary },
          ]}
          onPress={() => setActiveTab('purchases')}
        >
          <Text
            variant="body2"
            color={activeTab === 'purchases' ? theme.colors.primary : theme.colors.textSecondary}
          >
            Purchases
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'gst' && { borderBottomColor: theme.colors.primary },
          ]}
          onPress={() => setActiveTab('gst')}
        >
          <Text
            variant="body2"
            color={activeTab === 'gst' ? theme.colors.primary : theme.colors.textSecondary}
          >
            GST
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'invoices' && (
          <>
            <View style={styles.actionButtons}>
              <Button
                title="Create Invoice"
                variant="primary"
                size="small"
                style={styles.actionButton}
              />
              <Button
                title="View Reports"
                variant="outline"
                size="small"
                style={styles.actionButton}
              />
            </View>
            
            {invoices.map((invoice) => (
              <Card key={invoice.id} style={styles.invoiceCard}>
                <View style={styles.invoiceHeader}>
                  <Text variant="h6">{invoice.id}</Text>
                  {renderStatusBadge(invoice.status)}
                </View>
                <View style={styles.invoiceDetails}>
                  <Text variant="body2">{invoice.customer}</Text>
                  <Text variant="body1" style={styles.invoiceAmount}>
                    {invoice.amount}
                  </Text>
                </View>
                <Text variant="caption" color={theme.colors.textSecondary}>
                  {invoice.date}
                </Text>
              </Card>
            ))}
          </>
        )}
        
        {activeTab === 'gst' && (
          <View style={styles.gstContainer}>
            <Card style={styles.gstCard}>
              <View style={styles.gstIconContainer}>
                <FileUp size={24} color={theme.colors.primary} />
              </View>
              <Text variant="h6" style={styles.gstCardTitle}>
                {t('uploadInvoice')}
              </Text>
              <Text
                variant="body2"
                color={theme.colors.textSecondary}
                style={styles.gstCardDescription}
              >
                Upload invoice files (Excel, CSV, PDF) for GST calculation
              </Text>
              <Button
                title="Upload File"
                variant="outline"
                size="small"
                style={styles.gstButton}
              />
            </Card>
            
            <Card style={styles.gstCard}>
              <View style={styles.gstIconContainer}>
                <Calculator size={24} color={theme.colors.primary} />
              </View>
              <Text variant="h6" style={styles.gstCardTitle}>
                {t('calculateGST')}
              </Text>
              <Text
                variant="body2"
                color={theme.colors.textSecondary}
                style={styles.gstCardDescription}
              >
                Calculate GST for different types (CGST+SGST, IGST, TDS)
              </Text>
              <Button
                title="Calculate Now"
                variant="primary"
                size="small"
                style={styles.gstButton}
              />
            </Card>
          </View>
        )}
        
        {activeTab === 'purchases' && (
          <View style={styles.emptyState}>
            <Text variant="body1" color={theme.colors.textSecondary}>
              No purchase invoices yet. Create your first purchase invoice.
            </Text>
            <Button
              title="Add Purchase Invoice"
              variant="primary"
              style={styles.emptyStateButton}
            />
          </View>
        )}
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
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  invoiceCard: {
    marginBottom: 12,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    textTransform: 'capitalize',
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceAmount: {
    fontWeight: '600',
  },
  gstContainer: {
    gap: 16,
  },
  gstCard: {
    alignItems: 'center',
    padding: 24,
  },
  gstIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  gstCardTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  gstCardDescription: {
    textAlign: 'center',
    marginBottom: 16,
  },
  gstButton: {
    minWidth: 150,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateButton: {
    marginTop: 16,
  },
});
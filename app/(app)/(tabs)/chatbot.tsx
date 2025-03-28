import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { Send, Mic, Bot, Upload, History, FileText, ChartPie as PieChart } from 'lucide-react-native';
import Text from '../../../components/ui/Text';
import Card from '../../../components/ui/Card';
import * as DocumentPicker from 'expo-document-picker';
import { LineChart, PieChart as RNPieChart } from 'react-native-chart-kit';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'file' | 'analysis';
  fileUrl?: string;
  fileName?: string;
  analysisData?: any;
}

interface HistoryItem {
  id: string;
  name: string;
  date: string;
  type: string;
}

export default function ChatbotScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your AI assistant. I can help you with file analysis, financial calculations, and GST queries. You can upload documents or ask questions.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  
  const [inputText, setInputText] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  
  // Mock history data
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      name: 'John Doe',
      date: '15 Mar 2025',
      type: 'Invoice Analysis',
    },
    {
      id: '2',
      name: 'ABC Corp',
      date: '14 Mar 2025',
      type: 'Financial Report',
    },
  ];

  // Mock financial data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [50000, 45000, 60000, 55000, 70000, 65000],
      },
    ],
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf', 'application/msword'],
      });

      if (result.assets && result.assets[0]) {
        const file = result.assets[0];
        
        // Add file message
        const fileMessage: Message = {
          id: Date.now().toString(),
          text: `Uploaded file: ${file.name}`,
          sender: 'user',
          timestamp: new Date(),
          type: 'file',
          fileName: file.name,
          fileUrl: file.uri,
        };
        
        setMessages(prev => [...prev, fileMessage]);
        
        // Simulate analysis response
        setTimeout(() => {
          const analysisMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: 'I have analyzed your document. Here are the key findings:',
            sender: 'bot',
            timestamp: new Date(),
            type: 'analysis',
            analysisData: {
              totalAmount: '₹45,000',
              taxAmount: '₹8,100',
              date: '15 Mar 2025',
              category: 'Sales Invoice',
            },
          };
          
          setMessages(prev => [...prev, analysisMessage]);
        }, 1500);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate bot response with financial analysis
    if (inputText.toLowerCase().includes('profit') || inputText.toLowerCase().includes('financial')) {
      setTimeout(() => {
        const analysisMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Here is your financial analysis:',
          sender: 'bot',
          timestamp: new Date(),
          type: 'analysis',
          analysisData: {
            monthlyData,
            profitLoss: '+₹25,000',
            trend: 'positive',
          },
        };
        
        setMessages(prev => [...prev, analysisMessage]);
      }, 1000);
    } else {
      // Regular response
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'I understand your query. Let me help you with that...',
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };
  
  const renderAnalysis = (data: any) => {
    return (
      <View style={styles.analysisContainer}>
        {data.monthlyData && (
          <View style={styles.chartContainer}>
            <Text variant="h6" style={styles.chartTitle}>Monthly Performance</Text>
            <LineChart
              data={data.monthlyData}
              width={300}
              height={200}
              chartConfig={{
                backgroundColor: theme.colors.cardBackground,
                backgroundGradientFrom: theme.colors.cardBackground,
                backgroundGradientTo: theme.colors.cardBackground,
                decimalPlaces: 0,
                color: (opacity = 1) => theme.colors.primary,
                labelColor: (opacity = 1) => theme.colors.text,
              }}
              bezier
              style={styles.chart}
            />
          </View>
        )}
        
        {data.profitLoss && (
          <View style={styles.metricsContainer}>
            <Card style={styles.metricCard}>
              <Text variant="caption" color={theme.colors.textSecondary}>Net Profit/Loss</Text>
              <Text
                variant="h6"
                color={data.trend === 'positive' ? theme.colors.success : theme.colors.error}
              >
                {data.profitLoss}
              </Text>
            </Card>
          </View>
        )}
      </View>
    );
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <View
        key={message.id}
        style={[
          styles.messageBubble,
          isUser
            ? [styles.userBubble, { backgroundColor: theme.colors.primary }]
            : [styles.botBubble, { backgroundColor: theme.colors.cardBackgroundAlt }],
        ]}
      >
        {message.type === 'file' && (
          <View style={styles.filePreview}>
            <FileText size={24} color={isUser ? theme.colors.white : theme.colors.primary} />
            <Text
              variant="caption"
              color={isUser ? theme.colors.white : theme.colors.text}
              style={styles.fileName}
            >
              {message.fileName}
            </Text>
          </View>
        )}
        
        <Text
          variant="body2"
          color={isUser ? theme.colors.white : theme.colors.text}
        >
          {message.text}
        </Text>
        
        {message.type === 'analysis' && message.analysisData && (
          renderAnalysis(message.analysisData)
        )}
        
        <Text
          variant="caption"
          color={isUser ? 'rgba(255, 255, 255, 0.7)' : theme.colors.textSecondary}
          style={styles.timestamp}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity
      style={[styles.historyItem, { backgroundColor: theme.colors.cardBackgroundAlt }]}
      onPress={() => {
        setShowHistory(false);
        // Handle history item selection
      }}
    >
      <View style={styles.historyItemContent}>
        <Text variant="body2">{item.name}</Text>
        <Text variant="caption" color={theme.colors.textSecondary}>{item.type}</Text>
        <Text variant="caption" color={theme.colors.textSecondary}>{item.date}</Text>
      </View>
      <FileText size={20} color={theme.colors.primary} />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text variant="h4" style={styles.title}>
          {t('chatbot')}
        </Text>
        <TouchableOpacity
          style={[styles.historyButton, { backgroundColor: theme.colors.cardBackgroundAlt }]}
          onPress={() => setShowHistory(!showHistory)}
        >
          <History size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      {showHistory ? (
        <Card style={styles.historyContainer}>
          <Text variant="h6" style={styles.historyTitle}>Chat History</Text>
          <FlatList
            data={historyItems}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </Card>
      ) : (
        <>
          <Card style={styles.chatInfo}>
            <View style={styles.botIconContainer}>
              <Bot size={24} color={theme.colors.primary} />
            </View>
            <Text variant="body2" style={styles.chatInfoText}>
              Upload documents or ask questions about financial analysis, GST calculations, or accounting assistance.
            </Text>
          </Card>
          
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map(renderMessage)}
          </ScrollView>
          
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          >
            <View style={[styles.inputContainer, { backgroundColor: theme.colors.cardBackground }]}>
              <TextInput
                style={[
                  styles.input,
                  { color: theme.colors.text, backgroundColor: theme.colors.inputBackground },
                ]}
                placeholder="Type your message..."
                placeholderTextColor={theme.colors.textSecondary}
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              <View style={styles.inputActions}>
                <TouchableOpacity
                  style={[styles.iconButton, { backgroundColor: theme.colors.cardBackgroundAlt }]}
                  onPress={handleFileUpload}
                >
                  <Upload size={20} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconButton, { backgroundColor: theme.colors.cardBackgroundAlt }]}
                >
                  <Mic size={20} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    { backgroundColor: inputText.trim() ? theme.colors.primary : theme.colors.cardBackgroundAlt },
                  ]}
                  onPress={handleSend}
                  disabled={!inputText.trim()}
                >
                  <Send
                    size={20}
                    color={inputText.trim() ? theme.colors.white : theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
  },
  historyButton: {
    padding: 8,
    borderRadius: 8,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  botIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chatInfoText: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  timestamp: {
    alignSelf: 'flex-end',
    marginTop: 4,
    fontSize: 10,
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fileName: {
    marginLeft: 8,
  },
  analysisContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  chartContainer: {
    marginBottom: 12,
  },
  chartTitle: {
    marginBottom: 8,
  },
  chart: {
    borderRadius: 8,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    padding: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  inputActions: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    flex: 1,
    margin: 16,
  },
  historyTitle: {
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyItemContent: {
    flex: 1,
  },
});
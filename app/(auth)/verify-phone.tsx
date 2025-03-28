import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Phone, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function VerifyPhoneScreen() {
  const { verifyPhone, resendPhoneVerification, isLoading, error } = useAuth();
  const { theme } = useTheme();
  
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown, canResend]);
  
  const handleVerify = async () => {
    if (!code) return;
    
    try {
      await verifyPhone(code);
      router.replace('/(app)/(tabs)');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleResend = async () => {
    try {
      await resendPhoneVerification();
      setCountdown(30);
      setCanResend(false);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={theme.colors.text} />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
          <Phone size={32} color={theme.colors.primary} />
        </View>
        
        <Text variant="h4" style={styles.title}>
          Verify your phone
        </Text>
        
        <Text
          variant="body1"
          color={theme.colors.textSecondary}
          style={styles.description}
        >
          We've sent a verification code to your phone number. Please enter the code below.
        </Text>
        
        {error && (
          <Text
            variant="body2"
            color={theme.colors.error}
            style={styles.errorText}
          >
            {error}
          </Text>
        )}
        
        <Input
          placeholder="Enter verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
        />
        
        <Button
          title="Verify Phone"
          onPress={handleVerify}
          loading={isLoading}
          style={styles.verifyButton}
        />
        
        <View style={styles.resendContainer}>
          <Text variant="body2" color={theme.colors.textSecondary}>
            Didn't receive the code?
          </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text
                variant="body2"
                color={theme.colors.primary}
                style={styles.resendText}
              >
                Resend Code
              </Text>
            </TouchableOpacity>
          ) : (
            <Text variant="body2" color={theme.colors.textSecondary}>
              Resend in {countdown}s
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
  },
  errorText: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    width: '100%',
  },
  input: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
  },
  verifyButton: {
    width: '100%',
    marginTop: 24,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    marginLeft: 4,
    fontWeight: '600',
  },
});
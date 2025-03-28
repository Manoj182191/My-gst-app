import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, Fingerprint } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function LoginScreen() {
  const { login, biometricLogin, isBiometricAvailable, isLoading, error, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const isDesktop = width >= 768;
  
  // Redirect to app if already authenticated
  if (isAuthenticated) {
    router.replace('/(app)/(tabs)');
    return null;
  }
  
  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    
    await login(email, password);
  };
  
  const handleBiometricLogin = async () => {
    await biometricLogin();
  };
  
  const renderContent = () => (
    <View style={[styles.content, isDesktop && styles.desktopContent]}>
      {isDesktop && (
        <View style={styles.leftPanel}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.backgroundImage}
          />
          <View style={[styles.overlay, { backgroundColor: `${theme.colors.primary}CC` }]}>
            <Text variant="h2" color={theme.colors.white} style={styles.welcomeText}>
              Welcome to HelloCA
            </Text>
            <Text
              variant="body1"
              color={theme.colors.white}
              style={styles.welcomeDescription}
            >
              Your AI-Powered GST & Business Management Solution
            </Text>
          </View>
        </View>
      )}
      
      <View style={[styles.formSection, isDesktop && styles.desktopFormSection]}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=200&auto=format&fit=crop' }}
            style={styles.logo}
          />
          <Text variant="h2" style={styles.appName}>
            {t('appName')}
          </Text>
          {!isDesktop && (
            <Text
              variant="body1"
              color={theme.colors.textSecondary}
              style={styles.tagline}
            >
              AI-Powered GST & Business Management
            </Text>
          )}
        </View>
        
        <Card style={styles.formCard}>
          <Text variant="h4" style={styles.loginTitle}>
            {t('login')}
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
            label={t('email')}
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={theme.colors.textSecondary} />}
          />
          
          <Input
            label={t('password')}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={<Lock size={20} color={theme.colors.textSecondary} />}
          />
          
          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => router.push('/forgot-password')}
          >
            <Text
              variant="body2"
              color={theme.colors.primary}
            >
              {t('forgotPassword')}
            </Text>
          </TouchableOpacity>
          
          <Button
            title={t('signIn')}
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
          />
          
          {isBiometricAvailable && Platform.OS !== 'web' && (
            <TouchableOpacity
              style={[
                styles.biometricButton,
                { borderColor: theme.colors.border },
              ]}
              onPress={handleBiometricLogin}
            >
              <Fingerprint size={24} color={theme.colors.primary} />
              <Text
                variant="body2"
                color={theme.colors.primary}
                style={styles.biometricText}
              >
                {t('biometricLogin')}
              </Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.registerPrompt}>
            <Text variant="body2" color={theme.colors.textSecondary}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text
                variant="body2"
                color={theme.colors.primary}
                style={styles.registerLink}
              >
                Sign up now
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {renderContent()}
      <View style={styles.footer}>
        <Text
          variant="caption"
          color={theme.colors.textSecondary}
        >
          © 2025 HelloCA. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  desktopContent: {
    flexDirection: 'row',
    height: '100%',
  },
  leftPanel: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Poppins-Bold',
  },
  welcomeDescription: {
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: 400,
  },
  formSection: {
    flex: 1,
    padding: 24,
  },
  desktopFormSection: {
    flex: 0.8,
    justifyContent: 'center',
    maxWidth: 480,
    padding: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  appName: {
    marginTop: 16,
    fontFamily: 'Poppins-Bold',
  },
  tagline: {
    marginTop: 8,
    textAlign: 'center',
  },
  formCard: {
    padding: 24,
  },
  loginTitle: {
    marginBottom: 24,
  },
  errorText: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
    marginBottom: 16,
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
  biometricText: {
    marginLeft: 8,
  },
  registerPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerLink: {
    marginLeft: 8,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
});
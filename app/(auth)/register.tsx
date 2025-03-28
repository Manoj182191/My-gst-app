import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import Text from '../../components/ui/Text';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function RegisterScreen() {
  const { register, isLoading, error } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
    
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };
  
  const handleRegister = async () => {
    if (!validateForm()) return;
    
    try {
      await register(formData);
      router.push('/verify-email');
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={theme.colors.text} />
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=200&auto=format&fit=crop' }}
          style={styles.logo}
        />
        <Text variant="h2" style={styles.appName}>
          {t('appName')}
        </Text>
        <Text
          variant="body1"
          color={theme.colors.textSecondary}
          style={styles.tagline}
        >
          Create your account
        </Text>
      </View>
      
      <View style={styles.formContainer}>
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
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          error={formErrors.name}
          leftIcon={<User size={20} color={theme.colors.textSecondary} />}
        />
        
        <Input
          label="Email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          error={formErrors.email}
          leftIcon={<Mail size={20} color={theme.colors.textSecondary} />}
        />
        
        <Input
          label="Phone Number"
          placeholder="+91 9876543210"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          error={formErrors.phone}
          leftIcon={<Phone size={20} color={theme.colors.textSecondary} />}
        />
        
        <Input
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          error={formErrors.password}
          leftIcon={<Lock size={20} color={theme.colors.textSecondary} />}
        />
        
        <Input
          label="Confirm Password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          secureTextEntry
          error={formErrors.confirmPassword}
          leftIcon={<Lock size={20} color={theme.colors.textSecondary} />}
        />
        
        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={isLoading}
          style={styles.registerButton}
        />
        
        <View style={styles.loginPrompt}>
          <Text variant="body2" color={theme.colors.textSecondary}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text
              variant="body2"
              color={theme.colors.primary}
              style={styles.loginLink}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
  formContainer: {
    flex: 1,
  },
  errorText: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  registerButton: {
    marginTop: 8,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginLink: {
    marginLeft: 4,
    fontWeight: '600',
  },
});
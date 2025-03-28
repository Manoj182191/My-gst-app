import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch, Image } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import { Settings, Moon, Globe as Globe2, LogOut, User, Bell, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import Text from '../../../components/ui/Text';
import Card from '../../../components/ui/Card';

export default function MoreScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { t, language, setLanguage, availableLanguages } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="h4" style={styles.title}>
            {t('more')}
          </Text>
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            {user?.profilePicture ? (
              <Image
                source={{ uri: user.profilePicture }}
                style={styles.profileImage}
              />
            ) : (
              <View
                style={[
                  styles.profileImage,
                  { backgroundColor: theme.colors.cardBackgroundAlt },
                ]}
              >
                <User size={24} color={theme.colors.primary} />
              </View>
            )}
            <View style={styles.profileDetails}>
              <Text variant="h6">{user?.name}</Text>
              <Text variant="body2" color={theme.colors.textSecondary}>
                {user?.email}
              </Text>
              <View style={styles.roleBadge}>
                <Text
                  variant="caption"
                  color={theme.colors.primary}
                  style={styles.roleText}
                >
                  {user?.role.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.menuSection}>
          <Card
            style={[
              styles.menuItem,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuItemIcon}>
                <User size={20} color={theme.colors.primary} />
              </View>
              <Text variant="body1">{t('profile')}</Text>
            </View>
          </Card>

          <Card
            style={[
              styles.menuItem,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuItemIcon}>
                <Bell size={20} color={theme.colors.primary} />
              </View>
              <Text variant="body1">Notifications</Text>
            </View>
          </Card>

          <Card
            style={[
              styles.menuItem,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuItemIcon}>
                <Shield size={20} color={theme.colors.primary} />
              </View>
              <Text variant="body1">Privacy & Security</Text>
            </View>
          </Card>

          <Card
            style={[
              styles.menuItem,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuItemIcon}>
                <HelpCircle size={20} color={theme.colors.primary} />
              </View>
              <Text variant="body1">Help & Support</Text>
            </View>
          </Card>
        </View>

        <View style={styles.settingsSection}>
          <Text
            variant="body2"
            color={theme.colors.textSecondary}
            style={styles.settingsSectionTitle}
          >
            {t('settings')}
          </Text>

          <Card
            style={[
              styles.settingsItem,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsItemIcon}>
                <Globe2 size={20} color={theme.colors.primary} />
              </View>
              <Text variant="body1">{t('language')}</Text>
            </View>
            <Text variant="body2" color={theme.colors.primary}>
              {availableLanguages.find((lang) => lang.code === language)?.name}
            </Text>
          </Card>

          <Card
            style={[
              styles.settingsItem,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <View style={styles.settingsItemLeft}>
              <View style={styles.settingsItemIcon}>
                <Moon size={20} color={theme.colors.primary} />
              </View>
              <Text variant="body1">{t('darkMode')}</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{
                false: '#E5E7EB',
                true: 'rgba(79, 70, 229, 0.4)',
              }}
              thumbColor={isDarkMode ? theme.colors.primary : '#FFFFFF'}
            />
          </Card>
        </View>
        
        <TouchableOpacity
          style={[
            styles.logoutButton,
            { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
          ]}
          onPress={logout}
        >
          <LogOut size={20} color={theme.colors.error} />
          <Text
            variant="body1"
            color={theme.colors.error}
            style={styles.logoutText}
          >
            {t('logout')}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            style={styles.footerText}
          >
            HelloCA v1.0.0
          </Text>
          <Text
            variant="caption"
            color={theme.colors.textSecondary}
            style={styles.footerText}
          >
            © 2025 HelloCA. All rights reserved.
          </Text>
        </View>
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
  profileCard: {
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  roleBadge: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  roleText: {
    fontWeight: '500',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 12,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsSectionTitle: {
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemIcon: {
    marginRight: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  logoutText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    marginBottom: 4,
  },
});
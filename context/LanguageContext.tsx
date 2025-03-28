import React, { createContext, useContext, useState, ReactNode } from 'react';

// Available languages
type Language = 'en' | 'hi' | 'ta' | 'te' | 'mr' | 'bn';

// Translations
const translations = {
  en: {
    appName: 'HelloCA',
    dashboard: 'Dashboard',
    sales: 'Sales',
    chatbot: 'AI Chatbot',
    more: 'More',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    forgotPassword: 'Forgot Password?',
    biometricLogin: 'Login with Biometrics',
    welcome: 'Welcome',
    totalSales: 'Total Sales',
    totalExpenses: 'Total Expenses',
    pendingInvoices: 'Pending Invoices',
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    salesOverview: 'Sales Overview',
    gstCalculation: 'GST Calculation',
    uploadInvoice: 'Upload Invoice',
    calculateGST: 'Calculate GST',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    darkMode: 'Dark Mode',
    logout: 'Logout',
    profile: 'Profile',
  },
  hi: {
    appName: 'हेलोसीए',
    dashboard: 'डैशबोर्ड',
    sales: 'बिक्री',
    chatbot: 'एआई चैटबॉट',
    more: 'अधिक',
    login: 'लॉगिन',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन करें',
    forgotPassword: 'पासवर्ड भूल गए?',
    biometricLogin: 'बायोमेट्रिक्स से लॉगिन करें',
    welcome: 'स्वागत है',
    totalSales: 'कुल बिक्री',
    totalExpenses: 'कुल खर्च',
    pendingInvoices: 'लंबित चालान',
    recentTransactions: 'हाल के लेनदेन',
    viewAll: 'सभी देखें',
    salesOverview: 'बिक्री अवलोकन',
    gstCalculation: 'जीएसटी गणना',
    uploadInvoice: 'चालान अपलोड करें',
    calculateGST: 'जीएसटी की गणना करें',
    settings: 'सेटिंग्स',
    language: 'भाषा',
    theme: 'थीम',
    darkMode: 'डार्क मोड',
    logout: 'लॉगआउट',
    profile: 'प्रोफ़ाइल',
  },
  ta: {
    appName: 'ஹலோசிஏ',
    dashboard: 'டாஷ்போர்டு',
    sales: 'விற்பனை',
    chatbot: 'AI சாட்போட்',
    more: 'மேலும்',
    login: 'உள்நுழைவு',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    signIn: 'உள்நுழைக',
    forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
    biometricLogin: 'பயோமெட்ரிக்ஸ் மூலம் உள்நுழைக',
    welcome: 'வரவேற்கிறோம்',
    totalSales: 'மொத்த விற்பனை',
    totalExpenses: 'மொத்த செலவுகள்',
    pendingInvoices: 'நிலுவையில் உள்ள விலைப்பட்டியல்கள்',
    recentTransactions: 'சமீபத்திய பரிவர்த்தனைகள்',
    viewAll: 'அனைத்தையும் காண்க',
    salesOverview: 'விற்பனை கண்ணோட்டம்',
    gstCalculation: 'GST கணக்கீடு',
    uploadInvoice: 'விலைப்பட்டியல் பதிவேற்றம்',
    calculateGST: 'GST கணக்கிடு',
    settings: 'அமைப்புகள்',
    language: 'மொழி',
    theme: 'தீம்',
    darkMode: 'இருள் பயன்முறை',
    logout: 'வெளியேறு',
    profile: 'சுயவிவரம்',
  },
  te: {
    appName: 'హలోసిఎ',
    dashboard: 'డాష్బోర్డ్',
    sales: 'సేల్స్',
    chatbot: 'AI చాట్బాట్',
    more: 'మరిన్ని',
    login: 'లాగిన్',
    email: 'ఇమెయిల్',
    password: 'పాస్వర్డ్',
    signIn: 'సైన్ ఇన్',
    forgotPassword: 'పాస్వర్డ్ మర్చిపోయారా?',
    biometricLogin: 'బయోమెట్రిక్స్ తో లాగిన్',
    welcome: 'స్వాగతం',
    totalSales: 'మొత్తం అమ్మకాలు',
    totalExpenses: 'మొత్తం ఖర్చులు',
    pendingInvoices: 'పెండింగ్ ఇన్వాయిస్లు',
    recentTransactions: 'ఇటీవలి లావాదేవీలు',
    viewAll: 'అన్నీ చూడండి',
    salesOverview: 'సేల్స్ ఓవర్వ్యూ',
    gstCalculation: 'GST లెక్కింపు',
    uploadInvoice: 'ఇన్వాయిస్ అప్లోడ్',
    calculateGST: 'GST లెక్కించండి',
    settings: 'సెట్టింగ్స్',
    language: 'భాష',
    theme: 'థీమ్',
    darkMode: 'డార్క్ మోడ్',
    logout: 'లాగౌట్',
    profile: 'ప్రొఫైల్',
  },
  mr: {
    appName: 'हॅलोसीए',
    dashboard: 'डॅशबोर्ड',
    sales: 'विक्री',
    chatbot: 'AI चॅटबॉट',
    more: 'अधिक',
    login: 'लॉगिन',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन करा',
    forgotPassword: 'पासवर्ड विसरलात?',
    biometricLogin: 'बायोमेट्रिक्स सह लॉगिन करा',
    welcome: 'स्वागत आहे',
    totalSales: 'एकूण विक्री',
    totalExpenses: 'एकूण खर्च',
    pendingInvoices: 'प्रलंबित चलने',
    recentTransactions: 'अलीकडील व्यवहार',
    viewAll: 'सर्व पहा',
    salesOverview: 'विक्री आढावा',
    gstCalculation: 'GST गणना',
    uploadInvoice: 'चलन अपलोड करा',
    calculateGST: 'GST गणना करा',
    settings: 'सेटिंग्ज',
    language: 'भाषा',
    theme: 'थीम',
    darkMode: 'डार्क मोड',
    logout: 'लॉगआउट',
    profile: 'प्रोफाइल',
  },
  bn: {
    appName: 'হ্যালোসিএ',
    dashboard: 'ড্যাশবোর্ড',
    sales: 'বিক্রয়',
    chatbot: 'AI চ্যাটবট',
    more: 'আরও',
    login: 'লগইন',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    signIn: 'সাইন ইন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    biometricLogin: 'বায়োমেট্রিক্স দিয়ে লগইন',
    welcome: 'স্বাগতম',
    totalSales: 'মোট বিক্রয়',
    totalExpenses: 'মোট ব্যয়',
    pendingInvoices: 'অপেক্ষমান চালান',
    recentTransactions: 'সাম্প্রতিক লেনদেন',
    viewAll: 'সব দেখুন',
    salesOverview: 'বিক্রয় পর্যালোচনা',
    gstCalculation: 'GST গণনা',
    uploadInvoice: 'চালান আপলোড',
    calculateGST: 'GST গণনা করুন',
    settings: 'সেটিংস',
    language: 'ভাষা',
    theme: 'থিম',
    darkMode: 'ডার্ক মোড',
    logout: 'লগআউট',
    profile: 'প্রোফাইল',
  },
};

// Language names
const languageNames = {
  en: 'English',
  hi: 'हिन्दी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  mr: 'मराठी',
  bn: 'বাংলা',
};

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  availableLanguages: { code: Language; name: string }[];
}

// Create context
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  availableLanguages: [],
});

// Hook to use language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  // Available languages for selection
  const availableLanguages = Object.entries(languageNames).map(([code, name]) => ({
    code: code as Language,
    name,
  }));

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
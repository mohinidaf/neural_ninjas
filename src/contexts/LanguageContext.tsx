import React, { createContext, useContext, useState } from 'react';

type Lang = 'en' | 'hi';

const translations: Record<string, string> = {
  // Navigation
  'Dashboard': 'डैशबोर्ड',
  'My Health ID': 'मेरा स्वास्थ्य आईडी',
  'Health Record': 'स्वास्थ्य रिकॉर्ड',
  'Emergency Card': 'आपातकालीन कार्ड',
  'My Profile': 'मेरी प्रोफ़ाइल',
  'Patients': 'रोगी',
  'Scan QR': 'क्यूआर स्कैन',
  'Consultations': 'परामर्श',
  'Prescriptions': 'पर्चे',
  'Lab Reports': 'प्रयोगशाला रिपोर्ट',
  'Vaccinations': 'टीकाकरण',
  'Alerts': 'अलर्ट',
  'Profile': 'प्रोफ़ाइल',
  'Registered Workers': 'पंजीकृत कार्यकर्ता',
  'Disease Monitoring': 'रोग निगरानी',
  'SDG Impact': 'एसडीजी प्रभाव',

  // Roles / portal
  'Migrant Worker': 'प्रवासी कार्यकर्ता',
  'Healthcare Worker': 'स्वास्थ्य कर्मी',
  'Health Authority': 'स्वास्थ्य प्राधिकरण',
  'Portal': 'पोर्टल',

  // Topbar / common
  'Authorized Access': 'प्राधिकृत पहुँच',
  'Protected Health Record': 'संरक्षित स्वास्थ्य रिकॉर्ड',
  'Live Health ID': 'लाइव स्वास्थ्य आईडी',
  'Sign Out': 'साइन आउट',

  // Scan page
  "Scan Patient QR": 'रोगी क्यूआर स्कैन करें',
  "Scan a patient's QR code or use a demo code below": 'रोगी का क्यूआर कोड स्कैन करें या नीचे डेमो कोड का उपयोग करें',
  'Demo QR Codes': 'डेमो क्यूआर कोड',
  'Manual Health ID Entry': 'मैन्युअल स्वास्थ्य आईडी प्रविष्टि',
  'Scan Health ID': 'स्वास्थ्य आईडी स्कैन करें',

  // Profile
  'Complete Your Profile': 'अपनी प्रोफ़ाइल पूरा करें',
  'Complete Profile': 'प्रोफ़ाइल पूरा करें',
  'Profile Incomplete': 'प्रोफ़ाइल अधूरी है',
  'Complete Profile': 'प्रोफ़ाइल पूरा करें',
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: string) => string;
} | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('app_lang') as Lang) || 'en');

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem('app_lang', l);
    } catch {}
    setLangState(l);
  };

  const t = (s: string) => {
    if (lang === 'hi') {
      return translations[s] || s;
    }
    return s;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

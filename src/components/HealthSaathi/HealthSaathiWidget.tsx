import { useState, useRef, useEffect, type ReactNode } from 'react';
import { MessageCircle, X, Send, Languages, Bot, User } from 'lucide-react';
import { chatQuickActions, primaryPatient } from '@/data/demoData';
import type { ChatMessage, ChatLang } from '@/types';

const langLabels: Record<ChatLang, string> = {
  en: 'English',
  hi: 'हिंदी',
  ml: 'മലയാളം',
};

type ReplyKey =
  | 'record'
  | 'medicine'
  | 'appointment'
  | 'allergy'
  | 'fever'
  | 'translate'
  | 'findcare'
  | 'greeting'
  | 'fallback';

// Detect the script of the user's message so a question typed in Hindi or
// Malayalam is answered in that language automatically.
function detectLang(text: string): ChatLang | null {
  if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Devanagari
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
  return null;
}

// Full translations for every bot reply, keyed by language.
// `{token}` placeholders are filled with live patient data below.
const replies: Record<ChatLang, Record<ReplyKey, string>> = {
  en: {
    record:
      'Your latest health record shows a consultation on {date} at {hospital}. Diagnosis: {diagnosis}. You have {count} total consultations on file. You can view full details on your Health Record page.',
    medicine:
      'Your current active medications:\n{meds}\n\nPlease take medicines as prescribed. Do not stop without consulting your doctor.',
    appointment:
      'Your next follow-up is scheduled for {followUp} with {doctor}. Please bring your Health ID QR code to the visit.',
    allergy:
      'Your recorded allergies:\n{allergies}\n\nMake sure to inform healthcare providers about these before any treatment.',
    fever:
      'If you have a fever: rest, drink plenty of fluids, and take Paracetamol as prescribed. If fever persists beyond 3 days or is very high, please visit a health centre immediately. Your doctor can see your full history using your Health ID.',
    translate:
      'I can help translate between you and your doctor. Type your symptoms in your language and I\'ll translate them for the doctor. For example, say "Mujhe kal se bukhar hai" and I\'ll explain it for your doctor.',
    findcare:
      'You can find nearby government health centres and hospitals using your Health ID. The nearest facility to {district} will show you services like general check-ups, maternal care, and lab tests. Your HealthSaathi records are shared with the facility when you scan your QR code.',
    greeting:
      'Hello! I\'m HealthSaathi, your multilingual healthcare assistant. I can help you with your health records, medicines, and appointments. How can I help you today?',
    fallback:
      'I understand you\'re asking about "{text}". I can help with your health records, medications, appointments, allergies, or translate symptoms for your doctor. What would you like to know?',
  },
  hi: {
    record:
      'आपके नवीनतम स्वास्थ्य रिकॉर्ड के अनुसार {date} को {hospital} पर एक परामर्श हुआ था। निदान: {diagnosis}। आपके पास कुल {count} परामर्श दर्ज हैं। पूरा विवरण आप अपने हेल्थ रिकॉर्ड पेज पर देख सकते हैं।',
    medicine:
      'आपकी वर्तमान सक्रिय दवाइयाँ:\n{meds}\n\nकृपया दवाइयाँ डॉक्टर के निर्देशानुसार ही लें। डॉक्टर से सलाह किए बिना दवा न रोकें।',
    appointment:
      'आपका अगला फॉलो-अप {followUp} को {doctor} के साथ निर्धारित है। कृपया मुलाकात पर अपना हेल्थ ID QR कोड लेकर आएँ।',
    allergy:
      'आपकी दर्ज की गई एलर्जी:\n{allergies}\n\nकिसी भी उपचार से पहले स्वास्थ्य देखभाल प्रदाताओं को इनके बारे में अवश्य बताएँ।',
    fever:
      'यदि आपको बुखार है: आराम करें, खूब तरल पदार्थ लें और डॉक्टर के निर्देशानुसार पैरासिटामोल लें। यदि बुखार 3 दिनों से अधिक रहे या बहुत तेज़ हो, तो तुरंत स्वास्थ्य केंद्र जाएँ। आपका डॉक्टर आपकी Health ID से आपका पूरा इतिहास देख सकता है।',
    translate:
      'मैं आपके और आपके डॉक्टर के बीच अनुवाद में मदद कर सकता हूँ। अपने लक्षण अपनी भाषा में लिखें और मैं उन्हें डॉक्टर के लिए अनुवाद करूँगा। उदाहरण के लिए, "मुझे कल से बुखार है" कहें और मैं इसे आपके डॉक्टर को समझाऊँगा।',
    findcare:
      'आप अपनी Health ID से पास के सरकारी स्वास्थ्य केंद्रों और अस्पतालों को ढूँढ सकते हैं। {district} के पास की सुविधा में सामान्य जाँच, मातृ देखभाल और लैब टेस्ट जैसी सेवाएँ उपलब्ध होंगी। जब आप अपना QR कोड स्कैन कराते हैं तो आपके HealthSaathi रिकॉर्ड उस सुविधा के साथ साझा किए जाते हैं।',
    greeting:
      'नमस्ते! मैं HealthSaathi हूँ, आपका बहुभाषी स्वास्थ्य सहायक। मैं आपके स्वास्थ्य रिकॉर्ड, दवाइयों और अपॉइंटमेंट में आपकी मदद कर सकता हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?',
    fallback:
      'मैं समझता हूँ कि आप "{text}" के बारे में पूछ रहे हैं। मैं आपके स्वास्थ्य रिकॉर्ड, दवाइयों, अपॉइंटमेंट, एलर्जी में मदद कर सकता हूँ, या आपके डॉक्टर के लिए लक्षणों का अनुवाद कर सकता हूँ। आप क्या जानना चाहेंगे?',
  },
  ml: {
    record:
      'നിങ്ങളുടെ ഏറ്റവും പുതിയ ആരോഗ്യ രേഖ പ്രകാരം {date}-ന് {hospital}-ൽ ഒരു കൺസൾട്ടേഷൻ നടന്നു. രോഗനിർണയം: {diagnosis}. ആകെ {count} കൺസൾട്ടേഷനുകൾ രേഖയിലുണ്ട്. പൂർണ്ണ വിശദാംശങ്ങൾ നിങ്ങളുടെ ഹെൽത്ത് റെക്കോർഡ് പേജിൽ കാണാം.',
    medicine:
      'നിങ്ങളുടെ ഇപ്പോഴത്തെ സജീവ മരുന്നുകൾ:\n{meds}\n\nഡോക്ടർ നിർദ്ദേശിച്ച പ്രകാരം മാത്രം മരുന്ന് കഴിക്കുക. ഡോക്ടറുമായി ആലോചിക്കാതെ മരുന്ന് നിർത്തരുത്.',
    appointment:
      'നിങ്ങളുടെ അടുത്ത ഫോളോ-അപ്പ് {followUp}-ന് {doctor}-മായി നിശ്ചയിച്ചിട്ടുണ്ട്. സന്ദർശനത്തിന് നിങ്ങളുടെ ഹെൽത്ത് ID QR കോഡ് കൊണ്ടുവരിക.',
    allergy:
      'നിങ്ങളുടെ രേഖപ്പെടുത്തിയ അലർജികൾ:\n{allergies}\n\nഏതെങ്കിലും ചികിത്സയ്ക്ക് മുമ്പ് ആരോഗ്യ പ്രവർത്തകരെ ഇവയെക്കുറിച്ച് അറിയിക്കുന്നത് ഉറപ്പാക്കുക.',
    fever:
      'നിങ്ങൾക്ക് പനി ഉണ്ടെങ്കിൽ: വിശ്രമിക്കുക, ധാരാളം ദ്രാവകങ്ങൾ കുടിക്കുക, ഡോക്ടർ നിർദ്ദേശിച്ച പ്രകാരം പാരസെറ്റാമോൾ കഴിക്കുക. പനി 3 ദിവസത്തിൽ കൂടുതൽ തുടരുകയോ വളരെ കൂടുതലാവുകയോ ചെയ്താൽ ഉടൻ ആരോഗ്യ കേന്ദ്രം സന്ദർശിക്കുക. നിങ്ങളുടെ ഡോക്ടർക്ക് നിങ്ങളുടെ ഹെൽത്ത് ID ഉപയോഗിച്ച് പൂർണ്ണ ചരിത്രം കാണാൻ കഴിയും.',
    translate:
      'നിങ്ങൾക്കും ഡോക്ടർക്കും ഇടയിൽ വിവർത്തനം ചെയ്യാൻ എനിക്ക് സഹായിക്കാനാകും. നിങ്ങളുടെ ഭാഷയിൽ ലക്ഷണങ്ങൾ ടൈപ്പ് ചെയ്യുക, ഡോക്ടർക്കായി ഞാൻ വിവർത്തനം ചെയ്ത് തരാം. ഉദാഹരണത്തിന്, "എനിക്ക് ഇന്നലെ മുതൽ പനിയുണ്ട്" എന്ന് പറയുക, ഞാൻ ഡോക്ടർക്ക് വിശദീകരിച്ച് തരാം.',
    findcare:
      'നിങ്ങളുടെ ഹെൽത്ത് ID ഉപയോഗിച്ച് സമീപത്തെ സർക്കാർ ആരോഗ്യ കേന്ദ്രങ്ങളും ആശുപത്രികളും കണ്ടെത്താനാകും. {district}-ന് സമീപമുള്ള സൗകര്യത്തിൽ പൊതു പരിശോധന, മാതൃ പരിചരണം, ലാബ് പരിശോധനകൾ തുടങ്ങിയ സേവനങ്ങൾ ലഭിക്കും. നിങ്ങൾ QR കോഡ് സ്കാൻ ചെയ്യുമ്പോൾ നിങ്ങളുടെ HealthSaathi രേഖകൾ സ്ഥാപനവുമായി പങ്കിടുന്നു.',
    greeting:
      'നമസ്കാരം! ഞാൻ HealthSaathi ആണ്, നിങ്ങളുടെ ബഹുഭാഷാ ആരോഗ്യ സഹായി. നിങ്ങളുടെ ആരോഗ്യ രേഖകൾ, മരുന്നുകൾ, അപ്പോയിന്റ്മെന്റുകൾ എന്നിവയിൽ ഞാൻ സഹായിക്കും. ഇന്ന് എങ്ങനെ സഹായിക്കട്ടെ?',
    fallback:
      'നിങ്ങൾ "{text}"-നെക്കുറിച്ച് ചോദിക്കുന്നതായി എനിക്ക് മനസ്സിലായി. നിങ്ങളുടെ ആരോഗ്യ രേഖകൾ, മരുന്നുകൾ, അപ്പോയിന്റ്മെന്റുകൾ, അലർജികൾ എന്നിവയിൽ സഹായിക്കാനോ ഡോക്ടർക്കായി ലക്ഷണങ്ങൾ വിവർത്തനം ചെയ്യാനോ എനിക്കാകും. നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?',
  },
};

// Quick-action button labels, keyed by the quick-action id from demoData.
const quickActionLabels: Record<string, Record<ChatLang, string>> = {
  record: { en: 'My Health Record', hi: 'मेरा हेल्थ रिकॉर्ड', ml: 'എന്റെ ഹെൽത്ത് റെക്കോർഡ്' },
  medicines: { en: 'My Medicines', hi: 'मेरी दवाइयाँ', ml: 'എന്റെ മരുന്നുകൾ' },
  appointments: { en: 'My Appointments', hi: 'मेरे अपॉइंटमेंट', ml: 'എന്റെ അപ്പോയിന്റ്മെന്റുകൾ' },
  findcare: { en: 'Find Healthcare', hi: 'स्वास्थ्य केंद्र खोजें', ml: 'ആരോഗ്യ കേന്ദ്രം കണ്ടെത്തുക' },
  translate: { en: 'Translate for Doctor', hi: 'डॉक्टर के लिए अनुवाद', ml: 'ഡോക്ടർക്കായി വിവർത്തനം' },
};

// Other small UI strings that follow the selected language.
const uiText: Record<ChatLang, { subtitle: string; placeholder: string; disclaimer: string }> = {
  en: {
    subtitle: 'Multilingual healthcare assistant',
    placeholder: 'Type your message…',
    disclaimer: 'For emergencies, call 108. HealthSaathi does not diagnose diseases.',
  },
  hi: {
    subtitle: 'बहुभाषी स्वास्थ्य सहायक',
    placeholder: 'अपना संदेश लिखें…',
    disclaimer: 'आपातकालीन स्थिति में, 108 पर कॉल करें। HealthSaathi बीमारियों का निदान नहीं करता है।',
  },
  ml: {
    subtitle: 'ബഹുഭാഷാ ആരോഗ്യ സഹായി',
    placeholder: 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക…',
    disclaimer: 'അടിയന്തര സാഹചര്യങ്ങളിൽ, 108-ൽ വിളിക്കുക. HealthSaathi രോഗങ്ങൾ നിർണയിക്കുന്നില്ല.',
  },
};

// Map quick-action ids (demoData) to their reply type.
const INTENT_TO_KEY: Record<string, ReplyKey> = {
  record: 'record',
  medicines: 'medicine',
  appointments: 'appointment',
  findcare: 'findcare',
  translate: 'translate',
};

// Keyword rules used when the user types freely (checked in priority order).
const KEYWORD_RULES: Array<[ReplyKey, string[]]> = [
  ['record', ['record', 'medical', 'health record', 'रिकॉर्ड', 'രേഖ']],
  ['medicine', ['medicine', 'medication', 'dawa', 'दवा', 'മരുന്ന്']],
  ['appointment', ['appointment', 'follow-up', 'follow up', 'अपॉइंटमेंट', 'അപ്പോയിന്റ്മെന്റ്']],
  ['allergy', ['allerg', 'एलर्जी', 'അലർജി']],
  ['fever', ['fever', 'bukhar', 'बुखार', 'പനി']],
  ['translate', ['translate', 'doctor', 'अनुवाद', 'വിവർത്തനം']],
  ['findcare', ['find', 'healthcare', 'health centre', 'health center', 'hospital', 'अस्पताल', 'ആശുപത്രി']],
  ['greeting', ['hello', 'hey', 'namaste', 'नमस्ते', 'നമസ്കാരം']],
];

function resolveIntent(text: string, intent?: string): ReplyKey {
  if (intent && INTENT_TO_KEY[intent]) return INTENT_TO_KEY[intent];
  const t = text.toLowerCase();
  for (const [key, words] of KEYWORD_RULES) {
    if (words.some((w) => t.includes(w))) return key;
  }
  if (t === 'hi' || t.startsWith('hi ')) return 'greeting';
  return 'fallback';
}

// Build the live patient data that gets substituted into a reply template.
function buildData(key: ReplyKey, text: string): Record<string, string> {
  const p = primaryPatient;
  switch (key) {
    case 'record': {
      const c = p.consultations[0];
      return {
        date: c?.date || '—',
        hospital: c?.hospital || '—',
        diagnosis: c?.diagnosis || '—',
        count: String(p.consultations.length),
      };
    }
    case 'medicine': {
      const active = p.medications.filter((m) => m.status === 'active');
      return {
        meds: active.length ? active.map((m) => `• ${m.name} (${m.dosage}) — ${m.frequency}`).join('\n') : '—',
      };
    }
    case 'appointment': {
      const fu = p.consultations.find((c) => c.followUpDate);
      return { followUp: fu?.followUpDate || '—', doctor: fu?.doctor || '—' };
    }
    case 'allergy': {
      return {
        allergies: p.allergies.length ? p.allergies.map((a) => `• ${a.substance} (${a.severity})`).join('\n') : '—',
      };
    }
    case 'findcare':
      return { district: p.currentDistrict };
    case 'fallback':
      return { text };
    default:
      return {};
  }
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}

// Rule-based response generator. `lang` is the effective language already
// resolved by the caller (selected language or the script of the message).
function generateResponse(text: string, lang: ChatLang, intent?: string): string {
  const key = resolveIntent(text, intent);
  return fill(replies[lang][key], buildData(key, text));
}

interface HealthSaathiProviderProps {
  children: ReactNode;
}

export function HealthSaathiProvider({ children }: HealthSaathiProviderProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {children}
      <HealthSaathiWidget open={open} onToggle={() => setOpen(!open)} />
    </>
  );
}

interface WidgetProps {
  open: boolean;
  onToggle: () => void;
}

function HealthSaathiWidget({ open, onToggle }: WidgetProps) {
  const [lang, setLang] = useState<ChatLang>('en');
  const langRef = useRef<ChatLang>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      text: replies.en.greeting,
      timestamp: new Date().toISOString(),
      lang: 'en',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Changing the language updates the stored greeting so the next greeting
  // text (and all new responses) use the newly selected language.
  const handleLanguageChange = (l: ChatLang) => {
    langRef.current = l;
    setLang(l);
    setMessages((m) =>
      m.map((msg) => (msg.id === 'init' ? { ...msg, text: replies[l].greeting, lang: l } : msg))
    );
  };

  const send = (text: string, intent?: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
      lang,
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      // Answer in the message's own language when it was typed in Hindi or
      // Malayalam; otherwise follow the currently selected language.
      const replyLang = detectLang(text) ?? langRef.current;
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: generateResponse(text, replyLang, intent),
        timestamp: new Date().toISOString(),
        lang: replyLang,
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={onToggle}
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-secondary-600 to-secondary-700 text-white shadow-card-lg transition-all hover:scale-105 active:scale-95 animate-fade-in"
          aria-label="Open HealthSaathi"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
            AI
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-0 right-0 z-40 flex h-[100vh] w-full flex-col border-l border-ink-200 bg-white shadow-card-lg sm:bottom-5 sm:right-5 sm:h-[600px] sm:max-h-[85vh] sm:w-[400px] sm:rounded-2xl sm:border animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-secondary-700 to-secondary-600 px-5 py-4 text-white sm:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">HealthSaathi</h3>
                <p className="text-xs text-secondary-100">{uiText[lang].subtitle}</p>
              </div>
            </div>
            <button onClick={onToggle} className="rounded-lg p-1.5 hover:bg-white/15" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-1 border-b border-ink-200 bg-ink-50 px-3 py-2">
            <Languages className="h-4 w-4 text-ink-400 mr-1" />
            {(Object.keys(langLabels) as ChatLang[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  lang === l ? 'bg-secondary-600 text-white' : 'text-ink-600 hover:bg-ink-200'
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-ink-200 bg-white px-3 py-2.5">
            {chatQuickActions.map((qa) => (
              <button
                key={qa.id}
                onClick={() => send(quickActionLabels[qa.id][lang], qa.id)}
                className="shrink-0 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-700 hover:border-secondary-300 hover:bg-secondary-50 hover:text-secondary-700 transition-colors"
              >
                {quickActionLabels[qa.id][lang]}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-ink-50/30 px-4 py-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              >
                <div className={`flex max-w-[85%] gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'}`}>
                    {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily:
                          "'Inter', 'Nirmala UI', 'Malayalam MN', 'Kohinoor Malayalam', 'Noto Sans Malayalam', system-ui, sans-serif",
                      }}
                      className={`whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-primary-700 text-white rounded-tr-sm'
                          : 'bg-white border border-ink-200 text-ink-800 rounded-tl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                    <p className={`mt-1 text-[10px] text-ink-400 ${m.role === 'user' ? 'text-right' : ''}`}>
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-100 text-secondary-700">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-ink-200 bg-white px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-ink-300 animate-pulse" />
                    <span className="h-2 w-2 rounded-full bg-ink-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="h-2 w-2 rounded-full bg-ink-300 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Disclaimer */}
          <div className="border-t border-ink-200 bg-warning-50/50 px-4 py-1.5">
            <p className="text-[10px] text-warning-700 text-center">{uiText[lang].disclaimer}</p>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-ink-200 bg-white px-3 py-3 sm:rounded-b-2xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder={uiText[lang].placeholder}
              className="flex-1 rounded-lg border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/20"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-600 text-white transition-colors hover:bg-secondary-700 disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

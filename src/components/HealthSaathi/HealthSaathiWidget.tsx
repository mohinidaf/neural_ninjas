import { useState, useRef, useEffect, type ReactNode } from 'react';
import { MessageCircle, X, Send, Languages, Bot, User } from 'lucide-react';
import { chatQuickActions, primaryPatient } from '@/data/demoData';
import type { ChatMessage, ChatLang } from '@/types';

const langLabels: Record<ChatLang, string> = {
  en: 'English',
  hi: 'हिंदी',
  ml: 'മലയാളം',
};

// Simple rule-based responses for the demo
function generateResponse(text: string, lang: ChatLang): string {
  const t = text.toLowerCase();
  const p = primaryPatient;

  const prefixes: Record<ChatLang, string[]> = {
    en: [],
    hi: ['[हिंदी में] '],
    ml: ['[മലയാളത്തിൽ] '],
  };
  const pre = prefixes[lang].join('');

  // Quick action or keyword matching
  if (t.includes('record') || t.includes('medical') || t.includes('health record') || t.includes('रिकॉर्ड') || t.includes('രേഖ')) {
    return `${pre}Your latest health record shows a consultation on ${p.consultations[0]?.date} at ${p.consultations[0]?.hospital}. Diagnosis: ${p.consultations[0]?.diagnosis}. You have ${p.consultations.length} total consultations on file. You can view full details on your Health Record page.`;
  }
  if (t.includes('medicine') || t.includes('medication') || t.includes('dawa') || t.includes('दवा') || t.includes('മരുന്ന്')) {
    const active = p.medications.filter(m => m.status === 'active');
    const list = active.map(m => `• ${m.name} (${m.dosage}) — ${m.frequency}`).join('\n');
    return `${pre}Your current active medications:\n${list}\n\nPlease take medicines as prescribed. Do not stop without consulting your doctor.`;
  }
  if (t.includes('appointment') || t.includes('follow') || t.includes('appointment') || t.includes('तारीख') || t.includes('അപ്പോയിന്റ്മെന്റ്')) {
    const fu = p.consultations.find(c => c.followUpDate);
    return `${pre}Your next follow-up is scheduled for ${fu?.followUpDate || 'not scheduled'} with ${fu?.doctor || 'your doctor'}. Please bring your Health ID QR code to the visit.`;
  }
  if (t.includes('allerg') || t.includes('एलर्जी') || t.includes('അലർജി')) {
    const list = p.allergies.map(a => `• ${a.substance} (${a.severity})`).join('\n');
    return `${pre}Your recorded allergies:\n${list}\n\nMake sure to inform healthcare providers about these before any treatment.`;
  }
  if (t.includes('fever') || t.includes('bukhar') || t.includes('बुखार') || t.includes('പനി')) {
    return `${pre}If you have a fever: rest, drink plenty of fluids, and take Paracetamol as prescribed. If fever persists beyond 3 days or is very high, please visit a health centre immediately. Your doctor can see your full history using your Health ID.`;
  }
  if (t.includes('translate') || t.includes('doctor') || t.includes('translate')) {
    return `${pre}I can help translate between you and your doctor. Type your symptoms in your language and I'll translate them. For example, say "Mujhe kal se bukhar hai" and I'll explain it in Malayalam for the doctor.`;
  }
  if (t.includes('hello') || t.includes('hi') || t.includes('namaste') || t.includes('नमस्ते') || t.includes('നമസ്കാരം')) {
    return `${pre}Hello! I'm HealthSaathi, your multilingual healthcare assistant. I can help you understand your medical records, medicines, and appointments. How can I help you today?`;
  }

  return `${pre}I understand you're asking about "${text}". I can help with your health records, medications, appointments, allergies, or translate symptoms for your doctor. What would you like to know?`;
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      text: 'Hello! I\'m HealthSaathi, your multilingual healthcare assistant. I can help you with your health records, medicines, and appointments. How can I help you today?',
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

  const send = (text: string) => {
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
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: generateResponse(text, lang),
        timestamp: new Date().toISOString(),
        lang,
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
                <p className="text-xs text-secondary-100">Multilingual healthcare assistant</p>
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
                onClick={() => setLang(l)}
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
                onClick={() => send(qa.label)}
                className="shrink-0 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-700 hover:border-secondary-300 hover:bg-secondary-50 hover:text-secondary-700 transition-colors"
              >
                {qa.label}
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
            <p className="text-[10px] text-warning-700 text-center">
              For emergencies, call 108. HealthSaathi does not diagnose diseases.
            </p>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-ink-200 bg-white px-3 py-3 sm:rounded-b-2xl">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Type your message…"
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

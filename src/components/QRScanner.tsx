import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (err: any) => void;
  facingMode?: 'environment' | 'user';
}

export function QRScanner({ onScan, onError, facingMode = 'environment' }: QRScannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const onScanRef = useRef(onScan);
  const onErrorRef = useRef(onError);
  const [running, setRunning] = useState(true);
  const elementId = useRef(`html5qr-scanner-${Math.random().toString(36).slice(2, 9)}`);

  // keep latest callbacks in refs to avoid re-instantiating scanner
  onScanRef.current = onScan;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!containerRef.current) return;
    const el = document.createElement('div');
    el.id = elementId.current;
    el.style.width = '100%';
    el.style.maxWidth = '640px';
    containerRef.current.appendChild(el);

    const config = { fps: 10, qrbox: { width: 280, height: 280 } };
    html5QrcodeRef.current = new Html5Qrcode(el.id, { verbose: false });

    const start = async () => {
      try {
        await html5QrcodeRef.current?.start({ facingMode }, config,
          (decodedText) => { onScanRef.current?.(decodedText); },
          (errorMessage) => { onErrorRef.current?.(errorMessage); }
        );
        setRunning(true);
      } catch (e) {
        onErrorRef.current?.(e);
        setRunning(false);
      }
    };

    start();

    return () => {
      // cleanup scanner and DOM node
      (async () => {
        try {
          await html5QrcodeRef.current?.stop();
        } catch {}
        try { html5QrcodeRef.current?.clear(); } catch {}
        try { if (containerRef.current && el.parentNode) containerRef.current.removeChild(el); } catch {}
      })();
    };
    // run only once on mount
  }, []);

  const stop = async () => {
    try {
      await html5QrcodeRef.current?.stop();
      await html5QrcodeRef.current?.clear();
    } catch (e) {
      // ignore
    }
    setRunning(false);
  };

  const restart = async () => {
    try {
      const config = { fps: 10, qrbox: { width: 280, height: 280 } };
      await html5QrcodeRef.current?.start({ facingMode }, config,
        (decodedText) => { onScanRef.current?.(decodedText); },
        (errorMessage) => { onErrorRef.current?.(errorMessage); }
      );
      setRunning(true);
    } catch (e) {
      onErrorRef.current?.(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={containerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} />
      <div style={{ width: 280, height: 280, position: 'relative', pointerEvents: 'none' }}>
        <div style={{ border: '3px solid rgba(255,255,255,0.6)', boxSizing: 'border-box', width: '100%', height: '100%', borderRadius: 8, position: 'absolute', top: 0, left: 0 }} />
      </div>
      <div className="flex gap-2">
        {running ? (
          <button onClick={stop} className="rounded-lg border px-3 py-1 text-sm">Stop</button>
        ) : (
          <button onClick={restart} className="rounded-lg border px-3 py-1 text-sm">Start</button>
        )}
      </div>
    </div>
  );
}

export default QRScanner;

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { QRCodeSVG } from 'qrcode.react';
import { useWorkerProfile } from '@/contexts/WorkerProfileContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface QRCodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToDashboard?: () => void;
}

export function QRCodeGeneratorModal({ isOpen, onClose, onProceedToDashboard }: QRCodeGeneratorModalProps) {
  const { qrPayload, profile } = useWorkerProfile();

  return (
    <Modal open={isOpen} onClose={onClose} title="" size="md">
      <div className="flex flex-col items-center gap-6 py-4">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <QRCodeSVG value={qrPayload} size={200} bgColor="#ffffff" fgColor="#0b84ff" level="M" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-success-600">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-sm font-bold text-ink-900"> </span>
          </div>
          <div className="text-xs text-ink-500"> </div>
        </div>

        <div className="w-full flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => { onProceedToDashboard?.(); }} iconRight={<ArrowRight className="h-4 w-4" />}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default QRCodeGeneratorModal;

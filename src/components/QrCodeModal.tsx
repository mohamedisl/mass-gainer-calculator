import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Language, SupplementProfile } from '../types';
import { translations } from '../data/translations';
import { X, QrCode, Download, Copy, Check, Printer } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  supplementProfile: SupplementProfile;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  lang,
  supplementProfile,
}) => {
  const t = translations[lang];
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nutrifit.app';

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(currentUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#007979',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error(err));
    }
  }, [isOpen, currentUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const cleanName = (supplementProfile.productName || 'Nutrition-Calculator').replace(/[^a-zA-Z0-9]/g, '-');
    const link = document.createElement('a');
    link.download = `${cleanName}-QR.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto no-print"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6 text-right"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1 pl-6">
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#007979] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
            <QrCode className="w-3.5 h-3.5 text-[#007979]" />
            <span>{t.qrGeneratorBtn}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {t.qrModalTitle}
          </h3>
          <p className="text-xs text-slate-500">
            {t.qrModalDesc}
          </p>
        </div>

        {/* Tub Label Preview Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-4 printable-card relative">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {t.heroTitle}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.heroSubtitle}
            </p>
          </div>

          {/* QR Code Canvas image */}
          <div className="bg-white p-3 rounded-2xl inline-block shadow-md border border-slate-200 my-1">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Product QR Code" className="w-40 h-40 mx-auto" />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center text-slate-400 text-xs">
                Generating QR...
              </div>
            )}
          </div>

          <p className="text-xs font-bold text-[#007979] font-mono">
            {currentUrl.replace('https://', '')}
          </p>
        </div>

        {/* Action Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-slate-600 w-full font-mono outline-none px-2 text-ellipsis text-left"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-[#007979] hover:bg-[#006666] text-white font-bold shrink-0 transition flex items-center gap-1 text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : t.copyLink}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadQr}
              className="py-2.5 px-4 rounded-xl bg-[#007979] hover:bg-[#006666] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadQr}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#007979]" />
              <span>{t.printReport}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

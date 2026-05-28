import { useEffect, useState } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
type UTMKey = typeof UTM_KEYS[number];
export type UTMData = Record<UTMKey, string>;

const SESSION_KEY = 'borotec_utms';
const EMPTY_UTMS: UTMData = { utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' };

function readFromSession(): UTMData | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function sessionKeyExists(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== null;
  } catch {
    return false;
  }
}

function writeToSession(data: UTMData) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch { /* sessionStorage indisponível */ }
}

export function useUTMCapture(): UTMData {
  const [utms, setUtms] = useState<UTMData>(() => readFromSession() ?? EMPTY_UTMS);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Partial<UTMData> = {};
    let hasUtm = false;

    UTM_KEYS.forEach((key) => {
      const val = params.get(key);
      if (val) {
        fromUrl[key] = val;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      const merged: UTMData = {
        utm_source: fromUrl.utm_source ?? '',
        utm_medium: fromUrl.utm_medium ?? '',
        utm_campaign: fromUrl.utm_campaign ?? '',
        utm_term: fromUrl.utm_term ?? '',
        utm_content: fromUrl.utm_content ?? '',
      };
      writeToSession(merged);
      setUtms(merged);
      return;
    }

    const stored = readFromSession();
    if (stored) {
      setUtms(stored);
      return;
    }

    // Só escreve "direto" se o sessionStorage estiver completamente vazio
    if (sessionKeyExists()) return;
    const direct: UTMData = { utm_source: 'direto', utm_medium: 'direto', utm_campaign: '', utm_term: '', utm_content: '' };
    writeToSession(direct);
    setUtms(direct);
  }, []);

  return utms;
}

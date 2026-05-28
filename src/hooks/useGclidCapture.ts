import { useEffect, useState } from 'react';

const SESSION_KEY = 'borotec_gclid';

export function useGclidCapture(): string {
  const [gclid, setGclid] = useState<string>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get('gclid') || '';
      if (fromUrl) {
        sessionStorage.setItem(SESSION_KEY, fromUrl);
        setGclid(fromUrl);
      } else {
        setGclid(sessionStorage.getItem(SESSION_KEY) || '');
      }
    } catch { /* sessionStorage indisponível */ }
  }, []);

  return gclid;
}

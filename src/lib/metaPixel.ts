// Meta Pixel Tracking Helper
import { StoreSettings } from '../types';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

let currentPixelId: string | null = null;
let activeTestEventCode: string | null = null;

export const initMetaPixel = (settings?: StoreSettings) => {
  if (typeof window === 'undefined') return;

  const pixelId = settings?.metaPixelId?.trim();
  // If pixel ID exists, default enabled to true unless explicitly set to false
  const enabled = settings?.metaPixelEnabled !== false && !!pixelId;
  const testCode = settings?.testEventCode?.trim() || null;

  activeTestEventCode = testCode;

  if (!pixelId || !enabled) {
    return;
  }

  if (currentPixelId === pixelId && window.fbq) {
    return;
  }

  // Inject Meta Pixel script standard loader
  if (!window.fbq) {
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      if (s && s.parentNode) {
        s.parentNode.insertBefore(t, s);
      } else {
        document.head.appendChild(t);
      }
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );
  }

  try {
    window.fbq('init', pixelId);
    currentPixelId = pixelId;

    const pageViewParams: Record<string, any> = {};
    if (testCode) {
      pageViewParams.test_event_code = testCode;
    }

    window.fbq('track', 'PageView', pageViewParams);
    console.log(`[Meta Pixel] Initialized successfully for ID: ${pixelId}${testCode ? ` (Test Code: ${testCode})` : ''}`);
  } catch (err) {
    console.warn('[Meta Pixel] Initialization error:', err);
  }
};

export const trackMetaPixelEvent = (
  eventName: string,
  eventData: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined' && window.fbq && currentPixelId) {
    try {
      const payload = { ...eventData };
      if (activeTestEventCode) {
        payload.test_event_code = activeTestEventCode;
      }
      window.fbq('track', eventName, payload);
      console.log(`[Meta Pixel Track] Event '${eventName}':`, payload);
    } catch (err) {
      console.warn(`[Meta Pixel Track] Error for '${eventName}':`, err);
    }
  }
};


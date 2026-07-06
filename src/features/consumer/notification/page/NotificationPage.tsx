'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import { MOCK_NOTIFICATION_PREFS, NOTIFICATION_GROUPS } from '../constants';
import NotificationsSkeleton from '../components/NotificationsSkeleton';
import type { NotificationPrefs } from '../types';

const SIMULATED_DELAY_MS = 500;

export default function Notifications() {
  const [prefs, setPrefs] = useState<NotificationPrefs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setPrefs(MOCK_NOTIFICATION_PREFS);
      setLoading(false);
    }, SIMULATED_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const toggle = (k: keyof NotificationPrefs) => {
    if (!prefs) return;
    setPrefs((prev) => (prev ? { ...prev, [k]: !prev[k] } : prev));
    setTimeout(() => toast.success('Preference saved'), 300);
  };

  if (loading || !prefs) return <NotificationsSkeleton />;

  return (
    <main>
      <p className="text-[13px] text-[#9CA3AF] mb-6 flex items-center gap-1.5">
        <Bell size={14} /> Pick how you&apos;d like JompShop to reach you.
      </p>

      <div className="space-y-4 max-w-2xl">
        {NOTIFICATION_GROUPS.map((g) => (
          <div
            key={g.title}
            className="helix-card p-5"
            data-testid={`grp-${g.title.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <div className="mb-1 font-semibold text-[14px]">{g.title}</div>
            <div className="text-[12px] text-[#9CA3AF] mb-4">{g.body}</div>
            <div className="flex flex-wrap gap-3">
              {g.keys.map(({ k, l }) => (
                <button
                  key={k}
                  onClick={() => toggle(k)}
                  data-testid={`toggle-${k}`}
                  className={`px-4 py-2 rounded-full text-[12px] font-semibold border transition-all ${
                    prefs[k]
                      ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
                      : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'
                  }`}
                >
                  {l} · {prefs[k] ? 'ON' : 'OFF'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

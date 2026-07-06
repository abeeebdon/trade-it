import { ShieldCheck } from 'lucide-react';
import type { UserType } from '@/types';

interface ProfileAvatarProps {
  user: UserType;
}

function getInitials(name: string): string {
  return (
    name
      .split(' ')
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || '🙂'
  );
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const initials = getInitials(user.fullName);

  return (
    <div className="helix-card p-6 text-center">
      <div
        className="w-20 h-20 rounded-full mx-auto flex items-center justify-center font-bold text-2xl"
        style={{
          background: 'linear-gradient(135deg,#EFA005,#7B2CBF)',
          color: '#1E0038',
        }}
      >
        {initials}
      </div>
      <div className="helix-h3 mt-4">{user.fullName}</div>
      <div className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider mt-1">
        {user.role} · Verified
      </div>
      <div className="mt-4 pt-4 border-t border-[#1A7A6E]/15 text-[12px] text-[#9CA3AF] flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-[#1A6B4A]" /> Signed in via Email
      </div>
    </div>
  );
}

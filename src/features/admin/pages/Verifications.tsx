'use client';
import { useMemo } from 'react';
import DisputeCardSkeleton from '../components/DisputeCardSkeleton';
import { useGetVerificationQueue } from '../hooks/useGetAdminVerifications';
import { VerificationResp } from '../types/verifications';
import VerificationCard from '../components/VerificationCard';

export default function AdminVerifications() {
  const { isPending, data } = useGetVerificationQueue();
  const verificationLists: VerificationResp[] = useMemo(() => {
    return data ? data.items : [];
  }, [data]);
  console.log(data);

  return (
    <main>
      {isPending ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <DisputeCardSkeleton key={i} />
          ))}
        </div>
      ) : verificationLists.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No pending verifications.
        </div>
      ) : (
        <div className="space-y-4">
          {verificationLists.map((b) => (
            <VerificationCard key={b.id} b={b} />
          ))}
        </div>
      )}
    </main>
  );
}

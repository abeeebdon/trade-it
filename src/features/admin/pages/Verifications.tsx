'use client';
import { useEffect, useMemo, useState } from 'react';
import { VerificationItem } from '../types/admin';
import { sampleVerifications } from '../components/data';
import DisputeCardSkeleton from '../components/DisputeCardSkeleton';
import { useGetVerificationQueue } from '../hooks/useGetAdminVerifications';
import { VerificationResp } from '../types/verifications';
import VerificationCard from '../components/VerificationCard';

export default function AdminVerifications() {
  const [items, setItems] = useState<VerificationItem[]>(sampleVerifications);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(sampleVerifications);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  //   const load = async () => {
  //     const { data } = await api.get('/admin/verifications');
  //     setItems(data);
  //   };
  //   useEffect(() => {
  //     load();
  //   }, []);

  //   const decide = async (bid, decision) => {
  //     try {
  //       await api.post(`/admin/verifications/${bid}/decide`, { decision, note });
  //       toast.success(`Marked ${decision}`);
  //       setNote('');
  //       load();
  //     } catch (err) {
  //       toast.error(err.response?.data?.detail || 'Failed');
  //     }
  //   };
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

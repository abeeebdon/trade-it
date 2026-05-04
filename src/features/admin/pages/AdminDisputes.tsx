'use client';
import { useEffect, useState } from 'react';
import { Dispute } from '../types/admin';
import { disputes } from '../components/data';
import DisputeCard from '../components/DisputeCard';
import DisputeCardSkeleton from '../components/DisputeCardSkeleton';

export default function AdminDisputes() {
  const [items, setItems] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  // const load = async () => {
  //   const { data } = await api.get('/admin/disputes');
  //   setItems(data);
  // };
  // useEffect(() => { load(); }, []);
  // const resolve = async (id, status) => {
  //   try {
  //     await api.post(`/admin/disputes/${id}/resolve`, { status, resolution: resolution[id] || "" });
  //     toast.success(`Marked ${status}`); load();
  //   } catch (err) { toast.error(err.response?.data?.detail || "Failed"); }
  // };
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(disputes);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <main>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <DisputeCardSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="helix-card p-12 text-center text-[#9CA3AF]">
          No disputes at this time.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((d, i) => (
            <DisputeCard d={d} key={i} />
          ))}
        </div>
      )}
    </main>
  );
}

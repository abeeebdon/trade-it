'use client';
import DTCDetails from '@/features/exporter/sell/pages/DTCDetailsCard';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  return <DTCDetails id={id as string} />;
}

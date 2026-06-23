'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Download, ToggleLeft, ToggleRight } from 'lucide-react';

import Pagination from '@/components/ui/Pagination';
import StatCard from './StatCard';
import {
  useGetWaitlist,
  useGetWaitlistCommand,
  useGetWaitlistCSV,
} from '../admin/hooks/useGetAdminDashboard';
import { PaginationType, WaitlistOverview, WaitlistTypeData } from './types';
import { formatDateToMM } from '@/lib/func';
import SelectDropDown from '@/components/SelectDropDown';

type WaitlistType = 'hero' | 'exporter' | 'buyer';

interface WaitlistItem {
  id: string | number;
  email: string;
  type: WaitlistType | string;
  created_at: string;
  referer?: string | null;
}

interface WaitlistResponse {
  items: WaitlistItem[];
  total: number;
  by_type: {
    hero?: number;
    exporter?: number;
    buyer?: number;
    [key: string]: number | undefined;
  };
}

type FilterType = '' | 'hero' | 'exporter' | 'retailer' | 'consumer';
type ModeType = 'live' | 'coming_soon';

const filters: [FilterType, string][] = [
  ['', 'All'],
  ['exporter', 'Exporters'],
  ['retailer', 'Retailers'],
  ['consumer', 'Consumers'],
];
export default function AdminWaitlist() {
  const [pageNumValue, setPAgeNumValue] = useState<number>(10);

  const [mode, setMode] = useState<ModeType>('coming_soon');
  const [filter, setFilter] = useState<FilterType>('');
  const [page, setPage] = useState<number>(1);
  const { data: waitlistCommand, isPending: waitlistCommandPending } =
    useGetWaitlistCommand();
  const waitlistOverview: WaitlistOverview = useMemo(() => {
    return waitlistCommand ? waitlistCommand : ({} as WaitlistOverview);
  }, [waitlistCommand]);
  const { data: waitlist, isPending } = useGetWaitlist({
    filter,
    pageNumber: page,
    pageSize: pageNumValue,
  });
  const waitlists: WaitlistTypeData[] = useMemo(() => {
    return waitlist ? waitlist.data : [];
  }, [waitlist]);
  const metrics: PaginationType = useMemo(() => {
    return waitlist
      ? {
          pageNumber: waitlist.pageNumber,
          pageSize: waitlist.pageSize,
          totalRecords: waitlist.totalRecords,
          totalPages: waitlist.totalPages,
        }
      : ({} as PaginationType);
  }, [waitlist]);
  const { mutate, isPending: isMutating } = useGetWaitlistCSV();

  const handleExport = () => {
    mutate(filter, {
      onSuccess: (csvData) => {
        const blob = new Blob([csvData], {
          type: 'text/csv;charset=utf-8;',
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'waitlist.csv';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
    });
  };
  return (
    <main>
      <header className="flex mb-4 justify-end">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="helix-btn-secondary">
            Preview site →
          </Link>

          <button
            onClick={handleExport}
            className="helix-btn-secondary inline-flex items-center gap-1.5"
            data-testid="export-csv"
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </header>

      {/* Mode Toggle */}
      <div className="helix-card p-6 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="max-w-xl">
            <p className="helix-label">Site mode</p>

            <div className="flex items-center gap-3 mt-2">
              <span
                className={`helix-h3 ${
                  mode === 'live' ? 'text-[#C9922A]' : ''
                }`}
              >
                {mode === 'live' ? 'LIVE marketplace' : 'COMING SOON landing'}
              </span>

              <span
                className={`helix-status ${
                  mode === 'live' ? 'helix-status-ok' : 'helix-status-gold'
                }`}
              >
                {mode}
              </span>
            </div>

            <p className="text-[13px] text-[#9CA3AF] mt-3 leading-relaxed">
              When in <b>COMING SOON</b>, the public sees the waitlist landing
              at <span className="font-mono">/</span>. Admins (you) still see
              the full marketplace by signing in. Flip to <b>LIVE</b> to make
              the marketplace public.
            </p>
          </div>

          <button
            // onClick={toggleMode}
            className="helix-btn-primary inline-flex items-center gap-2 text-sm"
            data-testid="toggle-mode"
          >
            {mode === 'live' ? (
              <>
                <ToggleRight size={18} />
                Switch to COMING SOON
              </>
            ) : (
              <>
                <ToggleLeft size={18} />
                Go LIVE
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total signups"
          n={waitlistOverview?.totalSignups ?? ''}
        />
        <StatCard
          label={
            waitlistOverview?.customerTypes?.find(
              (d) => d.customerType.toLowerCase() === 'retailer',
            )?.customerType ?? ''
          }
          n={
            waitlistOverview?.customerTypes?.find(
              (d) => d.customerType.toLowerCase() === 'retailer',
            )?.count ?? 0
          }
        />
        <StatCard label="Exporters" n={waitlistOverview.exporters ?? ''} />
        <StatCard label="US Buyers" n={waitlistOverview.usBuyers ?? ''} />
      </div>

      {/* Filters + Table */}
      <div className="helix-card">
        <div className="px-5 py-4 border-b border-[#1A7A6E]/20 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            {filters.map(([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  setPage(1);
                  setFilter(value);
                }}
                className={`px-3 py-1.5 rounded-full text-[12px] border ${
                  filter === value
                    ? 'bg-[#C9922A] text-[#0A1628] border-[#C9922A]'
                    : 'border-[#1A7A6E]/40 text-[#9CA3AF] hover:border-[#1A7A6E]'
                }`}
                data-testid={`filter-${value || 'all'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-end flex-col">
            <p>Total Records: {metrics.totalRecords}</p>
            <p className="text-[12px] text-[#9CA3AF] font-mono">
              {waitlists.length} shown
            </p>
          </div>
        </div>

        {isPending ? (
          <div className="p-10 text-[#9CA3AF] text-center">Loading…</div>
        ) : waitlists.length === 0 ? (
          <div className="p-10 text-[#9CA3AF] text-center">No signups yet.</div>
        ) : (
          <section className=" overflow-auto">
            <table className="helix-table w-full">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Source</th>
                </tr>
              </thead>

              <tbody>
                {waitlists.map((row) => (
                  <tr key={row.id} data-testid={`row-${row.id}`}>
                    <td className="font-mono text-[13px]">{row.fullName}</td>
                    <td className="font-mono text-[13px]">{row.email}</td>

                    <td className="uppercase text-[11px] font-mono tracking-wider">
                      {row.customerType ?? '-'}
                    </td>

                    <td className="text-[11px] text-[#9CA3AF] font-mono">
                      {formatDateToMM(row.createdAt)}
                    </td>

                    <td className="text-[11px] text-[#9CA3AF] truncate max-w-70">
                      {row.source || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <article className="flex justify-between gap-4 px-4 md:px-6 items-end pb-3 ">
              <Pagination
                page={metrics.pageNumber}
                totalPages={metrics.totalPages}
                onChange={setPage}
              />
              <SelectDropDown
                pageNum={pageNumValue}
                setPageNum={setPAgeNumValue}
              />
            </article>
          </section>
        )}
      </div>
    </main>
  );
}

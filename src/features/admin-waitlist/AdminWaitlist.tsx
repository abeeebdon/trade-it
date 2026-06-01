'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { Download, Folder, ToggleLeft, ToggleRight } from 'lucide-react';
import { toast } from 'sonner';

import Pagination from '@/components/ui/Pagination';
import api from '@/configs/api-config';
import { paginate } from '@/lib/utils';
import StatCard from './StatCard';

const PER_PAGE = 20;

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

interface PlatformModeResponse {
  mode: 'live' | 'coming_soon';
}

interface ErrorResponse {
  detail?: string;
}

type FilterType = '' | 'hero' | 'exporter' | 'buyer';
type ModeType = 'live' | 'coming_soon';

export default function AdminWaitlist() {
  const [data, setData] = useState<WaitlistResponse>({
    items: [],
    total: 0,
    by_type: {},
  });

  const [mode, setMode] = useState<ModeType>('coming_soon');
  const [filter, setFilter] = useState<FilterType>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const load = async (): Promise<void> => {
    try {
      setLoading(true);

      const params = filter ? { type: filter } : {};

      const [waitlistRes, modeRes] = await Promise.all([
        api.get<WaitlistResponse>('/admin/waitlist', {
          params,
        }),
        api.get<PlatformModeResponse>('/platform/mode'),
      ]);

      setData(waitlistRes.data);
      setMode(modeRes.data.mode);
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      toast.error(err.response?.data?.detail || 'Failed to load waitlist data');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   load();
  // }, [filter]);

  // useEffect(() => {
  //   setPage(1);
  // }, [filter]);

  const toggleMode = async (): Promise<void> => {
    const next: ModeType = mode === 'live' ? 'coming_soon' : 'live';

    const confirmed = window.confirm(
      `Switch site to ${
        next === 'live' ? 'LIVE marketplace' : 'COMING SOON landing page'
      }?\n\nThis affects what the public sees on /`,
    );

    if (!confirmed) return;

    try {
      const { data } = await api.patch<PlatformModeResponse>(
        '/admin/platform/mode',
        { mode: next },
      );

      setMode(data.mode);

      toast.success(
        `Site mode → ${
          data.mode === 'live' ? 'LIVE marketplace' : 'COMING SOON'
        }`,
      );
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      toast.error(err.response?.data?.detail || 'Failed');
    }
  };

  const exportCsv = (): void => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/waitlist/export.csv`;

    const token = localStorage.getItem('auth_token');

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const anchor = document.createElement('a');

        anchor.href = URL.createObjectURL(blob);
        anchor.download = 'jompshop_waitlist.csv';
        anchor.click();
      })
      .catch(() => {
        toast.error('Failed to export CSV');
      });
  };

  const paginatedData = paginate(data.items, page, PER_PAGE);

  const filters: [FilterType, string][] = [
    ['', 'All'],
    ['hero', 'Hero'],
    ['exporter', 'Exporters'],
    ['buyer', 'Buyers'],
  ];

  return (
    <main>
      <header className="flex mb-4 justify-end">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" className="helix-btn-secondary">
            Preview site →
          </Link>

          <button
            onClick={exportCsv}
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
            onClick={toggleMode}
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
        <StatCard label="Total signups" n={data.total} />
        <StatCard label="Hero · general" n={data.by_type.hero || 0} />
        <StatCard label="Exporters" n={data.by_type.exporter || 0} />
        <StatCard label="US Buyers" n={data.by_type.buyer || 0} />
      </div>

      {/* Filters + Table */}
      <div className="helix-card overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1A7A6E]/20 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            {filters.map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
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

          <div className="text-[12px] text-[#9CA3AF] font-mono">
            {data.items.length} shown
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-[#9CA3AF] text-center">Loading…</div>
        ) : data.items.length === 0 ? (
          <div className="p-10 text-[#9CA3AF] text-center">No signups yet.</div>
        ) : (
          <>
            <table className="helix-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Signed up</th>
                  <th>Referer</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.items.map((row) => (
                  <tr key={row.id} data-testid={`row-${row.id}`}>
                    <td className="font-mono text-[13px]">
                      <Folder
                        size={12}
                        className="inline mr-1.5 text-[#1A7A6E]"
                      />
                      {row.email}
                    </td>

                    <td className="uppercase text-[11px] font-mono tracking-wider">
                      {row.type}
                    </td>

                    <td className="text-[11px] text-[#9CA3AF] font-mono">
                      {row.created_at?.replace('T', ' ').slice(0, 19)}
                    </td>

                    <td className="text-[11px] text-[#9CA3AF] truncate max-w-[280px]">
                      {row.referer || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              page={paginatedData.page}
              totalPages={paginatedData.totalPages}
              onChange={setPage}
            />
          </>
        )}
      </div>
    </main>
  );
}

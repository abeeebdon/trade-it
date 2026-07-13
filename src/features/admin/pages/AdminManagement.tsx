'use client';

import { Search, RefreshCw, AlertTriangle, Filter } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import AdminTableRow from '../components/AdminTableRow';
import AdminTableRowSkeleton from '../components/AdminTableRowSkeleton';
import AddAdminModal from '../components/AddAdminModal';
import { useGetAdminUsers } from '../hooks/useUsersApi';
import { AdminUserResponseType } from '../types/adminuserTypes';
import { useDebounce } from '@/components/debounce/useDebounce';
import { useHeader } from '@/context/HeaderContext';

const ROLE_OPTIONS = [
  'All',
  'admin',
  'exporter',
  'consumer',
  'retailer',
] as const;
type RoleFilter = (typeof ROLE_OPTIONS)[number];

const AdminManagement = () => {
  const [search, setSearch] = useState('');
  const { setHeader } = useHeader();
  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending, isError, refetch } = useGetAdminUsers({
    search: debouncedSearch,
  });

  const admins: AdminUserResponseType[] = useMemo(() => {
    const users = (data ?? []) as AdminUserResponseType[];

    return users.filter((user) =>
      user.roles.some((role) => role.toLowerCase() === 'admin'),
    );
  }, [data]);

  useEffect(() => {
    setHeader({
      title: 'Admin Management',
      kicker: 'Admin · Admins',
    });

    return () => setHeader(null);
  }, [setHeader]);

  return (
    <section className="space-y-6">
      {/* Header Row: Search + Role Filter + Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        <AddAdminModal />
      </div>

      {/* Table Card */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          dark:border-gray-800
          dark:bg-gray-950
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">
            <thead>
              <tr
                className="
                  sticky
                  top-0
                  border-b
                  border-gray-200
                  bg-gray-50
                  dark:border-gray-800
                  dark:bg-gray-900
                "
              >
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  ID
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Full Name
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Roles
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Created
                </th>
              </tr>
            </thead>

            <tbody>
              {isError ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <AlertTriangle size={40} className="text-red-400" />

                      <div className="space-y-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          Failed to load admins
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Something went wrong. Please try again.
                        </p>
                      </div>

                      <button
                        onClick={() => refetch()}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dim transition-colors"
                      >
                        <RefreshCw size={16} />
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : isPending ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <AdminTableRowSkeleton key={index} />
                ))
              ) : admins.length ? (
                admins.map((admin) => (
                  <AdminTableRow key={admin.id} admin={admin} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        No admins found
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Try adjusting your search query or add a new admin.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminManagement;

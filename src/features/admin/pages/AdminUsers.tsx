'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import UserTableCard from '../components/UserTableCard';
import UserTableCardSkeleton from '../components/UserCardTableSkeleton';
import { useGetAdminUsers } from '../hooks/useUsersApi';
import { AdminUserResponseType } from '../types/adminuserTypes';
import { useDebounce } from '@/components/debounce/useDebounce';
import { useHeader } from '@/context/HeaderContext';

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const { setHeader } = useHeader();
  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending } = useGetAdminUsers({
    search: debouncedSearch,
  });

  const adminUsers: AdminUserResponseType[] = useMemo(() => {
    return data ?? [];
  }, [data]);

  useEffect(() => {
    setHeader({
      title: 'Users',
      kicker: 'Admin · Users',
    });

    return () => setHeader(null);
  }, [setHeader]);
  return (
    <section className="space-y-6">
      {/* Table Card */}
      <div className="relative w-full md:w-87">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="
              h-11
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              pl-10
              pr-4
              text-sm
              text-gray-900
              outline-none
              transition
              focus:border-primary
              dark:border-gray-700
              dark:bg-gray-900
              dark:text-white
              dark:placeholder:text-gray-500
            "
        />
      </div>
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
          <table className="w-full min-w-275">
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
                  Name
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Role
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  MFA
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Created
                </th>

                <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isPending ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <UserTableCardSkeleton key={index} />
                ))
              ) : adminUsers.length ? (
                adminUsers.map((user) => (
                  <UserTableCard key={user.id} user={user} />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        No users found
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Try adjusting your search query.
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

export default AdminUsers;

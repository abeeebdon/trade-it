import { useState } from 'react';
import { UserTableCardProps } from '../types/adminuserTypes';
import {
  useActivateUser,
  useResetUserMFA,
  useSuspendUser,
} from '../hooks/useUsersApi';
import PressableBtn from '@/components/buttons/PressableBtn';

const UserTableCard = ({ user }: UserTableCardProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [action, setAction] = useState<
    'activate' | 'suspend' | 'reset-mfa' | null
  >(null);
  const [suspensionReason, setSuspensionReason] = useState('');
  const { mutate: activateUser, isPending: activating } = useActivateUser();

  const { mutate: suspendUser, isPending: suspending } = useSuspendUser();

  const { mutate: resetMFA, isPending: resettingMFA } = useResetUserMFA();

  const closeModal = () => {
    setAction(null);
    setOpenMenu(false);
    setSuspensionReason('');
  };

  const confirmAction = () => {
    switch (action) {
      case 'activate':
        activateUser(user.id, {
          onSuccess: closeModal,
        });
        break;

      case 'suspend':
        suspendUser(
          {
            id: user.id,
            reason: suspensionReason,
          },
          {
            onSuccess: closeModal,
          },
        );
        break;

      case 'reset-mfa':
        resetMFA(user.id, {
          onSuccess: closeModal,
        });
        break;
    }
  };
  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 last:border-b-0">
        <td className="px-4 py-3">{user.id}</td>
        <td className="px-4 py-3 font-medium">{user.fullName}</td>
        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
          {user.email}
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {user.roles.map((role) => (
              <span
                key={role}
                className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-300"
              >
                {role}
              </span>
            ))}
          </div>
        </td>
        <td className="px-4 py-3">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              user.isMfaEnabled
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {user.isMfaEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </td>
        <td className="px-4 py-3">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              user.isSuspended
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {user.isSuspended ? 'Suspended' : 'Active'}
          </span>
        </td>
        <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
          {new Date(user.createdAt).toLocaleDateString()}
        </td>
        <td className="px-4 py-3 text-right">
          <div className="relative inline-block">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ⋮
            </button>

            {openMenu && (
              <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
                <button
                  onClick={() => setAction('activate')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Activate User
                </button>

                <button
                  onClick={() => setAction('suspend')}
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  Suspend User
                </button>

                <button
                  onClick={() => setAction('reset-mfa')}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Reset MFA
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
      {action && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <article className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
            <h3 className="text-lg capitalize font-semibold text-gray-900 dark:text-white">
              {`${action} User`}
            </h3>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {`Are you sure you want to ${action} ${user.fullName}?`}
            </p>
            {action === 'suspend' && (
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Suspension Reason
                </label>

                <textarea
                  value={suspensionReason}
                  onChange={(e) => setSuspensionReason(e.target.value)}
                  rows={4}
                  placeholder="Enter reason for suspending this user..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
                />
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setAction(null)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <PressableBtn
                title="Confirm"
                handleClick={confirmAction}
                className={` rounded-lg px-4 py-2 text-sm text-white ${
                  action === 'suspend'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-primary hover:opacity-90'
                }
            `}
                loading={activating || suspending || resettingMFA}
              />
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default UserTableCard;

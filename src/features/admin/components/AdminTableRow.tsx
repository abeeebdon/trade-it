import { AdminUserResponseType } from '../types/adminuserTypes';

interface AdminTableRowProps {
  admin: AdminUserResponseType;
}

const AdminTableRow = ({ admin }: AdminTableRowProps) => {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 last:border-b-0">
      <td className="px-4 py-3">{admin.id}</td>
      <td className="px-4 py-3 font-medium">{admin.fullName}</td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
        {admin.email}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {admin.roles.map((role) => (
            <span
              key={role}
              className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-300 capitalize"
            >
              {role}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
        {new Date(admin.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default AdminTableRow;

const UserTableCardSkeleton = () => {
  return (
    <tr className="animate-pulse border-b border-gray-200 dark:border-gray-700">
      <td className="px-4 py-3">
        <div className="h-4 w-8 rounded bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-3">
        <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-3">
        <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </td>

      <td className="px-4 py-3">
        <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-3">
        <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-3">
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
      </td>

      <td className="px-4 py-3 text-right">
        <div className="ml-auto h-8 w-8 rounded bg-gray-200 dark:bg-gray-700" />
      </td>
    </tr>
  );
};

export default UserTableCardSkeleton;

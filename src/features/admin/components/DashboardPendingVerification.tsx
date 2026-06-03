import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime } from '@/lib/func';
import { DashboardPendingVerificationProps } from '../types/admin';

const DashboardPendingVerification = ({
  pendingVerificationCount,
  pendingVerifications,
}: DashboardPendingVerificationProps) => {
  return (
    <article className="mt-8 helix-card overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1A7A6E]/15">
        <h3 className="helix-label">Pending Verifications</h3>
        <p className="helix-h3 mt-1">{pendingVerifications?.length} in queue</p>
      </div>
      {pendingVerificationCount === 0 ? (
        <p className="p-10 text-center text-muted">No pending verifications.</p>
      ) : (
        <table className="w-full mx-4  overflow-auto   ">
          <thead className="space-y-4">
            <tr className="text-text text-left ">
              <th className="pt-4">Business</th>
              <th>Country</th>
              <th>Sector</th>
              <th>KYC</th>
              <th>KYB</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody className="">
            {pendingVerifications?.map((v) => (
              <tr key={v.id} className="   text-text">
                <td className="py-2">{v.business_name}</td>
                <td>{v.country}</td>
                <td className="text-muted">{v.sector}</td>
                <td>
                  <StatusPill status={v.kyc_status} />
                </td>
                <td>
                  <StatusPill status={v.kyb_status} />
                </td>
                <td className="text-[11px] font-mono text-muted">
                  {formatDateTime(v.updated_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  );
};

export default DashboardPendingVerification;

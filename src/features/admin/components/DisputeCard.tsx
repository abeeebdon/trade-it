import { StatusPill } from '@/features/shops/components/StatusPill';
import { formatDateTime } from '@/lib/func';
import { DisputeCardPRops } from '../types/admin';
import { useState } from 'react';
import PressableBtn from '@/components/buttons/PressableBtn';

const DisputeCard = ({ d }: DisputeCardPRops) => {
  const [resolution, setResolution] = useState({});

  return (
    <article
      key={d.id}
      className="helix-card p-6"
      data-testid={`dispute-${d.id}`}
    >
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <p className="helix-h3">{d.reason}</p>
          <p className="text-[12px] text-text mt-1">
            Order <span className="font-mono text-[#C9922A]">{d.order_id}</span>{' '}
            · {formatDateTime(d.created_at)}
          </p>
          <p className="mt-3 text-[14px] text-muted">{d.description}</p>
        </div>
        <StatusPill status={d.status} />
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        <input
          placeholder="Resolution note..."
          className="helix-input flex-1 min-w-50"
          // value={resolution[d.id] || ''}
          onChange={(e) =>
            setResolution({ ...resolution, [d.id]: e.target.value })
          }
        />

        <PressableBtn
          title="Mark Resolved"
          handleClick={() => console.log('')}
          className="helix-btn-primary"
        />
        <PressableBtn
          title="Reject"
          handleClick={() => console.log('')}
          className="helix-btn-secondary"
        />
      </div>
    </article>
  );
};

export default DisputeCard;

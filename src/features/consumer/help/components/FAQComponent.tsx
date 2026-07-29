'use client';
import HelpLoading from '../components/HelpLoading';
import { useMemo, useState } from 'react';
import { useGetHelpItems } from '@/features/admin/adminHelp/hooks/useAdminHelp';
import { ChevronDown, RefreshCw } from 'lucide-react';
import PressableBtn from '@/components/buttons/PressableBtn';

interface FAQs {
  question: string;
  answer: string;
}

const FAQComponent = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const { data, isPending, isError, error, refetch } = useGetHelpItems();

  const faqs: FAQs[] = useMemo(() => {
    return data ?? [];
  }, [data]);

  return (
    <article>
      <div className="md:col-span-2 space-y-3">
        <div className="helix-h3 mb-2">Frequently asked questions</div>

        {isPending ? (
          <HelpLoading />
        ) : isError ? (
          <div className="helix-card p-8 text-center space-y-4">
            <p className="text-sm text-[#9CA3AF]">
              {error?.message ||
                'Something went wrong while loading FAQs. Please try again.'}
            </p>
            <PressableBtn
              title="Try Again"
              leftComponent={<RefreshCw size={14} />}
              className="helix-btn-primary text-sm"
              handleClick={() => refetch()}
            />
          </div>
        ) : faqs.length === 0 ? (
          <div className="helix-card p-10 text-center">
            <p className="text-sm text-[#9CA3AF]">
              No frequently asked questions available at the moment.
            </p>
          </div>
        ) : (
          faqs.map((f, i) => (
            <div key={i} className="helix-card p-0 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-[14px]">{f.question}</span>
                <ChevronDown
                  size={14}
                  className={`text-[#C9922A] transition-transform ${
                    openIdx === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-4 text-[13px] text-[#9CA3AF] leading-6">
                  {f.answer}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </article>
  );
};

export default FAQComponent;

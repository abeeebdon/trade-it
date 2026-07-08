'use client';

import type { JourneyStep } from '../types';

interface JourneyTrackerProps {
  journey: JourneyStep[];
}

export default function JourneyTracker({ journey }: JourneyTrackerProps) {
  if (!journey || journey.length === 0) return null;

  return (
    <div className="flex items-center gap-1" data-testid="journey-tracker">
      {journey.map((step, i) => (
        <div key={i} className="flex items-center gap-1 flex-1 last:flex-none">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-3 h-3 rounded-full ${
                step.completed
                  ? 'bg-[#C9922A]'
                  : 'bg-[#1E293B] border border-[#334155]'
              }`}
            />
            <span className="text-[10px] text-[#9CA3AF] mt-1 text-center leading-tight">
              {step.label}
            </span>
          </div>
          {i < journey.length - 1 && (
            <div
              className={`h-px flex-1 min-w-[12px] mt-[-12px] ${
                step.completed && journey[i + 1]?.completed
                  ? 'bg-[#C9922A]'
                  : 'bg-[#1E293B]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

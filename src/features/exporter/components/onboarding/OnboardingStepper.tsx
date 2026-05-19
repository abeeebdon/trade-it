'use client';

import { CheckCircle2 } from 'lucide-react';
import type { OnboardingStep } from '../../types/exporter';

interface OnboardingStepperProps {
  steps: OnboardingStep[];
  currentStep: number;
}

export default function OnboardingStepper({
  steps,
  currentStep,
}: OnboardingStepperProps) {
  return (
    <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-3 shrink-0">
          {/* Step circle */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm shrink-0 ${
              s.done
                ? 'bg-[#C9922A] text-[#0A1628]'
                : currentStep === s.n
                  ? 'bg-[#1A7A6E] text-white'
                  : 'bg-[#0F2040] border border-[#1A7A6E]/30 text-[#9CA3AF]'
            }`}
          >
            {s.done ? <CheckCircle2 size={16} /> : s.n}
          </div>

          {/* Label */}
          <div className="text-[13px] font-medium text-[#F5F5F5]">
            {s.label}
          </div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className="w-10 h-px bg-[#1A7A6E]/30" />
          )}
        </div>
      ))}
    </div>
  );
}

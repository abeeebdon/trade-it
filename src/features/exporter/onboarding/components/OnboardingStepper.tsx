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
                ? 'bg-primary text-bg'
                : currentStep === s.n
                  ? 'bg-secondary text-white'
                  : 'bg-surface border border-secondary/30 text-muted'
            }`}
          >
            {s.done ? <CheckCircle2 size={16} /> : s.n}
          </div>

          {/* Label */}
          <div className="text-[13px] font-medium text-text">{s.label}</div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className="w-10 h-px bg-secondary/30" />
          )}
        </div>
      ))}
    </div>
  );
}

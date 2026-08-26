'use client';

import { Check } from 'lucide-react';
import type { OnboardingStep } from '../../types/exporter';
import { Dispatch, SetStateAction } from 'react';

interface OnboardingStepperProps {
  steps: OnboardingStep[];
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export default function OnboardingStepper({
  steps,
  currentStep,
  setCurrentStep,
}: OnboardingStepperProps) {
  return (
    <article className="flex flex-col w-full h-fit pb-20 pt-5 gap-6 md:max-w-70  mb-10 border bg-surface rounded border-border p-4">
      {steps.map((s, i) => (
        <button
          key={s.n}
          type="button"
          onClick={() => setCurrentStep(i + 1)}
          className="flex items-center cursor-pointer justify-between gap-3 shrink-0"
        >
          {/* Step circle */}
          <div className="flex items-center gap-3">
            <p
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm shrink-0 ${
                s.done
                  ? 'bg-primary text-bg'
                  : currentStep === s.n
                    ? 'bg-secondary text-white'
                    : 'bg-surface border border-secondary/30 text-muted'
              }`}
            >
              {s.n}
            </p>

            <p className="text-[13px] font-medium text-text">{s.label}</p>
          </div>
          <div
            className={`${s.done ? 'bg-green-500' : ' border border-surface'}  p-1 rounded-full`}
          >
            <Check size={16} color="white" />
          </div>
        </button>
      ))}
    </article>
  );
}

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BusinessFormValues } from '@/features/exporter/onboarding/types/validation';
import type { KycForm } from '@/features/exporter/types/exporter';

export type KycSaveData = Omit<KycForm, 'docs'>;

export interface OnboardingState {
  businessProfile: Partial<BusinessFormValues> | null;
  kycProfile: KycSaveData | null;
  currentStep: number;
  isSubmitted: boolean;
}

const initialState: OnboardingState = {
  businessProfile: null,
  kycProfile: null,
  currentStep: 1,
  isSubmitted: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingDetails(
      state,
      action: PayloadAction<Partial<BusinessFormValues>>,
    ) {
      state.businessProfile = {
        ...(state.businessProfile ?? {}),
        ...action.payload,
      };
      state.isSubmitted = true;
    },
    updateOnboardingDetails(
      state,
      action: PayloadAction<Partial<BusinessFormValues>>,
    ) {
      state.businessProfile = {
        ...(state.businessProfile ?? {}),
        ...action.payload,
      };
    },
    setKycDetails(state, action: PayloadAction<KycSaveData>) {
      state.kycProfile = {
        ...(state.kycProfile ?? {}),
        ...action.payload,
      };
      state.isSubmitted = true;
    },
    updateKycDetails(state, action: PayloadAction<Partial<KycSaveData>>) {
      state.kycProfile = {
        ...(state.kycProfile ?? {}),
        ...action.payload,
      };
    },
    setOnboardingStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    resetOnboarding() {
      return initialState;
    },
  },
});

export const {
  setOnboardingDetails,
  updateOnboardingDetails,
  setKycDetails,
  updateKycDetails,
  setOnboardingStep,
  resetOnboarding,
} = onboardingSlice.actions;

export const onboardingReducer = onboardingSlice.reducer;

export const selectOnboarding = (state: { onboarding: OnboardingState }) =>
  state.onboarding;

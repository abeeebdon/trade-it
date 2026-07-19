/** Shape returned by the /Profile API. */
export interface ProfileData {
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

/** API response wrapper. */
export interface ProfileApiResponse {
  data: ProfileData;
}

/** Payload for updating profile. */
export interface ProfileUpdatePayload {
  fullName: string;
  phoneNumber: string;
}

export interface ProfileFormValues {
  name: string;
  phone: string;
}

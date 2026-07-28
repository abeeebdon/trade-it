import api from '@/configs/api-config';
import { APIENDPOINTS } from '@/configs/api-urls';

export interface MfaSetupResponse {
  secret: string;
  authenticatorUri: string;
  manualEntryKey: string;
}

export interface MfaVerifyRequest {
  code: string;
}

export interface MfaChallengeVerifyRequest {
  code: string;
  challengeToken: string;
}

export const setupMfaApi = async () => {
  try {
    const response = await api.post(APIENDPOINTS.MFA_SETUP);
    return response.data as {
      success: boolean;
      message: string;
      data: MfaSetupResponse;
      statusCode: number;
    };
  } catch (error) {
    throw error;
  }
};

export const verifyMfaApi = async (data: MfaVerifyRequest) => {
  try {
    const response = await api.post(APIENDPOINTS.MFA_ENABLE, data);
    return response.data as {
      success: boolean;
      message: string;
      data: {
        token: string;
        refreshToken: string;
        email: string;
        fullName: string;
        roles: string[];
        isMfaEnabled: boolean;
      };
      statusCode: number;
    };
  } catch (error) {
    throw error;
  }
};

export const verifyMfaChallengeApi = async (
  data: MfaChallengeVerifyRequest,
) => {
  try {
    const response = await api.post(APIENDPOINTS.MFA_VERIFY, data);
    return response.data as {
      success: boolean;
      message: string;
      data: {
        token: string;
        refreshToken: string;
        email: string;
        fullName: string;
        roles: string[];
        isMfaEnabled: boolean;
      };
      statusCode: number;
    };
  } catch (error) {
    throw error;
  }
};

export const disableMfaApi = async (data: { code: string }) => {
  try {
    const response = await api.post(APIENDPOINTS.MFA_DISABLE, data);
    return response.data as {
      success: boolean;
      message: string;
      statusCode: number;
    };
  } catch (error) {
    throw error;
  }
};

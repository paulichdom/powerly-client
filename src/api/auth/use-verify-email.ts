import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { VerifyEmailBody, VerifyEmailResponse } from './types';

type Variables = VerifyEmailBody;
type Response = VerifyEmailResponse;

export const useVerifyEmail = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    console.log('[auth] verify email request', variables);

    try {
      const response = await client({
        url: 'auth/email/verify',
        method: 'POST',
        data: variables,
      });

      console.log('[auth] verify email success', response.data);
      return response.data;
    } catch (error) {
      console.error('[auth] verify email error', error);
      throw error;
    }
  },
});

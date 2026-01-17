import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type ApiResponse } from '../types';
import type { RegisterBody, RegisterResponse } from './types';

type Variables = RegisterBody;
type Response = ApiResponse<RegisterResponse>;

export const useRegisterUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    console.log('[auth] register request', variables);

    try {
      const response = await client({
        url: 'auth/register',
        method: 'POST',
        data: variables,
      });

      console.log('[auth] register success', response.data);
      return response.data;
    } catch (error) {
      console.error('[auth] register error', error);
      throw error;
    }
  },
});

import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { VerifyEmailBody, VerifyEmailResponse } from './types';

type Variables = VerifyEmailBody;
type Response = VerifyEmailResponse;

export const useVerifyEmail = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'auth/email/verify',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});

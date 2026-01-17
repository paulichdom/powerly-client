import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type ApiResponse } from '../types';
import type { RegisterBody, RegisterResponse } from './types';

type Variables = RegisterBody;
type Response = ApiResponse<RegisterResponse>;

export const useRegisterUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'auth/register',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});

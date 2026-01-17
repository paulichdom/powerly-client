import { useRouter } from 'expo-router';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import { useRegisterUser } from '@/api/auth';
import type { RegisterFormProps } from '@/components/register-form';
import { RegisterForm } from '@/components/register-form';
import { FocusAwareStatusBar, showErrorMessage } from '@/components/ui';

export default function Register() {
  const router = useRouter();

  const { mutate: registerUser } = useRegisterUser();

  const onSubmit: RegisterFormProps['onSubmit'] = (data) => {
    registerUser(data, {
      onSuccess: () => {
        showMessage({
          message: 'Account created successfully',
          type: 'success',
        });

        router.push('/verify-email');
      },
      onError: () => {
        showErrorMessage('Error creating account');
      },
    });
  };

  return (
    <>
      <FocusAwareStatusBar />
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
}

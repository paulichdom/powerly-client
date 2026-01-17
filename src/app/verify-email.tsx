import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

import { useVerifyEmail } from '@/api/auth/use-verify-email';
import { FocusAwareStatusBar, showErrorMessage } from '@/components/ui';
import type { VerifyEmailInputProps } from '@/components/verify-email-input';
import { VerifyEmailInput } from '@/components/verify-email-input';

export default function VerifyEmail() {
  const router = useRouter();

  const { mutate: registerUser } = useVerifyEmail();

  const onSubmit: VerifyEmailInputProps['onSubmit'] = (data) => {
    registerUser(data, {
      onSuccess: () => {
        showMessage({
          message: 'Email verified successfully',
          type: 'success',
        });

        router.push('/');
      },
      onError: () => {
        showErrorMessage('Error verifying email');
      },
    });
  };

  return (
    <>
      <FocusAwareStatusBar />
      <VerifyEmailInput onSubmit={onSubmit} />
    </>
  );
}

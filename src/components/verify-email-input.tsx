import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  code: z.string().length(4),
  email: z.string().email(),
});

export type FormType = z.infer<typeof schema>;

export type VerifyEmailInputProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const VerifyEmailInput = ({
  onSubmit = () => {},
}: VerifyEmailInputProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            Verify Email
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            Enter the code you received in your email below:
          </Text>
        </View>

        <ControlledInput
          testID="code"
          control={control}
          name="code"
          label="Code"
        />
        <Button
          testID="verify-button"
          label="Verify"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

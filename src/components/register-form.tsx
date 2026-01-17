import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type RegisterFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const RegisterForm = ({ onSubmit = () => {} }: RegisterFormProps) => {
  const router = useRouter();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const handleNavigateToLogin = () => {
    router.push('/login');
  };

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
            Register
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            Enter the requested data to register your account
          </Text>
        </View>

        <ControlledInput
          testID="first_name"
          control={control}
          name="first_name"
          label="First name"
        />
        <ControlledInput
          testID="last_name"
          control={control}
          name="last_name"
          label="Last name"
        />

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="***"
          secureTextEntry={true}
        />
        <Button
          testID="register-button"
          label="Register"
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          variant="link"
          testID="register-button"
          label="Already have an account? Sign in here"
          onPress={handleNavigateToLogin}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { Control, SubmitHandler } from 'react-hook-form';
import { useController, useForm } from 'react-hook-form';
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputKeyPressEventData,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, Text, View } from '@/components/ui';

const schema = z.object({
  code: z.string().length(4),
  email: z.string().email(),
});

const CODE_LENGTH = 4;

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

        <CodeInput control={control} />
        <Button
          testID="verify-button"
          label="Verify"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

type CodeInputProps = {
  control: Control<FormType>;
};

const CodeInput = ({ control }: CodeInputProps) => {
  const { field, fieldState } = useController({ control, name: 'code' });
  const inputsRef = React.useRef<(TextInput | null)[]>([]);

  const values = React.useMemo(
    () =>
      Array.from(
        { length: CODE_LENGTH },
        (_, index) => field.value?.[index] ?? ''
      ),
    [field.value]
  );

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (text: string, index: number) => {
    const sanitized = text.replace(/\D/g, '');

    if (!sanitized) {
      const next = [...values];
      next[index] = '';
      field.onChange(next.join(''));
      return;
    }

    const next = [...values];
    next[index] = sanitized.at(-1) ?? '';
    field.onChange(next.join(''));

    if (sanitized && index < CODE_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === 'Backspace' && !values[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  return (
    <View className="mb-6">
      <View className="flex-row justify-between">
        {values.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputsRef.current[index] = ref;
            }}
            testID={`code-digit-${index + 1}`}
            className="size-14 rounded-2xl border border-neutral-300 bg-white text-center text-2xl font-semibold dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            importantForAutofill="yes"
            returnKeyType="done"
          />
        ))}
      </View>

      {fieldState.error && (
        <Text testID="code-error" className="mt-2 text-sm text-danger-600">
          {fieldState.error.message}
        </Text>
      )}
    </View>
  );
};

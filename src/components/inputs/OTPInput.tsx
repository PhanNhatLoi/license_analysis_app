import {scaleH} from '@utils/dimensionUtil';
import {Box, useTheme} from 'native-base';
import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

export const INPUT_COUNT_OTP = 5;

type OTPInputProps = {
  otpInput: string;
  setOtpInput: Dispatch<SetStateAction<string>>;
  autoFocus?: boolean;
};

export const OTPInput = ({
  otpInput,
  setOtpInput,
  autoFocus = true,
}: OTPInputProps) => {
  const theme = useTheme();
  return (
    <Box>
      <OTPTextView
        textInputStyle={styles.roundedTextInput as any}
        handleTextChange={setOtpInput}
        keyboardType="number-pad"
        tintColor={theme.colors.primary[500]}
        autoFocus={autoFocus}
        inputCount={INPUT_COUNT_OTP}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  roundedTextInput: {
    fontSize: 24 * scaleH,
    fontWeight: '700',
    color: '#222B45',
  },
});

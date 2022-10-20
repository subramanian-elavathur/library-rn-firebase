import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';
import Library from '../../../assets/library.png';
import {useAuth} from '../../components/authProvider/AuthProvider';

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>('');
  const [otp, setOTP] = useState<string>('');
  const [requestInProgress, setRequestInProgress] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] = useState<
    FirebaseAuthTypes.ConfirmationResult | undefined
  >();
  const tailwind = useTailwind();
  const {auth} = useAuth();

  const sendOTP = async (): Promise<void> => {
    setRequestInProgress(true);
    const confirmation = await auth().signInWithPhoneNumber(phone);
    setConfirmationResult(confirmation);
    setRequestInProgress(false);
  };

  const confirmOTP = async (): Promise<void> => {
    try {
      setRequestInProgress(true);
      await confirmationResult?.confirm(otp);
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    } finally {
      setRequestInProgress(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tailwind('flex h-full justify-center items-center')}>
            <Image source={Library} style={tailwind('h-32 w-32')} />
            <Text style={tailwind('text-black text-2xl mt-4')}>Hello!</Text>
            <TextInput
              style={tailwind(
                'text-black border-b border-black text-xl rounded px-2 h-12 text-center my-4 w-60',
              )}
              placeholderTextColor={'#000'}
              placeholder={'Enter you phone number'}
              keyboardType={'phone-pad'}
              maxLength={14}
              value={phone}
              editable={!requestInProgress}
              onChangeText={setPhone}
            />
            {confirmationResult && (
              <TextInput
                style={tailwind(
                  'text-black border-b border-black text-xl rounded px-2 h-12 text-center mb-4 w-60',
                )}
                placeholderTextColor={'#000'}
                placeholder={'Enter OTP'}
                keyboardType={'numeric'}
                maxLength={14}
                value={otp}
                editable={!requestInProgress}
                onChangeText={setOTP}
              />
            )}
            {!requestInProgress && (
              <TouchableOpacity
                onPress={confirmationResult ? confirmOTP : sendOTP}>
                <View style={tailwind('bg-blue-400 rounded mt-2 w-48')}>
                  <Text
                    style={tailwind(
                      'text-2xl text-white px-4 py-2 text-center',
                    )}>
                    {confirmationResult ? 'Login' : 'Send OTP'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

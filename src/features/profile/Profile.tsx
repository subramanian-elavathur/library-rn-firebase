import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTailwind} from 'tailwind-rn';
import Library from '../../../assets/library.png';
import {useAuth} from '../../components/authProvider/AuthProvider';
import {getUserProfile, updateUserProfile} from '../../db/users';
import {User} from '../../model/model';

const Profile: React.FC = () => {
  const {auth, user} = useAuth();
  const [name, setName] = useState<string | null | undefined>(undefined);
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [requestInProgress, setRequestInProgress] = useState<boolean>(false);
  const tailwind = useTailwind();

  useEffect(() => {
    const setUser = async () => {
      const userProfile = await getUserProfile(user!.uid);
      setName(userProfile?.name);
      setEmail(userProfile?.contact.email);
    };
    setUser();
  }, [user]);

  const signOut = async () => {
    setRequestInProgress(true);
    await auth().signOut();
    setRequestInProgress(false);
  };

  const updateProfile = async () => {
    setRequestInProgress(true);
    try {
      const updatedUser: User = {
        id: user!.uid,
        name: name ?? null,
        profileUrl: null, // todo add coud storage url here
        contact: {
          phone: user!.phoneNumber!,
          email: email ?? null,
        },
      };
      await updateUserProfile(updatedUser);
      Alert.alert('Your profile has been updated!');
    } catch (error) {
      console.log(error);
    } finally {
      setRequestInProgress(false);
    }
  };

  return (
    <SafeAreaView style={tailwind('bg-white')}>
      <View style={tailwind('flex h-full justify-center items-center')}>
        <TouchableOpacity>
          <Image
            source={Library}
            style={tailwind('h-20 w-20 mx-6 rounded-xl')}
          />
          <View
            style={tailwind(
              'absolute bottom-0 right-4 bg-white opacity-90 rounded-full',
            )}>
            <Icon
              name="camera-outline"
              size={25}
              style={tailwind('text-black')}
            />
          </View>
        </TouchableOpacity>
        <View style={tailwind('flex mt-6 mb-2')}>
          <Text style={tailwind('text-black my-1')}>Your Name</Text>
          <TextInput
            style={tailwind(
              'text-black border-b border-black text-xl rounded pl-1 w-60 my-1',
            )}
            placeholderTextColor={'#cbd5e1'}
            placeholder={'Enter your name'}
            keyboardType={'name-phone-pad'}
            value={name ?? undefined}
            onChangeText={setName}
            editable={!requestInProgress}
          />
        </View>
        <View style={tailwind('flex mt-4 mb-2')}>
          <Text style={tailwind('text-black my-1')}>Your Email</Text>
          <TextInput
            style={tailwind(
              'text-black border-b border-black text-xl rounded pl-1 w-60 my-1',
            )}
            placeholderTextColor={'#cbd5e1'}
            placeholder={'Enter your email'}
            keyboardType={'email-address'}
            value={email ?? undefined}
            onChangeText={setEmail}
            editable={!requestInProgress}
          />
        </View>
        {!requestInProgress && (
          <View style={tailwind('flex flex-row mt-6')}>
            <TouchableOpacity
              onPress={signOut}
              style={tailwind('py-2 px-4 rounded bg-slate-400')}>
              <Text style={tailwind('text-xl text-white')}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={updateProfile}
              style={tailwind('py-2 px-8 rounded bg-blue-400 ml-4')}>
              <Text style={tailwind('text-xl text-white')}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

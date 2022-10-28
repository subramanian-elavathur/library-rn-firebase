import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import storage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTailwind} from 'tailwind-rn';
import Library from '../../../assets/library.png';
import {useAuth} from '../../components/authProvider/AuthProvider';
import ImageSelector, {
  ImageSelectionResponse,
} from '../../components/imageSelector/ImageSelector';
import {getUserProfile, updateUserProfile} from '../../db/users';
import {User} from '../../model/model';

const Profile: React.FC = () => {
  const {auth, user} = useAuth();
  const [name, setName] = useState<string | null | undefined>(undefined);
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [showImageSelector, setShowImageSelector] = useState<boolean>(false);
  const [requestInProgress, setRequestInProgress] = useState<boolean>(false);
  const [profilePictureReference, setProfilePictureReference] = useState<
    FirebaseStorageTypes.Reference | undefined
  >(undefined);
  const [profilePictureUrl, setProfilePictureUrl] =
    useState<ImageSourcePropType>(Library);

  const tailwind = useTailwind();

  useEffect(() => {
    const setUser = async () => {
      const userProfile = await getUserProfile(user!.uid);
      setName(userProfile?.name);
      setEmail(userProfile?.contact.email);
    };

    const setProfilePictureReference2 = async () => {
      try {
        const ref = storage().ref(`user/${user!.uid}/profile`);
        setProfilePictureReference(ref);
        const downloadUrl = await ref.getDownloadURL();
        setProfilePictureUrl({uri: downloadUrl});
      } catch (error) {
        console.log(`Error getting profile picture: ${error}`);
      }
    };

    setUser();
    setProfilePictureReference2();
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
      console.log(`Error updating profile picture: ${error}`);
    } finally {
      setRequestInProgress(false);
    }
  };

  const updateProfilePicture = async (response: ImageSelectionResponse) => {
    setRequestInProgress(true);
    setShowImageSelector(false);
    if (response.selectedImage?.uri && profilePictureReference) {
      try {
        await profilePictureReference.putFile(response.selectedImage?.uri);
        setProfilePictureUrl({
          uri: await profilePictureReference.getDownloadURL(),
        });
      } catch (error) {
        console.log(`Error saving profile picture: ${error}`);
      }
    }
    setRequestInProgress(false);
  };

  return (
    <SafeAreaView style={tailwind('bg-white')}>
      <View style={tailwind('flex h-full justify-center items-center')}>
        <TouchableOpacity onPress={() => setShowImageSelector(true)}>
          <Image
            source={profilePictureUrl}
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
      <ImageSelector
        show={showImageSelector}
        onDismiss={() => setShowImageSelector(false)}
        onImageSelection={(response: ImageSelectionResponse) =>
          updateProfilePicture(response)
        }
      />
    </SafeAreaView>
  );
};

export default Profile;

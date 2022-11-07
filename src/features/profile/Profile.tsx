import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  ImageURISource,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTailwind} from 'tailwind-rn';
import Reader from '../../../assets/reader.png';
import {useAuth} from '../../components/authProvider/AuthProvider';
import ImageSelector, {
  ImageSelectionResponse,
} from '../../components/imageSelector/ImageSelector';
import Loading from '../../components/loading/Loading';
import {getUserProfile, updateUserProfile} from '../../db/users';
import {User} from '../../model/model';

const Profile: React.FC = () => {
  const {auth, user} = useAuth();
  const [name, setName] = useState<string | null | undefined>(undefined);
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [profilePictureUUID, setProfilePictureUUID] = useState<string>('');
  const [showImageSelector, setShowImageSelector] = useState<boolean>(false);
  const [requestInProgress, setRequestInProgress] = useState<boolean>(false);
  const profilePictureReference = storage().ref(`user/${user!.uid}/profile`);

  const [newProfilePictureUri, setNewProfilePictureImageUri] = useState<
    ImageURISource | undefined
  >();

  const [profilePictureUri, setProfilePictureUri] = useState<
    ImageURISource | undefined
  >();

  const tailwind = useTailwind();

  useEffect(() => {
    return getUserProfile(
      user!.uid,
      profile => {
        setRequestInProgress(true);
        const userProfile = profile.data();
        setName(userProfile?.name);
        setEmail(userProfile?.contact.email);
        setProfilePictureUUID(userProfile?.profilePictureUUID ?? '');
        setRequestInProgress(false);
      },
      console.log,
    );
  }, [user]);

  useEffect(() => {
    const setProfilePicture = async () => {
      try {
        const downloadUrl = await profilePictureReference.getDownloadURL();
        setProfilePictureUri({uri: downloadUrl});
      } catch (error) {
        console.log(`Error getting profile picture: ${error}`);
      }
    };
    setProfilePicture();
  }, [profilePictureUUID]);

  const signOut = async () => {
    setRequestInProgress(true);
    await auth().signOut();
    setRequestInProgress(false);
  };

  const updateProfile = async () => {
    setRequestInProgress(true);
    try {
      if (newProfilePictureUri) {
        await profilePictureReference.putFile(newProfilePictureUri.uri!);
      }

      const updatedUser: User = {
        id: user!.uid,
        name: name ?? null,
        profilePictureUUID: newProfilePictureUri
          ? uuidv4()
          : profilePictureUUID,
        contact: {
          phone: user!.phoneNumber!,
          email: email ?? null,
        },
      };
      await updateUserProfile(updatedUser);

      const downloadUrl = await profilePictureReference.getDownloadURL();
      setProfilePictureUri({uri: downloadUrl});
      setNewProfilePictureImageUri(undefined);
    } catch (error) {
      console.log(`Error updating profile picture: ${error}`);
    } finally {
      setRequestInProgress(false);
    }
  };

  const updateProfilePicture = async (response: ImageSelectionResponse) => {
    setRequestInProgress(true);
    setShowImageSelector(false);
    if (response.selectedImage?.uri) {
      setNewProfilePictureImageUri({uri: response.selectedImage?.uri});
    }
    setRequestInProgress(false);
  };

  return (
    <SafeAreaView style={tailwind('bg-white')}>
      <View style={tailwind('flex h-full justify-center items-center')}>
        <TouchableOpacity onPress={() => setShowImageSelector(true)}>
          <Image
            source={newProfilePictureUri ?? profilePictureUri ?? Reader}
            onLoadStart={() => setRequestInProgress(true)}
            onLoadEnd={() => setRequestInProgress(false)}
            style={tailwind('h-32 w-32 mx-6 rounded-xl')}
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

        <View style={tailwind('flex flex-row mt-6')}>
          <TouchableOpacity
            onPress={signOut}
            disabled={requestInProgress}
            style={tailwind('py-2 px-4 rounded bg-slate-400')}>
            <Text style={tailwind('text-xl text-white')}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={updateProfile}
            disabled={requestInProgress}
            style={tailwind('py-2 px-8 rounded bg-blue-400 ml-4')}>
            <Text style={tailwind('text-xl text-white')}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ImageSelector
        show={showImageSelector}
        onDismiss={() => setShowImageSelector(false)}
        onImageSelection={(response: ImageSelectionResponse) =>
          updateProfilePicture(response)
        }
      />
      <Loading loading={requestInProgress} loaderText={'Updating'} />
    </SafeAreaView>
  );
};

export default Profile;

import {scaleH, scaleW} from '@utils/dimensionUtil';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppleIcon} from '@assets/icons/Apple';
import {FacebookIcon} from '@assets/icons/Facebook';
import {GoogleIcon} from '@assets/icons/Google';
import {Text, VStack} from 'native-base';
// import auth from '@react-native-firebase/auth';react-native-fbsdk-next
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const SignInWithSocial = () => {
  // const onFacebookButtonPress = async () => {
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccessToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );
  //   console.log('data', data);
  //   console.log('facebookCredential', facebookCredential);
  //   console.log(
  //     'auth().signInWithCredential(facebookCredential)',
  //     auth().signInWithCredential(facebookCredential),
  //   );

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // };
  return (
    <VStack space="5" marginTop={5}>
      <TouchableOpacity style={styles.signInWithGoogle}>
        <GoogleIcon />
        <Text fontSize="md" color="neutral.1100" fontWeight="bold">
          Sign in with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signInWithFacebook}
        // onPress={onFacebookButtonPress}
      >
        <FacebookIcon />
        <Text fontSize="md" color="white" fontWeight="bold">
          Sign in with Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInWithApple}>
        <AppleIcon />
        <Text fontSize="md" color="white" fontWeight="bold">
          Sign in with Apple
        </Text>
      </TouchableOpacity>
    </VStack>
  );
};

const styles = StyleSheet.create({
  signInWithGoogle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12 * scaleW,
    height: 44 * scaleH,
    borderRadius: 8 * scaleW,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  signInWithFacebook: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12 * scaleW,
    height: 44 * scaleH,
    borderRadius: 8 * scaleW,
    backgroundColor: '#1877F2',
  },
  signInWithApple: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12 * scaleW,
    height: 44 * scaleH,
    borderRadius: 8 * scaleW,
    backgroundColor: '#000000',
  },
});

export default SignInWithSocial;

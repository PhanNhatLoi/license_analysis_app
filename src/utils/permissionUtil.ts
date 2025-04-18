import {Permission, RESULTS, request} from 'react-native-permissions';

type RequestPermissionProps = {
  permissionType: Permission;
  handleGranted?: () => void;
  handleUnavailable?: () => void;
  handleDenied?: () => void;
  handleError?: () => void;
  handleBlocked?: () => void;
};

export const requestPermission = async ({
  permissionType,
  handleUnavailable,
  handleGranted,
  handleDenied,
  handleBlocked,
  handleError,
}: RequestPermissionProps) => {
  try {
    const result = await request(permissionType);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        handleUnavailable?.();
        break;
      case RESULTS.GRANTED:
        handleGranted?.();
        break;
      case RESULTS.BLOCKED:
        handleBlocked?.();
        break;
      default:
        handleDenied?.();
        break;
    }
  } catch (error) {
    handleError?.();
  }
};

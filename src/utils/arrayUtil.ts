import {Routes} from '@navigations/Routes';
import HomeScreen from '@screens/Home';
import {HomeIcon} from '@assets/icons/bottom-icons/Home';
import ProfileScreen from '@screens/Profile';
import {ProfileIcon} from '@assets/icons/bottom-icons/Profile';
import FaceAnalyticsScreen from '@screens/RecordingInstruction';
import {ActiveHomeIcon} from '@assets/icons/bottom-icons/ActiveHome';
import {ActiveProfileIcon} from '@assets/icons/bottom-icons/ActiveProfile';
import {CameraIcon} from '@assets/icons/bottom-icons/Camera';
import {PlainBackgroundIcon} from '@assets/icons/recording-instruction/PlainBackground';
import {NoFacesIcon} from '@assets/icons/recording-instruction/NoFaces';
import {NoGlassesIcon} from '@assets/icons/recording-instruction/NoGlasses';
import {FaceToFaceIcon} from '@assets/icons/recording-instruction/FaceToFacce';

export const tabBar = [
  {
    id: 1,
    name: Routes.Home,
    label: 'BottomTabs.Home',
    component: HomeScreen,
    icon: HomeIcon,
    activeIcon: ActiveHomeIcon,
  },
  {
    id: 2,
    name: Routes.FaceAnalytics,
    label: 'BottomTabs.Camera',
    component: FaceAnalyticsScreen,
    icon: CameraIcon,
    activeIcon: CameraIcon,
  },
  {
    id: 3,
    name: Routes.Profile,
    label: 'BottomTabs.Profile',
    component: ProfileScreen,
    icon: ProfileIcon,
    activeIcon: ActiveProfileIcon,
  },
];

export const recordingInstructions = [
  {
    id: 1,
    content: 'recordingInstruction.firstInstruction',
    icon: NoFacesIcon,
  },
  {
    id: 2,
    content: 'recordingInstruction.secondInstruction',
    icon: NoGlassesIcon,
  },
  {
    id: 3,
    content: 'recordingInstruction.thirdInstruction',
    icon: PlainBackgroundIcon,
  },
  {
    id: 4,
    content: 'recordingInstruction.fourthInstruction',
    icon: FaceToFaceIcon,
  },
];

export const getTotalPages = (items: any, itemsPerPage: number) =>
  Math.ceil(items.length / itemsPerPage);

export const getPaginatedItems = (
  items: any,
  page: number,
  itemsPerPage: number,
) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};

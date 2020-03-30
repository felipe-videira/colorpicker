import { useContext } from 'react';
import { UserSettingsContext } from '../providers/userSettingsProvider';

export default function useUserSettings () {
  return useContext(UserSettingsContext);
}

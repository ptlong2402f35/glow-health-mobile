// NavigationService.ts
import { createNavigationContainerRef } from '@react-navigation/native';
import useBottomTab from './hook/useBottomTab';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: string, params?: object) {
  const {changeTab} = useBottomTab();
  if (navigationRef.isReady()) {
    (navigationRef as any).navigate((name) as never, (params || {}) as never);
    changeTab?.(name);
  }
}

export function getCurrentRouteName() {
  return navigationRef.getCurrentRoute()?.name;
}
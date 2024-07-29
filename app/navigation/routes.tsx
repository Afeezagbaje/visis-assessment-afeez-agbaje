import {routeUrls} from './routeUrls';

import {Books, Home, ScanImage} from '../screens';

export const Root = [
  {
    name: routeUrls.home,
    component: Home,
    options: {headerShown: false},
  },
  {
    name: routeUrls.scanImage,
    component: ScanImage,
    options: {headerShown: false},
  },
  {
    name: routeUrls.books,
    component: Books,
    options: {headerShown: false},
  },
];

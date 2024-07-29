import React from 'react';

import GenerateStack from './generateStack';
import {Root} from './routes';

export const AppNavigation: React.FC = () => {
  return <GenerateStack paths={Root} />;
};

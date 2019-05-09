import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Auth = React.lazy(() => import('./Auth'));

export default function LazyWarper() {
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <Auth />
    </React.Suspense>
  );
}

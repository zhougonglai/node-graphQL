import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Event = React.lazy(() => import('./Event'));

export default function LazyWarper() {
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <Event />
    </React.Suspense>
  );
}

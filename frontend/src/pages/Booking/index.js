import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Booking = React.lazy(() => import('./Booking'));

export default function LazyWarper() {
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <Booking />
    </React.Suspense>
  );
}

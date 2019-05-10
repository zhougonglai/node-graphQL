import Auth from './pages/Auth';
import Booking from './pages/Booking';
import Event from './pages/Event';

const routerConfig = [
  {
    path: '/auth',
    component: Auth
  },
  {
    path: '/bookings',
    component: Booking
  },
  {
    path: '/events',
    component: Event
  }
];

export { routerConfig };

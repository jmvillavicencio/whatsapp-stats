/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard',
  },
  {
    path: '/participations',
    name: 'Participations',
    view: 'Participations',
  },
  {
    path: '/laughs',
    name: 'Laughs',
    view: 'Laughs',
  },
  {
    path: '/letters',
    name: 'Letters',
    view: 'Letters',
  },
  {
    path: '/upload',
    name: 'Upload',
    view: 'Upload',
  },
];

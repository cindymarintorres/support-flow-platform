export const ROUTES = {
  // Auth
  LOGIN: '/login',
  //Forgot Password
  FORGOT_PASSWORD: '/forgot-password',
  //Reset Password
  RESET_PASSWORD: '/reset-password/:token',

  // Dashboard
  DASHBOARD: '/',

  // Tickets
  TICKETS: '/tickets',
  TICKET_DETAIL: '/tickets/:id',
  CREATE_TICKET: '/tickets/create',

  // Users
  USERS: '/users',
  USER_DETAIL: '/users/:id',
  CREATE_USER: '/users/create',

  // Categories
  CATEGORIES: '/categories',

  // Notifications
  NOTIFICATIONS: '/notifications',

  // Reports
  REPORTS: '/reports',

  // Settings
  SETTINGS: '/settings',

  // Errors
  FORBIDDEN: '/403',
  NOT_FOUND: '/404',
};

export const buildRoute = {
  ticketDetail: (id: string) => `/tickets/${id}`,
  userDetail: (id: string) => `/users/${id}`,
};
export const QUERY_KEYS = {
  // Tickets
  TICKETS: ['tickets'],
  TICKET_DETAIL: (id: string) => ['ticket', id],
  TICKET_COMMENTS: (ticketId: string) => ['ticket', ticketId, 'comments'],

  // Users
  USERS: ['users'],
  USER_DETAIL: (id: string) => ['user', id],

  // Dashboard
  DASHBOARD: ['dashboard'],

  // Categories
  CATEGORIES: ['categories'],

  // Notifications
  NOTIFICATIONS: ['notifications'],
};
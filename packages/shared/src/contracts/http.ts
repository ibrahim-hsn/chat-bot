import { API_BASE_PATH } from "../constants";

/**
 * Canonical HTTP route paths. Both the server (route registration) and the web
 * app (request builders, from Phase 2) import these so a renamed route is a
 * compile-time change in exactly one place.
 *
 * Only `/health` and `/ready` are implemented in Phase 0; the rest are the
 * agreed contract for later phases and are not yet wired up.
 */
export const HTTP_ROUTES = {
  health: "/health",
  ready: "/ready",
  auth: {
    register: `${API_BASE_PATH}/auth/register`,
    login: `${API_BASE_PATH}/auth/login`,
    refresh: `${API_BASE_PATH}/auth/refresh`,
    logout: `${API_BASE_PATH}/auth/logout`,
    me: `${API_BASE_PATH}/auth/me`,
  },
  rooms: {
    list: `${API_BASE_PATH}/rooms`,
    create: `${API_BASE_PATH}/rooms`,
    join: `${API_BASE_PATH}/rooms/join`,
  },
} as const;

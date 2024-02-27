/**
 * กำหนด path ที่ไม่ต้องการให้มีการเช็คสิทธิ์
 * Public routes that don't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Route for user to authenticate
 * @type {string[]}
 */
export const authRoutes = ["/"];

/**
 * Path หลักของ API Auth
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default path to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

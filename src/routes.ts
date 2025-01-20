export const routes = Object.freeze({
  login: '/login',
  posts: '/'
});

export const protectedRoutes = Object.freeze<string[]>([routes.posts]);
export const publicRoutes = Object.freeze<string[]>([routes.login]);

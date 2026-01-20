
// export const USER_API_END_POINT = "http://localhost:5500/api/user";
// export const BLOG_API_END_POINT = "http://localhost:5500/api/blog";
// export const COMMENT_API_END_POINT = "http://localhost:5500/api/comment";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5500";

export const USER_API_END_POINT = `${BASE_URL}/api/user`;
export const BLOG_API_END_POINT = `${BASE_URL}/api/blog`;
export const COMMENT_API_END_POINT = `${BASE_URL}/api/comment`;

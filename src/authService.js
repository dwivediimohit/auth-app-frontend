import api from "./axios";

/* ==========================
   AUTH APIs
========================== */

export const loginUser = async (loginData) => {

  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response;
};

export const registerUser = async (userData) => {

  const response = await api.post(
    "/auth/register",
    userData
  );

  return response;
};

export const logoutUser = async () => {

  const response = await api.post(
    "/auth/logout"
  );

  return response;
};

export const refreshToken = async () => {

  const response = await api.post(
    "/auth/refresh-token"
  );

  return response;
};

/* ==========================
   USER APIs
========================== */

export const getUsers = async () => {

  const response = await api.get(
    "/users"
  );

  return response;
};

export const getUserByEmail = async (email) => {

  const response = await api.get(
    `/users/email/${email}`
  );

  return response;
};

export const getUserById = async (userId) => {

  const response = await api.get(
    `/users/userID/${userId}`
  );

  return response;
};

export const updateUser = async (
  userId,
  userData
) => {

  const response = await api.put(
    `/users/${userId}`,
    userData
  );

  return response;
};

export const deleteUser = async (userId) => {

  const response = await api.delete(
    `/users/${userId}`
  );

  return response;
};

/* ==========================
   OAUTH URLs
========================== */

export const GOOGLE_LOGIN_URL =
  "http://localhost:8082/oauth2/authorization/google";

export const GITHUB_LOGIN_URL =
  "http://localhost:8082/oauth2/authorization/github";

/* ==========================
   TOKEN HELPERS
========================== */

export const saveToken = (token) => {

  localStorage.setItem(
    "token",
    token
  );
};

export const getToken = () => {

  return localStorage.getItem(
    "token"
  );
};

export const removeToken = () => {

  localStorage.removeItem(
    "token"
  );
};

export const isAuthenticated = () => {

  return !!localStorage.getItem(
    "token"
  );
};
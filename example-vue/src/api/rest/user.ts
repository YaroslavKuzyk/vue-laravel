import makeRequest from "../makeRequest";

export const userSanctum = () => {
  return makeRequest({
    method: "GET",
    url: "/sanctum/csrf-cookie",
  });
};

export const userRegister = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return makeRequest({
    method: "POST",
    url: "/api/register",
    data,
  });
};

export const userlogin = (data: { email: string; password: string }) => {
  return makeRequest({
    method: "POST",
    url: "/api/login",
    data,
  });
};

export const logoutUser = () => {
  return makeRequest({
    method: "POST",
    url: "/api/logout",
  });
};

export const getUser = () => {
  return makeRequest({
    method: "GET",
    url: "/api/user",
  });
};

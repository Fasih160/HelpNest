import axios from "axios";
// backend integration to login a user
export const login = async (email: string, password: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/login`,
    {
      email,
      password,
    }
  );
  localStorage.setItem("token", data.token);
  return data;
};
// backend integration to register a user
export const register = async (values: object) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/register`,
    values
  );
  localStorage.setItem("token", data.token);
  return data;
};
// backend integration to logout a user
export const logout = async () => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  localStorage.removeItem("token");
  return null;
};
// backend integration to check if a user is logged in
export const loginBack = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { user: data, token };
};

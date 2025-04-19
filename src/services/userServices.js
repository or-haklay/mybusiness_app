import httpServices from "./httpServices";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";
refreshToken();
async function signIn(values) {
  const response = await httpServices.post("/users/login", values);
  setToken(response.data);

  return response;
}

function register(values) {
  const response = {
    name: {
      first: values.firstName,
      last: values.lastName,
    },
    phone: values.phone,
    email: values.email,
    password: values.password,
    image: {
      url: values.isBusiness
        ? "https://cdn-icons-png.freepik.com/512/12483/12483674.png?ga=GA1.1.1178628401.1743495898"
        : "https://cdn-icons-png.freepik.com/512/12483/12483574.png?ga=GA1.1.1178628401.1743495898",
      alt: "profile default image",
    },
    address: {
      country: values.country,
      city: values.city,
      street: values.street,
      houseNumber: values.houseNumber,
      zipCode: values.zipCode,
    },
    isBusiness: values.isBusiness,
  };

  return httpServices.post("/users", response);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}

function signOut() {
  setToken(null);
}

function refreshToken() {
  httpServices.setDefaultCommonHeaders("x-auth-token", getJWT());
}

function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

function getUserData(userId) {
  return httpServices.get(`/users/${userId}`).then((response) => {
    return response.data;
  });
}

function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

function updateUser(userId, values) {
  const response = {
    name: {
      first: values.firstName,
      last: values.lastName,
    },
    phone: values.phone,
    image: {
      url: values.isBusiness
        ? "https://cdn-icons-png.freepik.com/512/12483/12483674.png?ga=GA1.1.1178628401.1743495898"
        : "https://cdn-icons-png.freepik.com/512/12483/12483574.png?ga=GA1.1.1178628401.1743495898",
      alt: "profile default image",
    },
    address: {
      country: values.country,
      city: values.city,
      street: values.street,
      houseNumber: values.houseNumber,
      zipCode: values.zipCode,
    },
  };

  return httpServices.put(`/users/${userId}`, response);
}

const userService = {
  signIn,
  register,
  setToken,
  refreshToken,
  getJWT,
  signOut,
  getUser,
  getUserData,
  updateUser,
};

export default userService;

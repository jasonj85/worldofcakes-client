import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Cake } from "../models/Cake";

axios.defaults.baseURL = process.env.REACT_APP_API_URL as string;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    toast.error(`Status ${status}: ${data.title}`);
    console.log(error.message);

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url),
};

const CakeCatalog = {
  list: () => requests.get("cakes"),
  details: (id: number) => requests.get(`cakes/${id}`),
  create: (cake: Cake) => requests.post(`cakes`, cake),
  update: (id: number, cake: Cake) => requests.put(`cakes/${id}`, cake),
  delete: (id: number) => requests.delete(`cakes/${id}`),
};

// to be completed at a later date
// const TestErrors = {
//   get400Error: () => requests.get("buggy/bad-request"),
//   get401Error: () => requests.get("buggy/unauthorized"),
//   get404Error: () => requests.get("buggy/not-found"),
//   get500Error: () => requests.get("buggy/server-error"),
//   getValidationError: () => requests.get("buggy/validation-error"),
// };

const agent = {
  CakeCatalog,
  // TestErrors,
};

export default agent;

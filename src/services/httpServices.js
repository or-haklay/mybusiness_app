import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.URL;

function setDefaultCommonHeaders(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

const httpServices = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setDefaultCommonHeaders,
};

export default httpServices;

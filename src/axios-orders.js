import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://burger-app-6771f-default-rtdb.firebaseio.com/",
});

export default axiosInstance;

import { useQuery } from "react-query";
import axios from "axios";
import decode from "jwt-decode";

export default function useUser() {
  return useQuery("user", async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const { id } = decode(token, "3ghbYRrGvLTunrPeQ3Pk");
      return axios.get(`/api/users/${id}`).then((res) => res.data);
    }

    return null;
  });
}

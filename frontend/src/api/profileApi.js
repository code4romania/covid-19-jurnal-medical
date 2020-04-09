import api from "./api";

const ProfileApi = {
  get: async () => {
    const result = await api.get("/profile");

    return result.data;
  },
  getDependants: async () => {
    const result = await api.get("/profile/family");

    return result.data;
  },
  addDependant: async profile => {
    const result = await api.post("/profile/family", profile);

    return result.data;
  }
};

export default ProfileApi;

import api from "./api";

const ProfileApi = {
  get: async () => {
    const { data } = await api.get("/profile");

    return data;
  },
  getDependants: async () => {
    const { data } = await api.get("/profile/family");

    return data;
  },
  addDependant: profile => api.post("/profile/family", profile),

  createProfile: profile => api.post("/profile", profile)
};

export default ProfileApi;

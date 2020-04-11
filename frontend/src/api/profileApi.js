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
  addDependant: profile => api.post("/profile/family", profile),

  createProfile: profile => api.post("/profile", profile)
};

export default ProfileApi;

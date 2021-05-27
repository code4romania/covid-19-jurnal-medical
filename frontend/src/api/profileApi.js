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

  updateFamilyProfile: (id, profile) =>
    api.put(`/profile/family/${id}`, profile),

  createProfile: profile => api.post("/profile", profile),

  updateProfile: (id, profile) => api.put(`/profile/${id}`, profile)
};

export default ProfileApi;

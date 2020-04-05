import api from "./api";

const ProfileApi = {
  get: async () => {
    const result = await api.get("/profile");

    return result.data;
  },
  getDependants: async () => {
    const result = await api.get("/profile/family");

    return result.data.map(member => {
      return {
        firstName: member["name"],
        surname: member["surname"],
        id: member["id"]
      };
    });
  }
};

export default ProfileApi;

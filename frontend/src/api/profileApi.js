import mockData from "../components/Account/mockData/mockData";

const ProfileApi = {
  get: async () => {
    // TODO: change to api call when adding a member is available
    // const result = await api.get("/profile");

    return mockData;
  },
  getDependants: async () => {
    // TODO: change to api call when adding a member is available
    // const result = await api.get("/profile/family");

    return mockData.otherMembers;
  }
};

export default ProfileApi;

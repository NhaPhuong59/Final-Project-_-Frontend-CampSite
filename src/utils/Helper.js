import apiService from "./apiService";
const Helper = {
  uploadImage: (files) => {
      let payload = new FormData();
      for (let i=0; i< files.length; i++){
        payload.append("type", files[i].type);
        payload.append("image", files[i]);

      }
    return apiService
      .post("/image", payload)
      .then((response) => {
        return response.data.images;
      })
  },
};

export default Helper;

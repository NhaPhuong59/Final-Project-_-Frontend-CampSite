import apiService from "./apiService";
const Helper = {
  uploadImage: (files) => {
    // let files=[]
    // allFiles.map((file)=>{
      let payload = new FormData();
      for (let i=0; i< files.length; i++){
        payload.append("type", files[i].type);
        payload.append("image", files[i]);

      }
      // files.push(payload)
      console.log("uploadImage", "payload", payload);
    // })
    return apiService
      .post("/image", payload)
      .then((response) => {
        console.log("response.data.images", response.data.images);
        return response.data.images;
      })
  },
};

export default Helper;

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
  imageUrl(image) {
    if (image.startsWith('https://nok-nok-campsite.herokuapp.com')){
      return image
    }
    if (image.startsWith('http://localhost:5000')) {
      image = image.slice('http://localhost:5000'.length)
    }
    if (image.startsWith('/api/')) {
      image = image.slice('/api'.length)
    }
    return process.env.REACT_APP_BASE_URL + image
  }
};

export default Helper;

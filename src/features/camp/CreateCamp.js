import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Helper from "../../utils/Helper";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createCamp } from "./campSlice";
import FormCreateCamp from "../../components/FormCreateCamp";

const yupSchema = Yup.object().shape({
  title: Yup.string().required("Place is required"),
  description: Yup.string().required("Description is required"),
  addressUrl: Yup.string().url().required("Location is required"),
  addressText: Yup.string().required("Address is required"),
  price: Yup.number().lessThan(500).required("Price is required"),
});

const defaultValues = {
  title: "",
  description: "",
  images: [],
  addressUrl: "",
  addressText: "",
  price: "",
  amenites: {
    canal_view: false,
    free_parking_on_premises: false,
    shared_hot_tub: false,
    portable_air_conditioning: false,
    breakfast: false,
  },
};


function CreateCamp() {
  const dispatch = useDispatch();

  const [displayImages, setDisplayImages] = useState([]);
  const [imageIsDelete, setImageIsDelete] = useState(null);
  const methods = useForm({ resolver: yupResolver(yupSchema), defaultValues });
  const { setValue, getValues, handleSubmit, reset } = methods;

  const handleImageChange = async (event) => {
    let images = await Helper.uploadImage(event.target.files);
    images = images.map(Helper.imageUrl)
    setDisplayImages([...displayImages, ...images]);
    const oldImages = getValues("images");
    setValue("images", [...oldImages, ...images]);
  };

  const handleDeleteImage = (image) => {
    setImageIsDelete(image);
    if (imageIsDelete) {
      const newListImages = displayImages.filter((item) => item !== image);
      setDisplayImages(newListImages);
      setValue("images", newListImages);
    }
  };
  const onSubmit = async (data) => {
    const { title, description, images, addressText, addressUrl, price } = data;
    let dataCreated = {
      title,
      description,
      images: images,
      address: { addressUrl, addressText },
      price,
    };
    dispatch(createCamp({ dataCreated })).then(() => {
      reset();
      setDisplayImages([]);
    });
  };

  return (
    <FormCreateCamp 
    methods={methods}
    onSubmit={onSubmit}
    handleSubmit={handleSubmit}
    handleImageChange={handleImageChange}
    displayImages={displayImages}
    handleDeleteImage={handleDeleteImage}
    />
  );
}

export default CreateCamp;

"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

function ImagePicker({ label, name }) {
  const [mealImage, setMealImage] = useState();

  const inputImageRef = useRef();

  function handleImageInput() {
    inputImageRef.current.click();
  }

  function handleImage(event) {
    const file = event.target.files[0];

    if (!file) {
      setMealImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setMealImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {mealImage ? (
            <Image src={mealImage} alt="Meal Image selected by user" fill />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          required
          ref={inputImageRef}
          onChange={handleImage}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handleImageInput}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;

import { useSelector } from "react-redux";
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [imageFile, setImageFile] = useState(undefined);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  // const [formData, setFormData] = useState({});

  console.log(imagePercent, uploadError);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage(imageFile);
    }
  }, [imageFile]);

  async function uploadImage(image) {
    setUploadError("");
    const fileName = new Date().getTime() + image.name; // creates unique file name
    const storageRef = ref(storage, `blog-images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setUploadError("Could not upload image (File must be less than 2MB).");
        setImagePercent(0);
        setImageFile(undefined);
        setImageFileUrl(null);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setImageFileUrl(downloadURL),
        );
      },
    );
  }

  return (
    <section className="mx-auto w-full max-w-md p-3">
      <h1 className="py-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-6">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="relative h-20 w-20 cursor-pointer self-center overflow-hidden rounded-full shadow-md">
          {imagePercent > 0 && (
            <CircularProgressbar
              value={imagePercent || 0}
              text={`${imagePercent}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imagePercent / 100})`,
                },
              }}
              className="h-full w-full"
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`h-full w-full rounded-full border-[4px] border-gray-300 object-cover ${imagePercent && imagePercent < 100 && "opacity-60"}`}
            onClick={() => fileRef.current.click()}
          />
        </div>
        {uploadError && <Alert color="failure">{uploadError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="Password" />
        <Button gradientDuoTone="purpleToBlue">Update</Button>
      </form>
      <div className="mt-5 flex justify-between text-red-600">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </section>
  );
}

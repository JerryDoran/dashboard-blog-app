import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="mx-auto w-full max-w-md p-3">
      <h1 className="py-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-6">
        <div className="h-20 w-20 cursor-pointer self-center overflow-hidden rounded-full shadow-md ">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="h-full w-full rounded-full border-[4px] border-gray-300 object-cover"
          />
        </div>
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

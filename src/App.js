import React from "react";
import UserProfile from "./index.jsx";

const App = () => {
  const user = {
    avatar:
      "https://znews-photo.zingcdn.me/w1920/Uploaded/mdf_eioxrd/2021_07_06/1q.jpg",
    email: "johndoe@example.com",
    lastName: "Doe",
    firstName: "John",
    username: "johndoe",
    birthDay: "January 1, 1990",
    gender: "Male",
    phone: "+1 123-456-7890"
  };

  return (
    <div>
      <UserProfile user={user} />
    </div>
  );
};

export default App;

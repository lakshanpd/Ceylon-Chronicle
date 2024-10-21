import React from "react";
import Thanks from "../components/home/Thanks";

function Profile() {
  return (
    <div className="bg-black h-96">
      <h2 className="text-black bg-black">Welcome to your profile!</h2>
      <p>This page is protected. Only logged-in users can access it.</p>
    </div>
  );
}

export default Profile;

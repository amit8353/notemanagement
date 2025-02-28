import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaUser,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const API_BASE_URL = "http://localhost:5000/api/auth/update-profile";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notificationPreference, setNotificationPreference] = useState(false);
  const [user, setUserdetails] = useState({
    name: "",
    email: "",
    phone: "",
    notificationPreference: false,
  });
  const { token } = useAuth();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user, "useruser");
    setUserdetails(user);
    setEmail(user.email);
    setPhone(user.phone);
    setNotificationPreference(user.notificationPreference);
  }, []);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleUpdate = async () => {
    if (!validateEmail(email)) {
      alert("Please fix the errors in the form");
      return;
    }

    const updatedUserDetails = {
      name: user.name,
      email: email,
      id: user.id,
    };

    try {
      const response = await axios.put(API_BASE_URL,
        updatedUserDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        }
      );

      if (response.status === 200) {
        alert("User details updated successfully");
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Assuming response contains updated user info
        setUserdetails(response.data.user);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details");
    }
  };

  return (
    <div
      className="p-8 profile-section"
      style={{ width: "50vw", height: "50vh" }}
    >
      <div className="flex items-start mb-6">
        {/* <img
          src={userimage.image}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-blue-200 hover:border-blue-300 transition-all duration-300"
        /> */}
        <FaUser
          className="w-10 h-10 rounded-full cursor-pointer"
          alt="User avatar"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold ">{user.name}</h2>
          <h5>{user.email}</h5>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 ${
              activeTab === "contact"
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Info
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "settings"
                ? "border-b-2 border-blue-500 text-blue-500"
                : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>
      </div>

      {activeTab === "contact" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) =>
                setUserdetails({ ...user, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium  mb-1">
              <FaEnvelope className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                !validateEmail(email) && email ? "border-red-300" : ""
              }`}
              placeholder="Enter your email"
              disabled={true}
            />
            {!validateEmail(email) && email && (
              <p className="mt-1 text-sm text-red-600">
                Please enter a valid email address.
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <FaTwitter className="inline mr-1" /> Twitter
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <FaFacebook className="inline mr-1" /> Facebook
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <FaLinkedin className="inline mr-1" /> LinkedIn
            </a>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">
              Notification Preferences
            </h3>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={notificationPreference}
                onChange={() =>
                  setNotificationPreference(!notificationPreference)
                }
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2">Receive email notifications</span>
            </label>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Account Security</h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              <IoMdSettings className="inline mr-2" />
              Change Password
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6"
      >
        Update
      </button>
    </div>
  );
};

export default UserProfilePage;

import React, { useEffect, useRef, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api"; // Import Marker
import { Link } from "react-router-dom";
import { TimePicker } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import toast from "react-hot-toast";
dayjs.extend(customParseFormat);

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    address: "",
    description: "",
    image: null,
    openingTime: "",
    closingTime: "",
  });

  // set image
  const [logoImage, setLogoImage] = useState(null);

  const handleOpeningTime = (time, timeString) => {
    // console.log(time, timeString);

    setFormData((prev) => ({ ...formData, openingTime: timeString }));

    // console.log(formData);
  };

  const handleClosingTime = (time, timeString) => {
    //  console.log(time, timeString);
    setFormData((prev) => ({ ...formData, closingTime: timeString }));
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const mapRef = useRef(null);

  const mapStyles = { height: "300px", width: "100%" };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked, type, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));

      // Create a new FileReader instance
      const reader = new FileReader();

      // Attach an onload event listener
      reader.onload = (event) => {
        // Update the preview image with the file's data URL
        setLogoImage(event.target.result); // event.target.result contains the base64 string
      };

      // Read the file as a Data URL
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const { fullName, phoneNumber, password, confirmPassword, terms } =
      formData;

    if (!fullName) {
      setErrorMessage("Please enter your full name.");
      return false;
    }
    if (phoneNumber.length !== 11 || isNaN(phoneNumber)) {
      setErrorMessage("Please enter a valid 11-digit phone number.");
      return false;
    }
    if (formData.openingTime === "") {
      setErrorMessage("Please select opening time.");
      return false;
    }
    if (formData.closingTime === "") {
      setErrorMessage("Please select closing time.");
      return false;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    if (!terms) {
      setErrorMessage("You must agree to the terms and conditions.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (coordinates.lat === "" || coordinates.lng === "") {
      toast.error("Please give location permission and retry.");
      return false;
    }

    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("owner", formData.fullName);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phoneNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("lat", coordinates.lat);
      formDataToSend.append("long", coordinates.lng);
      formDataToSend.append("openingTime", formData.openingTime);
      formDataToSend.append("closingTime", formData.closingTime);
      if (formData.image) formDataToSend.append("image", formData.image);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/restaurant/register`,
          {
            method: "POST",
            headers: {
              "x-auth-token": process.env.REACT_APP_API_TOKEN,
            },
            body: formDataToSend,
          }
        );

        const data = await response.json();
        if (response.ok) {
          alert("Registration successful!");
        } else {
          setErrorMessage(
            data.message || "Something went wrong. Please try again."
          );
        }
      } catch (error) {
        console.error("Network error:", error);
        setErrorMessage("Network error. Please try again later.");
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onLoad = (mapInstance) => {
    mapRef.current = mapInstance;
    addCenterMarker();
  };

  const handleMapIdle = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      setCoordinates({ lat: center.lat(), lng: center.lng() });
    }
  };

  // Function to handle adding a marker at the map center
  const addCenterMarker = () => {
    // You no longer need direct DOM manipulation here, you can rely on React components like Marker.
  };

  const findLocation = (event) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          //  mapRef.current.setCenter(userLocation);
          setCoordinates(userLocation);
          console.log(coordinates);
        },
        () => alert("Geolocation failed or is not supported by your browser.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    // Remove the direct DOM manipulation
    // window.onload = addCenterMarker;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 space-y-6">
        {/* Logo */}
        <div className="text-center">
          <img
            src="./img/foodverselogo.png"
            alt="Food Verse Logo"
            className="mx-auto w-40 h-40"
          />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative border-dashed border-2 border-blue-600 rounded-md p-4 flex flex-col items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-4.418 0-8 1.79-8 4v4h16v-4c0-2.21-3.582-4-8-4z"
                />
              </svg>
              <span className="text-gray-400 text-sm text-center">
                Upload Restaurant Logo
              </span>
              {logoImage && (
                <img
                  src={logoImage}
                  alt="logo"
                  className="h-32 w-40 absolute top-0 left-0"
                />
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={handleChange}
                accept="image/*"
                name="image"
              />
            </div>
            <div className="relative border-dashed border-2 border-blue-600 rounded-md p-4 flex flex-col items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0c-4.418 0-8 1.79-8 4v4h16v-4c0-2.21-3.582-4-8-4z"
                />
              </svg>
              <span className="text-gray-400 text-sm text-center">
                Upload Restaurant Cover
              </span>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Restaurant Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your restaurant name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Restaurant Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your restaurant address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter a description of your restaurant"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>

          {/* time format */}
          <div>
            <label className="pr-4 inline-block">Opening time</label>
            <TimePicker
              className="px-4"
              onChange={handleOpeningTime}
              defaultOpenValue={dayjs("00:00:00", "HH:mm")}
              format="h:mm a"
            />
          </div>
          <div>
            <label className="pr-4 inline-block">Closing time</label>
            <TimePicker
              className="px-4"
              onChange={handleClosingTime}
              defaultOpenValue={dayjs("00:00:00", "HH:mm")}
              format="h:mm a"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter a password"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={findLocation}
              className="w-full py-2 px-3 rounded-md text-sm bg-blue-500 text-white"
            >
              Get Location
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">
                I agree to the{" "}
                <a href="/terms" className="text-blue-500">
                  terms and conditions
                </a>
                .
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}

          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link to="/signin" className="text-blue-500">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

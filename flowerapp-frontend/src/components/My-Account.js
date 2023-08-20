import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export default () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const response = await axios.get(
          `https://api.myflowerarchitect.com/arranger/account/profile`,
          {
            headers: {
              Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
            },
          }
        );
        // console.log(response.data.data.profile);

        setProfile(JSON.parse(response.data.data.profile));
        setRole(response.data.data.role);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
    console.log(profile);
  }, []);
  if (!profile) {
    return null;
  }

  const ifDesigner = (role) => {
    if (role === "basic" || role === "club") {
      return false;
    }
    return true;
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log("testing");

    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user.signInUserSession.idToken.jwtToken);
      const response = await axios.post(
        "https://api.myflowerarchitect.com/arranger/account/profile/update",
        { ...profile },
        {
          headers: {
            Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    if (e.target.id.includes("address.")) {
      setProfile({
        ...profile,
        address: {
          ...profile.address,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.id.includes("shipping.")) {
      setProfile({
        ...profile,
        shipping: {
          ...profile.shipping,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
      return;
    }
  };

  return (
    <React.Fragment>
      <Navbar backgroundColor="bg-gray-100" />
      <main className={classes.layout}>
        <div className="bg-white shadow-lg rounded-md p-4 m-4">
          <form className="w-full max-w-lg" onSubmit={updateProfile}>
            <h1 className="text-3xl center my-4 text-center"> My Profile</h1>

            <div>
              <p>
                {" "}
                Role Type = {role}
                {!ifDesigner(role) && (
                  <button
                    className="p-4 rounded-sm bg-blue-700 text-white"
                    onClick={() => {
                     navigate("/");
                    }}
                  >
                    Upgrade
                  </button>
                )}
              </p>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="username"
                >
                  User Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                {/* <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                /> */}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="locaton"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="website"
                >
                  Website
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="website"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="picture"
                >
                  Picture
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="picture"
                  name="picture"
                  value={profile.picture}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <h2 className="text-2xl center my-4 text-center border-none border-b">
              {" "}
              My Mailing Address
            </h2>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address.line1"
                >
                  Line 1
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="address.line1"
                  name="line1"
                  value={profile.address.line1}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address.line2"
                >
                  Line 2
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="address.line2"
                  name="line2"
                  value={profile.address.line2}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address.country"
                >
                  Country
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="address.country"
                  name="country"
                  value={profile.address.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address.city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Albuquerque"
                  id="address.city"
                  name="city"
                  value={profile.address.city}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address.state"
                >
                  State
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Albuquerque"
                  id="address.state"
                  name="state"
                  value={profile.address.state}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="address.zip"
                >
                  Zip
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder={90210}
                  id="address.zip"
                  name="zip"
                  value={profile.address.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <h2 className="text-2xl center my-4 text-center border-none border-b">
              {" "}
              My Shipping Address
            </h2>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shipping.line1"
                >
                  Line 1
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="shipping.line1"
                  name="line1"
                  value={profile.shipping.line1}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shipping.line2"
                >
                  Line 2
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="shipping.line2"
                  name="line2"
                  value={profile.shipping.line2}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shipping.country"
                >
                  Country
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  id="shipping.country"
                  name="country"
                  value={profile.shipping.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shipping.city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Albuquerque"
                  id="shipping.city"
                  name="city"
                  value={profile.shipping.city}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shipping.state"
                >
                  State
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Albuquerque"
                  id="shipping.state"
                  name="state"
                  value={profile.shipping.state}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="shipping.zip"
                >
                  Zip
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder={90210}
                  id="shipping.zip"
                  name="zip"
                  value={profile.shipping.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-center my-8">
              <input
                type="submit"
                value="Submit"
                className="p-2 rounded-md text-white bg-blue-600"
              />
            </div>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
};

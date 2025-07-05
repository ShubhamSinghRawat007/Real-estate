import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`https://real-estate-backend-rai3.onrender.com/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-6 my-5 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Profile
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-gray-50 p-6 rounded-lg"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <div className="flex justify-center">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-28 w-28 object-cover cursor-pointer border-2 border-gray-300"
          />
        </div>
        <p className="text-center text-sm">
          {fileUploadError ? (
            <span className="text-red-500">
              Error uploading image (max size: 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-gray-600">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-500">Image uploaded successfully!</span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg w-full"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg w-full"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg w-full"
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <Link
          className="bg-green-500 text-white p-3 rounded-lg text-center hover:bg-green-400 transition"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleDeleteUser}
          className="text-red-500 font-semibold"
        >
          Delete Account
        </button>
        <button
          onClick={handleSignOut}
          className="text-red-500 font-semibold"
        >
          Sign Out
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {updateSuccess && (
        <p className="text-green-500 mt-4">Profile updated successfully!</p>
      )}
      <button
        onClick={handleShowListings}
        className="w-full bg-gray-800 text-white py-3 mt-8 rounded-lg hover:bg-gray-700 transition"
      >
        Show Listings
      </button>
      {showListingsError && (
        <p className="text-red-500 mt-4">Error fetching listings</p>
      )}
      {userListings.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Listings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-4 flex flex-col items-center"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </Link>
                <Link
                  className="text-blue-600 font-semibold hover:underline mt-3 text-center"
                  to={`/listing/${listing._id}`}
                >
                  {listing.name}
                </Link>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update-listing/${listing._id}`}
                    className="text-green-500"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import placeholderImage from './placeholder.jpg';

const OwnerProfile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/user/${user}`);
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          console.log(userData)
        } else {
          setError('Failed to fetch user data');
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) {
    return <div className="py-2 px-4 text-center text-uppercase fw-bolder">loading <i class="fa-solid fa-spinner fa-spin-pulse"></i></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  const imageUrl = userData.photo ? userData.photo : placeholderImage;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-200 mb-4">
      <img src={imageUrl} alt="Owner's Profile" className="w-32 h-32 rounded-full mb-4 object-cover" />
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{userData.name}</h2>
        <div className="mb-2">
          <label className="font-semibold">Email:</label>
          <p>{userData.email_adress}</p>
        </div>
        <div className="mb-2">
          <label className="font-semibold">Role:</label>
          <p>{userData.role}</p>
        </div>
        <div className="mb-2">
          <label className="font-semibold">Phone Number:</label>
          <p>{userData.phone_number}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;

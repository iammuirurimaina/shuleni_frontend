
import React, { useEffect, useState } from "react";

const EducatorProfile = ({user}) => {
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
          console.log(user)
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  const imageUrl = userData.photo 

  return (
    <div className="flex flex-col items-center p-4 bg-gray-200 mb-4">
      <img src={imageUrl} alt="Educator's Profile" className="w-32 h-32 rounded-full mb-4 object-cover" />
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
export default EducatorProfile;
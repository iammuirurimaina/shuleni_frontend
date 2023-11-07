import React from 'react';
import OwnerProfile from './OwnerProfile';
import SchoolCard from './Schoolcard';
import Sidebar from './SideBar';


// const OwnerDashboard = ({  user, schools, onDeleteSchool, onUpdateSchool }) => {
//   return (
//     <div className="flex">
//       <div className="w-1/4">
//         <OwnerProfile user={user} />
//       </div>
//       <div className="w-3/4 p-8">
//         <h2 className="text-2xl font-bold mb-4">My Schools</h2>
//         <div className="flex flex-wrap">
//           {schools.map((school) => (
//             <SchoolCard key={school.id} school={school} onDelete={onDeleteSchool} onUpdate={onUpdateSchool} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;
const dummySchools = [
  {
    id: 1,
    school_name: 'School 1',
    poster: 'https://img.freepik.com/free-photo/medium-shot-boy-portrait-with-graduation-background_23-2150293635.jpg?size=626&ext=jpg',
    location: 'City 1',
  },
  {
    id: 2,
    school_name: 'School 2',
    poster: 'https://img.freepik.com/free-photo/medium-shot-boy-portrait-with-graduation-background_23-2150293635.jpg?size=626&ext=jpg',
    location: 'City 2',
  },
  {
    id: 3,
    school_name: 'School 3',
    poster: 'https://img.freepik.com/free-photo/medium-shot-boy-portrait-with-graduation-background_23-2150293635.jpg?size=626&ext=jpg',
    location: 'City 3',
  },
 
];

const dummyUser = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@example.com',
 
};



const OwnerDashboard = ({ user, schools, onDeleteSchool, onUpdateSchool }) => {
  // Use dummy data if schools prop is empty
  const schoolData = dummySchools;

  return (
    <div className="flex flex-col md:flex-row">
      < Sidebar />
      <div className="md:w-1/4 flex justify-center md:items-center bg-gray-200 p-4">
        <OwnerProfile user={user || dummyUser} />
      </div>
      <div className="md:w-3/4 md:flex flex-col">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">My Schools</h2>
          <div className="flex flex-wrap mb-8">
            {schoolData.map((school) => (
              <SchoolCard key={school.id} school={school} onDelete={onDeleteSchool} onUpdate={onUpdateSchool} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
            }
export default OwnerDashboard;
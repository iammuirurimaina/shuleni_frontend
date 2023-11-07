import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Chat from './components/ChatPage/Chat';
import Users from './components/UsersPage/Users';
import AddUsers from './components/UsersPage/AddUsers';
import EditUsers from './components/UsersPage/EditUsers';
import AddSchools from './components/Owners/AddSchools';
import StudentDashboard from './components/Student/StudentDashboard';
import CreateClass from './components/Educator/CreateClass'
import EditClass from './components/Educator/EditClass'
import AddNotes from './components/Educator/AddResources'
import OwnerDashboard from './components/Owners/OwnerDashboard';
import EducatorDashboard from './components/Educator/EducatorDashboard';
import Resources from './components/Student/Resources';
import AddResources from './components/Educator/AddResources'


function App() {
  return (
    <Router>
    <div className='font-sans'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/users" element={<Users />} />

          <Route path='/add-Schools' element={<AddSchools />} />
          <Route path='/owner-dashboard' element={<OwnerDashboard /*user={user.id} roleId = {1}*//> }/>
          <Route path='/educator-dashboard' element={<EducatorDashboard /*user={user.id} roleId = {1}*/ />} />
      
          <Route path='/student-dashboard' element={<StudentDashboard /*user={user.id} roleId = {1}*//>} />
           <Route path='create-class' element={<CreateClass />} />
          <Route path='/users/:id' element={<EditUsers />} />
          <Route path='/edit-class' element={<EditClass />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/add-resources' element={<AddResources />} />

          
          



          <Route path='/add-users' element={<AddUsers />} />
          <Route path='/users/:id' element={<EditUsers />} />

  
      </Routes>
    </div>
  </Router>

  );
}

export default App;

import React, { useState, useEffect } from 'react';
import EducatorSidebar from "./EducatorSideBar";
import { useNavigate } from 'react-router-dom';

const AddResources = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ title: '', type: '', url: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/resources');
        if (response.ok) {
          const data = await response.json();
          setResources(data);
        } else {
          console.error('Failed to fetch resources:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleAddResource = async () => {
    try {
      const response = await fetch('/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResource),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setResources([...resources, data]);
        setNewResource({ title: '', type: '', url: '', educator_id: '', content: '' });
      } else {
        console.error('Failed to add resource:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <EducatorSidebar />
      <div className="md:w-3/4 p-4">
        <h2 className="text-3xl font-bold mb-4">Class Resources</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Add New Resource</h3>
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              name="title"
              value={newResource.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="border p-2 w-full md:w-1/4"
            />
            <input
              type="text"
              name="type"
              value={newResource.type}
              onChange={handleInputChange}
              placeholder="Type"
              className="border p-2 w-full md:w-1/4"
            />
            <input
              type="text"
              name="url"
              value={newResource.url}
              onChange={handleInputChange}
              placeholder="URL"
              className="border p-2 w-full md:w-1/4"
            />
            <input
              type="text"
              name="educator_id"
              value={newResource.educator_id}
              onChange={handleInputChange}
              placeholder="Educator ID"
              className="border p-2 w-full md:w-1/4"
            />
            <input
              type="text"
              name="content"
              value={newResource.content}
              onChange={handleInputChange}
              placeholder="Content"
              className="border p-2 w-full md:w-1/4"
            />
            <button onClick={handleAddResource} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {resources.map(resource => (
            <div key={resource.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
              <div className="bg-white border rounded-xl p-4 h-full">
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600">Type: {resource.type}</p>
                <p className="text-gray-600">URL: {resource.url}</p>
                <p className="text-gray-600">Content: {resource.content}</p>
                <p className="text-gray-600">Educator: {resource.educator}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddResources;

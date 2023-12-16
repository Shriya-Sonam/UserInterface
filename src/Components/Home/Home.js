import React, { useEffect, useState } from 'react';
import SearchBar from '../Searchbar';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Home = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );

      const data = await response.json();
      setMembers(data);
      setFilteredMembers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredResults = members.filter((member) =>
      Object.values(member).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredMembers(filteredResults);
  };

  const handleCheckboxChange = (memberId) => {
    const updatedSelectedMembers = selectedMembers.includes(memberId)
      ? selectedMembers.filter((id) => id !== memberId)
      : [...selectedMembers, memberId];

    setSelectedMembers(updatedSelectedMembers);
  };

  const handleSelectAll = () => {
    const newSelectedMembers =
      selectedMembers.length === filteredMembers.length
        ? []
        : filteredMembers.slice(0, 10).map((member) => member.id);

    setSelectedMembers(newSelectedMembers);
  };

  const handleDelete = (memberId) => {
    const updatedMembers = members.filter((member) => member.id !== memberId);

    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
  };

  const handleEdit = (memberId) => {
    console.log(`Edit member with ID ${memberId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <SearchBar onSearch={handleSearch} />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 border-b">
              <input
                type="checkbox"
                checked={
                  selectedMembers.length === filteredMembers.length &&
                  filteredMembers.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Email</th>
            <th className="py-2 border-b">Role</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr
              key={member.id}
              className={`${
                selectedMembers.includes(member.id) ? 'bg-gray-200' : ''
              } hover:bg-gray-100`}
            >
              <td className="py-2 px-1 border-b">
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(member.id)}
                  onChange={() => handleCheckboxChange(member.id)}
                />
              </td>
              <td className="py-2 px-4 border-b">{member.name}</td>
              <td className="py-2 px-4 border-b">{member.email}</td>
              <td className="py-2 px-4 border-b">{member.role}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-gray-800 p-2 mr-2 border border-gray-400 rounded" onClick={() => handleEdit(member.id)}> <FaEdit /></button>
                <button className="text-red-500 p-2 border border-gray-400 rounded" onClick={() => handleDelete(member.id)}> <FaTrash /> </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

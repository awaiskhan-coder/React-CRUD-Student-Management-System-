import axios from "axios";
import React, { useEffect, useState } from "react";

const Student = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    city: "",
    age: "",
  });

  const [students, setStudents] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  //
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${editId}`,
        student,
      );
      setStudents(
        students.map((item) =>
          item.id === editId ? { ...item, ...student } : item,
        ),
      );
      setIsEdit(false);
      setEditId(null);
    } else {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        student,
      );
      console.log(response.data);
      setStudents([...students, { ...response.data, id: Date.now() }]);
    }

    setStudent({
      name: "",
      email: "",
      city: "",
      age: "",
    });
  };
  //
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (student) => {
    try {
      console.log(student);

      setStudent({
        name: student.name,
        email: student.email,
        city: student.address?.city || student.city,
        // age: student.age || "",
      });
      setEditId(student.id);
      setIsEdit(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    setStudents(students.filter((student) => student.id !== id));
  };

  useEffect(() => {
    fetchStudents();
    console.log(students);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
        {/* Main Container */}
        <div className="max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="flex justify-center mb-8">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800 w-full max-w-md rounded-2xl p-6 shadow-xl"
            >
              <h1 className="text-white text-3xl font-bold text-center mb-6">
                Student Form
              </h1>

              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full bg-gray-100 rounded-lg p-3 mt-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="email"
                value={student.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full bg-gray-100 rounded-lg p-3 mt-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="city"
                value={student.city}
                onChange={handleChange}
                placeholder="Enter Your City"
                className="w-full bg-gray-100 rounded-lg p-3 mt-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 mt-5 transition">
                {isEdit ? "Update Student" : "Add Student"}
              </button>
            </form>
          </div>

          {/* Students Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-gray-800 text-white rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition"
              >
                <h2 className="text-lg font-semibold">
                  Name:
                  <span className="font-normal ml-2">{student.name}</span>
                </h2>

                <h2 className="mt-2">
                  Email:
                  <span className="ml-2 text-gray-300">{student.email}</span>
                </h2>

                <h2 className="mt-2">
                  City:
                  <span className="ml-2 text-gray-300">
                    {student.address?.city || student.city}
                  </span>
                </h2>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => handleEdit(student)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg p-2 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(student.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded-lg p-2 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;

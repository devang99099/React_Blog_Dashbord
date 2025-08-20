import React, { useEffect, useState } from "react";
import { getPost, deletePost } from "../API/PostAPI";
import AddpostForm from "./AddpostForm";

const Posts = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getPost();
      setData(res.data);
    })();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  const handleUpdatePost = (post) => {
    setUpdateData(post);
    setShowForm(true);
  };

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="bg-black text-white py-4 shadow-md">
        <h1 className="text-3xl font-semibold text-center">Post Dashbord</h1>
      </div>

      {showForm ? (
        <div className="p-6">
          <AddpostForm
            data={data}
            setData={setData}
            updateData={updateData}
            onSuccess={() => {
              setShowForm(false);
              setUpdateData(null);
            }}
          />
          <div className="text-center mt-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => {
                setShowForm(false);
                setUpdateData(null);
              }}
            >
              Cancel / Back
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="px-10 flex justify-end py-5">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowForm(true)}
            >
              Add Post
            </button>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-10">
            {data.map(({ id, title, body }) => (
              <li
                key={id}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 mb-3">
                    {title}
                  </h2>
                  <p className="text-gray-700">{body}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleUpdatePost({ id, title, body })}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDeletePost(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Posts;

import React, { useEffect, useState } from "react";
import { addPost, updatePost } from "../API/PostAPI";

const AddpostForm = ({ data, setData, onSuccess, updateData }) => {
  const [formData, setFormData] = useState({ title: "", body: "" });

  const isEditMode = Boolean(updateData);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: updateData.title,
        body: updateData.body,
      });
    } else {
      setFormData({ title: "", body: "" });
    }
  }, [updateData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) {
      return alert("Please fill in both Title and Body");
    }

    try {
      if (isEditMode) {
        const res = await updatePost(updateData.id, formData);
        setData((prev) =>
          prev.map((post) => (post.id === res.data.id ? res.data : post))
        );
      } else {
        const res = await addPost(formData);
        if (res.status === 201) {
          setData([res.data, ...data]);
        }
      }
      onSuccess();
    } catch (error) {
      console.log("Submit Error:", error);
    }
  };

  return (
    <div className="bg-white max-w-xl mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center text-blue-700 mb-4">
        {isEditMode ? "Edit Post" : "Add New Post"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Body"
          className="w-full px-4 py-2 border rounded"
          value={formData.body}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update Post" : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddpostForm;

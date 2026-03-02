"use client";
import { useState } from "react";
import { useAddCategory } from "@/lib/api/dashboard/categoriesApi";
import { useQueryClient } from "@tanstack/react-query";

export function AddCategory({categoriesData}) {

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [image, setImage] = useState(null);

  const queryClient = useQueryClient();
  const { mutate, isAddCategoryLoading, isSuccess } = useAddCategory();

  // console.log(categoriesData);
    
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("parent", parent);
    formData.append("image", image);

    mutate(formData);
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    
    if(isSuccess){
      clearForm();
      
    }

    
  };

  // clear form fields
  const clearForm = () => {
    setName("");
    setParent("");
    setImage(null);
  }


  return (
    <div className="bg-card px-4 py-6 mb-4 rounded">
        <div>
          <p className="font-semibold text-lg mb-3">Add Category</p>
          <div className="flex">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="flex-1 border border-[#2f2f2f] rounded py-2 px-4" placeholder="Category Name" />

                <select onChange={(e) => setParent(e.target.value)} value={parent} className="flex-1 border border-[#2f2f2f] rounded py-2 px-4">
                  <option value="">Select Parent</option>
                  <option value="">None</option>
                  {categoriesData?.categories.map((category) => (
                    <option key={category._id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <input onChange={(e) => setImage(e.target.files[0])} type="file"  className="flex-1 border border-[#2f2f2f] rounded py-2 px-4" />
                <button disabled={isAddCategoryLoading} className="flex-1 bg-purple-800 py-2 px-4 rounded text-white">{isAddCategoryLoading ? "Adding..." : "Add Category"}</button>
              </form>
          </div>
        </div>
      </div>
  )
}
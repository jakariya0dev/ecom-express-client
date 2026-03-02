"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateCategory } from "@/lib/api/admin/categoriesApi";
import { toast } from "react-toastify";

export function UpdateCategory({selectedCategory, categoriesData, close}) {
  
  const updateMutation = useUpdateCategory();

  const [name, setName] = useState(selectedCategory.name);
  const [parentId, setParentId] = useState(null);
  const [image, setImage] = useState(null);

  const queryClient = useQueryClient();

  // console.log(selectedCategory);
    
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", selectedCategory.id);
    formData.append("name", name);
    if(parentId) formData.append("parent", parentId);
    if(image) formData.append("image", image);

    
    updateMutation.mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        toast.success(res.data.message);
      },
      onError: (error) => {
        toast.error(error.response.data.message);
        console.log(error.message);
      },
      onSettled: () => {
          close();    
      },
    });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    
  };


  return (
    <div className="bg-card px-4 py-6 mb-4 rounded">
        <div>
          <p className="font-semibold text-lg mb-3">Update Category</p>
          <div className="">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="flex-1 border border-[#2f2f2f] rounded py-2 px-4" placeholder="Category Name" />

                <select onChange={(e) => setParentId(e.target.value)} className="flex-1 border border-[#2f2f2f] rounded py-2 px-4">
                  <option value="">Select Parent</option>
                  <option value="">None</option>
                  {categoriesData?.map((category) => (
                    <option selected={category.id === selectedCategory?.parent?.id} key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <input onChange={(e) => setImage(e.target.files[0])} type="file"  className="flex-1 border border-[#2f2f2f] rounded py-2 px-4" />
                {/* <Image src={category.image?.src} width={100} height={100} alt="category image" /> */}
                <button disabled={updateMutation.isPending} className="flex-1 bg-purple-800 py-2 px-4 rounded text-white">{updateMutation.isPending ? "updating..." : "Update Category"}</button>
              </form>
          </div>
        </div>
      </div>
  )
}
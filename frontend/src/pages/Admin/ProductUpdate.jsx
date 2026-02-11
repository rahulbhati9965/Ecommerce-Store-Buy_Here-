// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useGetProductByIdQuery,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import AdminMenu from "./AdminMenu";
// import { toast } from "react-toastify";

// const ProductUpdate = () => {
//   const params = useParams();

//   const { data: productData } = useGetProductByIdQuery(params._id);

//   const [image, setImage] = useState(productData?.image || "");
//   const [name, setName] = useState(productData?.name || "");
//   const [description, setDescription] = useState(
//     productData?.description || ""
//   );
//   const [price, setPrice] = useState(productData?.price || "");
//   const [quantity, setQuantity] = useState(productData?.quantity || "");
//   const [category, setCategory] = useState(productData?.category || "");
//   const [brand, setBrand] = useState(productData?.brand || "");
//   const [stock, setStock] = useState(productData?.countInstock || "");

//   const navigate = useNavigate();

//   const { data: categories = [] } = useFetchCategoriesQuery();
//   const [uploadProductImage] = useUploadProductImageMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();

//   useEffect(() => {
//     if (productData && productData._id) {
//       setName(productData.name);
//       setDescription(productData.description);
//       setPrice(productData.price);
//       setCategory(productData.categories?._id);
//       setQuantity(productData.quantity);
//       setBrand(productData.brand);
//       setImage(productData.image);
//     }
//   }, [productData]);

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);
//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success("Item added successfully");
//       setImage(res.image);
//     } catch (error) {
//       toast.error("Item update failes");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("quantity", quantity);
//       formData.append("brand", brand);
//       formData.append("countInStock", stock);

//       const { data } = await updateProduct({ productId: params._id, formData });

//       if (data.error) {
//         toast.error(data.error);
//       } else {
//         toast.success(`Product successfully updated`);
//         navigate("/admin/allproductslist");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Product updation failed, Try again");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       let answer = window.confirm(
//         "Are you sure you want to delete this product?"
//       );
//       if (!answer) return;
//       const { data } = await deleteProduct(params._id);
//       toast.success(`${data.name} is deleted`);
//       navigate(`/admin/allproductslist`);
//     } catch (error) {
//       console.log(error);
//       toast.error("delete failed, try again");
//     }
//   };

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3 ">
//           <div className="h-12">Create Product</div>

//           {/* {imageUrl && (
//             <div className="text-centre">
//               <img
//                 src={imageUrl}
//                 alt="product"
//                 className="block mx-auto max-h-[200px]"
//               />
//             </div>
//           )} */}

//           <div className="mb-3">
//             <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               {image ? image.name : "Upload Image"}

//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={uploadFileHandler}
//                 className={!image ? "hidden" : "text-white"}
//               />
//             </label>
//           </div>

//           <div className="p-3">
//             <div className="flex flex-wrap">
//               <div className="one">
//                 <label htmlFor="name">Name</label> <br />
//                 <input
//                   type="text"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white  "
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="two ml-10">
//                 <label htmlFor="name block">Price</label> <br />
//                 <input
//                   type="number"
//                   className="  p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white  "
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-wrap">
//               <div className="one">
//                 <label htmlFor="name block">Quantity</label> <br />
//                 <input
//                   type="number"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white  "
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="two ml-10">
//                 <label htmlFor="name block">Brand</label> <br />
//                 <input
//                   type="text"
//                   className="  p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white  "
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                 />
//               </div>
//             </div>

//             <label htmlFor="" className="my-5">
//               Description
//             </label>
//             <textarea
//               type="text"
//               className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>

//             <div className="flex justify-between">
//               <div>
//                 <label htmlFor="name block">Count in stock</label> <br />
//                 <input
//                   type="number"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
//                   value={stock}
//                   onChange={(e) => setStock(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="">Category</label> <br />
//                 <select
//                   placeholder="Choose Category"
//                   className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   {categories?.map((c) => (
//                     <option key={c._id} value={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductUpdate;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const { id } = useParams(); // Corrected to match the route parameter name

  const { data: productData } = useGetProductByIdQuery(id);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || ""); // Ensure category is set
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0]._id); // Set the first category as default
    }
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a valid category");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const { data } = await updateProduct({ productId: id, formData });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed, try again");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      const { data } = await deleteProduct(id);
      toast.success(`${data.name} has been deleted`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.error(error);
      toast.error("Product deletion failed, try again");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? "Change Image" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="quantity">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="brand">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="description" className="my-5">
              Description
            </label>
            <textarea
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="stock">Count in Stock</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="category">Category</label> <br />
                <select
                  value={category}
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

// import {
//   setCategories,
//   setProducts,
//   setChecked,
// } from "../redux/features/shop/shopSlice";
// import Loader from "../components/Loader";
// import ProductCard from "./Products/ProductCard";

// const Shop = () => {
//   const dispatch = useDispatch();
//   const { categories, products, checked, radio } = useSelector(
//     (state) => state.shop
//   );

//   const categoriesQuery = useFetchCategoriesQuery();
//   const [priceFilter, setPriceFilter] = useState("");

//   const filteredProductsQuery = useGetFilteredProductsQuery({
//     checked,
//     radio,
//   });

//   useEffect(() => {
//     if (!categoriesQuery.isLoading) {
//       dispatch(setCategories(categoriesQuery.data));
//     }
//   }, [categoriesQuery.data, dispatch]);

//   useEffect(() => {
//     if (!checked.length || !radio.length) {
//       if (!filteredProductsQuery.isLoading) {
//         // filter products based on both checked categories and price filter
//         const filteredProducts = filteredProductsQuery.data.filter(
//           (product) => {
//             // Check if the product price includes the enntered price filter value
//             return (
//               product.price.toString().includes(priceFilter) ||
//               product.price === parseInt(priceFilter, 10)
//             );
//           }
//         );

//         dispatch(setProducts(filteredProducts));
//       }
//     }
//   }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

//   const handleBrandClick = (brand) => {
//     const productsByBrand = filteredProductsQuery.data?.filter(
//       (product) => product.brand === brand
//     );
//     dispatch(setProducts(productsByBrand));
//   };

//   const handleCheck = (value, id) => {
//     const updatedChecked = value
//       ? [...checked, id]
//       : checked.filter((c) => c !== id);
//     dispatch(setChecked(updatedChecked));
//   };

//   // add ALL BRANDS option to uniqueBrands

//   const uniqueBrands = [
//     ...Array.from(
//       new Set(
//         filteredProductsQuery.data
//           ?.map((product) => product.brand)
//           .filter((brand) => brand !== undefined)
//       )
//     ),
//   ];

//   const handlePriceChange = (e) => {
//     // Update the price filter state when the user types in the input field
//     setPriceFilter(e.target.value);
//   };

//   return (
//     <>
//       <div className="container mx-auto">
//         <div className="flex md:flex-row">
//           <div className="bg-[#151515] p-3 mt-2 mb-2">
//             <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
//               filter By Categories
//             </h2>

//             <div className="p-5 w-[15rem]">
//               {categories?.map((c) => (
//                 <div key={c._id} className="mb-2">
//                   <div className="flex items-center mr-4">
//                     <input
//                       type="checkbox"
//                       id="red-checkbox"
//                       onChange={(e) => handleCheck(e.target.checked, c._id)}
//                       className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />

//                     <label
//                       htmlFor="pink-checkbox"
//                       className="ml-2 text-small font-medium text-white dark:text-gray-300"
//                     >
//                       {c.name}
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
//               Filter By Brands
//             </h2>

//             <div className="p-5">
//               {/* {uniqueBrands?.map((brand) => (
//                 <>
//                   <div className="flex items-center mr-4 mb-5">
//                     <input
//                       type="radio"
//                       id={brand}
//                       name="brand"
//                       onChange={() => handleBrandClick(brand)}
//                       className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />

//                     <label
//                       htmlFor="pink-radiio"
//                       className="ml-2 text-sm font-medium text-white dark:text-gray-300"
//                     >
//                       {brand}
//                     </label>
//                   </div>
//                 </>
//               ))} */}
//               {uniqueBrands?.map((brand) => (
//                 <div key={brand} className="flex items-center mr-4 mb-5">
//                   <input
//                     type="radio"
//                     id={brand}
//                     name="brand"
//                     onChange={() => handleBrandClick(brand)}
//                     className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <label
//                     htmlFor={brand}
//                     className="ml-2 text-sm font-medium text-white dark:text-gray-300"
//                   >
//                     {brand}
//                   </label>
//                 </div>
//               ))}
//             </div>

//             <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
//               Filter By Price
//             </h2>

//             <div className="p-5 w-[15rem]">
//               <input
//                 type="text"
//                 placeholder="Enter Price"
//                 value={priceFilter}
//                 onChange={handlePriceChange}
//                 className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300 bg-gray-900 text-white"
//               />
//             </div>

//             <div className="p-5 pt-0">
//               <button
//                 className="w-full border my-4"
//                 onClick={() => window.location.reload()}
//               >
//                 Reset
//               </button>
//             </div>
//           </div>

//           <div className="p-3">
//             <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
//             {/* <div className="flex flex-wrap">
//               {products.length === 0 ? (
//                 <Loader />
//               ) : (
//                 products?.map((p) => (
//                   <div className="p-3 " key={p._id}>
//                     <ProductCard p={p} />
//                   </div>
//                 ))
//               )}
//             </div> */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
//               {products.length === 0 ? (
//                 <Loader />
//               ) : (
//                 products?.map((p) => (
//                   <div key={p._id}>
//                     <ProductCard p={p} />
//                   </div>
//                 ))
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Shop;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [maxPrice, setMaxPrice] = useState(50000);

  // Set categories on load
  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  // Filter products by category/brand and price range
  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data?.length > 0) {
      const allPrices = filteredProductsQuery.data.map(p => p.price);
      const dynamicMax = Math.max(...allPrices);
      setMaxPrice(dynamicMax);

      // Reset range when categories/brands change
      if (priceRange[1] === 50000 || priceRange[1] > dynamicMax) {
        setPriceRange([0, dynamicMax]);
      }

      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      });

      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceRange]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  return (
    <div className="container mx-auto">
      <div className="flex md:flex-row">
        {/* Sidebar Filters */}
        <div className="bg-[#151515] p-3 mt-2 mb-2">
          {/* Category Filter */}
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter By Categories</h2>
          <div className="p-5 w-[15rem]">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2">
                <div className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus ring-pink-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-white">{c.name}</label>
                </div>
              </div>
            ))}
          </div>

          {/* Brand Filter */}
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter By Brands</h2>
          <div className="p-5">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="flex items-center mr-4 mb-5">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor={brand} className="ml-2 text-sm font-medium text-white">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          {/* Price Range Filter */}
          <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">Filter By Price</h2>
          <div className="p-5 w-[15rem]">
            <Slider
              range
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              trackStyle={[{ backgroundColor: "#ec4899" }]}
              handleStyle={[
                { borderColor: "#ec4899", backgroundColor: "#ec4899" },
                { borderColor: "#ec4899", backgroundColor: "#ec4899" },
              ]}
            />
            <div className="flex justify-between text-white text-sm mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>

          {/* Reset Button */}
          <div className="p-5 pt-0">
            <button className="w-full border my-4" onClick={() => window.location.reload()}>
              Reset
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-3 flex-1">
          <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

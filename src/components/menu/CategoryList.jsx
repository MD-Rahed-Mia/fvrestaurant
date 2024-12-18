import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";

export default function CategoryList({ handleOnChange, categoryValue }) {
  console.log(categoryValue);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function getCategoryList() {
      try {
        const { data } = await axiosInstance.get(`/category/all`);

        console.log(data);
        setCategory(data.result);
      } catch (error) {
        console.log(error.message);
      }
    }

    getCategoryList();
  }, []);

  return (
    <div>
      <select
        name="category"
        id="category"
        className="w-full border py-2 px-2 rounded-lg"
        onChange={handleOnChange}
        value={categoryValue.category}
      >
        select category
        <option value="" selected disabled>
          Select category
        </option>
        {category &&
          category.map((item, index) => {
            return (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}

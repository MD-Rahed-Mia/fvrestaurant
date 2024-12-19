import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import Loading from "../loading/Loading";

export default function CategoryList({ handleOnChange, categoryValue }) {
  console.log(categoryValue);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    async function getCategoryList() {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/category/all`);

        console.log(data);
        setCategory(data.result);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }

    getCategoryList();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
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
          {loading ? (
            <Loading />
          ) : (
            category &&
            category.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })
          )}
        </select>
      )}
    </div>
  );
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAllCategories } from "../../store/categorySlice";

const CategoryDropDown = (props) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const { categoryList, appError, serverError, loading } = category;

  const allCategories = categoryList?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  const handleChange = (value) => {
    props.onChange("category", value);
  };

  const handleBlur = () => {
    props.onBlur("category", true);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      {loading ? (
        <h3 className="text-base text-green-600">Category List Loading...</h3>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id="category"
          options={allCategories}
          value={props?.value?.label}
        />
      )}
      {props?.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
      )}
    </div>
  );
};

export default CategoryDropDown;

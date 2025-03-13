import { useEffect } from "react";
import { useSelector } from "react-redux";

const Categories = () => {
  const { currentUser } = useSelector(
    (state: { user: { currentUser: any } }) => state.user
  );

  useEffect(() => {}, [currentUser._id]);

  return (
    <div className="w-full xs:w-5/6  h-fit mx-auto flex flex-col gap-y-3 bg-surfaceBg p-6 border border-surfaceBorder rounded">
      mahdi is the best
    </div>
  );
};

export default Categories;

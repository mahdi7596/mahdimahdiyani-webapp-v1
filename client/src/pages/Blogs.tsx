import banner from "../assets/images/banner.jpg";

const Blogs = () => {
  return (
    <div className="section-container section-inner-space">
      <div className="flex bg-blue-500 p-1">
        <img
          src={banner}
          className="w-full h-48 rounded-lg"
          alt="blogs-list-banner"
        />
        <div className="absolute bg-red-500" />
      </div>
    </div>
  );
};

export default Blogs;

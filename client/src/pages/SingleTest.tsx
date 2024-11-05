import { useLocation, useNavigate } from "react-router-dom";

import video from "../assets/short-video.mp4";

const SingleTest = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  console.log(location.state.selectedVideo2[0]);

  const reserved = location.state.selectedVideo2[0];

  return (
    <div className="section-container py-8 flex items-center">
      <div className="w-1/2 flex flex-col gap-y-9">
        <h2 className="font-extrablack text-6xl flex items-center gap-x-12">
          {location.state.selectedVideo2[0].name}
          <span className="btn btn-primary btn-outline pointer-events-none rounded-full text-white w-fit self-end">
            امتیاز کسب شده{" "}
            <span className="font-black text-lg">
              {location.state.selectedVideo2[0].rate}
            </span>
          </span>
        </h2>
        <p className="text-lg">
          {location.state.selectedVideo2[0].description}
        </p>
        <button
          onClick={() => {
            navigate("/gifttest", {
              replace: true,
              state: { reserved },
            });
          }}
          className="btn btn-primary btn-lg w-full mx-auto"
        >
          مشاهده جایزه
        </button>
      </div>
      <div className="w-1/2 flex justify-end">
        <video className="object-fill" src={video} controls></video>
      </div>
    </div>
  );
};

export default SingleTest;

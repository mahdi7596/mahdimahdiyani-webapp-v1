type LoadingProps = {
  text?: string;
};

const Loading = ({ text = "در حال بارگذاری..." }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
      <span className="loading loading-bars loading-lg"></span>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default Loading;

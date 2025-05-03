interface BannerProps {
  banner: string;
  title: string;
  description: string;
}

const Banner = ({ banner, title, description }: BannerProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${banner})` }}
      className="relative min-h-fit lg:h-48 flex flex-col items-center gap-y-4 py-8 px-6 md:px-16 lg:px-24 bg-no-repeat bg-cover bg-center rounded-lg"
    >
      <h2 className="z-10 text-2xl text-white">{title}</h2>
      <p className="z-10 text-neutrals100 text-center">{description}</p>
      <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-60" />
    </div>
  );
};

export default Banner;

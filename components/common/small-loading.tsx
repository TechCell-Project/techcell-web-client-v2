import MoonLoader from 'react-spinners/MoonLoader';

const SmallLoading = () => {
  return (
    <div className="w-full h-14 flex flex-col items-center justify-center gap-5">
      <MoonLoader loading color="#ee4949" size={40} />
    </div>
  );
};

export default SmallLoading;

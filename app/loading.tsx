import HashLoader from 'react-spinners/HashLoader';

const LoadingPage = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-5">
      <HashLoader loading color="#ee4949" size={50} />
      <span className="text-base">Xin vui lòng chờ ...</span>
    </div>
  );
};

export default LoadingPage;

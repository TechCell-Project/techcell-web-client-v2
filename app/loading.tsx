import { Icons } from '@/components/icons';
import HashLoader from 'react-spinners/HashLoader';

const LoadingPage = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-5">
      {typeof window !== 'undefined' ? (
        <HashLoader color="#ee4949" size={50} />
      ) : (
        <Icons.spinner className="text-primary mr-2 h-9 w-9 animate-spin" />
      )}
      <span className="text-base">Xin vui lòng chờ ...</span>
    </div>
  );
};

export default LoadingPage;

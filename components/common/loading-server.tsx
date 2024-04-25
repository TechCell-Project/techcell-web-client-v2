import { Icons } from '../icons';

const LoadingPageServer = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-5">
      <Icons.spinner className="h-14 w-14 animate-spin text-primary" />
      <span className="text-base">Đang tải ...</span>
    </div>
  );
};

export default LoadingPageServer;

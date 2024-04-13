import Image from "next/image";
import Banner from '@/public/banner.png'


const HomePage = () => {
    return (
        <div className="max-w-[!1320px]">
            <div className="mt-[10px]">
                <Image
                    src={Banner}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                    alt='banner'
                />
            </div>
        </div>
    );
}

export default HomePage;
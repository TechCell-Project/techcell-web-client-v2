import Image from "next/image";
import Banner from '@/public/banner.png'


const HomePage = () => {
    return (
        <div className="max-w-[!1320px]">
            <div className="mt-[10px]">
                <Image
                    src={Banner.src}
                    sizes='100vw'
                    width={1320}
                    height={300}
                    alt='banner'
                    className="w-full h-auto rounded-sm"
                />
            </div>
        </div>
    );
}

export default HomePage;
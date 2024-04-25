import { BrandScrolling } from "@/components/brands/brandscrolling";
import BannerSection from "@/components/home/banner-page";
import {ListProduct} from "@/components/home/list-product";

const BrandPage = () => {
  return (
    <div className="container">
      <BannerSection />
      <BrandScrolling />
      <ListProduct />
    </div>
  );
}

export default BrandPage;
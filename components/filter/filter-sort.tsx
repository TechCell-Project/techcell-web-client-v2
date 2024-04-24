import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  Banknote,
  Filter,
  Percent,
  Truck,
} from 'lucide-react';
import { Button } from '../ui/button';

const FILTER_SORT_MENU = [
  {
    name: 'Bộ lọc',
    icon: <Filter />,
  },
  {
    name: 'Sẵn hàng',
    icon: <Truck />,
  },
  {
    name: 'Giá',
    icon: <Banknote />,
  },
  {
    name: 'Bộ nhớ trong',
  },
  {
    name: 'Dung lượng RAM',
  },
  {
    name: 'Kích thước màn hình',
  },
  {
    name: 'Nhu cầu sử dụng',
  },
  {
    name: 'Kiểu màn hình',
  },
  {
    name: 'Tính năng camera',
  },
  {
    name: 'Tần số quét',
  },
  {
    name: 'Tính năng đặc biệt',
  },
];

const FILTER_LIST = [
  { name: 'Giá Cao - Thấp', icon: <ArrowDownWideNarrow /> },
  { name: 'Giá Thấp - Cao', icon: <ArrowDownNarrowWide /> },
  { name: 'Khuyến Mãi Hot', icon: <Percent /> },
];

const BlockFilterSort = () => {
  return (
    <>
      <div className="container">
        <div className="text-lg font-bold mb-2">Chọn theo tiêu chí</div>
        <div className="flex flex-wrap gap-4 mb-4">
          {FILTER_SORT_MENU.map((filter, index) => (
            <Button key={index}>
              <div className="mr-2">{filter.icon}</div> {filter.name}
            </Button>
          ))}
        </div>
        <div className="text-lg font-bold mb-2">Sắp xếp theo</div>
        <div className="flex flex-wrap gap-4">
          {FILTER_LIST.map((filter, index) => (
            <Button key={index}>
              <div className="mr-2">{filter.icon}</div> {filter.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlockFilterSort;

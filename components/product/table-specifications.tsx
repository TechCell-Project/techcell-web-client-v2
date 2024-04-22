import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { AttributeProps } from '@/constants/product-detail';
import { FC } from 'react';

const specifications = [
  {
    paymentStatus: 'Kích thước màn hình',
    paymentMethod: '6.1 inches',
  },
  {
    paymentStatus: 'Công nghệ màn hình',
    paymentMethod: 'Super Retina XDR OLED',
  },
  {
    paymentStatus: 'Camera sau',
    paymentMethod: 'Camera góc rộng: 12MP, f/1.6 Camera góc siêu rộng: 12MP, ƒ/2.4',
  },
  {
    paymentStatus: 'Camera trước',
    paymentMethod: '12MP, f/2.2',
  },
  {
    paymentStatus: 'Chipset',
    paymentMethod: 'Apple A15',
  },
  {
    paymentStatus: 'Apple A15',
    paymentMethod: '4 GB',
  },
  {
    paymentStatus: 'Bộ nhớ trong',
    paymentMethod: '128 GB',
  },
];



const TableSpecification  = () => {
  return (
    <div className="w-full relative bg-white p-3 mt-3 rounded-md">
      <div className="text-lg font-bold">Thông số kỹ thuật</div>
      <Table className="border-[1px] border-solid border-gray-300 rounded-md my-3">
        <TableBody>
          {specifications.map((specification, index) => (
            <TableRow key={index}>
              <TableCell>{specification.paymentStatus}</TableCell>
              <TableCell>{specification.paymentMethod}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSpecification;

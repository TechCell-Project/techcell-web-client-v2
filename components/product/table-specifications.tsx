import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { AttributeProps } from '@/constants/product-detail';
import { FC } from 'react';

interface TechnologyInformation {
  techInfo: AttributeProps[];
}

const TableSpecification: FC<TechnologyInformation>  = ({techInfo}) => {
  return (
    <div className="w-full relative bg-white p-3 mt-3 rounded-md">
      <div className="text-lg font-bold">Thông số kỹ thuật</div>
      <Table className="border-[1px] border-solid border-gray-300 rounded-md my-3">
        <TableBody>
          {techInfo.slice(0,8).map((specification, index) => (
            <TableRow key={index}>
              <TableCell>{specification.name}</TableCell>
              <TableCell>{specification.v}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSpecification;

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { AttributeProps } from '@/constants/product-detail';
import { AttributeInProductDto } from '@techcell/node-sdk';
import { FC } from 'react';
interface TableProps {
  specifications: AttributeInProductDto[];
}

const TableSpecification = ({ specifications }: TableProps) => {
  return (
    <div className="w-full">
      <div className="text-lg font-bold text-center">Thông số kỹ thuật</div>
      <Table className="border-[1px] border-solid border-gray-300 rounded-md my-3">
        <TableBody>
          {specifications.map((specification) => (
            <TableRow key={specification.k}>
              <TableCell>{specification.name}</TableCell>
              <TableCell>
                {specification.v} {specification.u && specification.u.toUpperCase()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSpecification;

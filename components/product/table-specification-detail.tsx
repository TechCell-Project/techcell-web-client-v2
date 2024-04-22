import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import '../../styles/dialog.css'
import { FC } from 'react';
import { AttributeProps } from '@/constants/product-detail';

interface TechnologyInformation {
  techInfo: AttributeProps[];
}

const TableSpecificationDetail: FC<TechnologyInformation>  = ({techInfo}) => {
  return (
    <div className="w-full h-auto bg-white p-2 rounded-md">
      <Table className="border-[1px] border-solid border-gray-300 rounded-md my-2">
        <TableBody>
          {techInfo.map((specification, index) => (
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

export default TableSpecificationDetail;

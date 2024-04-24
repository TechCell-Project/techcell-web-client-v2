import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { AttributeInProductDto } from '@techcell/node-sdk';
import '../../styles/dialog.css'

interface TechnologyInformation {
  techInfo: AttributeInProductDto[];
}

const TableSpecificationDetail = ({techInfo}: TechnologyInformation) => {
  return (
    <div className="w-full h-auto bg-white rounded-md">
      <Table className="border-[1px] border-solid border-gray-300 rounded-md my-2">
        <TableBody>
          {techInfo.map((specification, index) => (
            <TableRow key={specification.k}>
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

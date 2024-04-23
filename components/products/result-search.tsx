import { SearchCheck, SearchX } from 'lucide-react';

interface SearchingResultProps {
  isFound: boolean;
  keyword: string;
}

export default function SearchingResult({ isFound, keyword }: Readonly<SearchingResultProps>) {
  const message = isFound
    ? 'Hiển thị kết quả cho từ khóa'
    : 'Không tìm thấy sản phẩm nào với từ khóa';

  return (
    <div className="w-full text-primary flex items-center justify-center gap-4">
      {isFound ? <SearchCheck /> : <SearchX />}
      <h4 className="text-lg font-semibold">
        {message}
        {' '}<span className="underline font-bold">{keyword}</span>
      </h4>
    </div>
  );
}

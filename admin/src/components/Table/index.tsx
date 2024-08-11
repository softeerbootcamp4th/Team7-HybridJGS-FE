import { ReactNode, RefObject, forwardRef } from "react";

interface TableProps {
    headers: ReactNode[];
    data: ReactNode[][];
    dataLastItem?: RefObject<HTMLTableRowElement>;
}

const Table = forwardRef<HTMLDivElement, TableProps>(function Table(
    { headers, data, dataLastItem },
    ref
) {
    return (
        <div ref={ref} className="relative sm:rounded-lg w-[1560px] h-[600px] border">
            <div className="overflow-y-auto h-full table-contents">
                <table className="w-full text-sm rtl:text-right text-gray-500 text-center">
                    <thead className="sticky top-0 z-[5] text-gray-700 bg-gray-50">
                        <tr>
                            {headers.map((header, idx) => (
                                <th key={idx} scope="col" className="px-6 py-3 h-body-2-medium">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((tableData, idx) => (
                            <tr key={`table-data-${idx}`} className="bg-white border-b">
                                {tableData.map((dataNode, idx) => (
                                    <td
                                        key={`${headers[idx]}-data-${idx}`}
                                        className="px-6 py-4 h-body-2-regular"
                                    >
                                        {dataNode}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr ref={dataLastItem}></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default Table;

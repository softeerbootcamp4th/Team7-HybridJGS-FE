import { ReactNode } from "react";

interface TableProps {
    headers: ReactNode[];
    data: ReactNode[][];
    height?: string | number;
}

export default function Table({ headers, data, height = 600 }: TableProps) {
    return (
        <div className="relative sm:rounded-lg w-[1560px] border" style={{ height }}>
            <div className="overflow-y-auto h-full">
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
                    </tbody>
                </table>
            </div>
        </div>
    );
}

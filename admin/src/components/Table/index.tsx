import { ReactNode } from "react";

interface TableProps {
    headers: ReactNode[];
    data: ReactNode[][];
}

export default function Table({ headers, data }: TableProps) {
    return (
        <div className="relative sm:rounded-lg w-[1560px] h-[600px] border">
            <div className="overflow-y-auto h-full">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
                    <thead className="sticky top-0 z-[5] text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <tr
                                key={`table-data-${idx}`}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
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

import { ReactNode } from "react";

interface SelectFormProps {
    header: ReactNode;
    data: ReactNode[][];
}

export default function SelectForm({ header, data }: SelectFormProps) {
    return (
        <div className="relative sm:rounded-lg w-[730px] border">
            <div className="overflow-y-auto h-full">
                <table className="w-full text-sm rtl:text-right text-gray-500 text-center">
                    <thead className="sticky top-0 z-[5] text-gray-700 bg-gray-50">
                        <tr>
                            <th colSpan={2} className="px-6 py-3 h-body-2-medium">
                                {header}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((tableData, idx) => (
                            <tr key={`table-data-${idx}`} className="bg-white border-b">
                                {tableData.map((dataNode, idx) => (
                                    <td
                                        key={`${header}-data-${idx}`}
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

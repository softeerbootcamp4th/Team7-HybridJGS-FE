import { useEffect, useState } from "react";

interface FileInputProps {
    selectedFile: File | string | null;
    setSelectedFile: (file: File) => void;
}

const MAX_FILE_SIZE_MB = 1; // 1MB

export default function FileInput({ selectedFile, setSelectedFile }: FileInputProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }
        if (typeof selectedFile === "string") {
            setPreviewUrl(selectedFile);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);

            if (fileSizeInMB > MAX_FILE_SIZE_MB) {
                alert("파일이 너무 큽니다. 1MB 미만의 파일을 선택해주세요.");
                return;
            }

            const validTypes = ["image/jpeg", "image/png"];
            if (!validTypes.includes(file.type)) {
                alert("jpg 또는 png 파일만 업로드 가능합니다.");
                return;
            }

            setSelectedFile(file);
        }
    };

    return (
        <div>
            {previewUrl && (
                <img src={previewUrl} alt="Preview" style={{ width: "auto", maxHeight: "100px" }} />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    );
}

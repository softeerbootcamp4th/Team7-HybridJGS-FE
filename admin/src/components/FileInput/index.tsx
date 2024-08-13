import { useEffect, useState } from "react";

interface FileInputProps {
    selectedFile: File | string | null;
    setSelectedFile: (file: File) => void;
}

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
            const originalFileName = file.name;
            const fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

            const timestamp = Date.now();
            const newFileName = `${originalFileName.replace(fileExtension, "")}-${timestamp}${fileExtension}`;

            const renamedFile = new File([file], newFileName, { type: file.type });

            setSelectedFile(renamedFile);
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

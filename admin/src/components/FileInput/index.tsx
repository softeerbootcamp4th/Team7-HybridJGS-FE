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

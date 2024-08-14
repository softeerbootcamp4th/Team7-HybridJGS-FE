import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageAPI } from "@/apis/imageAPI";
import Button from "@/components/Button";
import FileInput from "@/components/FileInput";
import SelectForm from "@/components/SelectForm";
import TextField from "@/components/TextField";
import useFetchMultiple from "@/hooks/useFetchMultiple";
import useRushEventDispatchContext from "@/hooks/useRushEventDispatchContext";
import useRushEventStateContext from "@/hooks/useRushEventStateContext";
import useToast from "@/hooks/useToast";
import { PostImageResponse } from "@/types/imageApi";
import { RUSH_ACTION, RushOptionType } from "@/types/rush";

export default function RushSelectForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const rushIdx = location.state.idx;

    const { rushList } = useRushEventStateContext();
    const dispatch = useRushEventDispatchContext();

    const { showToast, ToastComponent } = useToast("입력한 내용이 임시 저장되었습니다!");

    const [selectOptionState, setSelectOptionState] = useState<RushOptionType[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<(File | string | null)[]>([]);

    const {
        results: images,
        isSuccess: isSuccessPostImage,
        fetchMultiple: postImage,
    } = useFetchMultiple<PostImageResponse, FormData>((formData, token) =>
        ImageAPI.postImage(formData, token)
    );

    useEffect(() => {
        if (rushIdx !== undefined) {
            setSelectOptionState(rushList[rushIdx].options);

            const optionFiles = rushList[rushIdx].options.map((option) => option.imageUrl);
            setSelectedFiles(optionFiles);
        }
    }, [rushList]);

    useEffect(() => {
        if (isSuccessPostImage) {
            const processedResults = [...selectedFiles];
            formDataArrayWithIndex.forEach((item, idx) => {
                if (images[idx]) {
                    const { imageUrl } = images[idx] as PostImageResponse;
                    processedResults[item.index] = imageUrl;
                }
            });

            const updatedSelectedOptions = selectOptionState.map((option, idx) => ({
                ...option,
                imageUrl: processedResults[idx] as string,
            }));
            setSelectOptionState(updatedSelectedOptions);

            const updatedTableItemList = rushList.map((item, idx) => {
                if (idx === rushIdx) {
                    return {
                        ...item,
                        options: updatedSelectedOptions,
                    };
                }
                return { ...item };
            });

            dispatch({
                type: RUSH_ACTION.SET_EVENT_LIST,
                payload: updatedTableItemList,
            });

            showToast();
        }
    }, [isSuccessPostImage]);

    const formDataArrayWithIndex = useMemo(() => {
        return selectedFiles
            .map((file, index) => {
                if (!(file instanceof File)) {
                    return null;
                }
                const formData = new FormData();
                formData.append("image", file);
                return { formData, index };
            })
            .filter((item): item is { formData: FormData; index: number } => item !== null);
    }, [images, selectedFiles]);

    const handleUpdate = async () => {
        const formDataArray = formDataArrayWithIndex.map((item) => item.formData);

        await postImage(formDataArray);
    };

    const handleChangeItem = (key: string, changeIdx: number, text: string | File) => {
        const updatedItem = selectOptionState.map((item, idx) => {
            if (idx === changeIdx) {
                return { ...item, [key]: text };
            }
            return { ...item };
        });

        setSelectOptionState(updatedItem);
    };

    const handleSelectFile = (file: File, idx: number) => {
        const currentFiles = selectedFiles.map((currentFile, currentIdx) => {
            if (currentIdx === idx) {
                return file;
            }
            return currentFile;
        });
        setSelectedFiles(currentFiles);
    };

    const getSelectOption = (idx: number) => {
        if (selectOptionState.length >= 2) {
            return [
                [
                    "메인 문구 (15자 이내)",
                    <TextField
                        value={selectOptionState[idx].mainText}
                        onChange={(e) => handleChangeItem("mainText", idx, e.target.value)}
                    />,
                ],
                [
                    "서브 문구 (40자 이내)",
                    <TextField
                        value={selectOptionState[idx].subText}
                        onChange={(e) => handleChangeItem("subText", idx, e.target.value)}
                    />,
                ],
            ];
        }
        return [];
    };
    const getSelectOptionResult = (idx: number) => {
        if (selectOptionState.length >= 2) {
            return [
                [
                    "이미지",
                    <FileInput
                        selectedFile={selectedFiles[idx]}
                        setSelectedFile={(file) => handleSelectFile(file, idx)}
                    />,
                ],
                [
                    "메인 문구 (20자 이내)",
                    <TextField
                        value={selectOptionState[idx].resultMainText}
                        onChange={(e) => handleChangeItem("resultMainText", idx, e.target.value)}
                    />,
                ],
                [
                    "서브 문구 (45자 이내)",
                    <TextField
                        value={selectOptionState[idx].resultSubText}
                        onChange={(e) => handleChangeItem("resultSubText", idx, e.target.value)}
                    />,
                ],
            ];
        }
        return [];
    };

    return (
        <div className="w-[1560px] flex flex-col items-center justify-center gap-8 mt-10">
            <div className="flex items-center gap-2 self-start">
                <img
                    alt="뒤로 가기 버튼"
                    src="/assets/icons/left-arrow.svg"
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <p className="h-body-1-medium">밸런스 게임 선택지 관리</p>
            </div>

            <div className="flex gap-10">
                <div className="flex flex-col gap-4">
                    <SelectForm header="옵션 1 선택지" data={getSelectOption(0)} />
                    <SelectForm header="옵션 1 선택 결과 정보" data={getSelectOptionResult(0)} />
                </div>
                <div className="flex flex-col gap-4">
                    <SelectForm header="옵션 2 선택지" data={getSelectOption(1)} />
                    <SelectForm header="옵션 2 선택 결과 정보" data={getSelectOptionResult(1)} />
                </div>
            </div>

            <Button buttonSize="lg" onClick={handleUpdate}>
                임시 저장
            </Button>

            {ToastComponent}
        </div>
    );
}

import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectForm from "@/components/SelectForm";

export default function Login() {
    const navigate = useNavigate();

    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const isValidButton = id.length !== 0 && password.length !== 0;

    const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO: 로그인 로직

        setErrorMessage("");
        navigate("/lottery");
    };

    const data = [
        [
            "메인 문구",
            <div>
                첫 차로
                <br />
                저렴한 차 사기
            </div>,
        ],
        [
            "서브 문구",
            <div>
                첫 차로
                <br />
                저렴한 차 사기
            </div>,
        ],
    ];

    return (
        <form
            className="flex flex-col gap-12 w-full h-screen justify-center items-center"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-8 items-end">
                <Input label="ID" value={id} onChange={handleChangeId} />
                <Input
                    label="PW"
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                />
            </div>

            <p className="h-[26px] h-body-1-medium text-red-400">{errorMessage}</p>

            <Button buttonSize="lg" isValid={isValidButton} type="submit">
                로그인
            </Button>

            <SelectForm header="옵션 1 선택지" data={data} />
        </form>
    );
}

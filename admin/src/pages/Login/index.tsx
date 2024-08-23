import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/apis/authAPI";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { COOKIE_KEY } from "@/constants/cookie";
import useFetch from "@/hooks/useFetch";
import { PostAuthResponse } from "@/types/authApi";

export default function Login() {
    const navigate = useNavigate();

    const [_cookies, setCookie] = useCookies([COOKIE_KEY.ACCESS_TOKEN]);

    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {
        data: token,
        isSuccess: isSuccessPostAuth,
        isError: isErrorPostAuth,
        fetchData: postAuth,
    } = useFetch<PostAuthResponse>(() => AuthAPI.postAuth({ adminId: id, password }), false);

    const isValidButton = id.length !== 0 && password.length !== 0;

    useEffect(() => {
        if (isSuccessPostAuth && token) {
            setCookie(COOKIE_KEY.ACCESS_TOKEN, token.accessToken, { path: "/" });

            setErrorMessage("");
            navigate("/lottery");
        }
    }, [isSuccessPostAuth, token]);
    useEffect(() => {
        if (isErrorPostAuth) {
            setErrorMessage(
                "아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."
            );
        }
    }, [isErrorPostAuth]);

    const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postAuth();
    };

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
        </form>
    );
}

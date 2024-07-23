import useToast from "./hooks/useToast.tsx";

export default function App() {
    const { showToast, ToastComponent } = useToast("추첨 이벤트에 응모가 완료되었어요!");
    return (
        <>
            <button onClick={showToast}>Toast Button</button>
            {ToastComponent}
        </>
    );
}

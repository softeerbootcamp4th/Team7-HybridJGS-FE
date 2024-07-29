import { PropsWithChildren } from "react";

export default function Section({ children }: PropsWithChildren) {
    return (
        <section className="h-screen relative flex flex-col items-center justify-center">
            {children}
        </section>
    );
}

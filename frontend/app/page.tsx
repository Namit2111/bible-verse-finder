import { Suspense } from "react";
import VerseSearch from "../components/VerseSearch";

export default function Home() {
    return (
        <Suspense>
            <div className="min-h-screen">
                <VerseSearch />
            </div>
        </Suspense>
    );
}
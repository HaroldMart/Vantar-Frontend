import Link from "next/link";
import "@/app/components/styles/main.scss";

function Page() {

    return (
        <div>
            <h1>Register page</h1>
            <p>Back to  <Link href="/login" className="link">Sign In</Link></p>
        </div>
    )
}

export default Page;
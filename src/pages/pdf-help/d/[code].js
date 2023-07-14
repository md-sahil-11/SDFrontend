"use-client";
import * as React from "react";
import { usePdfAuthContext } from "src/contexts/pdf-auth-context";


const Page = () => {
    const [code, setCode] = React.useState()
    const { pathname, access_using_link, router } = usePdfAuthContext()

    React.useEffect(() => {
        access_using_link(code)
        router.push("/pdf-help")
    }, [code])

    React.useEffect(() => {
        if (pathname) setCode(pathname?.split("/").pop());
    }, [pathname]);

    return (
        <></>
    )
}

export default Page
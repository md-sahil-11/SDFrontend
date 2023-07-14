import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePdfAuthContext } from "src/contexts/pdf-auth-context"


const Page = () => {
    const { user, verify_email } = usePdfAuthContext()

  useEffect(() => {
    if (!user?.is_email_verified) verify_email()
    router.replace("/pdf-help")  
  }, [])
  
  return <></>
}

export default Page
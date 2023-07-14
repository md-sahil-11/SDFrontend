import { useEffect } from "react"
import { useRouter } from "next/navigation"


const Page = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace("/pdf-help")  
  }, [])
  
  return <></>
}

export default Page
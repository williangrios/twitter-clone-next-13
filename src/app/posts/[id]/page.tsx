'use client'
import { useSearchParams } from "next/navigation"

export default function Post() {

    const searchParams = useSearchParams();
    console.log(searchParams);
    
    const  id  = searchParams.get('id')
    console.log(id);
    

  return (
    <div>
        {id}teste
    </div>
  )
}

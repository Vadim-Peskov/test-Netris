import axios from "axios";
import { useEffect, useState } from "react"

export interface IEventList {
  duration: number
  timestamp: number
  zone: {
    height: number
    left: number
    top: number
    width: number
  }
}

type Error = {
  error: boolean
  code: number | null
}

export const useEventsListApi = () => {
  const [list, setList] = useState<IEventList[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<Error>({ error: false, code: null })


  useEffect(() => {
    setIsError({ error: false, code: null })
    setIsLoading(true)

    axios.get('/XxfnKp')
      .then(res => {
        setIsLoading(false)
        setList(res.data)
      })
      .catch(err => {
        setIsLoading(false)
        setIsError({ error: true, code: err?.status })
      })
  }, []);

  return { list, isLoading, isError }
} 
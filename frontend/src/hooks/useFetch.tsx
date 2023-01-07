import {useEffect, useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useFetch<T = unknown>(url: string){
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
      axios.get(url)
      .then(response => {
          setData(response.data);
        })
    },[])
    
    return { data }
}

export function FetchPost<T = unknown>(url: string, genericData:any){
    const navigate = useNavigate();   
    
    const [data, setData] = useState<T | null>(null)
    

    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement> | null) => {
        event?.preventDefault();
        axios.post(url, genericData)
            .then(response => {
                setData(response.data);
                navigate('/')
            })
    }
  
    return { data, handleSubmit}
}
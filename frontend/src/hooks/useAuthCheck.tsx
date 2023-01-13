import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';

function useAuthCheck(token:string) {
  const [isTokenValid, setIsTokenValid] = useState<any>(null);

  
  const dispatch = useDispatch();

  async function checkToken() {
    const response = await fetch('http://127.0.0.1:8000/api/auth/check', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }
    });
    const data = await response.json();
    if(data.status === 200) {
        setIsTokenValid(true);
    } else {
        setIsTokenValid(false);
        dispatch({
        type: 'NOT_AUTHENTICATED', 
        payload:{
        }
        });

    }
  }

  return [isTokenValid, checkToken];
}

export default useAuthCheck
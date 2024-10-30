import { ProviderAuthContext } from './context/context';
import AppRouter from './components/appRouter';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] =useState(false)
//   useEffect(()=>{
//     const fetchAPI = async() =>{
//       setLoading(true)
//       try{
//         const res = await fetch('http://5.181.255.253:8081/publications/fetch');
//         const result = await res.json()
//         setData(result)
//       }
//       catch(error){
//         setError(error.message)
//         console.error({error})
//       }
//       finally{
//         setLoading(false)
//       }
//     }
//     fetchAPI()
//   },[])
//   if (loading) return <p>Загрузка...</p>;
//   if (error) return <p>Ошибка: {error}</p>;
// console.log(data)
  return(
    <ProviderAuthContext>
      <AppRouter/>
    </ProviderAuthContext>
        
   
  );
}

export default App;

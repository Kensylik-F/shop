import { useEffect, useState } from 'react';
import style from './style/app.module.scss'
import axios from 'axios';
import HomePage from './components/page/home';
import UserProfile from './components/page/userProfile';

function App() {

//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] =useState(false)


//   useEffect(()=>{
//     const fetchAPI = async() =>{
//       setLoading(true)
//       try{
//         const res = await axios.get('https://api.studdler.ru/publications/fetch');
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
  return (
    <div className={style.app}>
      {/* <HomePage/> */}
      <UserProfile/>
    </div>
  );
}

export default App;

import React, {useEffect, useState } from "react";
import MyCard from "./mycard";
import style from '../style/filter.module.scss'
import axios from "axios";
import Posts from "./posts";

const Filter = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [currentCard, setCurrentCard] =useState(null)
    const [category, setCategory] = useState([])
    useEffect(()=>{

      async function fetchDataWithChecks(url) {
            if (!url) {
            console.error('URL не указан');
            return;
        }

      try {
          setLoading(true)
          const response = await axios.get(url);
          if (response.status === 200 && Array.isArray(response.data)) {
            console.log('Данные успешно получены:', response.data);
            setData(response.data)
            
            const categorySort = Array.from(new Set(response.data.map(post => post.category))).map(category =>{
              const post = response.data.find(post => post.category === category)
              return {category, imageUrl: post.imageUrl}
            })
            setCategory(categorySort)
            setLoading(false)
          } else {
            console.warn('Неожиданная структура данных');
            setLoading(false)
          }
      } catch (error) {
          if (error.response) {
            console.error('Ошибка сервера:', error.response.status, error.response.data);
          } else if (error.request) {
            console.error('Запрос был отправлен, но ответа нет:', error.request);
          } else {
            console.error('Ошибка настройки запроса:', error.message);
          }
      } finally{
        setLoading(false)
      }
    }
        fetchDataWithChecks('https://api.studdler.ru/publications/fetch');
    },[])
    if (error) return <p>Ошибка: {error}</p>;
    if(loading) return <p>Загрузка...</p>
    
    const handleClickCard =(dataCard) =>{
        setCurrentCard(dataCard)
        console.log(dataCard)
    }
    const sortData = currentCard ? data.filter(post => post.category === currentCard) : data;
    return(
        <main>
            <div className={style.container_card}>
                <h1>Категории:</h1>
                <MyCard 
                  posts={{category: 'ALL', imageUrl:''}}
                  onCardClick={() =>handleClickCard(null)}
                />я гееееееее
                {category.map(({category, imageUrl}) =>
                 <MyCard
                    key={category}
                    posts={{category, imageUrl}}
                    onCardClick={handleClickCard}
                    />)}
            </div>
            <div >
              <h1>Посты</h1>
              <div className={style.container_posts}>
                {sortData && sortData.map((post) =>(
                  <Posts  key={post.id} post={post}/>
                  )
                )}
              </div>
            </div>
              
        </main>
    )
}

export default Filter
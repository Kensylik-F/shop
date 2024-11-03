import React, {useEffect, useState } from "react";
import MyCard from "../UI/card/mycard";
import style from '../style/filter.module.scss'
import axios from "axios";

const Filter = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [currentCard, setCurrentCard] =useState(null)

    useEffect(()=>{

        async function fetchDataWithChecks(url) {
            if (!url) {
            console.error('URL не указан');
            return;
        }

    try {
        const response = await axios.get(url);
        if (response.status === 200 && Array.isArray(response.data)) {
          console.log('Данные успешно получены:', response.data);
          setData(response.data)
        } else {
          console.warn('Неожиданная структура данных');
        }
    } catch (error) {
        if (error.response) {
          console.error('Ошибка сервера:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Запрос был отправлен, но ответа нет:', error.request);
        } else {
          console.error('Ошибка настройки запроса:', error.message);
        }
    }
    }
        fetchDataWithChecks('https://api.studdler.ru/publications/fetch');
    },[])
    if (error) return <p>Ошибка: {error}</p>;


    const handleClickCard =(dataCard) =>{
        setCurrentCard(dataCard)
        console.log(currentCard)
    }
    return(
        <main>
            <div className={style.container_card}>
                <h1>Категории:</h1>
                {data && data.map((posts) =>
                 <MyCard
                    posts={posts}
                    key={posts.id}
                    onCardClick={handleClickCard}
                    />)}
            </div>
        </main>
    )


}

export default Filter
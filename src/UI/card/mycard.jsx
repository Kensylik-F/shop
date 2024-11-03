import React from "react";
import style from './myCard.module.scss'

const MyCard = React.memo(({posts,onCardClick}) =>{
    const handleClick = () =>{
        onCardClick(posts)
    }

    
    return(
        <div className={style.myCard} onClick={handleClick}>
            <img className={style.imgCard} src={posts.imageUrl} alt="#" />
            <h1 className={style.category}>{posts.category}</h1>
            

        </div>
    )
})

export default MyCard;
import React from "react";
import style from '../style/posts.module.scss'
const Posts = ({post}) =>{
    return(
        <div className={style.container_posts}>
            <img className={style.img_post} src={post.imageUrl} alt="" />
            <h1>{post.title}</h1>
            <p>{post.price}</p>
        </div>
    )
}

export default Posts
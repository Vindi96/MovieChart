import React from 'react'; 

const Like = (props) => {
    let classes="fa fa-heart";
    if(!props.liked) classes+="-o";
    return <i className={classes} aria-hidden="true" style={{cursor:'pointer'}} onClick={props.onTogleLiked}></i> ;  
}
 

 
export default Like;
import React from 'react';

import classes from './Card.module.css';
import noImg from '../../../assets/images/no-image-icon.png';


const card = ( props ) => {
    // const img = props.img != null ? "data:image/png;base64,"+props.img : noImg;
    const img = props.img != null ? props.img : noImg;
    // const img = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jvg9Rf3mvsVTnhuyxPlN0eEL76C.jpg";
    const CardClasses = [classes.Card];

    return (
            <div className={CardClasses.join(" ")} onClick={props.clicked}>
                <div className={classes.Imagem}>
                    <img src={img} alt="Sem Foto" />
                </div>
                <div className={classes.Nome}>
                   <b>{props.nome.substring(7, props.nome.length)}</b>
                </div>
                <div className={classes.Ano}>
                   <b>{props.nome.substring(0, 7)}</b>
                </div>
            </div>
    );
};

export default card;

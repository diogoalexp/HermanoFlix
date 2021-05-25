import React from 'react';

import classes from './Player.module.css';

import ReactPlayer from 'react-player'


const modalInfo = (props) => {
    const {movie} = props;

    return (
        <div>
            <div className={classes.FilterBlock}>
                <span className={classes.modalTitle}>Título: {movie?.tmdb?.title ? movie?.tmdb?.title : movie?.folder}</span>
                {movie?.tmdb?.title !== movie?.tmdb?.original_title ? <span className={classes.modalTitleOriginal}>Título Original: {movie?.tmdb?.original_title}</span> : null}
            </div>
            <br />
            <div className={classes.playerWrapper}>
                {movie
                    ?
                    <ReactPlayer
                        // playing
                        className={classes.reactPlayer}
                        controls
                        width='680px'
                        height='360px'
                        style={divStyle}
                        config={{
                            file: {
                                tracks: movie.tracks,
                                attributes: {
                                    controlsList: 'nodownload'
                                }
                            }
                        }}
                        url={movie?.video}
                    />
                    : null
                }
            </div>
            <div>
                <span className={classes.modalNote}>Nota: {movie?.tmdb?.vote_average}</span>
                <span className={classes.modalRelease}>Lançamento: {(new Date(movie?.tmdb?.release_date)).toLocaleDateString()}</span>
                <br /><br />
                {
                    movie?.tmdb?.genres?.map((gen, i) => (
                        (movie?.tmdb?.genres.length === i + 1) ? <span key={gen.id} className={classes.modalGenre}>{gen.name}</span>
                            : <span key={gen.id} className={classes.modalGenre}>{gen.name}&nbsp;&nbsp;&nbsp;&nbsp;/</span>
                    ))
                }
                <br /><br />
                <div className={classes.modalDivText}>
                    <p className={classes.modalText}>{movie?.tmdb?.overview}</p>
                </div>
                <br />
            </div>
        </div>
    );
};

const divStyle = {
    display: 'table',
    margin: '0 auto',
    border: '1px solid black'
};

export default modalInfo;

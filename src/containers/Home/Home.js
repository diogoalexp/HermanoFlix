import React, { Component } from 'react';
import { connect } from 'react-redux';

import fotoProfile from '../../assets/images/foto_profile_nb.png';
import matrix from '../../assets/images/matrix.gif';

import ReactPlayer from 'react-player'

import classes from './Home.module.css';

import Button from '../../components/UI/Button/Button';

import axios from '../../axios-local';

import catalog from '../../Source/catalog';

class Home extends Component {
    state = {
        item: [
            {   
                movies: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                folder: 'teste2'
            }          
        ]
    }

    changeHandler1 = () => {
        alert("change1");
        // this.setState( {item: { folder: 'teste1', movies: "http://localhost:8080/movies/teste1/movie.mp4"}} );
        this.setState( {item: { folder: 'teste1'}} );
        setTimeout(() => {
            console.log('Hello, World!');
            this.setState( {item: { movies: "http://localhost:8080/movies/teste1/movie.mp4"}} );
          }, 3000);
    }

    changeHandler2 = () => {
        alert("change2");
        this.setState( {item: {  folder: 'teste2' }} );
        setTimeout(() => {
            console.log('Hello, World!');
            this.setState( {item: { movies: "./movies/teste2/movie.mp4"}} );
          }, 3000);
    }

    changeHandler = (f) => {
        alert("changed..");
        // this.setState( {item: { folder: 'teste1', movies: "http://localhost:8080/movies/teste1/movie.mp4"}} );
        this.setState( {item: { folder: f}} );
        setTimeout(() => {
            console.log('Hello, World!');
            this.setState( {item: { movies: "./movies/" + f + "/movie.mp4"}} );
          }, 3000);
    }

    componentDidMount() {
        this.setState( {item: { folder: 'teste', movies: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"}} );
    }

    render () {
        let folder = this.state.item.folder;
        let movies = this.state.item.movies;
        let date = Date.now();
        
        let db = catalog;
        console.log({catalog});
        return (
            <div className='player-wrapper'>
              
            <p>{date}</p>
            <p>{movies}</p>
            <p>{folder}</p>
            <ReactPlayer
              playing
              className='react-player'
              controls              
              width='25%'
              height='25%'
              config={{ file: {
                    tracks: [
                        {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/portugues.vtt', srcLang: 'pt-br', default: true },
                        {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/english.vtt', srcLang: 'en'},
                        {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/espanol.vtt', srcLang: 'es'},
                        {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/francais.vtt', srcLang: 'fr'},
                        {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/fp.vtt', srcLang: 'fp'}
                    ],
                    attributes: {
                        controlsList: 'nodownload'
                    }
                }}}
              url = {movies}
            />
            {db.catalog.map(filme => (
                // <p>{filme.folder}</p>
                <Button btnType="Success" type="button" clicked={() => this.changeHandler(filme.folder)} >{filme.folder}</Button>
            ))}  
            {/* <Button btnType="Success" type="button" clicked={() => this.changeHandler1()} >Test 1</Button>
            <Button btnType="Success" type="button" clicked={() => this.changeHandler2()} >Test 2</Button> */}
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        // error: state.auth.error,
        // isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.burgerBuilder.building,
        // authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        // onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
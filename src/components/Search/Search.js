import React from 'react';
import { Link } from 'react-router-dom'

import Logo from '../Logo/Logo';

import classes from './Search.module.css';

import Button from '../UI/Button/Button';
import Input from '..//UI/Input/Input';
import searchIcon from '../../assets/images/search-icon.png';
import asc from '../../assets/images/asc.png';
import desc from '../../assets/images/desc.png';

const search = (props) => {
    const { form, formHandler, movieList, catalog } = props;
    return (
        <div className={classes.Toolbar}>
            <div className={classes.Logo}>
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className={classes.FilterBlock}>
                <div className={classes.FilterProcurar}>
                    <Input value={form.pesquisa.value} elementType={form.pesquisa.elementType} elementConfig={form.pesquisa.elementConfig} changed={(event) => formHandler(event, "pesquisa")} />
                    <div className={classes.Search}>
                        <img src={searchIcon} alt="Sem Foto" />
                    </div></div>
                <div className={classes.FilterProcurar}>
                    <Input value={form.ordem.value} elementType={form.ordem.elementType} elementConfig={form.ordem.elementConfig} changed={(event) => formHandler(event, "ordem")} />
                </div>
                <div className={classes.FilterProcurar}>
                    <div className={classes.Sort}>
                        <Button btnType="Success" clicked={() => formHandler(null, "sort")}><img className={classes.Sort} alt="Sem Foto" src={form.ascending ? asc : desc} /></Button>
                    </div>
                </div>
                <p className={classes.Counter}>{movieList.filter(x => x != null).length} of {catalog.length} Results</p>
            </div>
        </div>
    );
};

export default search;

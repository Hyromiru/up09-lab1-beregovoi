import React, { useState } from 'react';
import OMDBApi from '../shared/OMDBApi/OMDBApi';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Feed from '../components/Feed/Feed';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        OMDBApi.searchMovie(searchQuery)
    }

    return (

        <div className='search'>
            <h1>Поиск фильмов</h1>
            <form onSubmit={handleSearch} action=''>
                <Input value={searchQuery} setValue={setSearchQuery} />
                <Button />
            </form>
        </div>

    );
};

export default Search

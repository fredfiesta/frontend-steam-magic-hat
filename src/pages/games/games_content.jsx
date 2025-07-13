import React, { useState, useEffect } from 'react';

const GamesContent = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [filter, setFilter] = useState('all');
    const [modalRandom, setModalRandom] = useState(false);
    const [random, setRandom] = useState(false);
    const [gameSelected, setGameSelected] = useState(null);

    const API_URL = import.meta.env.VITE_BACKEND_GAMES_URL;

    const selectRandomGame = () => {
        const list = filter === 'all' ? games : filteredGames;
        let counter = 0;
        let max_counter = 50;
        let delay = 50;

        const runIteration = () => {
            const randomIndex = Math.floor(Math.random() * list.length);
            setGameSelected(filter === 'all' ? list[randomIndex] : list[randomIndex].game);
            counter++;

            if (counter === Math.floor(max_counter * 0.80)) {
                delay = 200;
            }
            if (counter === Math.floor(max_counter * 0.95)) {
                delay = 500;
            }

            if (counter < max_counter) {
                setTimeout(runIteration, delay);
            }
        };

        runIteration();
    };

    const handleRemoveGame = (appId) => {
        setLoading(true);
        fetch(`${API_URL}${appId}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete game');
                setGames(games.filter(game => game.app_id !== appId));
                setLoading(false);
            })
            .catch(error => {
                console.error('Error deleting game:', error);
                setError(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        // Fetch games data from API
        setLoading(true);
        if (filter === 'shared' && filteredGames.length === 0) {
            fetch(API_URL + filter)
                .then(response => response.json())
                .then(data => {
                    console.log(data.results)
                    setFilteredGames(data.results)
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching shared games:', error);
                    setError(error);
                    setLoading(false);
                });
        }
        else if (filter === 'all' && games.length === 0) {
            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    console.log('All games:', data);
                    setGames(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching games:', error);
                    setError(error);
                    setLoading(false);
                });
        }
        else { setLoading(false); }
    }, [filter]);

    useEffect(() => {
        modalRandom && selectRandomGame()
    }, [modalRandom])
    useEffect(() => {
        selectRandomGame()
    }, [random])



    return (
        <div className="container">
            <div className={`modal ${modalRandom ? 'is-active' : ''}`} key="modal-random">
                <div className="modal-background" onClick={() => setModalRandom(!modalRandom)}></div>
                <div className="modal-content">

                    <div class="card">
                        <div class="card-content">
                            {gameSelected != null && (
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image">
                                            <img
                                                src={gameSelected.app_img_url}
                                                alt="Placeholder image"
                                            />
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">{gameSelected.name}</p>
                                        <p class="subtitle is-6">{gameSelected.app_id}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setModalRandom(!modalRandom)}></button>
            </div>
            <div className='box'>
                <h1 className="title">Games List</h1>
                <div className="columns is-vcentered is-mobile">
                    <div className="column is-narrow">
                        <div className="select is-small">
                            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="all">All games</option>
                                <option value="shared">Games in common</option>
                            </select>
                        </div>
                    </div>

                    <div className="column is-narrow">
                        <button
                            className={`button is-small ${isDeleteMode ? 'is-danger' : 'is-info'}`}
                            onClick={() => setIsDeleteMode(!isDeleteMode)}
                        >
                            {isDeleteMode ? 'Untoggle Delete' : 'Toggle Delete'} Mode
                        </button>
                    </div>

                    <div className="column is-hidden-mobile"></div>

                    <div className="column is-narrow">
                        <button
                            className="button is-large is-warning is-responsive"
                            onClick={() => setModalRandom(!modalRandom)}
                        >
                            <span className="is-hidden-touch">🎰GAMBLING!!!🎰</span>
                            <span className="is-hidden-desktop">🎰</span>
                        </button>
                    </div>
                </div>
            </div>

            {filter === 'all' && (
                <p className="subtitle is-5 mx-2">Games found : {games.length}</p>
            )}
            {filter === 'shared' && (
                <p className="subtitle is-5 mx-2">Games found : {filteredGames.length}</p>
            )}

            {/* Error message */}
            {error && (
                <div className="notification is-danger">
                    <button className="delete" onClick={() => setError('')}></button>
                    {error.message || 'An error occurred'}
                </div>
            )}

            {/* Loading spinner */}
            {loading && (
                <div className="notification is-info">
                    <i className="fas fa-spinner fa-spin pr-4"></i>
                    Loading...
                </div>
            )}

            {/* Games list */}
            {filter === 'all' && (<div className="fixed-grid has-2-cols-mobile has-4-cols-tablet has-6-cols-desktop">
                <div className="grid">
                    {games.length > 0 ? games.map(game => (
                        <div key={game.app_id} className='cell box'>
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        <p className="is-flex pb-2 is-justify-content-space-between">
                                            <img src={game.app_img_url} alt="Avatar" className="image" />
                                            <button className={`delete is-small ${isDeleteMode ? '' : 'is-hidden'}`} onClick={() => handleRemoveGame(game.app_id)}></button>
                                        </p>
                                        <p>
                                            <strong>{game.name}</strong> <small>(ID: {game.app_id})</small>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )) : (
                        <div className="notification is-warning">
                            No games found.
                        </div>
                    )}
                </div>
            </div>)}

            {/* Shared games list */}
            {filter === 'shared' && (
                <div className="fixed-grid has-1-cols-mobile has-3-cols-tablet has-5-cols-desktop">
                    <div className="grid">
                        {filteredGames.length > 0 ? filteredGames.map(game => (
                            <div key={game.game.app_id} className='cell box'>
                                <article className="media" style={{ height: '100%' }}>
                                    <figure className="media-left">
                                        <img
                                            src={game.game.app_img_url}
                                            alt="Avatar"
                                            className="image is-32x32"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </figure>
                                    <div className="media-content" style={{ overflow: 'hidden' }}>
                                        <div className="content">
                                            <div className="is-flex is-justify-content-space-between is-align-items-center">
                                                <div>
                                                    <p className="has-text-weight-bold mb-1 is-clipped">
                                                        {game.game.name}
                                                    </p>
                                                    <p className="is-size-7 has-text-grey">ID: {game.game.app_id}</p>
                                                </div>
                                                <button
                                                    className={`delete is-small ${isDeleteMode ? '' : 'is-hidden'}`}
                                                    onClick={() => handleRemoveGame(game.game.app_id)}
                                                />
                                            </div>
                                            <div className="tags are-small mt-2">
                                                {game.shared_by.map(user => (
                                                    <span key={user.steam_id} className="tag is-light">
                                                        {user.username}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        )) : (
                            <div className="notification is-warning">
                                No games found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default GamesContent;
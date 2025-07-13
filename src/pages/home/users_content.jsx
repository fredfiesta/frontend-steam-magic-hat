import React, { useState, useEffect } from 'react';

const UsersContent = () => {
    const [users, setUsers] = useState([]);
    const [steamId, setSteamId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_BACKEND_USERS_URL;

    // Fetch existing users
    useEffect(() => {
        // console.log("API URL:", import.meta.env.VITE_BACKEND_USERS_URL);
        setLoading(true);
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Post new steam_id
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ steam_id: steamId })
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to add user or user already exists');
                return response.json();
            })
            .then(newUser => {
                setUsers([...users, newUser]);
                setSteamId('');
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    // Delete user by steam_id
    const handleDeleteUser = (id) => {
        setLoading(true);
        fetch(`${API_URL}${id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to delete user');
                setUsers(users.filter(user => user.steam_id !== id));
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h2 className="title is-2">Steam Users</h2>

            {/* Add new user form */}
            <form onSubmit={handleSubmit} className="field has-addons mb-5">
                <div className="control is-expanded">
                    <input
                        className="input"
                        type="text"
                        value={steamId}
                        onChange={(e) => setSteamId(e.target.value)}
                        placeholder="Enter Steam ID"
                        required
                    />
                </div>
                <div className="control">
                    <button
                        className={`button is-primary ${loading ? 'is-loading' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        Add User
                    </button>
                </div>
            </form>

            {/* Error message */}
            {error && (
                <div className="notification is-danger">
                    <button className="delete" onClick={() => setError('')}></button>
                    {error.message || 'An error occurred'}
                </div>
            )}

            {/* Users list */}
            <div className="card-content">
                <ul>
                    {users.map(user => (
                        <li key={user.steam_id} className="box">
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <img src={user.profile_img_url} alt="Avatar" className="image" />
                                            <strong>{user.username}</strong> <small>(ID: {user.steam_id})</small>
                                        </p>
                                    </div>
                                </div>
                                
                                <button
                                        className="delete is-large"
                                        onClick={() => handleDeleteUser(user.steam_id)}
                                    >
                                    </button>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UsersContent;
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="section hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <h1 className="title is-1 has-text-danger">404</h1>
                            <h2 className="subtitle is-3">Page Not Found</h2>
                            <p className="mb-4">
                                Oops! The page you're looking for doesn't exist or has been moved.
                            </p>
                            <Link
                                to="/"
                                className="button is-primary is-medium"
                            >
                                <span className="icon">
                                    <i className="fas fa-home"></i>
                                </span>
                                <span>Home</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
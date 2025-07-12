import React, { useEffect, useRef, useState } from 'react';

const Header = () => {
    const [refresh, setRefresh] = useState(false);
    const burgerRef = useRef(null);

    useEffect(() => {
        // Open navbar burger
        const burger = burgerRef.current;
        const menu = document.getElementById('smh-navbar');
        if (burger && menu) {
            if (burger.classList.contains('is-active') || menu.classList.contains('is-active')) {
                burger.classList.remove('is-active');
                menu.classList.remove('is-active');
            }
            else {
                burger.classList.add('is-active');
                menu.classList.add('is-active');
            }
        }
    }, [refresh]);

    const handleRefreshAndOpen = () => {
        setRefresh(prev => !prev);
    };

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="/magician-hat64.png" alt="Magician Hat" />
                    </a>
                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="smh-navbar"
                        ref={burgerRef}
                        onClick={handleRefreshAndOpen}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="smh-navbar" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/games">Games</a>
                        <a className="navbar-item" href="/users">Users</a>
                    </div>

                </div>
            </nav>
        </>
    );
};

export default Header;
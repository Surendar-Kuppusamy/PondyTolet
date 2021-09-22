import React from 'react';

function Loader() {
    return (
        <div className="spinner-border text-primary loader" role="status">
            <span className="visually-hidden d-none">Downloading ...</span>
        </div>
    );
}

export default Loader;
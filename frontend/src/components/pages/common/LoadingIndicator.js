import React from 'react';

function LoadingIndicator() {
    return (
      <div content={'Custom Loader'} className="select-loader">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden"> Loading...</span>
        </div>
        <span>  Loading...</span>
      </div>
    );
}

export default LoadingIndicator;
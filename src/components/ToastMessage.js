import React from 'react';

export const ToastMessage = props => (
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body">
            {props.message}
        </div>
    </div>
);
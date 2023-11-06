const ProgressBar = ({ status }) => {
    return (
        <div
            className={`progress-bar ${
                status == 'Waiting for confirmation'
                    ? 'waiting'
                    : status == 'Preparing'
                    ? 'preparing'
                    : 'ready'
            }`}
        >
            <div className="separate-line"></div>
            <div className="separate-line"></div>
            <div className="circle"></div>
        </div>
    );
};

export default ProgressBar;

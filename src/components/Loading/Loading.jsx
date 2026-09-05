const Loading = ({className}) => {
    return (
        <div className={`border-2 border-white border-t-transparent rounded-full animate-spin ${className}`}></div>
    );
}

export default Loading
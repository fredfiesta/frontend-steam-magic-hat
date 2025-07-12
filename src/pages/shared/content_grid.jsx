
const ContentGrid = (props) => {
    return (
        <>
            <div className="container is-align-content-center is-fluid">
                {props.children}
            </div>
        </>
    );
};

export default ContentGrid;
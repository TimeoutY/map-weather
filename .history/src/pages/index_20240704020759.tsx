export default function HomePage() {
    const map = new BMapGL.Map('container', {
        // style: {
        //     styleJson: styleJson2,
        // },
    });
    return (
        <div>
            <h2>Yay! Welcome to umi!</h2>
            <div
                id="container"
                style={{ height: '100vh', width: '100%' }}
            ></div>
        </div>
    );
}

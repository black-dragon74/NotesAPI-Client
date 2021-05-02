import dynamic from "next/dynamic";

const Home = () => {
    const Editor = dynamic(
        () => import("../components/Editor"),
        {ssr: false, loading: () => <p>Loading editor...</p>},
    )

    return (
        <Editor/>
    )
}

export default Home
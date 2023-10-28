import ContentData from "./FixedContentData";
import "./FixedContentStyle.css";

const Content = () => {
    return(
        <div className="fixedContent">
            <h1>Tittle</h1>
            <p>This is some description put in here.</p>

            <ContentData
            className="first-des"
            heading="Tittle"
            text="Main Description for here"
            img1="https://images.unsplash.com/photo-1698035886387-c5c891545f67?auto=format&fit=crop&q=80&w=1936&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            img2="https://images.unsplash.com/photo-1697927550265-0a6f22e952b9?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <ContentData
            className="second-des"
            heading="Tittle 2"
            text="Second Description for here"
            img1="https://images.unsplash.com/photo-1682686581264-c47e25e61d95?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            img2="https://images.unsplash.com/photo-1698349239564-f82472deaf1f?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
        </div>
    );
};
export default Content;
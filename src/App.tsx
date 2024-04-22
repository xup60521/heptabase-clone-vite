import Whiteboard from "./components/Whiteboard";
import WhiteboardPositionController from "./components/WhiteboardPositionController";
import Card from "./components/Card";
import { useCardsStore } from "./state/store";
import { WhiteboardProvider } from "./components/WhiteboardProvider";

function App() {
    const { cards } = useCardsStore();

    return (
        <main className="w-screen h-screen overflow-hidden bg-gray-100 ">
            <WhiteboardProvider>
                <Whiteboard>
                    {cards.map((item) => {
                        return <Card {...item} key={item.id} />;
                    })}
                </Whiteboard>
                <WhiteboardPositionController />
            </WhiteboardProvider>
            {/* <p className="absolute bottom-2 left-2 text-white">{`${window.innerWidth} ${window.outerWidth}`}</p> */}
        </main>
    );
}

export default App;

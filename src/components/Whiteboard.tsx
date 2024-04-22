import { useContext, useEffect, useState } from "react";
import { useCardsStore } from "../state/store";
import { WhiteboardContext } from "./WhiteboardProvider";

export default function Whiteboard(props: {
    children?: React.ReactNode;
}) {
    const [allowDrag, setAllowDrag] = useState(false);
    const { addCard, updatePosition, load_localstorage, saveToLocalstorage, cards } = useCardsStore();
    const { selectedCardID, setSelectedCardID, whiteboardPosition, setWhiteboardPosition } = useContext(WhiteboardContext);
    const {x, y} = whiteboardPosition

    const whiteBoardEventHandler = {
        onContextMenu: (e) => e.preventDefault(),
        onMouseDown: (e) => {
            setSelectedCardID("");
            if (e.button === 2) {
                setAllowDrag(true);
            }
        },
        onMouseUp: () => {
            setAllowDrag(false);
            setSelectedCardID("");
        },
        onMouseMove: (e) => {
            if (selectedCardID) {
                updatePosition(selectedCardID, {
                    x: e.movementX * (window.innerWidth / window.outerWidth),
                    y: e.movementY * (window.innerWidth / window.outerWidth),
                });
            }
            if (!allowDrag) return;
            setWhiteboardPosition((prev) => {
                prev.x +=
                    (e.movementX * (window.innerWidth / window.outerWidth)) / 2;
                prev.y +=
                    (e.movementY * (window.innerWidth / window.outerWidth)) / 2;
                return { ...prev };
            });
        },
        onDoubleClick: (e) => {
            e.stopPropagation();
            e.preventDefault();
            addCard("# new card", {
                x: -x + e.pageX,
                y: -y + e.pageY,
            });
        },
    } satisfies React.HTMLAttributes<HTMLDivElement>;

    useEffect(() => {
        load_localstorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        saveToLocalstorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards])

    return (
        <div
            className="w-full h-full overflow-hidden"
            {...whiteBoardEventHandler}
        >
            <div
                className="fix top-0 left-0"
                style={{ transform: `translate(${x}px,${y}px)` }}
            >
                {props.children}
            </div>
        </div>
    );
}

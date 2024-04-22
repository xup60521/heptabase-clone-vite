import { useContext } from "react";
import { WhiteboardContext } from "./WhiteboardProvider";

const dx = 5
const dy = 5

export default function WhiteboardPositionController() {
    const {setWhiteboardPosition} = useContext(WhiteboardContext)
    const setPosition = setWhiteboardPosition
    const changePosition = (direction: "up" | "down" | "left" | "right") => {
        switch (direction) {
            case "up":
                setPosition((prev) => {
                    prev.y -= dy;
                    return { ...prev };
                });
                break;
            case "down":
                setPosition((prev) => {
                    prev.y += dy;
                    return { ...prev };
                });
                break;
            case "left":
                setPosition((prev) => {
                    prev.x -= dx;
                    return { ...prev };
                });
                break;
            case "right":
                setPosition((prev) => {
                    prev.x += dx;
                    return { ...prev };
                });
                break;
        }
    };

    return (
        <nav className="absolute bottom-4 right-4 rounded-md p-2 text-white bg-stone-700 flex gap-2">
            <button className="size-6 transition-all rounded hover:bg-stone-800" onClick={()=>changePosition("up")}>↑</button>
            <button className="size-6 transition-all rounded hover:bg-stone-800" onClick={()=>changePosition("down")}>↓</button>
            <button className="size-6 transition-all rounded hover:bg-stone-800" onClick={()=>changePosition("left")}>←</button>
            <button className="size-6 transition-all rounded hover:bg-stone-800" onClick={()=>changePosition("right")}>→</button>
        </nav>
    );
}

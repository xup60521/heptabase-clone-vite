import {
    MDXEditor,
    headingsPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useCardsStore } from "../state/store";
import { useContext } from "react";
import { WhiteboardContext } from "./WhiteboardProvider";

export default function Card(props: {
    position: { x: number; y: number };
    text: string;
    id: string;
}) {
    const { x, y } = props.position;
    const { text, id } = props;
    const {setSelectedCardID, selectedCardID} = useContext(WhiteboardContext)
    const { removeCard, updateText } = useCardsStore();

    const cardProps = {
        tabIndex: 0,
        style: { transform: `translate(${x}px,${y}px)` },
        onMouseDown: (e) => {
            if (e.button !== 2) {
                e.stopPropagation();
            }
            if (e.button === 0) {
                setSelectedCardID(id);
            }
        },
        onMouseUp: () => {
            setSelectedCardID("");
        },
        onDoubleClick: (e) => e.stopPropagation(),
        onKeyDown: (e) => {
            if (e.key === "Delete") {
                removeCard(id);
            }
        },
    } satisfies React.HTMLAttributes<HTMLDivElement>;

    const editDivProps = {
        onMouseDown: (e) => {
            if (e.button !== 2) {
                e.stopPropagation();
            }
            setSelectedCardID("");
        },
        onKeyDown: (e) => {
            if (e.key === "Delete") {
                e.stopPropagation();
            }
        },
    } satisfies React.HTMLAttributes<HTMLDivElement>;

    return (
        <div
            {...cardProps}
            className={`absolute bg-white rounded-md cursor-pointer focus:ring-2 ring-sky-300 w-96 ${
                selectedCardID === id ? "select-none" : ""
            }`}
        >
            <div className="p-4 rounded-t-md hover:bg-gray-50 transition-all"></div>
            <div className=" cursor-text p-4" {...editDivProps}>
                <MDXEditor
                    plugins={[
                        headingsPlugin(),
                        listsPlugin(),
                        linkPlugin(),
                        quotePlugin(),
                        markdownShortcutPlugin(),
                    ]}
                    onChange={(e) => updateText(id, e)}
                    className="prose -mt-4"
                    markdown={text}
                />
            </div>
        </div>
    );
}

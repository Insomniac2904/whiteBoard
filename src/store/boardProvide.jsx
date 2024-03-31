import BoardContext from "./board.context";
import { TOOL_ITEMS, TOOL_ACTION_TYPES } from "../constants";
import { useReducer } from "react";
import rough from "roughjs/bin/rough";
const gen = rough.generator();

const boardReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TOOL": {
      return {
        ...state,
        activeToolItem: action.payload.tool,
      };
    }
    case "DRAW_DOWN": {
      const { clientX, clientY } = action.payload;
      const newElement = {
        id: state.elements.length,
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        roughEle: gen.line(clientX, clientY, clientX, clientY),
      };
      const previousElements = state.elements;
      // console.log(previousElements, newElement);
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.DRAWING,
        elements: [...previousElements, newElement],
      };
    }
    case "DRAW_MOVE": {
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      newElements[index].x2 = clientX;
      newElements[index].y2 = clientY;
      newElements[index].roughEle = gen.line(
        newElements[index].x1,
        newElements[index].y1,
        clientX,
        clientY
      );
      // console.log(newElements);
      const previousElements = state.elements;
      return {
        ...state,
        elements: [...previousElements, newElements],
      };
    }
    default: {
      return state;
    }
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.LINE,
  elements: [],
  toolActionType: TOOL_ACTION_TYPES.NONE,
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  const changeToolHandler = (tool) => {
    dispatchBoardAction({ type: "CHANGE_TOOL", payload: { tool } });
  };

  const boardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;
    // const roughEle = gen.line(clientX, clientY, clientX, clientY);
    dispatchBoardAction({
      type: "DRAW_DOWN",
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;
    // const roughEle = gen.line(clientX, clientY, clientX, clientY);
    dispatchBoardAction({
      type: "DRAW_MOVE",
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
  };

  return (
    <BoardContext.Provider value={boardContextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;

import { createContext } from "react";

const BoardContext = createContext({
  activeToolItem: "",
  elements: [],
  toolActionType: "",
  changeToolHandler: () => {},
  boardMouseDownHandler: () => {},
  boardMouseMoveHandler: () => {},
});

export default BoardContext;

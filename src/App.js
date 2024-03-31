import Board from "./components/board";
import Toolbar from "./components/toolbar";
import BoardProvider from "./store/boardProvide";

function App() {
  return (
    <BoardProvider>
      <Board />
      <Toolbar />
    </BoardProvider>
  );
}

export default App;

import Home from "./Components/Home";

export const config = {
  endpoint: `https://twentyonedot-xflix.herokuapp.com/v1`,
};

function App() {
  console.log("Hey");
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;

import Container from './components/Container';
import Game from './components/Game';
import Nav from './components/Nav';

function App() {
  return (
    <Container>
      <Nav />
      <main>
        <Game />
      </main>
    </Container>
  );
}

export default App;

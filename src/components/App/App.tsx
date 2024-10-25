import { createTheme, ThemeProvider } from "@mui/material";
import { Container } from "../Ui/Container";
import { VideoPlayer } from "../VideoPlayer";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <VideoPlayer />
      </Container>
    </ThemeProvider>
  );
}

export default App;

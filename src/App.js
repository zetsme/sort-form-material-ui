import '@fontsource/roboto';
import { Container, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import Header from './components/Header';
import Users from './pages/Users';
import { deepPurple, deepOrange } from '@material-ui/core/colors';
//

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff3f3',
    },
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: deepOrange[500],
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Container>
          <Users />
        </Container>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
// #fff3f3

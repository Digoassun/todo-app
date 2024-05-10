import {useState} from 'react'
import './App.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ThemeButton} from "./components/ThemeButton";
import {useThemeContext} from "./theme/ThemeContextProvider.tsx";
import {Header} from "./components/Header";

function App() {
    const {theme} = useThemeContext();
    const [count, setCount] = useState(0)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <>
                <ThemeButton/>
                {/*<Typography variant="h1" sx={{color:'text.primary'}}>TODO</Typography>*/}
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </>
        </ThemeProvider>
    )
}

export default App

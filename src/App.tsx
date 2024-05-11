import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {useThemeContext} from "./theme/ThemeContextProvider.tsx";
import {Header} from "./layout/Header";
import {BoxTitle} from "./components/BoxTitle";
import {ToDoList} from "./components/ToDoList";
import {useEffect, useState} from "react";

function App() {
    const {theme,mode} = useThemeContext();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 720);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header mode={mode}/>
            <Box component="main" sx={{
                zIndex: 2,
                width:isMobile?'80vw':'65vw',
                maxWidth:'500px',
            }}>
                <BoxTitle/>
                <ToDoList isMobile={isMobile} mode={mode}/>
            </Box>
        </ThemeProvider>
    )
}

export default App

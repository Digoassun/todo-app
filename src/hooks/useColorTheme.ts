import {useMemo, useState} from "react";
import {createTheme} from "@mui/material";
import theme from './theme.tsx'

export const useColorTheme = () => {
    const [mode, setMode] = useState('light');

    const toggleColorMode = () => {
        setMode((prevState) => (prevState === 'light' ? 'dark' : 'light'))
    }


    const modifiedTheme = useMemo(() =>
        createTheme({
            ...theme,
            palette:{
                ...theme.palette,
                mode
            }
        }),
            [mode]
    )

    return {
        theme:modifiedTheme,
        mode,
        toggleColorMode
    }
}

import {useMemo, useState} from "react";
import {createTheme} from "@mui/material";
import theme from '../theme/theme.tsx'

export const useColorTheme = () => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

    const toggleColorMode = () => {
        setThemeMode((prevState) => (prevState === 'light' ? 'dark' : 'light'))
    }


    const modifiedTheme = useMemo(() =>
        createTheme({
            ...theme,
            palette:{
                ...theme.palette,
                mode:themeMode
            }
        }),
            [themeMode]
    )

    return {
        theme:modifiedTheme,
        mode: themeMode,
        toggleColorMode
    }
}

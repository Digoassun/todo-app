import {useMemo, useState} from "react";
import {createTheme} from "@mui/material";
import {getPalette} from '../theme/theme.tsx'

export const useColorTheme = () => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

    const toggleColorMode = () => {
        setThemeMode((prevState) => (prevState === 'light' ? 'dark' : 'light'))
    }


    const modifiedTheme = useMemo(() =>
        createTheme(getPalette(themeMode)),
            [themeMode]
    )

    return {
        theme:modifiedTheme,
        mode: themeMode,
        toggleColorMode
    }
}

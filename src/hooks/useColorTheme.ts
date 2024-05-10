import {useMemo, useState} from "react";
import {createTheme} from "@mui/material";
import {getCustomTheme} from '../theme/theme.tsx'

export const useColorTheme = () => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

    const toggleColorMode = () => {
        setThemeMode((prevState) => (prevState === 'light' ? 'dark' : 'light'))
    }


    const modifiedTheme = useMemo(() =>
        createTheme(getCustomTheme(themeMode)),
            [themeMode]
    )

    return {
        theme:modifiedTheme,
        mode: themeMode,
        toggleColorMode
    }
}

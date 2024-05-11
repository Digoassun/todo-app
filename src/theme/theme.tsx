import {PaletteMode} from "@mui/material";

// ### Primary
//
// - Bright Blue: hsl(220, 98%, 61%)
// - Check Background: linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)
//
// ### Neutral
//
// ### Light Theme
//
// - Very Light Gray: hsl(0, 0%, 98%)
// - Very Light Grayish Blue: hsl(236, 33%, 92%)
// - Light Grayish Blue: hsl(233, 11%, 84%)
// - Dark Grayish Blue: hsl(236, 9%, 61%)
// - Very Dark Grayish Blue: hsl(235, 19%, 35%)
//
// ### Dark Theme
//
// - Very Dark Blue: hsl(235, 21%, 11%)
// - Very Dark Desaturated Blue: hsl(235, 24%, 19%)
// - Light Grayish Blue: hsl(234, 39%, 85%)
// - Light Grayish Blue (hover): hsl(236, 33%, 92%)
// - Dark Grayish Blue: hsl(234, 11%, 52%)
// - Very Dark Grayish Blue: hsl(233, 14%, 35%)
// - Very Dark Grayish Blue: hsl(237, 14%, 26%)

export const getCustomTheme = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light') ?
            {
                background: {
                    default: '#fafafa',
                    paper: 'hsl(0, 0%, 98%)'
                },
                text: {
                    primary: 'hsl(244, 7%, 43%)',
                    secondary: 'hsl(260, 3%, 63%)',
                    disabled: 'hsl(240, 2%, 83%)'
                },
                divider: '#e8e7eb'
            }
            :
            {
                background: {
                    default: 'hsl(235, 21%, 11%)',
                    paper: 'hsl(235, 24%, 19%)'
                },
                text: {
                    primary: 'hsl(234, 39%, 85%)',
                    secondary: 'hsl(234, 11%, 52%)',
                    disabled: 'hsl(233, 14%, 35%)'
                },
                divider: '#6e729b'

            }
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
});

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

export const getPalette = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light') ?
            {
                background: {default:'hsl(0, 0%, 98%)'},
                text: {primary: 'red'}
            }
            :
            {
                background: {default:'hsl(235, 21%, 11%)'},
                text: {primary: 'blue'},

            }
    }
});

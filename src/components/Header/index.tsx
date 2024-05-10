import {styled} from "@mui/material";
import {useThemeContext} from "../../theme/ThemeContextProvider.tsx";
interface StyledHeaderProps {
    mode: string
}

const imgPathMaker = (device:string,mode:string)=> `/images/bg-${device}-${mode}.jpg`

const StyledHeader = styled("header")(({mode}: StyledHeaderProps)=>({
    width:'100%',
    position:'absolute',
    height:'200px',
    top:0,
    left:0,
    background: `url(${imgPathMaker('mobile',mode)}) center no-repeat`,
    backgroundSize:'cover',
    '@media (min-width:768px)' : {
        height:'300px',
        background: `url(${imgPathMaker('desktop',mode)}) center no-repeat`
    }
}))
export const Header = () => {
     const {mode} = useThemeContext();
    return (
        <StyledHeader mode={mode}>
        </StyledHeader>
    );
};
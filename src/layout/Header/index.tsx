import {styled} from "@mui/material";
interface StyledHeaderProps {
    mode: string
}

const imgPathMaker = (device:string,mode:string)=> `/images/bg-${device}-${mode}.jpg`

const StyledHeader = styled("header")(({mode}: StyledHeaderProps)=>({
    zIndex:0,
    width:'100%',
    position:'absolute',
    height:'200px',
    top:0,
    left:0,
    background: `url(${imgPathMaker('mobile',mode)}) center no-repeat`,
    backgroundSize:'cover',
    '@media (min-width:768px)' : {
        height:'300px',
        background: `url(${imgPathMaker('desktop',mode)}) center no-repeat`,
        backgroundSize:'cover',

    }
}))

type Props = {
    mode:string
}
export const Header = ({mode}:Props) => {
    return (
        <StyledHeader mode={mode}></StyledHeader>
    );
};

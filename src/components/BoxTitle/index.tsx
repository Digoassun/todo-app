import {Box, styled, Typography} from "@mui/material";
import {ThemeButton} from "../ThemeButton";

const StyledTitleBox = styled(Box)(()=>({
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    marginBottom:'48px',
    position:'relative',
}))

export const BoxTitle = () => {
    return (
        <StyledTitleBox component="section">
            <Typography sx={{letterSpacing:'16px', fontSize:36, fontWeight:700,color:'#FFF'}} variant="h1">TODO</Typography>
            <ThemeButton/>
        </StyledTitleBox>
    );
};

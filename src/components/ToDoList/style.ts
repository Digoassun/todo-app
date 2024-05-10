import {Paper, styled, TextField, List, Box, Button, Typography, Radio} from "@mui/material";

export const StyledListBox = styled(Box)(() => ({
    display: 'flex',
    gap: '12px',
    flexDirection: 'column',
    position:'relative'
}))

export const StyledTextField = styled(TextField)(() => ({
    '& .MuiInputBase-root::before': {
        borderBottom: 'none !important'
    },
    '& .MuiInputBase-root::after': {
        borderBottom: 'none !important'
    },
}))

export const StyledPaper = styled(Paper)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 28px',
    width: '100%'
}))

interface StyledListProps {
    mode: string
}

export const StyledList = styled(List)(({mode}:StyledListProps) => ({
    width: '100%',
    borderRadius: '4px',
    padding:0,
    overflow:'hidden',
    boxShadow:`0 42px 30px -9px ${mode === 'dark'?'hsl(235,21%,11%)':'hsl(235,9%,61%)'}`
}))

export const ActionButton = styled(Button)(() => ({
    padding:0,
    lineHeight:1,
    width:'auto',
    minWidth:'auto',
    '&:hover': {
        background: 'transparent'
    }
}))

export const StyledRadio = styled(Radio)(() => ({
    marginRight: '12px'
}))

interface StyledButtonTextProps {
    hoverColor: string
}

export const StyledButtonText = styled(Typography)(({hoverColor}:StyledButtonTextProps) => ({
    textTransform:'capitalize',
    fontSize: 14,
    fontWeight: 700,
    '&:hover': {
        color: hoverColor
    }
}))

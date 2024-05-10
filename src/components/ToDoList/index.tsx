import {
    Box,
    createSvgIcon, IconButton,
    InputAdornment,
    ListItem, ListItemText, Paper, Typography, useTheme,
} from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
    ActionButton,
    StyledButtonText,
    StyledList,
    StyledListBox,
    StyledPaper,
    StyledRadio,
    StyledTextField
} from "./style.ts";
import {useState} from "react";

// const CheckIcon = createSvgIcon(
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//         <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/>
//     </svg>,
//     'CheckIcon',
// );

const CloseIcon = createSvgIcon(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path fill="#494C6B" fillRule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
    </svg>,
'CloseIcon',
);

type Props = {
    isMobile: boolean;
    mode:string;
};

export const ToDoList = ({isMobile,mode}:Props) => {
    const theme = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const list = ['Tarefa', "Tarefa", 'Tarefa']

    return (
        <StyledListBox component="section">
            <Paper sx={{padding: '12px 24px'}} elevation={1}>
                <StyledTextField placeholder="Create a new todo..."
                                 InputProps={{
                                     startAdornment: (
                                         <InputAdornment position="start" sx={{marginRight: '20px'}}>
                                             <RadioButtonUncheckedIcon sx={{color: theme.palette.text.disabled}}/>
                                         </InputAdornment>
                                     ),
                                 }}
                                 variant="standard"/>
            </Paper>
            <StyledList mode={mode}>
                {list.map((value, index) => {
                    return (
                        <ListItem key={index} sx={{padding: 0}} divider
                                  onMouseEnter={() => setHoveredIndex(index)}
                                  onMouseLeave={() => setHoveredIndex(null)}>
                            <StyledPaper square>
                                <StyledRadio
                                    sx={{color: theme.palette.text.disabled}}
                                    edge="start"
                                    // checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    // inputProps={{'aria-labelledby': labelId}}
                                />
                                <ListItemText primary={`${value}`}/>
                                {(isMobile || hoveredIndex === index) && (
                                    <IconButton edge="end">
                                        <CloseIcon />
                                    </IconButton>
                                )}
                            </StyledPaper>
                        </ListItem>
                    );
                })}
                <ListItem dense sx={{padding: 0}}>
                    <StyledPaper square sx={{display: 'flex', alignItems: 'center', justifyContent: isMobile?'center':'space-between'}}>
                        {!isMobile && <Typography sx={{fontSize: 14}} color="text.secondary">{list.length} items left</Typography>}
                        <Box sx={{display: 'flex', gap: '16px'}}>
                            <ActionButton>
                                <StyledButtonText hoverColor={theme.palette.text.primary}
                                                  color="text.secondary">All</StyledButtonText>
                            </ActionButton>
                            <ActionButton>
                                <StyledButtonText hoverColor={theme.palette.text.primary}
                                                  color="text.secondary">Active</StyledButtonText>
                            </ActionButton>
                            <ActionButton>
                                <StyledButtonText hoverColor={theme.palette.text.primary}
                                                  color="text.secondary">Completed</StyledButtonText>
                            </ActionButton>
                        </Box>
                    {!isMobile && <ActionButton>
                            <Typography sx={{textTransform: 'capitalize', fontSize: 14}} color="text.secondary">Clean
                                Completed</Typography>
                        </ActionButton>}
                    </StyledPaper>
                </ListItem>
            </StyledList>
        </StyledListBox>
    );
};

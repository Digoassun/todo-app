import {
    Box,
    createSvgIcon, IconButton,
    InputAdornment,
    ListItem, ListItemButton, ListItemText, Paper, Typography, useTheme,
} from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {
    ActionButton,
    StyledButtonText,
    StyledList,
    StyledListBox,
    StyledPaper,
    StyledRadio,
    StyledTextField
} from "./style.ts";
import {ChangeEvent, useEffect, useState} from "react";

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
    mode: string;
};

interface ToDo {
    id: number;
    text: string,
    completed: boolean,
}

export const ToDoList = ({isMobile, mode}: Props) => {
    const theme = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
    const [selectedFilter, setSelectedFilter] = useState<number | null>(0);
    const [text, setText] = useState<string>('');
    const [toDos, setToDos] = useState<ToDo[]>([]);
    const [viewToDoList, setViewToDoList] = useState<ToDo[]>([]);

    const addNewTask = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const newTask: ToDo = {
            id: toDos.length + 1,
            text: text,
            completed: false
        };
        setToDos(prevState => [...prevState, newTask]);
        setText('');
    };

    const filterTasks = () => {
        console.log(toDos)
        if (selectedFilter === 0) {
            setViewToDoList(toDos)
        } else if (selectedFilter === 1) {
            setViewToDoList(toDos.filter((value: ToDo) => !value.completed))
        } else if (selectedFilter === 2) {
            setViewToDoList(toDos.filter((value: ToDo) => value.completed))
        }
    }

    const completeTask = (id: number) => {
        const changedArray = toDos.map((value: ToDo) => {
            if (value.id === id) {
                return {...value, completed: !value.completed}
            }
            return value
        });
        setToDos(changedArray);
    }

    const removeTask = (id: number) => {
        setToDos(prevState => prevState.filter((value: ToDo) => value.id !== id));
    }

    const removeCompletedTasks = () => {
        setToDos(prevState => prevState.filter((value: ToDo) => !value.completed));
    }

    useEffect(() => {
        filterTasks();
    }, [selectedFilter, toDos]);

    return (
        <StyledListBox component="section">
            <form onSubmit={addNewTask}>
                <Paper sx={{padding: '12px 24px'}} elevation={1}>
                    <StyledTextField placeholder="Create a new todo..."
                                     value={text}
                                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                         setText(event.target.value);
                                     }}
                                     InputProps={{
                                         startAdornment: (
                                             <InputAdornment position="start" sx={{marginRight: '20px'}}>
                                                 <RadioButtonUncheckedIcon sx={{color: theme.palette.text.disabled}}/>
                                             </InputAdornment>
                                         ),
                                         endAdornment: (
                                             <ActionButton type='submit'
                                                           sx={{visibility: !isMobile ? 'hidden' : 'visible'}}>
                                                 <SendRoundedIcon sx={{color: theme.palette.text.disabled}}/>
                                             </ActionButton>
                                         ),
                                     }}
                                     variant="standard"/>
                </Paper>
            </form>
            <StyledList mode={mode}>
                {viewToDoList.length > 0 && viewToDoList.map((item, index) => {
                    return (
                        <ListItemButton key={item.id} sx={{padding: 0}} divider
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            completeTask(item.id)
                                        }}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}>
                            <StyledPaper square>
                                <StyledRadio
                                    sx={{color: theme.palette.text.disabled}}
                                    edge="start"
                                    checked={item.completed}
                                    disableRipple
                                />
                                <ListItemText
                                    color={item.completed ? "text.disabled" : "text.primary"}>{item.text}</ListItemText>
                                {(isMobile || hoveredIndex === index) && (
                                    <IconButton edge="end" sx={{zIndex: 4}}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeTask(item.id)
                                                }}>
                                        <CloseIcon/>
                                    </IconButton>
                                )}
                            </StyledPaper>
                        </ListItemButton>
                    );
                })}
                <ListItem dense sx={{padding: 0}}>
                    <StyledPaper square sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'center' : 'space-between'
                    }}>
                        {!isMobile && <Typography sx={{fontSize: 14}} color="text.secondary">{viewToDoList.length} items
                            left</Typography>}
                        <Box sx={{display: 'flex', gap: '16px'}}>
                            <ActionButton onClick={() => setSelectedFilter(0)}>
                                <StyledButtonText hovercolor={theme.palette.text.primary}
                                                  color={selectedFilter === 0 ? theme.palette.text.primary : "text.secondary"}>All</StyledButtonText>
                            </ActionButton>
                            <ActionButton onClick={() => setSelectedFilter(1)}>
                                <StyledButtonText hovercolor={theme.palette.text.primary}
                                                  color={selectedFilter === 1 ? theme.palette.text.primary : "text.secondary"}>Active</StyledButtonText>
                            </ActionButton>
                            <ActionButton onClick={() => setSelectedFilter(2)}>
                                <StyledButtonText hovercolor={theme.palette.text.primary}
                                                  color={selectedFilter === 2 ? theme.palette.text.primary : "text.secondary"}>Completed</StyledButtonText>
                            </ActionButton>
                        </Box>
                        {!isMobile &&
                            <ActionButton onClick={removeCompletedTasks}>
                                <Typography sx={{textTransform: 'capitalize', fontSize: 14}} color="text.secondary">Clean
                                    Completed</Typography>
                            </ActionButton>}
                    </StyledPaper>
                </ListItem>
            </StyledList>
        </StyledListBox>
    );
};
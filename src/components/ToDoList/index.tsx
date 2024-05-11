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

const CheckIcon = createSvgIcon(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/>
    </svg>,
    'CheckIcon',
);

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

    const filters = [
        {text: 'All', value: 0},
        {text: 'Active', value: 1},
        {text: 'Completed', value: 2},
    ];

    const setInitialTodos = () => {
        const storageList = JSON.parse(localStorage.getItem('todosList') || '[]');
        setToDos(storageList)
    }

    const setToDosAndLocalStorage = (arr: ToDo[]) => {
        setToDos(arr);
        localStorage.setItem('todosList', JSON.stringify(arr));
    };

    const addNewTask = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const newTask: ToDo = {
            text: text,
            completed: false
        };
        const newArray = [...toDos, newTask];
        setToDosAndLocalStorage(newArray);
        setText('');
    }

    const filterTasks = () => {
        if (selectedFilter === 0) {
            setViewToDoList(toDos)
        } else if (selectedFilter === 1) {
            setViewToDoList(toDos.filter((value: ToDo) => !value.completed))
        } else if (selectedFilter === 2) {
            setViewToDoList(toDos.filter((value: ToDo) => value.completed))
        }
    }

    const toggleTaskCompletion = (index: number) => {
        const changedArray = toDos.map((value: ToDo, i) => {
            if (i === index) {
                return {...value, completed: !value.completed};
            }
            return value;
        });
        setToDosAndLocalStorage(changedArray);
    };

    const removeTask = (index: number) => {
        const changedArray = toDos.filter((_, i) => i !== index);
        setToDosAndLocalStorage(changedArray);
    };

    const removeCompletedTasks = () => {
        const changedArray = toDos.filter((value: ToDo) => !value.completed);
        setToDosAndLocalStorage(changedArray);
    };

    useEffect(() => {
        setInitialTodos();
    }, []);

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
                        <ListItemButton key={index} sx={{padding: 0}} divider
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTaskCompletion(index)
                                        }}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}>
                            <StyledPaper square>
                                <StyledRadio
                                    checkedIcon={<CheckIcon sx={{
                                        fontSize: '24px',
                                        borderRadius: '50%',
                                        padding: '5px',
                                        background: 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))'
                                    }}/>}
                                    sx={{color: theme.palette.text.disabled}}
                                    edge="start"
                                    checked={item.completed}
                                    disableRipple
                                />
                                <ListItemText sx={{
                                    textDecorationLine: item.completed ? 'line-through' : "inherit",
                                    color: item.completed ? theme.palette.text.disabled : theme.palette.text.primary
                                }}>
                                    {item.text}
                                </ListItemText>
                                {(isMobile || hoveredIndex === index) && (
                                    <IconButton edge="end" sx={{zIndex: 4}}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeTask(index)
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
                            {filters.map((item, index) =>
                                <ActionButton key={index} onClick={() => setSelectedFilter(item.value)}>
                                    <StyledButtonText hovercolor={theme.palette.text.primary}
                                                      color={selectedFilter === item.value ? theme.palette.text.primary : "text.secondary"}>{item.text}</StyledButtonText>
                                </ActionButton>
                            )}
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

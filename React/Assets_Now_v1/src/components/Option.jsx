import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from './Loader';

export default function Option(props) {
    useEffect(() => {
        async function setOption() {
            props.handleChange(props.selectedOption);
        }
        setOption();
    }, [props.lockStatus]);
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.typeTitle}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.selectedOption || ""}
                    label="Type"
                    onChange={(event) => props.handleChange(event.target.value)}
                    disabled={props?.lockStatus && "disable"}
                >
                    {
                        props.loadingStatus == "loading"
                            ?
                            <MenuItem key="loading-options" disabled>
                                <Loader message={props.loaderMSG} />
                            </MenuItem>
                            :
                            props.list.map(item => <MenuItem key={item?.symbol ? item.symbol : item} value={item?.symbol ? item.symbol : item}><div className='menu-item'><p>{item?.name ? item.name : item}</p> <p>{item.symbol && item.symbol}</p></div></MenuItem>)
                    }
                </Select>
            </FormControl>
        </Box>
    );
}

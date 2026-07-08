import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoaderPage() {
    return (
        <div className='loader-container'>
            <Box sx={{ display: 'flex' }}  >
                <CircularProgress enableTrackSlot size="5rem" aria-label="Loading…" />
            </Box>
        </div>
    )
}

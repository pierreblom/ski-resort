import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const difficultyIcons = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
};

const renderDifficultyIcons = (level: keyof typeof difficultyIcons) => {
    const icons = [];
    for (let i = 0; i < difficultyIcons[level]; i++) {
        icons.push(<WhatshotIcon key={i} sx={{ color: 'orange', verticalAlign: 'middle' }} />);
    }
    return icons;
};

const Legend: React.FC = () => {
    return (
        <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2, fontWeight: 'bold' }}>Legend</Typography>
            <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                        <strong>Difficulty Levels:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        {renderDifficultyIcons('beginner')} Beginner
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        {renderDifficultyIcons('intermediate')} Intermediate
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        {renderDifficultyIcons('advanced')} Advanced
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        {renderDifficultyIcons('expert')} Expert
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                        <strong>Trail Status:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        Open: <LockOpenIcon sx={{ color: 'green', verticalAlign: 'middle' }} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        Closed: <LockIcon sx={{ color: 'red', verticalAlign: 'middle' }} />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                        <strong>Groomed Status:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        Groomed: <CheckCircleIcon sx={{ color: 'green', verticalAlign: 'middle' }} />
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                        Not Groomed: <CancelIcon sx={{ color: 'red', verticalAlign: 'middle' }} />
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Legend;

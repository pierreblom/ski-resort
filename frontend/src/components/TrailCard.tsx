import React from 'react';
import { Card, CardContent, Typography, Tooltip, Box, Chip } from '@mui/material';
import { Trail } from '../types';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface TrailCardProps {
    trail: Trail;
    onClick: (trail: Trail) => void;
    renderDifficultyIcons: (level: string) => JSX.Element[];
}

const TrailCard: React.FC<TrailCardProps> = ({ trail, onClick, renderDifficultyIcons }) => (
    <Card 
        elevation={3}
        sx={{ 
            transition: 'transform 0.3s ease-in-out',
            marginBottom: 2,
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 20px rgba(0,0,0,0.3)',
                cursor: 'pointer',
            },
            overflow: 'hidden',
            borderRadius: '12px',
        }}
        onClick={() => onClick(trail)}
    >
        <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
                {trail.name}
            </Typography>
            
            <Typography variant="body2" sx={{ marginTop: 1 }}>
                Status: 
                {trail.status === 'OPEN' ? (
                    <Tooltip title="Open">
                        <LockOpenIcon sx={{ color: 'green', ml: 1, verticalAlign: 'middle' }} />
                    </Tooltip>
                ) : (
                    <Tooltip title="CLOSED">
                        <LockIcon sx={{ color: 'red', ml: 1, verticalAlign: 'middle' }} />
                    </Tooltip>
                )}
            </Typography>
            
            <Typography variant="body2" sx={{ marginTop: 1 }}>
                Difficulty: {renderDifficultyIcons(trail.difficulty)}
            </Typography>

            <Typography variant="body2" sx={{ marginTop: 1 }}>
                Groomed: 
                {trail.groomed ? (
                    <CheckCircleIcon sx={{ color: 'green', ml: 1, verticalAlign: 'middle' }} />
                ) : (
                    <CancelIcon sx={{ color: 'red', ml: 1, verticalAlign: 'middle' }} />
                )}
            </Typography>
            
            <Typography variant="caption" display="block" sx={{ marginTop: 0.5 }}>
                Lift Options:
            </Typography>
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 0.5, 
                maxWidth: '100%',
                overflow: 'hidden'
            }}>
                {trail.accessedByLifts.map((lift: any, liftIndex: number) => (
                    <Chip
                        key={liftIndex}
                        label={lift.name}
                        size="small"
                        color={
                            lift.status === 'OPEN' ? 'success' :
                            lift.status === 'HOLD' ? 'warning' : 'error'
                        }
                        sx={{ 
                            maxWidth: '100%',
                            '& .MuiChip-label': {
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }
                        }}
                        title={`${lift.name} (${lift.status})`}
                    />
                ))}
            </Box>
        </CardContent>
    </Card>
);

export default TrailCard;
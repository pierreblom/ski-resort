import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography, Box, Grid, Chip, LinearProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Trail } from '../types';
import styled from '@mui/material/styles/styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface TrailDetailsModalProps {
    trail: Trail | null;
    onClose: () => void;
    renderDifficultyIcons: (level: string) => JSX.Element[];
}

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
}));

const DetailItem = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    minWidth: '140px',
}));

const DetailValue = styled(Typography)(({ theme }) => ({
    flex: 1,
}));

const TrailDetailsModal: React.FC<TrailDetailsModalProps> = ({ trail, onClose, renderDifficultyIcons }) => (
    <Dialog
        open={trail !== null}
        onClose={onClose}
        aria-labelledby="trail-details-dialog-title"
        maxWidth="sm"
        fullWidth
        PaperProps={{
            style: {
                borderRadius: '12px',
                overflow: 'hidden',
            },
        }}
    >
        {trail && (
            <>
                <DialogTitle
                    id="trail-details-dialog-title"
                    sx={{
                        backgroundColor: '#3f51b5', // Replace theme.palette.primary.main
                        color: '#fff', // Replace theme.palette.primary.contrastText
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h5" component="span">
                        {trail.name}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ color: '#fff' }} // Replace theme.palette.primary.contrastText
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <StyledDialogContent dividers>
                    <DetailItem>
                        <DetailLabel>Difficulty:</DetailLabel>
                        <DetailValue>{renderDifficultyIcons(trail.difficulty)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Status:</DetailLabel>
                        <DetailValue>
                            <Chip
                                label={trail.status}
                                color={trail.status === 'OPEN' ? 'success' : 'error'}
                                size="small"
                            />
                        </DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Groomed:</DetailLabel>
                        <DetailValue>
                            {trail.groomed ? (
                                <CheckCircleIcon sx={{ color: 'green', verticalAlign: 'middle' }} />
                            ) : (
                                <CancelIcon sx={{ color: 'red', verticalAlign: 'middle' }} />
                            )}
                        </DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Lifts to Summit:</DetailLabel>
                        <DetailValue>{trail.liftsToSummit}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Min Elevation Gain:</DetailLabel>
                        <DetailValue>
                            {trail.minElevationGain} meters
                            <LinearProgress
                                variant="determinate"
                                value={(trail.minElevationGain / 1000) * 100} // Assuming max elevation is 1000m
                                sx={{ mt: 1 }}
                            />
                        </DetailValue>
                    </DetailItem>
                    <DetailItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <DetailLabel sx={{ mb: 1 }}>Accessed By Lifts:</DetailLabel>
                        <Grid container spacing={1}>
                            {trail.accessedByLifts.map((lift: any, index: number) => (
                                <Grid item key={index}>
                                    <Chip
                                        label={`${lift.name} (${lift.elevationGain}m, ${lift.capacity} ppl)`}
                                        color="primary"
                                        variant="outlined"
                                        sx={{ mb: 1 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </DetailItem>
                    {trail.liftDistributionPlan && (
                        <DetailItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <DetailLabel sx={{ mb: 1 }}>Lift Distribution Plan:</DetailLabel>
                            <Grid container spacing={1}>
                                {trail.liftDistributionPlan.map((plan: any, index: number) => (
                                    <Grid item key={index}>
                                        <Chip
                                            label={`${plan.lift}: ${plan.trips} trips, ${plan.people_per_trip} people per trip`}
                                            color="secondary"
                                            variant="outlined"
                                            sx={{ mb: 1 }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </DetailItem>
                    )}
                </StyledDialogContent>
                <DialogActions sx={{ justifyContent: 'center', padding: 2 }}> {/* Replace theme.spacing(2) */}
                    <Button
                        onClick={onClose}
                        variant="contained"
                        color="primary"
                        startIcon={<CloseIcon />}
                    >
                        Close
                    </Button>
                </DialogActions>
            </>
        )}
    </Dialog>
);

export default TrailDetailsModal;
import React, { useEffect, useState } from 'react';
import { getTrails } from '../api';
import {
    CircularProgress,
    Typography,
    Grid,
    Container,
    Button,
    Paper,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import '../App.css';
import { DifficultyFilter, GroupSizeAndMaxTripsFilter, GroomedFilter, LiftElevationGainFilter, StatusFilter, SortByFilter } from '../filters/TrailFilters';
import TrailCard from './TrailCard';
import TrailDetailsModal from './TrailDetailsModal';
import Legend from './Legend';
import { Trail, DifficultyLevel } from '../types';

const difficultyIcons: Record<DifficultyLevel, number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
};

const TrailList: React.FC = () => {
    const [trails, setTrails] = useState<Trail[]>([]);
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState<DifficultyLevel | ''>('');
    const [groomed, setGroomed] = useState<boolean | null>(null);
    const [liftElevationGain, setLiftElevationGain] = useState<number | string>('');
    const [groupSize, setGroupSize] = useState<number | string>('');
    const [maxTrips, setMaxTrips] = useState<number | string>(''); // New state for max trips
    const [error, setError] = useState<string | null>(null);
    const [trailStatus, setTrailStatus] = useState<'open' | 'all'>('all');
    const [sortBy, setSortBy] = useState<string>('');
    const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

    useEffect(() => {
        const fetchTrails = async () => {
            setLoading(true);
            try {
                const data = await getTrails({
                    difficulty: difficulty || undefined,
                    groomed: groomed ?? undefined,
                    groupSize: groupSize ? parseInt(groupSize.toString()) : undefined,
                    liftElevationGain: liftElevationGain ? parseInt(liftElevationGain.toString()) : undefined,
                    showClosedTrails: trailStatus === 'all',
                    maxTrips: maxTrips ? parseInt(maxTrips.toString()) : undefined, // Add maxTrips to API call
                });
                setTrails(data.allTrails);
            } catch {
                setError('Failed to load trails. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchTrails();
    }, [difficulty, groomed, liftElevationGain, groupSize, trailStatus, maxTrips]); // Add maxTrips to dependencies

    const filteredTrails = trails.filter(trail => {
        const meetsGroupSize = true
        const meetsStatusFilter = trailStatus === 'all' ? true : trail.status === 'OPEN';
        const meetsMaxTrips = maxTrips ? trail.liftDistributionPlan?.some((plan: any) => plan.trips <= parseInt(maxTrips.toString())) : true;
        return meetsGroupSize && meetsStatusFilter && meetsMaxTrips;
    });

    const sortTrails = (trails: Trail[]) => {
        return trails.sort((a, b) => {
            switch (sortBy) {
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'difficulty':
                    return difficultyIcons[a.difficulty] - difficultyIcons[b.difficulty];
                case 'elevationGain':
                    return a.minElevationGain - b.minElevationGain;
                default:
                    return 0;
            }
        });
    };

    const sortedAndFilteredTrails = sortTrails(filteredTrails);

    const clearFilters = () => {
        setDifficulty('');
        setGroomed(null);
        setLiftElevationGain('');
        setGroupSize('');
        setMaxTrips(''); // Clear maxTrips filter
        setTrailStatus('open');
        setSortBy('');
    };

    const renderDifficultyIcons = (level: DifficultyLevel) => {
        const icons = [];
        for (let i = 0; i < difficultyIcons[level]; i++) {
            icons.push(<WhatshotIcon key={i} sx={{ color: 'orange', verticalAlign: 'middle', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'rotate(20deg)' } }} />);
        }
        return icons;
    };

    const handleTrailClick = (trail: Trail) => {
        setSelectedTrail(trail);
    };

    const handleCloseModal = () => {
        setSelectedTrail(null);
    };

    return (
        <Container>
            {error && (
                <Typography variant="body1" color="error" align="center">
                    {error}
                </Typography>
            )}
            <Typography 
                variant="h2" 
                gutterBottom 
                align="center" 
                sx={{ 
                    fontFamily: '"Arial Black", Gadget, sans-serif',
                    fontWeight: 900,
                    color: '#3f51b5', // Replace theme.palette.primary.main
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    marginBottom: '30px',
                    position: 'relative',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '4px',
                        backgroundColor: '#f50057', // Replace theme.palette.secondary.main
                        borderRadius: '2px',
                    }
                }}
            >
                Ski Trails <span role="img" aria-label="ski">⛷️</span>
            </Typography>

            <Grid container spacing={4} sx={{ padding: '20px 0' }}>
                <Grid item xs={12} sm={4} md={3}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#000', color: '#fff' }}>
    <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>Filters</Typography>
    
    <Grid container spacing={2} direction="column">
        <Grid item sx={{ marginBottom: 2 }}>
            <DifficultyFilter difficulty={difficulty} setDifficulty={setDifficulty as (difficulty: string) => void} />
        </Grid>
        <Grid item sx={{ marginBottom: 2 }}>
            <GroomedFilter groomed={groomed} setGroomed={setGroomed} />
        </Grid>
        <Grid item sx={{ marginBottom: 2 }}>
            <LiftElevationGainFilter liftElevationGain={liftElevationGain} setLiftElevationGain={setLiftElevationGain} />
        </Grid>
        <Grid item sx={{ marginBottom: 2 }}>
            <GroupSizeAndMaxTripsFilter groupSize={groupSize} setGroupSize={setGroupSize} maxTrips={maxTrips} setMaxTrips={setMaxTrips} />
        </Grid>
        <Grid item sx={{ marginBottom: 2 }}>
            <StatusFilter trailStatus={trailStatus} setTrailStatus={setTrailStatus} />
        </Grid>
        <Grid item sx={{ marginBottom: 2 }}>
            <SortByFilter sortBy={sortBy} setSortBy={setSortBy} />
        </Grid>
        <Grid item sx={{ marginBottom: 4 }}>
            <Button 
                variant="outlined" 
                onClick={() => {
                    clearFilters();
                    setSortBy('');
                }}
                aria-label="Clear Filters and Sorting"
                fullWidth
                sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover': {
                        backgroundColor: '#333',
                    },
                }}
            >
                Clear Filters & Sorting
            </Button>
        </Grid>
        <Grid item>
            <Legend />
        </Grid>
    </Grid>
</Paper>

                </Grid>

                <Grid item xs={12} sm={8} md={9}>
                    {loading ? (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <CircularProgress
                                sx={{
                                    animation: 'spin 1.5s linear infinite',
                                    '@keyframes spin': {
                                        '0%': { transform: 'rotate(0deg)' },
                                        '100%': { transform: 'rotate(360deg)' },
                                    },
                                }}
                            />
                            <Typography variant="body1" sx={{ color: '#fff' }}>Loading trails...</Typography> {/* Set text color to white */}
                        </div>
                    ) : sortedAndFilteredTrails.length === 0 ? (
                        <Typography variant="h6" align="center" sx={{ marginTop: '20px', color: '#fff' }}> {/* Set text color to white */}
                            No trails found
                        </Typography>
                    ) : (
                        <>
                            {sortBy && (
                                <Typography variant="body2" sx={{ marginBottom: 2, color: '#fff' }}> {/* Set text color to white */}
                                    <SortIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                                    Sorted by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                                </Typography>
                            )}
                            <Grid container spacing={2}>
                                {sortedAndFilteredTrails.map((trail, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <TrailCard 
                                            trail={trail}
                                            onClick={handleTrailClick}
                                            renderDifficultyIcons={renderDifficultyIcons as (level: string) => JSX.Element[]} // Cast renderDifficultyIcons
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grid>

            <TrailDetailsModal 
                trail={selectedTrail}
                onClose={handleCloseModal}
                renderDifficultyIcons={renderDifficultyIcons as (level: string) => JSX.Element[]} // Cast renderDifficultyIcons
            />
        </Container>
    );
};

export default TrailList;

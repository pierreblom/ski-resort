import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface DifficultyFilterProps {
    difficulty: string;
    setDifficulty: (difficulty: string) => void;
}

const DifficultyFilter: React.FC<DifficultyFilterProps> = ({ difficulty, setDifficulty }) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="difficulty-filter-content"
            id="difficulty-filter-header"
        >
            <Typography>Difficulty</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel>Difficulty</InputLabel>
                <Select
                    aria-label="Difficulty Level"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as string)}
                    label="Difficulty"
                >
                    <MenuItem value=""><em>All</em></MenuItem>
                    <MenuItem value="beginner">Beginner</MenuItem>
                    <MenuItem value="intermediate">Intermediate</MenuItem>
                    <MenuItem value="advanced">Advanced</MenuItem>
                    <MenuItem value="expert">Expert</MenuItem>
                </Select>
            </FormControl>
        </AccordionDetails>
    </Accordion>
);

interface GroupSizeAndMaxTripsFilterProps {
    groupSize: number | string;
    setGroupSize: (groupSize: number | string) => void;
    maxTrips: number | string;
    setMaxTrips: (maxTrips: number | string) => void;
}

const GroupSizeAndMaxTripsFilter: React.FC<GroupSizeAndMaxTripsFilterProps> = ({ groupSize, setGroupSize, maxTrips, setMaxTrips }) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="group-size-max-trips-filter-content"
            id="group-size-max-trips-filter-header"
        >
            <Typography>Group Size & Max Trips</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <TextField
                label="Group Size"
                type="number"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff' } }}
            />
            <TextField
                label="Max Trips"
                type="number"
                value={maxTrips}
                onChange={(e) => setMaxTrips(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff' } }}
            />
        </AccordionDetails>
    </Accordion>
);

interface GroomedFilterProps {
    groomed: boolean | null;
    setGroomed: (groomed: boolean | null) => void;
}

const GroomedFilter: React.FC<GroomedFilterProps> = ({ groomed, setGroomed }) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="groomed-filter-content"
            id="groomed-filter-header"
        >
            <Typography>Groomed</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={groomed === true}
                        onChange={(e) => setGroomed(e.target.checked ? true : null)}
                        name="groomed"
                        color="primary"
                        sx={{ color: '#fff' }} // Set checkbox color to white
                    />
                }
                label="Groomed"
                sx={{ color: '#fff' }} // Set label color to white
            />
        </AccordionDetails>
    </Accordion>
);

interface LiftElevationGainFilterProps {
    liftElevationGain: number | string;
    setLiftElevationGain: (liftElevationGain: number | string) => void;
}

const LiftElevationGainFilter: React.FC<LiftElevationGainFilterProps> = ({ liftElevationGain, setLiftElevationGain }) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="lift-elevation-gain-filter-content"
            id="lift-elevation-gain-filter-header"
        >
            <Typography>Lift Elevation Gain</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <TextField
                label="Lift Elevation Gain"
                type="number"
                value={liftElevationGain}
                onChange={(e) => setLiftElevationGain(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#fff' } }} // Set label color to white
                InputProps={{ style: { color: '#fff' } }} // Set input text color to white
            />
        </AccordionDetails>
    </Accordion>
);

interface StatusFilterProps {
    trailStatus: 'open' | 'all';
    setTrailStatus: (trailStatus: 'open' | 'all') => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ trailStatus, setTrailStatus }) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="status-filter-content"
            id="status-filter-header"
        >
            <Typography>Status</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: '#fff' }}>Status</InputLabel> {/* Set label color to white */}
                <Select
                    value={trailStatus}
                    onChange={(e) => setTrailStatus(e.target.value as 'open' | 'all')}
                    label="Status"
                    sx={{ color: '#fff' }} // Set select text color to white
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="open">Open</MenuItem>
                </Select>
            </FormControl>
        </AccordionDetails>
    </Accordion>
);

interface SortByFilterProps {
    sortBy: string;
    setSortBy: (sortBy: string) => void;
}

const SortByFilter: React.FC<SortByFilterProps> = ({ sortBy, setSortBy }) => (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="sort-by-filter-content"
            id="sort-by-filter-header"
        >
            <Typography>Sort By</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FormControl fullWidth margin="normal">
                <InputLabel sx={{ color: '#fff' }}>Sort By</InputLabel> {/* Set label color to white */}
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as string)}
                    label="Sort By"
                    sx={{ color: '#fff' }} // Set select text color to white
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="difficulty">Difficulty</MenuItem>
                    <MenuItem value="elevationGain">Elevation Gain</MenuItem>
                </Select>
            </FormControl>
        </AccordionDetails>
    </Accordion>
);

export { DifficultyFilter, GroupSizeAndMaxTripsFilter, GroomedFilter, LiftElevationGainFilter, StatusFilter, SortByFilter };
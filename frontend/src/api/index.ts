import axios from 'axios';

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000',
});

interface TrailFilters {
    difficulty?: string;
    groomed?: boolean;
    groupSize?: number;
    liftElevationGain?: number;
    showClosedTrails?: boolean; 
    maxTrips?: number;
}

export const getTrails = async (filters: Partial<TrailFilters> = {}) => {
    try {
        const response = await api.get('/trails/', {
            params: {
                difficulty: filters.difficulty,
                groomed: filters.groomed,
                group_size: filters.groupSize,
                lift_elevation_gain: filters.liftElevationGain,
                show_closed_trails: filters.showClosedTrails,
                max_trips: filters.maxTrips
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching trails:', error);
        throw error;
    }
};

export const getLifts = async () => {
    try {
        const response = await api.get('/lifts/');
        return response.data;
    } catch (error) {
        console.error('Error fetching lifts:', error);
        throw error;
    }
};

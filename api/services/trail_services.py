
from snowtooth.client import get_trails as fetch_trail_data
from utils.exceptions import DataStructureError
from .utils.filters import (
    filter_trails_by_show_closed_trails,
    filter_trails_by_difficulty,
    filter_trails_by_groomed_status,
    filter_trails_by_group_size,
    filter_trails_by_elevation_gain
)
from .utils.calculations import (
    calculate_lifts_to_summit,
    calculate_min_elevation_gain,
    calculate_lift_distribution_plan
)

async def get_filtered_trails(difficulty=None, groomed=None, group_size=None, lift_elevation_gain=None, show_closed_trails=False, max_trips=None):
    data = await fetch_trail_data()
    trails, lifts = data['allTrails'], data['allLifts']

    # Create a dictionary to map lift names to their trailAccess, capacity, status, and elevationGain
    lift_info = {
        lift['name']: {
            'trailAccess': [trail['name'] for trail in lift['trailAccess']],
            'capacity': lift['capacity'],
            'status': lift['status'],
            'elevationGain': lift['elevationGain']
        } for lift in lifts
    }

    # Apply lift access information to trails
    apply_lift_trail_access(trails, lift_info)

    # Continue filtering as needed
    trails = filter_trails_by_difficulty(trails, difficulty)
    trails = filter_trails_by_groomed_status(trails, groomed)
    trails = filter_trails_by_group_size(trails, group_size, lift_info)

    for trail in trails:
        trail['liftsToSummit'] = await calculate_lifts_to_summit(trail, lift_info)
        trail['minElevationGain'] = await calculate_min_elevation_gain(trail, lift_info)
        trail['liftDistributionPlan'] = calculate_lift_distribution_plan(trail, lift_info, group_size, max_trips)

    trails = filter_trails_by_elevation_gain(trails, lift_elevation_gain)
    trails = filter_trails_by_show_closed_trails(trails, show_closed_trails)
    return {"allTrails": trails}

def apply_lift_trail_access(trails, lift_info):
    # First, create an empty list for lifts in each trail
    trail_lift_map = {trail['name']: [] for trail in trails}

    # Populate the list with lift names based on trailAccess in lift_info
    for lift_name, info in lift_info.items():
        for trail_name in info['trailAccess']:
            if trail_name in trail_lift_map:
                trail_lift_map[trail_name].append(lift_name)
    
    # Assign the lifts back to each trail in trails
    for trail in trails:
        trail['accessedByLifts'] = [
            {
                'name': lift_name, 
                'status': lift_info[lift_name]['status'],
                'elevationGain': lift_info[lift_name]['elevationGain'],
                'capacity': lift_info[lift_name]['capacity']
            } 
            for lift_name in trail_lift_map[trail['name']]
        ]

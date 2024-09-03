def filter_trails_by_show_closed_trails(trails, show_closed_trails):
    if not show_closed_trails:
        return [trail for trail in trails if trail['status'] == 'OPEN']
    return trails

def filter_trails_by_difficulty(trails, difficulty):
    if difficulty:
        return [trail for trail in trails if trail['difficulty'].lower() == difficulty.lower()]
    return trails

def filter_trails_by_groomed_status(trails, groomed):
    if groomed is not None:
        return [trail for trail in trails if trail['groomed'] == groomed]
    return trails

def filter_trails_by_group_size(trails, group_size, lift_info):
    if group_size is None:
        return trails
    
    filtered_trails = []
    for trail in trails:
        total_capacity = sum(lift_info[lift['name']]['capacity'] for lift in trail['accessedByLifts'] if lift_info[lift['name']]['status'] == 'OPEN')
        if total_capacity > 0:
            filtered_trails.append(trail)
    
    return filtered_trails

def filter_trails_by_elevation_gain(trails, lift_elevation_gain):
    if lift_elevation_gain is not None:
        return [trail for trail in trails if trail['minElevationGain'] >= lift_elevation_gain]
    return trails

def filter_trails_by_max_trips(trails, max_trips):
    if max_trips is not None:
        return [trail for trail in trails if all(plan['trips'] <= max_trips for plan in trail['liftDistributionPlan'])]
    return trails

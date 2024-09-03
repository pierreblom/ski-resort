async def calculate_lifts_to_summit(trail, lift_info):
    accessed_lifts = trail['accessedByLifts']
    lift_count = 0

    for lift in accessed_lifts:
        if lift['status'] == 'OPEN':
            lift_count += 1

    return lift_count

async def calculate_min_elevation_gain(trail, lift_info):
    accessed_lifts = [lift for lift in trail['accessedByLifts'] if lift['status'] == 'OPEN']
    if not accessed_lifts:
        return None  # Return None or a default value if no lifts are open
    
    return min(lift_info[lift['name']]['elevationGain'] for lift in accessed_lifts)

def calculate_lift_distribution_plan(trail, lift_info, group_size, max_trips):
    if group_size is None:
        return None
    
    # Get all open lifts that access the trail, sorted by capacity in descending order
    accessed_lifts = [lift for lift in trail['accessedByLifts'] if lift_info[lift['name']]['status'] == 'OPEN']
    if not accessed_lifts:
        return None

    accessed_lifts.sort(key=lambda lift: lift_info[lift['name']]['capacity'], reverse=True)

    distribution_plan = {}
    remaining_people = group_size

    while remaining_people > 0:
        for lift in accessed_lifts:
            if remaining_people <= 0:
                break

            lift_capacity = lift_info[lift['name']]['capacity']
            people_to_assign = min(remaining_people, lift_capacity)

            if lift['name'] not in distribution_plan:
                distribution_plan[lift['name']] = {
                    "lift": lift['name'],
                    "trips": 0,
                    "people_per_trip": people_to_assign
                }

            distribution_plan[lift['name']]['trips'] += 1
            remaining_people -= people_to_assign

    return list(distribution_plan.values())

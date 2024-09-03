from fastapi import APIRouter, HTTPException, Query
from services.trail_services import get_filtered_trails

router = APIRouter()

@router.get("/trails/")
async def get_trails(
    difficulty: str = Query(None),
    groomed: bool = Query(None),
    group_size: int = Query(None),
    lift_elevation_gain: int = Query(None),
    show_closed_trails: bool = Query(None),
    max_trips: int = Query(None)
):
    try:
        return await get_filtered_trails(difficulty, groomed, group_size, lift_elevation_gain, show_closed_trails, max_trips)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

# Function to fetch trail and lift data together
async def get_trails():
    transport = AIOHTTPTransport(url="https://snowtooth.moonhighway.com/")
    async with Client(transport=transport, fetch_schema_from_transport=True) as session:
        query = gql("""
        query {
          allTrails {
            name
            difficulty
            groomed
            status
            accessedByLifts {
              name
            }
          }
          allLifts {
            name
            elevationGain
            status
            capacity
            trailAccess {
              name
            }
          }
        }
        """)
        result = await session.execute(query)
        print(f"GraphQL API response: {result}")  # Log the API response
        return result

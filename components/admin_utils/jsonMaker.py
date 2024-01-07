import json
from random import randint, choice
from datetime import datetime, timedelta

# Function to generate random dates and times
def random_date(start, end):
    return start + timedelta(
        seconds=randint(0, int((end - start).total_seconds())),
    )

def generate_sessions(start_date, num_sessions):
    sessions = []
    session_date = start_date
    for _ in range(num_sessions):
        start_time = random_date(session_date, session_date + timedelta(hours=23))
        end_time = start_time + timedelta(hours=randint(1, 3))
        sessions.append({
            "session_date": session_date.strftime("%Y-%m-%d"),
            "session_start_time": start_time.strftime("%H:%M"),
            "session_end_time": end_time.strftime("%H:%M")
        })
        session_date += timedelta(days=1)  # Next session on the next day
    return sessions



# Generate 10 therapy requests
therapy_requests = []
for i in range(10):
    # Generate random sequence of 8 letters and numbers 
    therapy_id = ''.join(choice('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') for i in range(8))
    request_id = randint(1000, 9999)

    start_date = random_date(datetime(2024, 1, 1), datetime(2024, 12, 31))
    num_sessions = randint(5, 10)
    therapy_requests.append({
        "name": "Shoulder impingement",
        "therapy_id": therapy_id,
        "request_id": request_id,
        "duration": f"{randint(1, 4)} weeks",
        "number_of_sessions": num_sessions,
        "date_time": start_date.strftime("%Y-%m-%d %H:%M:%S"),
        "user_id": randint(10000, 99999),
        "sessions": generate_sessions(start_date, num_sessions)
    })

# Convert to JSON
json_data = json.dumps(therapy_requests, indent=4)
print(json_data)


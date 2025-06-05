from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from aws import get_cpu_metrics

# Defines a simple API using FastAPI that returns CPU usage data
# of an EC2 instance based on its internal IP address.
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/metrics")
def metrics(ip: str, period_minutes: int = 60, interval_seconds: int = 60):
    return get_cpu_metrics(ip, period_minutes, interval_seconds)

import boto3
import datetime
import os
from dotenv import load_dotenv

# Retrieves CPU usage data of an EC2 instance in AWS using its internal IP address.

load_dotenv()  # Load variables from .env

ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
SECRET_KEY = os.getenv("AWS_SECRET_KEY")
REGION = "us-east-1"

cloudwatch = boto3.client(
    "cloudwatch",
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name=REGION,
)
# These functions are intended to be used in an API that receives the internal IP of a machine
# and returns a CPU usage graph over time.
def get_cpu_metrics(ip, period_minutes, interval_seconds):
    end = datetime.datetime.utcnow()
    start = end - datetime.timedelta(minutes=period_minutes)

    metrics = cloudwatch.get_metric_statistics(
        Namespace='AWS/EC2',
        MetricName='CPUUtilization',
        Dimensions=[{'Name': 'InstanceId', 'Value': get_instance_id_by_ip(ip)}],
        StartTime=start,
        EndTime=end,
        Period=interval_seconds,
        Statistics=['Average']
    )

    datapoints = sorted(metrics['Datapoints'], key=lambda x: x['Timestamp'])
    return [
        {
            "timestamp": dp['Timestamp'].isoformat(),
            "value": dp['Average']
        }
        for dp in datapoints
    ]

def get_instance_id_by_ip(ip):
    ec2 = boto3.client(
        "ec2",
        aws_access_key_id=ACCESS_KEY,
        aws_secret_access_key=SECRET_KEY,
        region_name=REGION,
    )
    reservations = ec2.describe_instances(
        Filters=[{'Name': 'private-ip-address', 'Values': [ip]}]
    )["Reservations"]
    return reservations[0]["Instances"][0]["InstanceId"]
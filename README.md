# EC2 CPU Usage Viewer

A small tool to view the CPU usage of an EC2 instance by its internal IP address using AWS CloudWatch.

---

## 🚀 How to Run

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate on Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload
```

**`.env` file** with your AWS credentials:
```
AWS_ACCESS_KEY=...
AWS_SECRET_KEY=...
```

---

### 2. Frontend (React)
```bash
cd frontend
npm install
npm start
```

---

## 🔍 Example Output

![Example](./1b05259b-6965-498c-b10c-02202c4fb23f.png)

---

## 📌 Notes

- Sample internal IP address: `172.31.88.161`
- Data is fetched from CloudWatch based on the selected time range (default: 1 hour).
- You can select a preset time period or enter a custom number of minutes.

---

Good luck!
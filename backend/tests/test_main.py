from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_predict_post():
  payload = {
    "bass": 0.7677445430563319,
    "mid": 0.5288887977059277,
    "high": 0.7094174579031691
  }

  response = client.post("/predict", json=payload)
  assert response.status_code == 200

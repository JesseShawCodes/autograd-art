from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_predict_post():
  features = {
    "bass": 0.7677445430563319,
    "mid": 0.5288887977059277,
    "treble": 0.7094174579031691
  }

  response = client.post("/predict", json=features)
  print(response.json())
  assert response.status_code == 200

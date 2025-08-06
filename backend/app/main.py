from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

model = tf.keras.Sequential([
  tf.keras.Input(shape=(3,)),
  tf.keras.layers.Dense(16, activation='relu'),
  tf.keras.layers.Dense(4, activation='sigmoid'),
])

optimizer = tf.keras.optimizers.Adam(0.01)

class AudioFeatures(BaseModel):
  bass: float
  mid: float
  treble: float

@app.post("/predict")
def predict(features: AudioFeatures):

  x = tf.convert_to_tensor([[features.bass, features.mid, features.treble]], dtype=tf.float32)

  with tf.GradientTape() as tape:
    y_pred = model(x)
    loss = tf.square(1.0 - y_pred[0][0])

  grads = tape.gradient(loss, model.trainable_variables)
  optimizer.apply_gradients(zip(grads, model.trainable_variables))

  y = y_pred.numpy()[0]

  return {
    "radius": float(y[0] * 300),
    "color": [int(y[1] * 255), int(y[2] * 255), int(y[3] * 255)]
  }
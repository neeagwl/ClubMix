!pip install turicreate
!pip install pydantic
!pip install fastapi
!pip install colabcode

from colabcode import ColabCode
from fastapi import FastAPI

import pickle
import pandas as pd
import numpy as np
url = "https://raw.githubusercontent.com/Ambica06/dataset/main/dataset1.csv"
df = pd.read_csv(url)
df['USER_ID'] = df['USER_ID'].apply(str)

from pydantic import BaseModel

class User(BaseModel):
    #USER_ID: int
    USER_ID: str
    ITEM_ID: str


def clubid(club):
  switcher = {
      "Basketball": 101,
      "Football": 102,
      "Footprints": 103,
      "Arts": 104,
      "Dance": 105,
      "Robotics": 106,
      "CC": 107,
      "Enactus": 108,
      "Rotaract": 109
    }
  return switcher.get(club, 101)

  def convert(club):
  switcher = {
      101: "6071d412be321d3abcfc41fc",
      102: "6071e7336e809a48fcb5a73f",
      103: "6071de0fbe321d3abcfc4203",
      104: "6071dca8be321d3abcfc4202",
      105: "6071db77be321d3abcfc4201",
      106: "6071d558be321d3abcfc41fd",
      107: "6071d80dbe321d3abcfc41fe",
      108: "6071d96fbe321d3abcfc41ff",
      109: "6071da72be321d3abcfc4200"
    }
  return switcher.get(club, "6071da72be321d3abcfc4200")


    def recommendation(model, user, club):   
  import turicreate as tc
  import pandas as pd
  import json
  #user = int(user)
  item = clubid(club)
  model.loc[len(model.index)] = [user, item] 
  train_data = tc.SFrame(model)
  m = tc.recommender.create(train_data ,user_id='USER_ID', item_id='CLUB_ID')
  recs = m.recommend()
  recs.save('y.csv', format='csv')
  df = pd.read_csv('y.csv')
  ds = df.loc[df['USER_ID']== user]
  ds = ds.head(3)
  y = ds['CLUB_ID']
  y = y.values.tolist()
  for i in range(len(y)):
    y[i] = convert(y[i])
  
  y = json.dumps(y)
  return y

  from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import json

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def load_model():
  global model
  model = df


@app.get('/')
def index():
    return {'message': 'This is the homepage of the API '}


@app.post('/predict')
def get_recommendation(data: User):
    received = data.dict()
    USER_ID = received['USER_ID']
    ITEM_ID = received['ITEM_ID']
    recs = recommendation(model, USER_ID, ITEM_ID)
    return recs

    from colabcode import ColabCode
server = ColabCode(port=3001, code=False)

server.run_app(app=app)
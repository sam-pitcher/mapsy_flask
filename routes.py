from flask import request, render_template, redirect, url_for, make_response

import json

from main import app

@app.route('/')
@app.route('/index')
def index():
    with open("static/data/data.json", "r") as data_file:
        results = json.load(data_file)

    response = make_response(render_template('mapsy.html', title='mapsy', routes=json.dumps(results)))
    return response

# mapsy
import looker_sdk
import urllib3
import os

def get_data_via_looker():
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    os.environ['LOOKERSDK_BASE_URL'] = 'https://dev.looker.looker-plus.com/'
    os.environ['LOOKERSDK_CLIENT_ID'] = 'LOOKERSDK_CLIENT_ID'
    os.environ['LOOKERSDK_CLIENT_SECRET'] = 'LOOKERSDK_CLIENT_SECRET'
    os.environ['LOOKERSDK_VERIFY_SSL']= 'False'
    os.environ['LOOKERSDK_API_VERSION']= '4.0'
    os.environ["LOOKERSDK_TIMEOUT"] = "120"

    sdk = looker_sdk.init40()

    body = {
        "model":"strava-gcp",
        "view":"all_activities",
        "fields":["all_activities.activity_type","all_activities.polyline"],
        "filters":{
            "all_activities.current_date_range":"120 months",
            "all_activities.time_period_selection":"no",
            "all_activities.username":"USERNAME",
            "all_activities.polyline":"-null"
            },
        "limit":"10000",
    }

    results = sdk.run_inline_query(
        'json',
        body
    )

    return(json.loads(results))
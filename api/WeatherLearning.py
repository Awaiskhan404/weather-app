import pandas as pd
import json
def GetStats(setData):
    RawData=setData
    DataDump=json.dumps(RawData)
    ListData=json.loads(DataDump)
    
    return ListData
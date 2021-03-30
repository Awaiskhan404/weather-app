import requests
def LocationByIP(ip):
    #Here again we will use api service for better accurate results
    local_addr="127.0.0.1"
    if ip is not local_addr:
        url="ipinfo.io"
        protocol="https://"
        datatype="/json"
        token="fc1b9c81f3e8cf"
        apiurl=str(protocol+url+"/"+ip+ "?"+ "token=" +token)
        response=requests.get(apiurl)
        return response.json()
    else:
        data=" Public IP Not found"
        return data
import json
from datetime import datetime
import os
import urllib.request

API_KEY = os.environ['API_KEY_ETHERSCAN']

def handler(event, context):
    address = event['arguments']['address'].lower()
    
    url = f'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&sort="asc"&apikey={API_KEY}'
    response = urllib.request.urlopen(url)
    response = response.read().decode('utf-8')
    response = json.loads(response)

    # if status code != 200
    if response['status'] != '1':
        return {
            "statusCode": 400,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
            },
            "body": json.dumps({
                "error": response['result']
            })
        }

    
    transactions = response['result']

    # count the number of transactions
    num_transactions = len(transactions)

    # sum the total value of all transactions
    total_value = sum([int(tx['value']) for tx in transactions]) / 10**18

    # sum the total value of received transactions
    total_received = sum([int(tx['value']) for tx in transactions if tx['to'] == address]) / 10**18

    # sum the total value of sent transactions
    total_sent = sum([int(tx['value']) for tx in transactions if tx['from'] == address]) / 10**18

    # get first and last transaction timestamp and convert to human readable format
    first_tx_timestamp = transactions[0]['timeStamp']
    first_tx_time = datetime.fromtimestamp(int(first_tx_timestamp)).strftime('%Y-%m-%d %H:%M:%S')
    last_tx_timestamp = transactions[-1]['timeStamp']
    last_tx_time = datetime.fromtimestamp(int(last_tx_timestamp)).strftime('%Y-%m-%d %H:%M:%S')

    # get number of transactions from last 30 days
    last_30_days = datetime.now().timestamp() - 30*24*60*60
    last_30_days_tx = [tx for tx in transactions if int(tx['timeStamp']) > last_30_days]
    num_last_30_days = len(last_30_days_tx)

    # get transactions where "to" is our address
    received_tx = [tx for tx in transactions if tx['to'] == address]
    # from received_tx calculate how many different addresses sent us money
    unique_senders = set([tx['from'] for tx in received_tx])
    num_unique_senders = len(unique_senders)

    # get transactions where "from" is our address
    sent_tx = [tx for tx in transactions if tx['from'] == address]
    # from sent_tx calculate how many different addresses we sent money to
    unique_recipients = set([tx['to'] for tx in sent_tx])
    num_unique_recipients = len(unique_recipients)

    print(f"Address: {address}")
    print(f"Number of transactions: {num_transactions}")
    print(f"Total value: {total_value}")
    print(f"Total received: {total_received}")
    print(f"Total sent: {total_sent}")
    print(f"First transaction: {first_tx_time}")
    print(f"Last transaction: {last_tx_time}")
    print(f"Number of transactions in last 30 days: {num_last_30_days}")
    print(f"Number of unique senders to this address: {num_unique_senders}")
    print(f"Number of unique recipients from this address: {num_unique_recipients}")

    return {
        "statusCode": 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        },
        "body": json.dumps({
            "address": address,
            "num_transactions": num_transactions,
            "total_value": total_value,
            "total_received": total_received,
            "total_sent": total_sent,
            "first_tx_time": first_tx_time,
            "last_tx_time": last_tx_time,
            "num_last_30_days": num_last_30_days,
            "num_unique_senders": num_unique_senders,
            "num_unique_recipients": num_unique_recipients
        })
    }

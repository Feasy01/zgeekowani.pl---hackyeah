### venv setup

Windows:
```sh
python -m venv venv

.\venv\Scripts\activate
```

Linux:
```sh
python3 -m venv venv

source venv/bin/activate
```

### Install packages

```sh
pip install -r requirements.txt
```

### Run
```sh
uvicorn main:app --reload
```

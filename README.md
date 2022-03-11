# lighthouse-gcp
lighthouse on google cloud function

## Deploying Function 

```sh
gcloud functions deploy lighthouse_poc --runtime=nodejs14 --trigger-http --allow-unauthenticated --timeout=100 --memory=2048
```

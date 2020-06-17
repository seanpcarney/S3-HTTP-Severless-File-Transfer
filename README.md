# S3-HTTP-Severless-File-Transfer

This web app creates a serverless, secure solution to upload small to large files directly into Amazon S3 via the AWS JavaScript SDK. This process eases the load on your server and sends files directly to S3 from the web browser. This solution also integrates with multipart upload for larger files. It is secured by using Identity Federation via Google OAuth 2.0. My goal for this project is to provide recording studios and music artists an easy way to upload their projects securely into S3 Glacier archival storage.

<img src="http://u.cubeupload.com/seanplaysmusic/FileUploaderSS.png"
     alt="Markdown Monster icon"
     style="float: left; margin-right: 10px;" />


### Prerequisites


* An S3 Bucket to host the web application (Bucket A)
* An S3 Bucket to receive the files (Bucket B)
* OAuth 2.0 credentials via Google
* AWS JavaScript SDK


### Instructions

Step 1:

```
In the AWS Console create a public S3 Bucket to host a static website. (Bucket A)
Create a second private S3 bucket to receive your files (Bucket B).
```

Under Bucket B's permissions set the 'CORS Configuration' as follows:


```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <ExposeHeader>ETag</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

Step 2:

```
Create OAuth 2.0 credentials via Google
```
Information on setting up 0Auth 2.0 via Google can be found  [HERE](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-browser-credentials-federated-id.html) and [HERE](https://blog.codecentric.de/en/2018/04/accessing-aws-resources-with-google-sign-in/)
```
Note down your Google 'Client Id'.
```

Step 3:

```
Create an IAM Role with a web identity type. Use your Google Client ID as the ‘Audience’ and attach the following policy.
```

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1510254114000",
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": [
                "YOURS3BUCKETB-ARN",
                "YOURS3BUCKETB-ARN/*"
                ]
            }
        ]
}
```

```
Note down your 'Role ARN'.
```

Step 4:
```
Fill in the included 'index.html' and 's3-upload.js' files with the required content.
Upload these files to Bucket A and make these files public.
```

Step 5:

```
Use the Bucket A Endpoint url to visit the homepage of your web app.
Authenticate your identity with Google.
Select “choose file” and select a file for upload.
Select upload and wait for a success signal. (Larger files may take some time.)
Once the status shows “UPLOADED” visit Bucket B and verify the file has successfully completed upload.
```

## Built With

* [AWS](https://aws.amazon.com/) - The Cloud Storage Provider
* [Google Identity Platform](https://developers.google.com/identity/) - Identity Federation Provider

## Authors

* **Sean P. Carney** -  [linkedin](https://www.linkedin.com/in/seanpatrickcarney/)

## Acknowledgments

* HTML and Javascript based on an [blogpost](https://medium.com/faun/summary-667d0fdbcdae)  by Prasad Josh.

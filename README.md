## React PDF Compressor

This repository contains the code for a web application that allows users to compress PDF files using a simple, user-friendly interface. 

**Features:**

* **React Frontend:** The application is built using React, providing a responsive and dynamic user experience.
* **AWS Lambda Backend:** PDF compression is handled by AWS Lambda functions, ensuring scalability and efficient resource utilization.
* **File Upload and Download:** Users can upload PDF files and download the compressed versions with ease.
* **Progress Indicators:** Real-time progress indicators provide feedback during the compression process.
* **Error Handling:** Robust error handling is implemented to ensure a smooth user experience.

**Technology Stack:**

* **React:** Frontend framework
* **AWS Lambda:** Serverless backend for compression
* **Amazon S3:** Storage for uploaded and compressed PDFs
* **(PyPDF)**: Library used for compressing PDFs within the Lambda function

**Getting Started:**

1. Clone this repository.
2. Install dependencies: `npm install`
3. Configure AWS resources (Lambda function, S3 bucket, API Gateway).
4. Start the development server: `npm start`

This application demonstrates a practical example of integrating React with serverless functions on AWS for a real-world use case. 

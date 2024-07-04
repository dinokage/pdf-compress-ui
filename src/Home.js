import React, { useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import {save} from 'save-file';
import ReactLoading from 'react-loading'
function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [message, setMessage] = useState('')
  const [downloadURL, setDownloadURL] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0])
    event.target.files[0].arrayBuffer().then((res) => console.log(res))
    event.target.files[0] && setIsFilePicked(true);
  };
  async function downloadHandler() {
    console.log(downloadURL);
    const res = await axios.get(downloadURL, {responseType: 'arraybuffer'});
    await save('download.pdf', res.data)
    console.log("Download clicked!", res.data);
  }
  const handleSubmission = async () => {
    // HANDLING FILE AS SENDING FILE INTO BACKEND
    if (!isFilePicked) return;
    let type = selectedFile['type'].split('/')[1]
    if (type !== 'pdf') {
      setSelectedFile(null);
      setIsFilePicked(false);
      setMessage("select PDF pliz")
      return
    }
    setLoading(true)
    const formData = new FormData();
    formData.append("pdf",selectedFile);
    // API CALL
    const uploadURL = await axios.get('https://basic-express-presign.vercel.app/upload')
    console.log(uploadURL)
    try {
      const res = await fetch(uploadURL.data.url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: selectedFile
      })
      
      console.log('Upload successful:', res);
      
      setDownloadURL(`https://compressed-pdfs-dino.s3.ap-south-1.amazonaws.com/compressed/${uploadURL.data.key}`)
      setTimeout(() => {
        setLoading(false)
        setSelectedFile(null);
        setIsFilePicked(false);
        setSuccess(true);
      }, 7000)
      
      // Handle successful upload (e.g., display success message)
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle upload error (e.g., display error message)
    } finally {
      setSelectedFile(null); // Clear selected file after upload attempt
    }
  };
  if (selectedFile && isFilePicked) {
    console.log(selectedFile['type'].split('/')[1])
  }
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <form className="FileForm" onSubmit={changeHandler} >
        <label><div className="border-solid border-2 border-gray-600 py-10 rounded-lg">Upload file here</div>
        <input id="fileUpload" className="FileSelect" type="file" name="file" onChange={changeHandler} accept="application/pdf"/></label>
      
      <div className="py-5">{message}
        {/* <button onClick={handleSubmission}>Submit</button> */}
        <Button className="SubmitButton" colorScheme="cyan" onClick={handleSubmission}>
          Compress!
        </Button>
      </div>
      </form>
      {isFilePicked && selectedFile ? (
        <div className="text-green-500 text-4xl font-bold">
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        null
      )}
      {loading? (<ReactLoading type="spin" color="#0000FF"
                height={100} width={50}/>) : (null)}
      {success ? (
        <Button className="DownloadButton" onClick={downloadHandler}>Download </Button>
      ): (null)}
    </div>
  );
}

export default Home;

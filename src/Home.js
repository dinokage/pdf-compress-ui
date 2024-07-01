import React, { useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import {save} from 'save-file';
function Home() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [message, setMessage] = useState('')
  const [downloadURL, setDownloadURL] = useState('')
  const [success, setSuccess] = useState(false)
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
    const formData = new FormData();
    formData.append("pdf",selectedFile);
    // API CALL
    const uploadURL = await axios.get('http://localhost:5125/upload')
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
      
      setDownloadURL(`https://compressed-pdfs-dino.s3.ap-south-1.amazonaws.com/${uploadURL.data.key}`)
      setSuccess(true);
      
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
    <div className="App">
      <input type="file" name="file" onChange={changeHandler} accept="application/pdf"/>
      <div>{message}
        {/* <button onClick={handleSubmission}>Submit</button> */}
        <Button colorScheme="cyan" onClick={handleSubmission}>
          Compress!
        </Button>
      </div>
      {isFilePicked && selectedFile ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <div>
          <p>Select a file</p>
        </div>
      )}
      {success ? (
        <Button onClick={downloadHandler}>Download </Button>
      ): (null)}
    </div>
  );
}

export default Home;

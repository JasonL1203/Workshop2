const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')


const PINATA_API_KEY = 'd54e9dab97f948dfd7da';
const PINATA_API_SECRET  = '37a6fd90d2c0382c6774f0487168de1a7b45f61d28230f89c1c2da56209b98fc';
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5Nzg0NmE4NS1jZTZhLTRlZTEtOGRkNS1mNTI0ZDgxMmM1NGMiLCJlbWFpbCI6ImxhdWo0MDZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImQ1NGU5ZGFiOTdmOTQ4ZGZkN2RhIiwic2NvcGVkS2V5U2VjcmV0IjoiMzdhNmZkOTBkMmMwMzgyYzY3NzRmMDQ4NzE2OGRlMWE3YjQ1ZjYxZDI4MjMwZjg5YzFjMmRhNTYyMDliOThmYyIsImlhdCI6MTcwNzE3NTE0N30.c5vQHRES_ZIqgRbC1SDHAuoHTsw4Pxry7au9zTj2keQ';



const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src =  "C:/Users/lauj4/OneDrive/Images/IPFS-command.png";
   
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
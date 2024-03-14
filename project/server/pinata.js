const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNGU2MDE2ZS03NDZkLTQ2OTctODM2OS05Y2ZmMGViODFkMjkiLCJlbWFpbCI6Imhvbmd6aGFubmdAeWFob28uY29tLm15IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImIxMGRjNDIxM2VjY2ZjOTQ5ZmY1Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTdiMDFjOTVmZDM4YmZmMmQ3MjYxMTFhNzE1ZTZmNGEzOTQxZTdlYTc1YjYwMTk5MjkyZDRkYzk5ZTUyYTNlMiIsImlhdCI6MTcxMDQxNjgwN30.lCKHmZmTrcHqn5ceTnPA_6NC5o6VM6aU-q8bVX1FMdM";

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "path/to/file.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 1,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
pinFileToIPFS();

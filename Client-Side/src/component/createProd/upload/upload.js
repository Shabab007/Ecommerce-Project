import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import { GET_PROD } from "../../../Queries/query";
import { UPLOAD_FILE } from "../../../Queries/mutaion";

const Upload = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    refetchQueries: [{ query: GET_PROD }],
  });

  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive}?(
      <p>Drop the files here</p>
      ): (<p>Drag n drop files here or click here to select files</p>)
    </div>
  );
};

export default Upload;

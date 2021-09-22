import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function FileUploadComponent(props) {
  
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onloadend = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        
        setFilesData(filesData.push(binaryStr));
        props.setField.setFieldValue(props.fieldName, filesData)
        console.log(binaryStr);
      }
      reader.readAsText(file);
    })
  }, []);
  const {getRootProps, getInputProps, acceptedFiles, fileRejections} = useDropzone({noDrag: true, multiple: true, maxSize: 900000, onDrop, maxFiles:props.maxFiles, accept:props.fileTypes });
  const acceptedFileItems = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} className="text-danger">
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <button type="button" className="btn btn-sm btn-primary">Upload File</button>
        <input {...getInputProps()} />
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{acceptedFileItems}</ul>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}
export default FileUploadComponent;
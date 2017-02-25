import axios from 'axios';

export function handleChange(name, value) {
  return {
    type: "EDIT_" + name.toUpperCase(),
    payload: value
  }
}

export function showMergeMenu(value) {
  return {
    type: "SHOWMERGEMENU",
    payload: value
  }
}

// API request to server to create a document
export function mergeDocument() {
  return (dispatch, getState) => {
    var states = getState();
    var documentInformation = {
      docName: states.doc.docName,
      filePath: states.doc.filePath,
      docContent: states.doc.previewContent,
    }
    var mergeRequest = {
      docInfo: documentInformation,
      mergeInfo: states.merge
    }
    axios.post('/api/doc/requestMerge', mergeRequest);
  }
}
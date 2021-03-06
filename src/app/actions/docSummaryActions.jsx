import axios from 'axios';
import * as loading from './loadingActions.jsx';

export function switchSplitOrUnified (view) {
  return {
    type: "SWITCH_SPLIT_UNIFIED",
    payload: view
  }
}

export function editMerge () {
  return {
    type: "EDIT_MERGE"
  }
}

export function turnOffEdits () {
  return {
    type: "TURN_OFF_EDITS"
  }
}

export function cancelComment () {
  return {
    type: "CANCEL_COMMENT"
  }
}

export function tabChange (tab) {
  return {
    type: "TAB_CHANGE",
    payload: tab
  }
}

export function reviewChanges (dropdownSelect) {
  return {
    type: "REVIEW_CHANGES",
    payload: dropdownSelect
  }
}

export function actionPullRequest (info) {
  return (dispatch, getState) => {
    axios.post('/api/doc/actionPullRequest', info)
    .then(function(response) {
      // dependent on how we handle error handling, toast message should change
      dispatch(loading.toggleToast(true, `Merge ${info.mergeStatus} successful!`));
    });
  }
}
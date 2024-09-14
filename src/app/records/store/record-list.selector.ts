import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Record, Records } from "../record-model";

// selectRecords doen't work though without the feature
export const selectRecords = (state: { records : Records }) => state.records;

const getRecordsStateFeature=createFeatureSelector<Records>('record');

export const getRecordList=createSelector(getRecordsStateFeature,(state)=>{
    return state.recordList
});

export const getRecordbyId=(recordId : string)=>createSelector(getRecordsStateFeature,(state)=>{
    return state.recordList.find((record:Record)=>record.id === recordId) as Record;
})

export const getRecordbyIndex=(itemIndex : number)=>createSelector(getRecordsStateFeature,(state)=>{
    // workaround item isnt the "records" but a reducer?
    const stateObj = {records: {recordList:[], errorMessage:'', editItemIndex: -1, editItemId : -1 } as Records};
    Object.assign(stateObj, state);
  if (stateObj.records?.recordList?.length == 0) {
     return null;
   }
  return stateObj.records?.recordList[itemIndex] as Record;
})

export const getRecordbyEditIndex = createSelector(getRecordsStateFeature,(state)=>{
/*   // workaround item isnt the "records" but a reducer?
  state.editItemIndex
  const stateObj = {records: {recordList:[], errorMessage:'', editItemIndex: 0 } as Records};
  Object.assign(stateObj, state); */
if (state?.recordList?.length == 0) {
   return null;
 }
return state?.recordList[state.editItemIndex] as Record;
})

export const getRecords=createSelector(getRecordsStateFeature,(state)=>{
    return state
});


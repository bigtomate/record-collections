import { State } from "./record-list.reducer";


export const selectRecordList = (state: {recordList: State}) => state.recordList;

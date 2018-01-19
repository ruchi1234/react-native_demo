import { UPDATE_DATE } from './Action';

const initialState = {
    date:"2012-1-2017"
    
}
export default function (state = initialState, action= {})
{
    switch(action.type)
    {
        case UPDATE_DATE : {
            return {
                ...state,
                date: action.date
            }
        }
        default:{
            return state
        }
    }
}
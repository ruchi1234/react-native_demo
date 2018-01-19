export const UPDATE_DATE = 'UPDATE_DATE'

export function updateDate (element) {
    console.log('updateDate');
  return { 
            type: UPDATE_DATE,
             element 
        }
}
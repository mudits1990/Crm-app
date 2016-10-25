export const toggleAddSection = () => {
    return {
        type: 'TOGGLE_ADD_SECTION_POPUP',
    }
};

export const toggleEditSection = (section) => {
    return {
        type: 'TOGGLE_EDIT_SECTION_POPUP',
        section: section
    }
};

export const saveEditChanges = (section) => {
    return {
        type: 'SAVE_EDIT_SECTION_CHANGES',
        section: section
    }
};

export const tempSectionNameChanged = (value) => {
    return {
        type: 'TEMP_SECTION_NAME_CHANGED',
        name: value
    }
};

export const tempSectionSelected = (value) => {
    return {
        type: 'TEMP_SECTION_POSITION_CHANGED',
        sectionName: value
    }
};

export const tempSectionCounterChanged = (value) => {
    return {
        type: 'TEMP_SECTION_POSITION_COUNTER_CHANGED',
        sectionCounter: value
    }
};

export const createNewSection = (name) => {
    if(name){
        return {
            type: 'CREATE_NEW_SECTION'
        }
    }
    else{
        return {
            type: 'CHANGE_ERROR_TEXT_FOR_ADD_SECTION',
        }
    }
};

export const deleteField = (section, fieldName) => {
    return {
        type: 'DELETE_FIELD',
        section: section,
        fieldName: fieldName
    }
};


export const toggleAddField = (section) => {
    return{
        type: 'TOGGLE_ADD_FIELD_POPUP',
        section: section
    }
};

export const setFieldName = (name) => {
    return {
        type: 'SET_FIELD_NAME',
        name: name
    }
};


export const saveAddFieldChanges = (section) => {
    return {
        type: 'SAVE_FIELD',
        section: section
    }
};


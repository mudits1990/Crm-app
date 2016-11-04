const defaultState = {
    sections : [
        {
            name: 'BioData',
            editSection: false,
            deleteSection: false,
            moveSection: false,
            fields: [
                {
                    name: 'Hostel',
                    delete: false,
                    property: 'xyz'
                },
                {
                    name: 'Medical Residency',
                    property: 'xyz',
                    delete: false
                },
                {
                    name: 'Board Certification',
                    property: 'xyz',
                    delete: false
                },
                {
                    name: 'IP Location',
                    property: 'xyz',
                    delete: false
                },
                {
                    name: 'Browser Agent',
                    property: 'xyz',
                    delete: false
                },
                {
                    name: 'Contact Address',
                    property: 'xyz',
                    delete: false
                }
            ]
        },
        {
            name: 'Education',
            editSection: false,
            deleteSection: false,
            moveSection: false,
            fields: [
                {
                    name: 'Hostel',
                    property: 'xyz',
                    delete: false,
                },
                {
                    name: 'Medical Residency',
                    property: 'xyz',
                    delete: false
                },
                {
                    name: 'Board Certification',
                    property: 'xyz',
                    delete: false
                },
                {
                    name: 'IP Location',
                    property: 'xyz',
                    delete: false
                },
                {
                    name: 'Browser Agent',
                    property: 'xyz',
                    delete: false
                },
                {
                    name: 'Contact Address',
                    property: 'xyz',
                    delete: false
                }
            ]
        },
    ],
    tempSection: {
        name: '',
        position: 'BioData',
        positionCounter: -1,
        errorText: ''
    },
    tempFieldAttributes: {
        name: '',
        property: 'xyz',
        errorText: ''
    },
    showAddSection: false,
    showAddField: false,
};


const mainReducer = (state=defaultState, action) => {
    const {tempSection} = state;
    let {sections} = state;
    switch(action.type){
        case 'TOGGLE_ADD_SECTION_POPUP':
            const {showAddSection} = state;
            return{
                ...state,
                showAddSection: !showAddSection,
                tempSection: {
                    name: '',
                    position: sections[0].name,
                    positionCounter: 1,
                    errorText: ''
                }
            };
        case 'TOGGLE_EDIT_SECTION_POPUP':
            const editSection = action.section;
            let editPosition = sections.findIndex((section) => {
                return editSection.name === section.name;
            });
            sections[editPosition].editSection = !sections[editPosition].editSection;
            return{
                ...state,
                sections: [...sections],
                tempSection: {
                    name: '',
                    position: sections[editPosition].editSection ? editSection.name : 'BioData',
                    positionCounter: 1,
                    errorText: ''
                }
            };

        case 'SAVE_EDIT_SECTION_CHANGES':
            const editSectionToBeSaved = action.section;
            const saveEditPosition = sections.findIndex((section) => {
                return editSectionToBeSaved.name === section.name;
            });
            sections[saveEditPosition].editSection = !sections[saveEditPosition].editSection;
            sections[saveEditPosition].name = tempSection.name;
            // if(tempSection.positionCounter === 1){
            //     const temp = sections[saveEditPosition];
            //     sections[saveEditPosition] = sections[saveEditPosition+1];
            //     sections[saveEditPosition] = temp
            // }
            // else if(tempSection.positionCounter === -1){
            //     const temp = sections[saveEditPosition];
            //     if(saveEditPosition > 0){
            //         sections[saveEditPosition] = sections[saveEditPosition-1];
            //         sections[saveEditPosition] = temp
            //     }
            // }
            return {
                ...state,
                sections: [...sections],
                tempSection: {
                    name: '',
                    position: sections[0].name,
                    positionCounter: 1,
                    errorText: ''
                }

            };
        case 'TEMP_SECTION_NAME_CHANGED':
            const {name} = action;
            return {
                ...state,
                tempSection: {
                    name: name,
                    position: tempSection.position,
                    positionCounter: tempSection.positionCounter,
                    errorText: ''
                }
            };
        case 'TEMP_SECTION_POSITION_CHANGED':
            const {sectionName} = action;
            return{
                ...state,
                tempSection: {
                    name: tempSection.name,
                    position: sectionName,
                    positionCounter: tempSection.positionCounter,
                    errorText: ''
                }
            };
        case 'TEMP_SECTION_POSITION_COUNTER_CHANGED':
            const {sectionCounter} = action;
            return{
                ...state,
                tempSection: {
                    name: tempSection.name,
                    position: tempSection.position,
                    positionCounter: sectionCounter,
                    errorText: ''
                }
            };

        case 'CREATE_NEW_SECTION':
            let position = sections.findIndex((section) => {
               return tempSection.position === section.name;
            });
            if(tempSection.positionCounter > 0){
                position++;
            }
            Array.prototype.insert = function (index, item) {
                this.splice(index, 0, item);
            };

            sections.insert(position, {
                name: tempSection.name,
                editSection: false,
                deleteSection: false,
                moveSection: false,
                fields: []
            });

            return{
                ...state,
                tempSection: {
                    name: '',
                    position: 1,
                    positionCounter: 1,
                    errorText: ''
                },
                showAddSection: false
            };

        case 'CHANGE_ERROR_TEXT_FOR_ADD_SECTION':
            return {
                ...state,
                tempSection: {
                    name: tempSection.name,
                    position: tempSection.position,
                    positionCounter: tempSection,
                    errorText:"This field is required"
                }
            };

        case 'TOGGLE_ADD_FIELD_POPUP':
            const fieldChangeSection = action.section;
            let fieldChangeSectionPosition = sections.findIndex((section) => {
                return fieldChangeSection.name === section.name;
            });
            sections[fieldChangeSectionPosition].showAddField = !sections[fieldChangeSectionPosition].showAddField;
            return{
                ...state,
                sections: [...sections]
            };

        case 'SET_FIELD_NAME':
            return {
                ...state,
                tempFieldAttributes: {
                    name: action.name,
                    property: 'xyz'
                }
            };

        case 'SAVE_FIELD':
            let {tempFieldAttributes} = state;
            let fieldSection = action.section;
            let saveFieldSectionPosition = sections.findIndex((section) => {
                return fieldSection.name === section.name;
            });
            sections[saveFieldSectionPosition].showAddField = !sections[saveFieldSectionPosition].showAddField;
            tempFieldAttributes.delete = false;
            sections[saveFieldSectionPosition].fields.push(tempFieldAttributes);
            return {
                ...state,
                sections: [...sections]
            };

        default:
            return state;
    }
};

export default mainReducer

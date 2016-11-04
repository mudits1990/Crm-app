import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {toggleAddSection, tempSectionNameChanged, tempSectionSelected, tempSectionCounterChanged,
    createNewSection, deleteField, toggleEditSection, saveEditChanges, toggleAddField, saveAddFieldChanges,
    setFieldName} from '../actions/index';
import { bindActionCreators } from 'redux'

const mapPropsToState = (props) => {
    return {
        sections: props.sections,
        tempSection: props.tempSection,
        tempFieldAttributes: props.tempFieldAttributes,
        showAddSection: props.showAddSection,
        showAddField: props.showAddField
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAddSection: bindActionCreators(toggleAddSection, dispatch),
        tempSectionNameChanged: bindActionCreators(tempSectionNameChanged, dispatch),
        tempSectionSelected: bindActionCreators(tempSectionSelected, dispatch),
        tempSectionCounterChanged: bindActionCreators(tempSectionCounterChanged, dispatch),
        createNewSection: bindActionCreators(createNewSection, dispatch),
        deleteField: bindActionCreators(deleteField, dispatch),
        toggleEditSection: bindActionCreators(toggleEditSection, dispatch),
        saveEditChanges: bindActionCreators(saveEditChanges, dispatch),
        toggleAddField: bindActionCreators(toggleAddField, dispatch),
        saveAddFieldChanges: bindActionCreators(saveAddFieldChanges, dispatch),
        setFieldName: bindActionCreators(setFieldName, dispatch)
    }
};

const styles = {
    popUp: {
        height: '350px',
        maxHeight: 'none'
    },
    addSectionButton: {
        float:'right'
    },
    radioButton: {
        display: 'inline-block',
        float: 'left',
        width: '50%'
    },
    fieldButtons: {
        float: 'right'
    },
    chip: {
        margin: 4,
        display: 'inline-block'
    },
};

class MainContainer extends Component{

    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.toggleAddSection}
            />,
            <FlatButton
                label="Save Changes"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {this.props.createNewSection(this.props.tempSection.name)}}
            />,
        ];

        const sectionToBeEdited = this.props.sections.filter((section) => {
            return  section.editSection === true;
        });
        const fieldToBeEdited = this.props.sections.filter((section) => {
            return section.showAddField === true;
        });

        const editActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => {this.props.toggleEditSection(sectionToBeEdited[0])}}
            />,
            <FlatButton
                label="Save Changes"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {this.props.saveEditChanges(sectionToBeEdited[0])}}
            />,
        ];
        const addFieldActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => {this.props.toggleAddField(fieldToBeEdited[0])}}
            />,
            <FlatButton
                label="Save Changes"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {this.props.saveAddFieldChanges(fieldToBeEdited[0])}}
            />,
        ];
        return(
            <div className="mainContainer">
                <div className="leftText">Profile View</div>
                <RaisedButton
                    label="Add New Section"
                    primary={true}
                    onTouchTap={() => {
                        this.props.toggleAddSection()
                    }}
                    style={styles.addSectionButton}
                />
                <Dialog
                    title="Add section"
                    modal={false}
                    actions={actions}
                    open={this.props.showAddSection}
                    onRequestClose={this.props.toggleAddSection}
                    autoScrollBodyContent={true}
                    style={styles.popUp}
                >
                    <div className="hr"></div>
                    <div className="radioButton">
                        <RadioButtonGroup name="sectionType" defaultSelected="not_light">
                            <RadioButton
                                value="NEW SECTION"
                                label="NEW SECTION"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="DEFAULT SECTION"
                                label="DEFAULT SECTION"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>
                    </div>
                    <div className="sectionNameInput">
                        <TextField
                            hintText="SECTION NAME"
                            floatingLabelText="SECTION NAME"
                            floatingLabelFixed={true}
                            onChange={(event, index, value) => {this.props.tempSectionNameChanged(index)}}
                            errorText={this.props.tempSection.errorText}
                        />
                    </div>
                    <div className="dropDownContainer">
                        <DropDownMenu value={this.props.tempSection.positionCounter} onChange={(event, index, value) => {this.props.tempSectionCounterChanged(value)}} >
                            <MenuItem value={-1} primaryText="ABOVE" />
                            <MenuItem value={1} primaryText="BELOW" />
                        </DropDownMenu>
                        <DropDownMenu value={this.props.tempSection.position} onChange={(event, index, value) => {
                            this.props.tempSectionSelected(value);
                        }}>
                            {
                                this.props.sections.map((section) => {
                                    return <MenuItem key={section.name} value={section.name}
                                                     primaryText={section.name} />
                                })
                            }
                        </DropDownMenu>
                    </div>
                </Dialog>
                <Dialog
                    title="Edit Section"
                    modal={false}
                    actions={editActions}
                    open={sectionToBeEdited.length > 0}
                    onRequestClose={() => this.props.toggleEditSection(sectionToBeEdited)}
                    autoScrollBodyContent={true}
                    style={styles.popUp}
                >
                    <div className="hr"></div>
                    <div className="radioButton">
                        <RadioButtonGroup name="sectionType" defaultSelected="not_light">
                            <RadioButton
                                value="NEW SECTION"
                                label="NEW SECTION"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="DEFAULT SECTION"
                                label="DEFAULT SECTION"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>
                    </div>
                    <div className="sectionNameInput">
                        <TextField
                            hintText="SECTION NAME"
                            defaultValue={sectionToBeEdited.length ? sectionToBeEdited[0].name : ''}
                            floatingLabelText="SECTION NAME"
                            floatingLabelFixed={true}
                            onChange={(event, index, value) => {this.props.tempSectionNameChanged(index)}}
                            errorText={this.props.tempSection.errorText}
                        />
                    </div>
                    <div className="dropDownContainer">
                        <DropDownMenu value={this.props.tempSection.positionCounter} onChange={(event, index, value) => {this.props.tempSectionCounterChanged(value)}} >
                            <MenuItem value={-1} primaryText="ABOVE" disabled={true} />
                            <MenuItem value={1} primaryText="BELOW" disabled={true} />
                        </DropDownMenu>
                        <DropDownMenu value={this.props.tempSection.position} onChange={(event, index, value) => {
                            this.props.tempSectionSelected(value);
                        }}>
                            {
                                this.props.sections.map((section) => {
                                    return <MenuItem key={section.name} value={section.name}
                                                     primaryText={section.name} disabled={true} />
                                })
                            }
                        </DropDownMenu>
                    </div>
                </Dialog>
                <Dialog
                    title="Add Field"
                    modal={false}
                    actions={addFieldActions}
                    open={fieldToBeEdited.length > 0}
                    onRequestClose={() => this.props.toggleAddField(fieldToBeEdited)}
                    autoScrollBodyContent={true}
                    style={styles.popUp}
                >
                    <div className="hr"></div>
                    <div className="sectionNameInput">
                        <TextField
                            hintText="FIELD NAME"
                            floatingLabelText="FIELD NAME"
                            floatingLabelFixed={true}
                            onChange={(event, index, value) => {this.props.setFieldName(index)}}
                            errorText={this.props.tempFieldAttributes.errorText}
                        />
                    </div>
                    <div className="dropDownContainer">
                        <DropDownMenu value={this.props.tempFieldAttributes.property}>
                            <MenuItem value="xyz" primaryText="xyz" disabled={true} />
                        </DropDownMenu>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const VisibleMainContainer = connect(
    mapPropsToState,
    mapDispatchToProps
)(MainContainer);

export default VisibleMainContainer;
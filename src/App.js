import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {deleteField} from './actions/index';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import VisibleMainContainer from './components/mainContainer';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Chip from 'material-ui/Chip';


injectTapEventPlugin();

class App extends Component {
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

  render() {
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

    return (
        <div className="profileViewContainer">
            <VisibleMainContainer props={this.props}/>
            {
                this.props.sections.map((section) => {
                    return (
                        <div key={section.name} className="sectionContainer">
                            <div className="sectionTopContainer">
                                <div className="sectionName">
                                    {section.name}
                                </div>
                                <FlatButton label="Edit Section" default={true} onTouchTap={()=>{
                                    this.props.toggleEditSection(section)
                                }} />
                                <FlatButton label="Delete Section" default={true} />
                                <FlatButton label="Move Section" default={true} />
                                <FlatButton label="Add Fields" primary={true} style={styles.fieldButtons} onTouchTap={
                                    () => {this.props.toggleAddField(section)}
                                }/>
                                <FlatButton label="Add Field Group" primary={true} style={styles.fieldButtons}/>
                            </div>
                            <div className="fieldContainer">
                                {
                                    section.fields.map((field) => {
                                        return (
                                            <Chip
                                                key={field.name}
                                                onRequestDelete={() => {
                                                    deleteField(section, field.name)
                                                }}
                                                style={styles.chip}
                                            >
                                                {field.name}
                                            </Chip>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
  }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

const VisibleApp = connect((state) => ({
    showAddSection: state.showAddSection,
    sections: state.sections,
    tempSection: state.tempSection,
    tempFieldAttributes: state.tempFieldAttributes
}))(App);
export default VisibleApp;

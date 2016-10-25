import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'

class Section extends Component{
    render(){
        return (
            <div className="sectionContainer">
                <FlatButton label="Edit Section" primary={true} />
            </div>
        )
    }
}

const VisibleSection = connect((state) => ({
    sections: state.sections
}))(Section);

export default VisibleSection
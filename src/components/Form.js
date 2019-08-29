// Form.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from '../actions/contactAction';
import List from './List.js';
import Select from './Select.js';

class Form extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
    }
  }

  handleChange(e){
    this.setState({
      name: e.target.value,
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.name,
    }
    this.props.createContact(contact);
  }

  render() {
    return (
        <div>
          <div className="contacts-form-results">
            <h3>Add Contact</h3>
            <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.handleChange} className="form-control" value={this.state.name}/>
              <Select />
              <input type="submit" className="btn btn-success add-button" value="Add Contact"/>
            </form>
            <hr />

            <div class="column">
              <th>List 1</th>
              <List list={this.props.list1} />
            </div>

            <div class="column">
              <th>List 2</th>
              <List list={this.props.list2} />
            </div>
            
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list1: state.contacts.list1,
    list2: state.contacts.list2,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Form);
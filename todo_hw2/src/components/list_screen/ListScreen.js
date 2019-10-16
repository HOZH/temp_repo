import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {

    state = {
       showTrash:false
    }
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }

    OnChange = (e)=>{
        e.preventDefault();
        // console.log(e);
        // console.log(e.target.name);
        this.props.nameOnChange(e.target.name,e.target.value)

    }

    toggleTrashDialog = ()=>{
        

        this.setState({showTrash:!this.state.showTrash})
        // console.log(this.state.showTrash)


    }

    deleteList = ()=>{

        console.log("lalala");

        // this.toggleTrashDialog()
        this.props.deleteList()

    }




   
    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash showTrash={this.toggleTrashDialog} />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.getListName()} 
                            type="text" 
                            id="list_name_textfield"
                            name="name"
                            onChange={this.OnChange}
                            />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.getListOwner()}
                            type="text"
                            name ="owner"
                            onChange={this.OnChange}

                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable editItem={this.props.editItem} moveUp={this.props.moveUp} deleteItem={this.props.deleteItem}
moveDown={this.props.moveDown} todoList={this.props.todoList} sortBy={this.props.sortBy} showTrash={this.state.showTrash} hideDialog={this.toggleTrashDialog} deleteList={this.deleteList}/>
            </div>
        )
    }
}

export default ListScreen

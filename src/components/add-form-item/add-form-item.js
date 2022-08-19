import React, {Component} from "react";
import './add-form-item.css'

export default class AddFormItem extends Component {

    state = {
        form: ''
    }
    
    onChangeForm =(e)=>{
        this.setState({
            form: e.target.value
        })
    }
    onSubmit =(e)=>{
        e.preventDefault()
        this.props.onAddItem(this.state.form)
        this.setState({
            form: ''
        })
    }
    render(){
        
        return (
            
            <form className="add-form d-flex"
                  onSubmit={this.onSubmit}>
                <input placeholder="What needs to do" 
                       type='text'
                       className="form-control add-form-item"
                       onChange={this.onChangeForm}
                       value={this.state.form}/>
                <button className="btn btn-outline-secondary">
                    Add Items
                </button>
            </form>
        )
    }
}
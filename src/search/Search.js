import React,{Component} from 'react'
import './Search.css'

class Search extends Component{

    render(){
        return <form className='filter-form'>
        <div className="input-group input-group">
        <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button" id="add-button"
                onClick={()=>this.setState({addForm:true})} 
            >დამატება</button>
        </div>
            <input 
                placeholder = 'ძებნა'
                type="text" 
                className="form-control" 
                id="search" 
                value={this.state.searchValue}
                onChange={this.handleSearch}
            />
        </div>
        </form>
    }
}

export default Search
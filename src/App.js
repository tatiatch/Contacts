import React from 'react'
import './App.css'
import Header from "./Header"
import AddContact from './AddContact'
import contactData from './data'



class App extends React.Component {
 
  componentDidMount(){
     this.setState({contacts:contactData})
  }

  state = {
      contacts: [],
      isEnable: true,
      counter: 0,
      searchValue:'',
      addForm: false
  }

  handleClick = (id) => {

    const contactData = this.state.contacts.filter(x => x.id !== id)
    this.setState({ contacts: contactData, contactData })

    //const index = this.state.contacts.findIndex(x=>x.id===id)
    //const arr = [...this.state.contacts].splice(index, 1)
    //console.log('arr', arr)

  }

  inc = () => {
    this.setState({ counter: this.state.counter + 1 })
  }

  dec = () => {
    this.setState({ counter: this.state.counter - 1 })
  }

  handleSearch=(event)=>{
     const contacts = contactData.filter(x=>x.name.toUpperCase().includes(event.target.value.toUpperCase()))
     this.setState({
       searchValue: event.target.value,
       contacts
    })
  }

  handleClose = () => {
    //const arr =  this.state.contacts.concat({})
    this.setState({addForm:false})
  }
 
  render() {

    return <>
      <Header/>

      {this.state.addForm ? <AddContact close = {this.handleClose}/> :

      <div className='container'>
        <form className='filter-form'>

        <div className="input-group input-group-sm">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button" id="button-addon1"
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
        <div>
          <div>
            {
             this.state.contacts && this.state.contacts.map(x => {
                return <div key={x.id} className='card mt-3'>
                  <div className='card-body'>
                    {x.name}
                    <button className='btn btn-danger float-right' onClick={() => this.handleClick(x.id)}>X</button>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>}
       
    </>
  }
}
export default App;

import React from 'react'

// export default class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(id,e) {
    console.log(id)
    console.log(e)
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      /*<input type ='text' name ='password' value = {this.state.value} onChange={this.handleChange}></input>*/

    <input type ='text' name ='password' value = {this.state.value} onChange={(e) => this.handleChange(122, e)}></input>)
  }
}

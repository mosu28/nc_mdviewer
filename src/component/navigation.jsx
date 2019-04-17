import React from 'react'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: props.active,
      docs: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(name) {
    this.setState({active: name})
    this.props.setDoc(name)
  }
  componentDidMount() {
    $.getJSON(OC.generateUrl('/apps/mdviewer/files'))
      .then(res => {
        this.setState({docs: res.files})
      })
  }
  render() {
    const docNameElements = this.state.docs.map(doc =>
      <li className={this.state.active == doc.name ? 'active' : ''} key={doc.name} 
          onClick={this.state.active != doc.name ? (() => this.handleClick(doc.name)) : () => {}}>
        {doc.name}
      </li>
    )
    return (
      <ul id="md-list">
        {docNameElements}
      </ul>
    )
  }
}
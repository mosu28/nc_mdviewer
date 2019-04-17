import React from 'react'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      docs: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(name) {
    this.props.setDoc(name)
  }
  componentDidMount() {
    $.getJSON(OC.generateUrl('/apps/mdviewer/docs'))
      .then(res => {
        this.setState({docs: res.files})
      })
  }
  render() {
    const docNameElements = this.state.docs.map(doc => {
      const decodeDocName = decodeURI(this.props.active)
      const className = decodeDocName == doc.name ? 'active' : ''
      const clickEvent = decodeDocName != doc.name ? (() => this.handleClick(doc.name)) : () => {}
      return <li className={className} key={doc.name} onClick={clickEvent}>{doc.name}</li>
    })
    return (
      <ul id="md-list">
        {docNameElements}
      </ul>
    )
  }
}
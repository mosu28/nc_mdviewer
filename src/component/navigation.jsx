import React from 'react'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(name) {
    $.getJSON(OC.generateUrl(`/apps/mdviewer/files/${name}`))
      .then(res => {
        this.props.showContent(res.text, res.srcPath)
      })
  }
  componentDidMount() {
    $.getJSON(OC.generateUrl('/apps/mdviewer/files'))
      .then(res => {
        this.setState({files: res.files})
      })
  }
  render() {
    const filesElements = this.state.files.map(file =>
      <li key={file.name}><a href="#" onClick={() => this.handleClick(file.name)}>{file.name}</a></li>
    )
    return (
      <ul id="md-list">
        {filesElements}
      </ul>
    )
  }
}
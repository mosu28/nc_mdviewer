import React from 'react'
import marked from 'marked'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      html: ''
    }
  }
  componentDidUpdate() {
    const imgTags = document.querySelectorAll('#md-text img')
    for (const [index, value] of imgTags.entries()) {
      const originSrc = imgTags[index].attributes.src.value;
      imgTags[index].attributes.src.value = `${location.protocol}//${location.host}/remote.php/${this.props.srcPath}/${originSrc}`
    }
  }
  render() {
    this.state.html = marked(this.props.text)
    const contentText = <div id="md-text" dangerouslySetInnerHTML={{__html: this.state.html}}/>
    return (
      <div id="app-content-wrapper">
        {contentText}
      </div>
    )
  }
}

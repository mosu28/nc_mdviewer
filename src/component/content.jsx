import React from 'react'
import marked from 'marked'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      docName: this.props.docName,
      srcPath: '',
      text: ''
    }
  }
  parseImageSrcs() {
    const imgTags = document.querySelectorAll('#md-text img')
    for (const [index, value] of imgTags.entries()) {
      const originSrc = imgTags[index].attributes.src.value;
      const src = `${location.protocol}//${location.host}/remote.php/${this.state.srcPath}/${originSrc}`
      imgTags[index].attributes.src.value = src
    }
  }
  componentDidUpdate(preProps) {
    if (preProps.docName != this.props.docName) {
      $.getJSON(OC.generateUrl(`/apps/mdviewer/docs/${this.props.docName}`))
        .then(res => {
          this.setState({text: res.text, srcPath: res.srcPath})
        })
    }
    this.parseImageSrcs()
  }
  render() {
    const html = marked(this.state.text)
    const contentText = <div id="md-text" dangerouslySetInnerHTML={{__html: html}}/>
    return (
      <div id="app-content-wrapper">
        {contentText}
      </div>
    )
  }
}

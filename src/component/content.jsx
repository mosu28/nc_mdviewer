import React from 'react'
import marked from 'marked'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      html: ''
    }
  }
  parseHtml(html, srcs) {
    let parsedHtml = html
    for (const [name, base64] of Object.entries(srcs)) {
      const regexp = new RegExp(`src="\.\/?images/${name}"`, 'g') 
      parsedHtml = parsedHtml.replace(regexp, `src="data:image/png;base64,${base64}"`)
    }
    return parsedHtml
  }
  render() {
    this.state.html = this.parseHtml(marked(this.props.text), this.props.srcs)
    const contentText = <div id="md-text" dangerouslySetInnerHTML={{__html: this.state.html}}/>
    return (
      <div id="app-content-wrapper">
        {contentText}
      </div>
    )
  }
}

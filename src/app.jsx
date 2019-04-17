import React from 'react'
import ReactDOM from 'react-dom'

// __webpack_public_path__ = OC.linkTo('dailyreport', 'js/')

import Navigation from './component/navigation.jsx'
import Setting from './component/setting.jsx'
import Content from './component/content.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDoc: '',
      text: '',
      srcPath: ''
    }
  }
  setDoc(activeDoc) {
    this.setState({activeDoc})
  }
  getQueryParams() {
    const params = {}
    const url = location.href
    if (url.indexOf('?')) return params
    const queries = url.split('?')[1].split('&').map((v) => v.split('='))
    for (const [key, value] of queries) {
      params[key] = value
    }
    return params
  }
  componentDidMount() {
    const params = this.getQueryParams()
    const doc = params['name'] || ''
    this.setState({activeDoc: doc})
  }
  render() {
    return (
      <div id="app">
        <div id="app-navigation">
          <Navigation active={this.state.activeDoc} setDoc={this.setDoc.bind(this)}/>
          <Setting/>
        </div>
        <div id="app-content">
          <Content docName={this.state.activeDoc} text={this.state.text} srcPath={this.state.srcPath}/>
        </div>
      </div>
    )
  }
}

const content = document.getElementById('content')
ReactDOM.render(<App/>, content)

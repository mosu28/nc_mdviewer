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
      active: '',
      text: '',
      srcPath: ''
    }
  }
  showContent(text, srcPath) {
    this.setState({text, srcPath})
  }
  render() {
    return (
      <div id="app">
        <div id="app-navigation">
          <Navigation active={this.state.active} showContent={this.showContent.bind(this)}/>
          <Setting/>
        </div>
        <div id="app-content">
          <Content text={this.state.text} srcPath={this.state.srcPath}/>
        </div>
      </div>
    )
  }
}

const content = document.getElementById('content')
ReactDOM.render(<App/>, content)

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
      text: '',
      srcs: {}
    }
  }
  showContent(text, srcs) {
    this.setState({text, srcs})
  }
  render() {
    return (
      <div id="app">
        <div id="app-navigation">
          <Navigation showContent={this.showContent.bind(this)}/>
          <Setting/>
        </div>
        <div id="app-content">
          <Content text={this.state.text} srcs={this.state.srcs}/>
        </div>
      </div>
    )
  }
}

const content = document.getElementById('content')
ReactDOM.render(<App/>, content)

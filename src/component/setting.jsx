import React from 'react'

export default class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      docPath: ''
    }
  }
  componentDidMount() {
    $.getJSON(OC.generateUrl('/apps/mdviewer/settings'))
      .then(res => {
        if (res.settings.docPath) {
          this.setState({docPath: res.settings.docPath})
        }
      })
  }
  onChange(e) {
    this.setState({docPath: e.target.value})
  }
  setConfig() {
    $.ajax({
      url: OC.generateUrl('/apps/mdviewer/settings'),
      type: 'PUT',
      data: {docPath: this.state.docPath}
    }).then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div id="app-settings">
        <div id="app-settings-header">
          <button className="settings-button"
              data-apps-slide-toggle="#app-settings-content"
          >Settings</button>
        </div>
        <div id="app-settings-content">
          <input value={this.state.docPath} onChange={event => this.onChange(event)} placeholder="Folder Path to show md files" />
          <button onClick={() => this.setConfig()}>Save</button>
        </div>
      </div>
    )
  }
}

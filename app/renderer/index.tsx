import * as React from 'react'
import * as ReactDOM from 'react-dom'
const fs = require('fs');
import { remote } from 'electron'

import { Titlebar } from './components/titlebar'

import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'

export class Window extends React.Component {
  handleClose(e: any) {
    console.log('closing')
    const window = remote.getCurrentWindow()
    window.close()
  }

  handleMinimize(e: any) {
    console.log('minimize')
    const window = remote.getCurrentWindow()
    window.minimize()
  }

  handleMaximize(e: any) {
    console.log('maximize')
    const window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }

  render() {
    return (
      <div>
        <Titlebar draggable={true}
          handleClose={this.handleClose}
          handleMinimize={this.handleMinimize}
          handleMaximize={this.handleMaximize}>
          Gallerama
        </Titlebar>
        <div id="content">
          <img src="C:/IMG950802.jpg"/>
          <div>Hello, world! ❤❤❤</div>
        </div>
      </div>
    )
  }
  componentDidMount(){

      fs.readdir('C:/', (err, files) => {
          files.forEach(file => {
              if (/\.(jpe?g|png|gif|bmp)$/i.test(file))
              console.log(file);
          });
      })
  }

}

ReactDOM.render(
  <Window />,
  document.getElementById('app')
)
import * as React from 'react'
import * as ReactDOM from 'react-dom'
const fs = require('fs');
import 'bootstrap/dist/css/bootstrap.min.css'

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
          <div>Hello, world! ❤❤❤</div>
        </div>
      </div>
    )
  }
  componentDidMount(){
      let path = 'C:\\Users\\Tanner\\Pictures';
      fs.readdir(path, (err, files) => {
          files.forEach(file => {
              if (fs.statSync(path+'/'+file).isDirectory())
              console.log(file);
          });
      })
  }

}

ReactDOM.render(
  <Window />,
  document.getElementById('app')
)
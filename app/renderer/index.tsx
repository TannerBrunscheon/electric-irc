import * as React from 'react'
import * as ReactDOM from 'react-dom'
const fs = require('fs');
import 'bootstrap/dist/css/bootstrap.min.css'

import { remote } from 'electron'

import { Titlebar } from './components/titlebar'

import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import './stylesheets/main.scss'
import Album from './components/album_view';

export class Window extends React.Component<any, any> {

  constructor(props: any)
  {
    super(props);
    this.state = {
      displayAlbums: true,
      displayCards: false,
      displayLarge: false,
      albumNames: []
    }
  }

  handleClose(e: any) {
    console.log('closing');
    const window = remote.getCurrentWindow();
    window.close()
  }

  handleMinimize(e: any) {
    console.log('minimize');
    const window = remote.getCurrentWindow();
    window.minimize()
  }

  handleMaximize(e: any) {
    console.log('maximize');
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }

  handleAlbumClick = (event: any) => {
    const display: boolean = this.state.displayAlbums;
    this.setState({
      displayAlbums: !display
    });
    console.log("button clicked");
  };

  render() {
    const albumContents = this.state.albumNames;
    const albums: any = albumContents.map((n:string) => this.state.displayAlbums && <Album name={n}
    handleAlbumClick={this.handleAlbumClick} 
    src={"C:\\Users\\Brian\\Downloads\\testImage.jpg"} key={n} />);

    return (
      <div>
        <Titlebar draggable={true}
          handleClose={this.handleClose}
          handleMinimize={this.handleMinimize}
          handleMaximize={this.handleMaximize}>
          Gallerama
        </Titlebar>
        <div id="content">
          {albums}
        </div>
      </div>
    )
  }
  componentDidMount(){
      let path = "C:\\Users\\Brian\\Downloads\\testImages";
      let albumNames:any = this.state.albumNames;

      let files= fs.readdirSync(path);

      files.forEach(file => {
          if (fs.statSync(path+'/'+file).isDirectory()) {
              albumNames.push(file);
                console.log(albumNames)
          }
      });




      console.log(albumNames)
      this.setState({
          albumNames: albumNames
      });
      console.log(this.state)
  }
}

ReactDOM.render(
  <Window />,
  document.getElementById('app')
);
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
      albumNames: [],
        pictureNames: [],
        path :"C:\\Users\\Brian\\Downloads\\testImages"
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

  handleAlbumClick = (folder: any) => {
    const display: boolean = this.state.displayAlbums;
    this.setState({
      displayAlbums: !display
    });
    this.addPictures(folder);
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
      let path = this.state.path;
      let albumNames:any = this.state.albumNames;

      let files= fs.readdirSync(path);

      files.forEach(file => {
          if (fs.statSync(path+'/'+file).isDirectory()) {
              albumNames.push(file);
          }
      });
      this.setState({
          albumNames: albumNames
      });
  }
  addPictures = (folder:string)=>{
      let path = this.state.path;
      let files= fs.readdirSync(path+"\\"+folder);
      let newpics = []
      this.setState({
              pictureNames: []
          })
      files.forEach(file => {
          if (/\.(jpe?g|png|gif|bmp)$/i.test(file))
              newpics.push(path+"\\"+folder+"\\"+ file);
      });
      this.setState({
          pictureNames: newpics
      })
      console.log(this.state.pictureNames)
  }

}

ReactDOM.render(
  <Window />,
  document.getElementById('app')
);
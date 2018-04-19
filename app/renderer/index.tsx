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
import Image from './components/large_image';

export class Window extends React.Component<any, any> {

  constructor(props: any)
  {
    super(props);
    this.state = {
      displayAlbums: true,
      displayCards: false,
      displayImage: false,
      albumNames: [],
        pictureNames: [],
        path :"/Users/Cullen/Desktop/Dogs_for_Project"
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

  handleImageClick = (folder: any) => {
    const display: boolean = this.state.displayImage;
    this.setState({
      displayImage: !display
    });

  };

  render() {
    const albumContents = this.state.albumNames;
    const albums: any = albumContents.map((n:string) => this.state.displayAlbums && <Album name={n}
    handleAlbumClick={this.handleAlbumClick} 
    src={"/Users/Cullen/Desktop/Dogs_for_Project/images.jpeg"} key={n} />);

    const largeImage = this.state.pictureNames;
    const image: any = largeImage.map((p:string) => this.state.displayImage && <Image name={p}
    handleImageClick = {this.handleImageClick}
    src={"/Users/Cullen/Desktop/Dogs_for_Project/images.jpeg"} key={p} />);

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
        <div id = "picture">
          {image}
        </div>
      </div>
    )
  }
  componentDidMount(){
      let path = this.state.path;
      let albumNames:any = this.state.albumNames;
      let pictureNames:any = this.state.pictureNames;

      let files= fs.readdirSync(path);

      files.forEach((file:any) => {
          if (fs.statSync(path+'/'+file).isDirectory()) {
              albumNames.push(file);
          }

      });
      this.setState({
          albumNames: albumNames,
          pictureNames:pictureNames
      });
  }
  addPictures = (folder:string)=>{
      let path = this.state.path;
      let files= fs.readdirSync(path+"\\"+folder);
      console.log(files);
      let newpics:any = [];

      files.forEach((file:any) => {
          if (/\.(jpeg|png|gif|bmp)$/i.test(file))
              newpics.push(path+"\\"+folder+"\\"+ file);
          console.log(newpics)
      });
      console.log(newpics)
      this.setState({
          pictureNames: newpics
      });
      console.log(this.state.pictureNames)
  }

}

ReactDOM.render(
  <Window />,
  document.getElementById('app')
);
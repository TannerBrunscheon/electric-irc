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
import Picture from "./components/picture";

export class Window extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);
        this.state = {
          displayAlbums: true,
          displayPictures: false,
          displayImage: false,
          albumNames: [],
          pictureNames: [],
          largePictureSrc: "",
          path :"C:/Users/Brian/Downloads/testImages"
        }
    }

    handleClose(e: any) {
        const window = remote.getCurrentWindow();
        window.close();
    }

    handleMinimize(e: any) {
        const window = remote.getCurrentWindow();
        window.minimize();
    }

    handleMaximize(e: any) {
        const window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
          window.maximize()
        } else {
          window.unmaximize()
        }
    }

    handleAlbumClick = (folder: string) => {
        this.addPictures(folder);

        const displayA: boolean = this.state.displayAlbums;
        const displayP: boolean = this.state.displayPictures;

        this.setState({
            displayAlbums: !displayA,
            displayPictures: !displayP
        });
    };

    handleImageClick = (file: string) => {
        const displayI: boolean = this.state.displayImage;
        const displayP: boolean = this.state.displayPictures;
        this.setState({
            displayImage: !displayI,
            displayPictures: !displayP,
            largePictureSrc: file
        });
    };

    handleBackClick = () => {
        let displayA: boolean = this.state.displayAlbums;
        let displayI: boolean = this.state.displayImage;
        let displayP: boolean = this.state.displayPictures;

        if(displayP)
        {
            displayP = !displayP;
            displayA = !displayA;
        }
        else
        {
            displayP = !displayP;
            displayI = !displayI;
        }
console.log("Button pressed");
        this.setState({
            displayImage: displayI,
            displayPictures: displayP,
            displayAlbums: displayA
        });
    };

    render() {
        const albumContents = this.state.albumNames || [];
        const albums: any = albumContents.map((n:string) => this.state.displayAlbums && <Album name={n}
                        handleAlbumClick={this.handleAlbumClick} firstPictureLocation={this.firstImage(n)} key={n} />);

        const pictureContents = this.state.pictureNames || [];
        const pictures: any = pictureContents.map((n:string) => this.state.displayPictures && <Picture src={n}
                                        handlePictureClick={this.handleImageClick} name={n.split('/').pop()!} key={n} />);

        const bigPicture: any = this.state.displayImage && <Image name={this.state.largePictureSrc.split('/').pop()||""} src={this.state.largePictureSrc}/>;



        const backButton: any = (this.state.displayImage || this.state.displayPictures) && <button onClick={this.handleBackClick}>Back</button>;

        return (
        <div>
            <Titlebar draggable={true} handleClose={this.handleClose} handleMinimize={this.handleMinimize} handleMaximize={this.handleMaximize}>
                Gallerama
            </Titlebar>

            {backButton}
            <div id="content" className={"row"}>
                <hr/>
                {albums}
                {pictures}
                {bigPicture}
                <hr/>
            </div>
        </div>
        );
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
          pictureNames: pictureNames
      });
    }

    addPictures = (folder:string)=>{
      let path = this.state.path;
      let files= fs.readdirSync(path+"\\"+folder);

      let newpics:any = [];
      files.forEach((file:any) => {
          if (/\.(jpe?g|png|gif|bmp)$/i.test(file))
              newpics.push(path+"/"+folder+"/"+ file);
      });
      this.setState({
          pictureNames: newpics
      })
    };

    // Given the name of an album, gets the first picture in the album.
    firstImage = (folder:string)=>{
        let path = this.state.path;
        let files= fs.readdirSync(path+"\\"+folder);
        let firstPicturePath = "";

        files.some((file:any) => {
            if (/\.(jpe?g|png|gif|bmp)$/i.test(file) && firstPicturePath === "") {
                firstPicturePath = path + "/" + folder + "/" + file;
            }
        });

        return firstPicturePath;
    };
}

ReactDOM.render(
  <Window />,
  document.getElementById('app')
);
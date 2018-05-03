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
          path:"C:/",
          pathInput: "C:/"
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

    // When an album is clicked, first get all of the pictures in that
    // folder then change the state to display album contents
    handleAlbumClick = (folder: string) => {
        this.addPictures(folder);

        const displayA: boolean = this.state.displayAlbums;
        const displayP: boolean = this.state.displayPictures;

        this.setState({
            displayAlbums: !displayA,
            displayPictures: !displayP
        });
    };

    // When a small picture is clicked within an album, change the
    // state so a large version of that photo is rendered.
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

        this.setState({
            displayImage: displayI,
            displayPictures: displayP,
            displayAlbums: displayA
        });
    };

    // Called when path textbox value changes
    handleSetPath = (event:any) => {
        this.setState({
            pathInput: event.target.value
        });
    };

    handleSetPathClick = (event:any) => {
        this.setState({
            path: this.state.pathInput,
            albumNames:[]
        },()=> this.changePath());
    };

    render()
    {
        const albumContents = this.state.albumNames || [];
        const albums: any = albumContents.map((n:string) => this.state.displayAlbums && <Album name={n}
                        handleAlbumClick={this.handleAlbumClick} firstPictureLocation={this.firstImage(n)} key={n} />);

        const pictureContents = this.state.pictureNames || [];
        const pictures: any = pictureContents.map((n:string) => this.state.displayPictures && <Picture src={n}
                                        handlePictureClick={this.handleImageClick} name={n.split('/').pop()!} key={n} />);

        const bigPicture: any = this.state.displayImage && <Image name={this.state.largePictureSrc.split('/').pop()||""} src={this.state.largePictureSrc}/>;

        // Render a back button if we're either within an album or displaying a large photo
        const backButton: any = (this.state.displayImage || this.state.displayPictures) && <button className={"BackButton"} onClick={this.handleBackClick}/>;

        // Determine whether or not a text box should be rendered for changing the path to the albums
        const enterPath: any = this.state.displayAlbums && <input value={this.state.pathInput} onChange={this.handleSetPath} className={"col-10"}/>;
        const enterPathButton: any = this.state.displayAlbums && <button onClick={this.handleSetPathClick}>Set Path</button>;

        return (
        <div>
            <Titlebar draggable={true} handleClose={this.handleClose} handleMinimize={this.handleMinimize} handleMaximize={this.handleMaximize}>
                Photo Gallery
            </Titlebar>
            {backButton}
            <div id="content" className={"row"}>
                {albums}
                {pictures}
                {bigPicture}
                <div className={"SelectPath"}>
                    {enterPath}
                    {enterPathButton}
                </div>
            </div>
        </div>
        );
    }

    componentDidMount()
    {
        this.changePath();
    }

    // Get all of the albums (folder names) within the directory specified by this.state.path
    changePath()
    {
        let path = this.state.path;
        let albumNames:any = this.state.albumNames;
        let pictureNames:any = this.state.pictureNames;

        try {
            let files = fs.readdirSync(path);
            files.forEach((file: any) => {
                if (fs.statSync(path + '/' + file).isDirectory()) {
                    albumNames.push(file);
                }
            });
        }
        catch (e) {
            this.setState({
                albumNames: [],
                path: "error"
            });
            return;
        }

        this.setState({
            albumNames: albumNames,
            pictureNames: pictureNames
        });

    }

    // Given a path to a folder, get every picture in the album
    // and populate the pictureNames array.
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

    // Given the name of an album, get the first picture in the album.
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
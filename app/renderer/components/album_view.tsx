import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'webdriverio';


export interface AlbumProps {
    handleAlbumClick: (folder: any) => void;
    name: string;
    firstPictureLocation: string;
}

class Album extends React.Component<AlbumProps> {
    constructor(props: AlbumProps)
    {
        super(props);
        console.log(props.name);
    }

    public render()
    {
        // "C:/Users/Brian/Downloads/testImages/album/testImage.jpg"
        const styles:any = {
            width: 200,
            height: 200,
            backgroundImage: "url(" + this.props.firstPictureLocation + ")",
            backgroundSize: "cover",
            backgroundPosition: "center"
         };
        console.log("First picture location: " + this.props.firstPictureLocation);

        return (
            <div>
                <button style={styles} onClick={() => this.props.handleAlbumClick(this.props.name)}/>
                <p><b>{this.props.name}</b></p>
            </div>
        );
    }
} 

export default Album
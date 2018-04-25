import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export interface AlbumProps {
    handleAlbumClick: (folder: any) => void;
    name: string;
    firstPictureLocation: string;
}

class Album extends React.Component<AlbumProps>
{
    constructor(props: AlbumProps)
    {
        super(props);
    }

    public render()
    {
        const styles:any = {
            backgroundImage: "url(" + this.props.firstPictureLocation + ")",
         };

        const divStyles:any = {
            padding: 25,
            left: 50
        };

        return (
            <div style={divStyles}>
                <button className={"album"} style={styles} onClick={() => this.props.handleAlbumClick(this.props.name)}/>
                <p><b>{this.props.name}</b></p>
            </div>
        );
    }
} 

export default Album
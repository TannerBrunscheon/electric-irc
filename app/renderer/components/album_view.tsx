import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'webdriverio';


export interface AlbumProps {
    handleAlbumClick: (event: any) => void;
    name: string;
    src: string;
}


class Album extends React.Component<AlbumProps> {
    constructor(props: AlbumProps)
    {
        super(props);
        console.log(props.name);
    }

    public render()
    {
        const styles:any = {
            width: 250,
            height: 250, 
            backgroundImage: this.props.src
        };

        return (
            <div>
                <img src = {this.props.src}/>
                <button style={styles} onClick={this.props.handleAlbumClick}/>
            </div>
        );
    }
} 

export default Album
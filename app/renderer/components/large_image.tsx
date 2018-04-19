import * as React from 'react'
//import * as ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
//import { Button } from 'webdriverio';

export interface ImageProps {
    handleImageClick: (folder: any) => void;
    name: string;
    src: string;
}

class Image extends React.Component<ImageProps> {
    constructor(props: ImageProps)
    {
        super(props);
        console.log(props.name);
    }

    public render() 
    {
        const styles:any = {
            width: 500,
            height: 500, 
            backgroundImage: "url(" + "/Users/Cullen/Desktop/Dogs_for_Project/images.jpeg" + ")",
            backgroundSize: "cover",
            backgroundPosition: "center"
    };

    return (
        <div>
            <button style={styles} onClick={() => this.props.handleImageClick(this.props.name)}/>
        </div>
    );
}
}

export default Image




import * as React from 'react'
//import * as ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
//import { Button } from 'webdriverio';

export interface ImageProps {
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
        return (
            <div>
                <img src={this.props.src}/>
            </div>
        );
    }
}

export default Image




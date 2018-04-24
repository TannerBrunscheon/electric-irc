import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'webdriverio';


export interface PictureProps {
    handlePictureClick: (folder: any) => void;
    name: string;
    src: string;
}


class Picture extends React.Component<PictureProps>
{
    public render()
    {
        const buttonStyles:any = {
            width: 200,
            height: 200,
            backgroundImage: "url(" + this.props.src + ")",
            backgroundSize: "cover",
            backgroundPosition: "center"
        };

        const divStyles:any = {
            padding: 25
        };

        return (
            <div style={divStyles}>
                <button style={buttonStyles} onClick={()=>this.props.handlePictureClick(this.props.src)}/>
                <p><b>{this.props.name}</b></p>
            </div>
        );
    }
}

export default Picture
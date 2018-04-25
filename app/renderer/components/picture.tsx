import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

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
            backgroundImage: "url(" + this.props.src + ")",
        };

        const divStyles:any = {
            padding: 25
        };

        return (
            <div style={divStyles}>
                <button className={"Picture"} style={buttonStyles} onClick={()=>this.props.handlePictureClick(this.props.src)}/>
                <p><b>{this.props.name}</b></p>
            </div>
        );
    }
}

export default Picture
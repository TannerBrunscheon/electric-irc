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
        const divStyles:any = {
            padding: 25,
            textAlign: "center"
        };

        return (
            <div style={divStyles}>
                <img src={this.props.src} className={"Picture"} onClick={()=>this.props.handlePictureClick(this.props.src)}/>
                <p><b>{this.props.name}</b></p>
            </div>
        );
    }
}

export default Picture
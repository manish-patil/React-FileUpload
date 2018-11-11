import * as React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

export default class uploadFiles extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

        this.state = {
            accepted: [],
            rejected: []
        }

        this.onDrop = this.onDrop.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(e) {
        e.preventDefault();

        let formData = new FormData();

        this.state.accepted.map((file, idx) => {
            formData.append('file' + idx, file);
        })

        axios.post('/fileupload', formData)
            .then((result) => {
                console.log(result);
            });

        this.setState({
            accepted: [],
            rejected: []
        })
    }

    onDrop(accepted: File[], rejected: File[]) {
        if (accepted) {
            this.setState({ accepted: [...this.state.accepted, ...accepted] })
        }

        if (rejected) {
            this.setState({ rejected: [...this.state.rejected, ...rejected] })
        }
    }

    render() {
        return (
            <div>
                <Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop}></Dropzone>
                <div>
                    <h5>Accepted Files</h5>
                    <ul style={{ listStyle: "none" }}>
                        {
                            this.state.accepted.length > 0 ? this.state.accepted.map((file) => {
                                return <li key={file.name}>{file.name}</li>
                            }) : null
                        }
                    </ul>
                </div>
                <div>
                    <h5>Rejected Files</h5>
                    <ul style={{ listStyle: "none" }}>
                        {this.state.rejected.length > 0 ? this.state.rejected.map((file) => {
                            return <li key={file.name}>{file.name}</li>
                        }) : null}
                    </ul>
                </div>
                <button type="button" onClick={this.uploadFile}>Upload</button>
            </div>
        );
    }
}
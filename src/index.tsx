import * as React from "react";
import * as ReactDOM from "react-dom";
import UploadFiles from "./components/UploadFiles";

class Main extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    };

    render() {
        return(
            <UploadFiles/>
        );
    };
}

ReactDOM.render(<Main/>, document.getElementById("main"));
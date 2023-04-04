import "./index.css";
import * as React from "react";
import { TreeGridComponent, ColumnsDirective, ColumnDirective, ColumnChooser, Inject, Toolbar, Edit, ExcelExport, Resize, Filter,
} from "@syncfusion/ej2-react-treegrid";
import { sampleData } from "./data";

export class Treegrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreenActive: false,
    };
    this.treegridRef = React.createRef();
    this.toolbarOptions = [
      {
        text: "Fullscreen",
        tooltipText: "Fullscreen",
        prefixIcon: "full_screen",
        id: "fullscreenId",
        align: "right",
      },
    ];
  }

  FilterOptions = {
    type: "Excel",
  };

  exitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.setState({ isFullScreenActive: false }, () =>
        this.closeFullscreen()
      );
    }
  };

  // To Close the Full Screen.
  closeFullscreen = () => {
    this.setState({ isFullScreenActive: false });
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  // To Handle Fullscreen View.
  handlefullscreen = () => {
    let elem = document.getElementById("fullscreenId");
    document.addEventListener("fullscreenchange", this.exitHandler);
    document.addEventListener("webkitfullscreenchange", this.exitHandler);
    document.addEventListener("mozfullscreenchange", this.exitHandler);
    document.addEventListener("MSFullscreenChange", this.exitHandler);
    if (this.state.isFullScreenActive !== true) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
      this.setState({ isFullScreenActive: true });
    } else {
      this.closeFullscreen();
    }
  };

  toolbarClick(args) {
    if (args.item.id === "fullscreenId") {
      this.handlefullscreen();
    }
  }

  render() {
    return (
      <div className="control-pane">
        <div className="table" id="fullscreenId">
          <TreeGridComponent
            ref={this.treegridRef}
            dataSource={sampleData}
            treeColumnIndex={1}
            childMapping="subtasks"
            allowFiltering={true}
            filterSettings={this.FilterOptions}
            allowResizing={true}
            isFullScreenActive={this.state.isFullScreenActive}
            toolbar={this.toolbarOptions}
            allowExcelExport={true}
            toolbarClick={(args) => this.toolbarClick(args)}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="taskID"
                headerText="Task ID"
                width="90"
                textAlign="Right"
              />
              <ColumnDirective
                field="taskName"
                headerText="Task Name"
                width="180"
              />
              <ColumnDirective
                field="duration"
                headerText="Duration"
                width="90"
              />
              <ColumnDirective
                field="progress"
                headerText="Progress"
                width="90"
              />
            </ColumnsDirective>
            <Inject
              services={[ Filter, Toolbar]}
            />
          </TreeGridComponent>
        </div>
      </div>
    );
  }
}
export default Treegrid;

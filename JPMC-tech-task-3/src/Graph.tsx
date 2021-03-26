import React, { Component } from "react";
import { Table } from "@jpmorganchase/perspective";
import { ServerRespond } from "./DataStreamer";
import { DataManipulator } from "./DataManipulator";
import "./Graph.css";

interface IProps {
	data: ServerRespond[];
}

interface PerspectiveViewerElement extends HTMLElement {
	load: (table: Table) => void;
}
class Graph extends Component<IProps, {}> {
	table: Table | undefined;

	render() {
		return React.createElement("perspective-viewer");
	}

	componentDidMount() {
		// Get element from the DOM.
		const elem = (document.getElementsByTagName(
			"perspective-viewer"
		)[0] as unknown) as PerspectiveViewerElement;

		const schema = {
			//we made changes as we just want to show ratio and bounds
			//price_abc and price_def will be needed to find the ratio
			price_abc: "float",
			price_def: "float",
			ratio: "float",
			trigger_alert: "float",
			upper_bound: "float",
			lower_bound: "float",
			timestamp: "date",
		};

		if (window.perspective && window.perspective.worker()) {
			this.table = window.perspective.worker().table(schema);
		}
		if (this.table) {
			// Load the `table` in the `<perspective-viewer>` DOM reference.
			elem.load(this.table);
			elem.setAttribute("view", "y_line");
			// column-pivots not here as we are concerned about ratio btw ABC and DEF and not their separate prices
			elem.setAttribute("row-pivots", '["timestamp"]'); //for the x axis
			elem.setAttribute(
				"columns",
				'["ratio" ,"lower_bound","upper_bound","trigger_alert"]'
			);
			// attributes must be updated
			// handles duplicate data
			elem.setAttribute(
				"aggregates",
				JSON.stringify({
					price_abc: "avg",
					price_def: "avg",
					ratio: "avg",
					trigger_alert: "avg",
					upper_bound: "avg",
					lower_bound: "avg",
					timestamp: "distinct count",
				})
			);
		}
	}

	componentDidUpdate() {
		if (this.table) {
			this.table.update([DataManipulator.generateRow(this.props.data)]);
		}
	}
}

export default Graph;

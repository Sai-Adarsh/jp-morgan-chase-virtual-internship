import { ServerRespond } from "./DataStreamer";

export interface Row {
	price_abc: number;
	price_def: number;
	ratio: number;
	trigger_alert: number | undefined;
	upper_bound: number;
	lower_bound: number;
	timestamp: Date;
}

export class DataManipulator {
	static generateRow(serverResponds: ServerRespond[]): Row {
		const priceABC =
			(serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
		const priceDEF =
			(serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
		const ratio = priceABC / priceDEF;
		const upperBound = 1 + 0.02;
		const lowerBound = 1 - 0.011;
		return {
			// assigning values to new variables
			price_abc: priceABC,
			price_def: priceDEF,
			ratio,
			timestamp:
				serverResponds[0].timestamp > serverResponds[1].timestamp
					? serverResponds[0].timestamp
					: serverResponds[1].timestamp,
			upper_bound: upperBound,
			lower_bound: lowerBound,
			trigger_alert:
				ratio > upperBound || ratio < lowerBound ? ratio : undefined,
		};
		//})
	}
}

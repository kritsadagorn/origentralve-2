declare module "*.css";

// Minimal type declarations for libraries without bundled types
declare module "three-geojson-geometry" {
	import { BufferGeometry } from "three";
	export default class GeoJSONGeometry extends BufferGeometry {
		constructor(geojson: any, scale?: number);
	}
}

// Allow importing any amCharts 5 geodata files without type errors
declare module "@amcharts/amcharts5-geodata/*" {
  const value: any;
  export default value;
}

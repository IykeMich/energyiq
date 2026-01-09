/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
    import * as React from "react";

    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    export default ReactComponent;
}

declare module 'leaflet';
declare module 'webpack-bundle-analyzer';

declare const process: {
  env: { [key: string]: string | undefined };
};

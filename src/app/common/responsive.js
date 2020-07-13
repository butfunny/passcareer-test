import {ResponsiveFactory} from "./responsive-factory";


export const sizes = [
    {name: "xs", minWidth: 0},
    {name: "sm", minWidth: 768},
    {name: "md", minWidth: 1024},
    {name: "lg", minWidth: 1280},
];

export const responsive = ResponsiveFactory.createResponsive(sizes);

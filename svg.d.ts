declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default content;
  }

  declare module "*.png" {
    const value: any;
    export = value;
 }
   